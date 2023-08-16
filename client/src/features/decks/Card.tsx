import { ReactElement, useState } from "react";
import { Stack } from "@mantine/core";
import { useUpdateCardMutation } from "../api/apiSlice";
import CardToolbar from "../../components/CardToolbar";
import CardContentClassic from "../../components/CardContentClassic";
import CardContentCloze from "../../components/CardContentCloze";

const Card = ({ cardToStudy }: any): ReactElement => {
  const [guessed, setGuessed] = useState(false);
  const [updateCard] = useUpdateCardMutation();

  const handleIncorrect = async () => {
    await updateCard({
      ...cardToStudy,
      level: cardToStudy.level === 0
        ? 0
        : cardToStudy.level - 1,
    });
  };

  const handleCorrect = async () => {
    await updateCard({
      ...cardToStudy,
      level: cardToStudy.level === 5
        ? 5
        : cardToStudy.level + 1,
    });
  };

  const handleGuessed = (isCorrect: boolean) => {
    if (!guessed) {
      setGuessed(true);
    } else if (isCorrect) {
      handleCorrect();
      setGuessed(false);
    } else if (!isCorrect) {
      handleIncorrect();
      setGuessed(false);
    }
  };

  const renderContent = (): ReactElement => {
    if (cardToStudy.type === "cloze") {
      return (
        <CardContentCloze
          content={cardToStudy.front}
          handleGuessed={handleGuessed}
          guessed={guessed}
        />
      );
    }
    return <CardContentClassic front={cardToStudy.front} back={cardToStudy.back} />;
  };

  return (
    <Stack justify="space-between" ml="-2rem" sx={{ height: "100%" }}>
      {renderContent()}

      <CardToolbar
        card={cardToStudy}
        handleGuessed={handleGuessed}
        checked={guessed}
      />
    </Stack>
  );
};

export default Card;
