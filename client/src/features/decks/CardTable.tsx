import { ReactElement, useState } from "react";
import {
  createStyles, Table, Modal, Menu, Group, Text, ActionIcon,
} from "@mantine/core";
// eslint-disable-next-line import/no-extraneous-dependencies
import parser from "html-react-parser";
import { modals } from "@mantine/modals";
import { useDisclosure } from "@mantine/hooks";
import { Card } from "types";
import {
  IconDotsVertical, IconTrash, IconEdit, IconArrowsSort,
} from "@tabler/icons-react";
import CardEditor from "./CardEditor";
import { useDeleteCardMutation } from "../api/apiSlice";

const useStyles = createStyles((theme) => ({
  table: {
    display: "block",
    overflow: "auto",

    thead: {
      position: "sticky",
      top: 0,
      zIndex: 2,
      background: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.blue[0],
    },

    th: {
      width: "100%",
    },

    td: {
      minWidth: "10rem",
      maxWidth: "20rem",
      overflowWrap: "break-word",
    },
  },
}));

interface CardTableProps {
  cards: Card[];
  viewOnly: boolean;
}

const CardTable = ({ cards, viewOnly }: CardTableProps): ReactElement => {
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const [cardToEdit, setCardToEdit] = useState<Card | null>();
  const [deleteCard] = useDeleteCardMutation();

  const [sortedKey, setSortedKey] = useState("levelDESC");

  let sortedCards: Card[];
  switch (sortedKey) {
    case "levelDESC":
      sortedCards = [...cards].sort((a, b) => b.level - a.level);
      break;
    case "levelASC":
      sortedCards = [...cards].sort((a, b) => a.level - b.level);
      break;
    case "dateDESC":
      // eslint-disable-next-line max-len
      sortedCards = [...cards].sort((a, b) => new Date(b.checkpointDate).getTime() - (new Date(a.checkpointDate).getTime()));
      break;
    case "dateASC":
      // eslint-disable-next-line max-len
      sortedCards = [...cards].sort((a, b) => new Date(a.checkpointDate).getTime() - (new Date(b.checkpointDate).getTime()));
      break;
    case "cloze":
      sortedCards = [...cards].sort((a, b) => a.content.type.localeCompare(b.content.type));
      break;
    case "classic":
      sortedCards = [...cards].sort((a, b) => b.content.type.localeCompare(a.content.type));
      break;
    default:
      sortedCards = [...cards];
  }

  const handleSortLevel = () => {
    if (sortedKey === "levelDESC") {
      setSortedKey("levelASC");
    } else {
      setSortedKey("levelDESC");
    }
  };

  const handleSortDate = () => {
    if (sortedKey === "dateASC") {
      setSortedKey("dateDESC");
    } else {
      setSortedKey("dateASC");
    }
  };

  const handleSortType = () => {
    if (sortedKey === "cloze") {
      setSortedKey("classic");
    } else {
      setSortedKey("cloze");
    }
  };

  const handleOpenEdit = (card: Card): void => {
    setCardToEdit(card);
    open();
  };

  const handleDeleteCard = (card: Card): void => {
    modals.openConfirmModal({
      title: "Confirm Action",
      children: (
        <Text fw="500" c="red" size="sm">
          Deleted cards are unrecoverable.
        </Text>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => deleteCard(card),
    });
  };

  return (
    <>
      <Table
        horizontalSpacing="xl"
        verticalSpacing="xl"
        className={classes.table}
      >
        <thead>
          <tr>
            <th>
              <Group noWrap position="center">
                Content
              </Group>
            </th>
            <th>
              <Group noWrap>
                Type
                <ActionIcon onClick={() => handleSortType()}>
                  <IconArrowsSort />
                </ActionIcon>
              </Group>
            </th>
            <th style={{ display: viewOnly ? "none" : "" }}>
              <Group noWrap>
                Level
                <ActionIcon onClick={() => handleSortLevel()}>
                  <IconArrowsSort />
                </ActionIcon>
              </Group>
            </th>
            <th style={{ display: viewOnly ? "none" : "" }}>
              <Group noWrap>
                Review
                <ActionIcon onClick={() => handleSortDate()}>
                  <IconArrowsSort />
                </ActionIcon>
              </Group>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedCards.map((card: Card) => (
            <tr key={card.id}>
              { card.content.type === "classic" && (
              <td>
                <Text fw="700">Front:</Text>
                <Text>{parser(card.content.front)}</Text>
                <Text fw="700" pt="lg">Back:</Text>
                <Text>{parser(card.content.back)}</Text>
              </td>
              )}
              { card.content.type === "cloze" && (
              <td>
                <Text fw="700">{card.content.hint}</Text>
              </td>
              )}
              <td>
                <Text fs="italic">{`${card.content.type}`}</Text>
              </td>
              <td style={{ display: viewOnly ? "none" : "" }}>
                <Text fw="700">{`Level: ${card.level}`}</Text>
              </td>
              <td style={{ display: viewOnly ? "none" : "" }}>
                <Group noWrap position="apart">
                  {new Date(card.checkpointDate).getTime() <= (new Date().getTime())
                    ? <Text>Now</Text>
                    : <Text>{new Date(card.checkpointDate).toLocaleString("en-NZ")}</Text>}
                  <Menu trigger="hover" openDelay={100} closeDelay={400}>
                    <Menu.Target>
                      <ActionIcon>
                        <IconDotsVertical />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        id="card-edit"
                        onClick={() => handleOpenEdit(card)}
                        icon={<IconEdit />}
                      >
                        Edit
                      </Menu.Item>

                      <Menu.Item
                        id="card-delete"
                        onClick={() => handleDeleteCard(card)}
                        color="red"
                        icon={<IconTrash />}
                      >
                        Delete
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        zIndex={2000}
        size="xl"
        withCloseButton={false}
        opened={opened}
        onClose={close}
      >
        <CardEditor card={cardToEdit} />
      </Modal>
    </>

  );
};

export default CardTable;
