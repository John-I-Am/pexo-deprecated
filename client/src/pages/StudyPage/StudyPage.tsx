import { ReactElement, useState } from "react";
import { Card } from "types";
import { useActiveDeck, useCardsDue } from "../../hooks/hooks";
import CardComponent from "../../features/decks/Card/Card";

import { Container, NoCards } from "./styles";
import done from "../../assets/done.svg";
import CardNote from "../../features/decks/CardNote/CardNote";

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
      {cardsToStudy.length !== 0
        ? (
          <>
            <CardComponent cardToStudy={cardsToStudy[0]} showNotes={setAnswerChecked} />
            <CardNote notes={cardsToStudy[0]?.examples} visible={answerChecked} />
          </>
        )
        : (
          <Cardless />
        )}
    </Container>
  );
};

export default StudyPage;
