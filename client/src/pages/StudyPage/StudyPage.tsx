import { ReactElement } from "react";
import { Card } from "types";
import {
  Stack, Image, Text, Container,
} from "@mantine/core";
import { useActiveDeck, useCardsDue } from "../../hooks/hooks";
import CardComponent from "../../features/decks/Card";
import TagList from "../../components/TagList";
import ProgressBar from "../../components/ProgressBar";
import done from "../../assets/images/done.svg";

const Cardless = (): ReactElement => (
  <Stack align="center" sx={{ width: "100%" }}>
    <Image width="80%" src={done} alt="empty deck" />
    <Container pb="xl">
      <Text fw={700} fs="italic">All Done :)</Text>
      <Text fs="italic"> No Cards Due For Review In This Deck </Text>
    </Container>
  </Stack>
);

const StudyPage = (): ReactElement => {
  const activeDeck = useActiveDeck();
  const cardsToStudy: Card[] = useCardsDue(activeDeck?.cards ?? []);

  const percentageDone
    : number = cardsToStudy.length === 0 || !activeDeck.cards || activeDeck.cards.length === 0
      ? 100
      : (((activeDeck.cards.length - cardsToStudy.length) / activeDeck.cards.length) * 100);

  return (
    <Stack align="center" justify="space-between" sx={{ width: "100%" }}>
      <ProgressBar
        value={percentageDone}
        label={`${Math.round(percentageDone)}% (${cardsToStudy.length} / ${activeDeck?.cards?.length})`}
      />
      <TagList />

      {cardsToStudy.length !== 0
        ? <CardComponent cardToStudy={cardsToStudy[0]} />
        : <Cardless />}
    </Stack>
  );
};

export default StudyPage;
