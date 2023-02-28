import { ReactElement, useState } from "react";

import { Badge, Button } from "@mantine/core";
import {
  DeckSelector, Container, Tags,
} from "./styles";

import {
  useAppDispatch, useAppSelector, useTagSelector,
} from "../../../hooks/hooks";
import { addTag, setActive } from "../decksSlice";
import { useAddNewDeckMutation, useGetDecksQuery } from "../../api/apiSlice";
import { Deck } from "../../../types";
import { SearchBar } from "../../../sharedStyles";
import { RootState } from "../../../store";

type DeckListProps = {
  noCreate: boolean;
}

const DeckList = ({ noCreate }: DeckListProps): ReactElement => {
  const [filter, setFilter] = useState<string>("");
  const dispatch = useAppDispatch();
  const [addNewDeck] = useAddNewDeckMutation();
  const { data: decks = [] } = useGetDecksQuery();
  const activeTags: string[] = useAppSelector((state: RootState) => state.decks.tags);
  const activeDeckId: number | null = useAppSelector((state: any) => state.decks.activeDeckId);
  const activeDeckUnfiltered: Deck[] = activeDeckId === null
    ? decks
    : [decks.find((deck: Deck) => deck.id === activeDeckId)];

  const decksToShow: Deck[] = filter === ""
    ? decks
    : decks.filter((deck: Deck) => (deck.title).toLowerCase().includes(filter.toLowerCase()));

  return (
    <Container>
      <DeckSelector noCreate={noCreate}>
        <form onChange={({ target }) => setFilter((target as HTMLInputElement).value)}>
          <SearchBar placeholder="Search" />
        </form>
        <Button onClick={() => dispatch(setActive(null))}> All</Button>
        <Button onClick={() => addNewDeck()}> New </Button>
        <div>
          {decksToShow.map((deck: any) => (
            <Button variant="outline" key={deck.id} onClick={() => dispatch(setActive(deck.id))}>
              <p>{deck.title}</p>
            </Button>
          ))}
        </div>
      </DeckSelector>

      <Tags>
        {useTagSelector(activeDeckUnfiltered).map((tag: string) => (
          <Badge variant={activeTags.includes(tag) ? "filled" : "outline"} key={tag} onClick={() => dispatch(addTag(tag))}>
            {tag}
          </Badge>
        ))}
      </Tags>
    </Container>

  );
};

export default DeckList;
