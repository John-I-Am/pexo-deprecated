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
    console.log(cardToStudy);
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
    if (cardToStudy.content.type === "cloze") {
      return (
        <CardContentCloze
          content={cardToStudy.content}
          handleGuessed={handleGuessed}
          guessed={guessed}
        />
      );
    }
    return <CardContentClassic front={cardToStudy.content.front} back={cardToStudy.content.back} />;
  };

  return (
    <Stack ml="-2rem" sx={{ height: "100%", width: "100%" }}>
      {renderContent()}

      <CardToolbar
        card={cardToStudy}
        handleGuessed={handleGuessed}
        handleCorrect={handleCorrect}
        handleIncorrect={handleIncorrect}
        checked={guessed}
      />
    </Stack>
  );
};

export default Card;
