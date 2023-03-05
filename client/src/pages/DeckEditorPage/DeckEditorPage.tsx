import { ReactElement } from "react";
import CardList from "../../features/decks/CardList/CardList";
import DeckEditor from "../../features/decks/DeckEditor/DeckEditor";
import { useActiveDeck } from "../../hooks/hooks";
import { Container } from "./styles";

const DeckEditorPage = (): ReactElement => {
  const activeDeck = useActiveDeck();

  return (
    <Container>
      <DeckEditor />
      <CardList cards={activeDeck?.cards ?? []} />
    </Container>
  );
};
export default DeckEditorPage;
