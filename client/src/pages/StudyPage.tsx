import { ReactElement } from "react";
import { Card } from "types";
import {
  Stack, Text, Container, ThemeIcon,
} from "@mantine/core";
import { IconCards } from "@tabler/icons-react";
import { useActiveDeck, useCardsDue } from "../hooks/hooks";
import CardComponent from "../features/decks/Card";
import TagList from "../components/TagList";
import ProgressBar from "../components/ProgressBar";

const Cardless = (): ReactElement => (
  <Stack ml="-1.5rem" mb="33%">
    <ThemeIcon variant="light" size="100%" radius="lg">
      <IconCards size="100%" />
    </ThemeIcon>
    <Text
      variant="gradient"
      gradient={{ from: "indigo", to: "cyan", deg: 45 }}
      fz="2rem"
      align="center"
      fw={700}
    >
      Deck Empty!
    </Text>
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
    <Container h="100%">
      <ProgressBar
        value={percentageDone}
        label={`${Math.round(percentageDone)}% (${cardsToStudy.length} / ${activeDeck?.cards?.length})`}
      />

      {/* height at 98% otherwise, there'll be a strange extra spacing that i can't find */}
      <Stack align="center" justify="space-around" h="98%">
        <TagList />
        {cardsToStudy.length !== 0
          ? <CardComponent cardToStudy={cardsToStudy[0]} />
          : <Cardless />}
      </Stack>
    </Container>

  );
};

export default StudyPage;
