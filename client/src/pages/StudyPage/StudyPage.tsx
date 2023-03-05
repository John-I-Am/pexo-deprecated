/* eslint-disable no-unused-vars */
import { ReactElement, useState } from "react";
import { Card } from "types";
import { useActiveDeck, useCardsDue } from "../../hooks/hooks";
import CardComponent from "../../features/decks/Card/Card";
import TagList from "../../components/TagList";

import { Container, NoCards } from "./styles";
import done from "../../assets/images/done.svg";

const Cardless = (): ReactElement => (
  <NoCards>
    <img src={done} alt="empty deck" />
    <div>
      <h2>All Done :)</h2>
      <h2> No Cards Due For Review In This Deck </h2>
    </div>
  </NoCards>
);

const StudyPage = (): ReactElement => {
  const activeDeck = useActiveDeck();
  const cardsToStudy: Card[] = useCardsDue(activeDeck?.cards ?? []);
  const [answerChecked, setAnswerChecked] = useState(false);

  return (
    <Container>
      <TagList />
      {cardsToStudy.length !== 0
        ? <CardComponent cardToStudy={cardsToStudy[0]} showNotes={setAnswerChecked} />
        : <Cardless />}
    </Container>
  );
};

export default StudyPage;
