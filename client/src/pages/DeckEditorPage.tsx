import { Stack } from "@mantine/core";
import { ReactElement, useState } from "react";
import { Card } from "types";
import CardTable from "../features/decks/CardTable";
import DeckToolbar from "../features/decks/DeckToolbar";
import { useActiveDeck } from "../hooks/hooks";

const DeckEditorPage = (): ReactElement => {
  const activeDeck = useActiveDeck();
  const [filter, setFilter] = useState<string>("");

  // cardsToShows filters front vaule based on filter variable
  const cardsToShow: Card[] | any[] = filter === ""
    ? activeDeck.cards ?? []
    : activeDeck.cards?.filter(
      (cards) => cards.front.toLowerCase().includes(filter.toLowerCase()),
    ) ?? [];

  return (
    <Stack ml="-1rem" h="100%">
      <DeckToolbar key={activeDeck.id} deck={activeDeck} searchCallback={setFilter} />
      <CardTable cards={cardsToShow} viewOnly={false} />
    </Stack>
  );
};
export default DeckEditorPage;
