import { ActionIcon, Modal, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { ReactElement, useState } from "react";
import { Table, ToolBar } from "./styles";
import { useDeleteCardMutation } from "../../api/apiSlice";
import CardEditor from "../CardEditor/CardEditor";

import { ReactComponent as Edit } from "../../../assets/edit.svg";
import { ReactComponent as Delete } from "../../../assets/delete.svg";
import { Card } from "../../../types";

const CardList = ({ cards, viewOnly }: any): ReactElement => {
  const [opened, setOpened] = useState<boolean>(false);
  const [cardToEdit, setCardToEdit] = useState<Card | null>();

  const [deleteCard] = useDeleteCardMutation();

  const renderDate = (date: Date) => {
    if (new Date(date).getTime() <= (new Date()).getTime()) {
      return (
        <p>Now</p>
      );
    }
    return (
      <p>{new Date(date).toLocaleString("en-NZ")}</p>
    );
  };

  const handleOpenEdit = (card: Card): void => {
    setCardToEdit(card);
    setOpened(true);
  };

  const handleDeleteCard = (card: any): any => {
    openConfirmModal({
      title: "Please confirm your action",
      children: (
        <Text size="sm">
          Deleted cards are unrecoverable.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => deleteCard(card),
    });
  };

  return (
    <div>
      <Table viewOnly={viewOnly}>
        <thead>
          <tr>
            <th>Overview</th>
            <th>Front</th>
            <th>Back</th>
            <th>Next Review</th>
          </tr>
        </thead>

        <tbody>
          {cards.map((card: Card) => (
            <tr key={Date.now() * Math.random()}>
              <td>
                <p>{`Level: ${card.level}`}</p>
                <p>{`Type: ${card.type}`}</p>
                <ToolBar viewOnly={viewOnly}>
                  <div>
                    <ActionIcon onClick={() => handleDeleteCard(card)}><Delete /></ActionIcon>
                    <p>Delete</p>
                  </div>
                  <div>
                    <ActionIcon id="edit" onClick={() => handleOpenEdit(card)}><Edit /></ActionIcon>
                    <p>Edit</p>
                  </div>
                </ToolBar>
              </td>
              <td>
                { card.front }
              </td>
              <td>
                { card.back }
              </td>
              <td>
                {renderDate(card.checkpointDate)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        size="xl"
        withCloseButton={false}
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <CardEditor card={cardToEdit} />
      </Modal>
    </div>

  );
};

export default CardList;
