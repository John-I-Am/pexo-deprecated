/* eslint-disable no-param-reassign */
import { Button, Modal } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { useCreateCardMutation, useAddNewDeckMutation } from "../../api/apiSlice";
import CardList from "../CardList/CardList";
import { Container } from "./styles";

const Deck = ({ cards }: any) => {
  const [opened, setOpened] = useState(false);

  const [addNewDeck, { isSuccess }] = useAddNewDeckMutation();
  const [createCard] = useCreateCardMutation();

  const handleAddDeck = async () => {
    const deck: any = await addNewDeck();
    cards.cards.forEach(async (newCard: any) => {
      newCard.deckId = deck.data.id;
      await createCard(newCard);
    });
    if (isSuccess) {
      showNotification({
        title: "Deck Added",
        message: "Start learning!",
      });
    }
  };

  return (
    <Container>
      <div>
        <h2>{cards.title}</h2>
        <p>
          {cards.cards.length}
          {" "}
          cards
        </p>
        <p>{cards.description}</p>
      </div>

      <div>
        <Button onClick={() => setOpened(true)}>View cards</Button>
        <Button onClick={() => handleAddDeck()}>Add Deck</Button>
      </div>

      <Modal
        size="auto"
        withCloseButton={false}
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <CardList cards={cards.cards} viewOnly />
      </Modal>
    </Container>
  );
};

export default Deck;
