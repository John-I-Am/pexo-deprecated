/* eslint-disable no-nested-ternary */
import { ActionIcon, Button } from "@mantine/core";
import { ReactElement } from "react";
import speaker from "../../../assets/audio.svg";
import { Container } from "./styles";

const CardToolbar = ({
  card, handleIncorrect, handleCorrect, checked,
}: any): ReactElement => {
  const renderAudio = (): any => {
    if (card.audio) {
      const audio = new Audio(card.audio);
      return (
        <ActionIcon variant="transparent">
          <input type="image" src={speaker} onClick={() => audio.play()} alt="audio" />
        </ActionIcon>
      );
    }
    return null;
  };

  return (
    <Container>
      <p>
        Level:
        {" "}
        {card.level}
      </p>

      <p>
        {card.type}
      </p>

      {card.type === "classic"
        ? checked === false ? (
          <div>
            <Button compact onClick={() => handleCorrect(true)}>correct</Button>
            <Button compact onClick={() => handleIncorrect(false)}>incorrect</Button>
          </div>
        ) : <Button compact onClick={() => handleCorrect(true)}>Next</Button>
        : null}

      {renderAudio()}
    </Container>
  );
};

export default CardToolbar;
