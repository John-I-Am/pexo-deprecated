import { ReactElement, useState } from "react";
import {
  createStyles, Table, Modal, Menu, Group, Text, ActionIcon, Stack, Box,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { useDisclosure } from "@mantine/hooks";
import { Card } from "types";
import { IconDotsVertical, IconTrash, IconEdit } from "@tabler/icons-react";
import CardEditor from "./CardEditor/CardEditor";
import { useDeleteCardMutation } from "../api/apiSlice";

const useStyles = createStyles((theme) => ({
  table: {
    display: "block",
    overflow: "auto",
    paddingLeft: theme.spacing.lg,

    td: {
      maxWidth: "300px",
      overflowWrap: "break-word",
    },
  },

  head: {
    width: "25vw",
    minWidth: "300px",
    position: "sticky",
    top: 0,
  },

  menu: {
    display: "none",
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
      onCancel: () => console.log("Cancel"),
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
            <th className={classes.head}>Overview</th>
            <th className={classes.head}>Front</th>
            <th className={classes.head}>Back</th>
            <th className={classes.head}>Next Review</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card: Card) => (
            <tr key={card.id}>
              <td>
                <Group position="left">
                  <Box id="card-menu" sx={{ display: viewOnly ? "none" : "" }}>
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
                  </Box>

                  <Stack>
                    <Text fw="700" sx={{ display: viewOnly ? "none" : "" }}>{`Level: ${card.level}`}</Text>
                    <Text fs="italic">{`${card.type}`}</Text>
                  </Stack>

                </Group>
              </td>
              <td>{card.front}</td>
              <td>{card.back}</td>
              <td>
                {new Date(card.checkpointDate).getTime() <= (new Date().getTime())
                  ? <p>Now</p>
                  : <p>{new Date(card.checkpointDate).toLocaleString("en-NZ")}</p>}
              </td>
            </tr>
          ))}

        </tbody>
      </Table>
      <Modal
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
