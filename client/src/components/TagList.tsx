import { Badge, Container } from "@mantine/core";
import { ReactElement } from "react";
import { Deck } from "types";
import { useGetDecksQuery } from "../features/api/apiSlice";
import { addTag } from "../features/decks/decksSlice";
import { useAppDispatch, useTagSelector, useAppSelector } from "../hooks/hooks";
import { RootState } from "../store";

const TagList = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { data: decks = [] } = useGetDecksQuery();
  const activeTags: string[] = useAppSelector((state: RootState) => state.decks.tags);
  const activeDeckId: number | null = useAppSelector((state: any) => state.decks.activeDeckId);
  const activeDecks: Deck[] = activeDeckId === null
    ? decks
    : [decks.find((deck: Deck) => deck.id === activeDeckId)];

  return (
    <Container>
      {useTagSelector(activeDecks).map((tag: string) => (
        <Badge
          variant={activeTags.includes(tag) ? "filled" : "outline"}
          key={tag}
          onClick={() => dispatch(addTag(tag))}
        >
          {tag}
        </Badge>
      ))}
    </Container>
  );
};

export default TagList;
