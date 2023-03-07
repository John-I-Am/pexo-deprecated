/* eslint-disable react/jsx-props-no-spreading */
import { Container, createStyles, Input } from "@mantine/core";
import { ReactElement, useState } from "react";
import { useForm } from "react-hook-form";

interface CardContentClozeProps {
  content: string;
  handleGuessed: Function;
  guessed: boolean;
}

const useStyles = createStyles(() => ({
  default: {
    input: {
      color: "black",
      border: "none",
      borderBottom: "1px solid grey",
      fontSize: "2rem",
    },
  },

  incorrect: {
    input: {
      color: "red",
    },
  },

  correct: {
    input: {
      color: "green",
    },
  },
}));

const CardContentCloze = (
  { content, handleGuessed, guessed }: CardContentClozeProps,
): ReactElement => {
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const { register, handleSubmit, setValue } = useForm();
  const { classes, cx } = useStyles();

  const handleGuess = (data: any) => {
    if (data.cloze.toLowerCase() === content.toLowerCase()) {
      handleGuessed(true);
      setIsCorrect(true);
    } else {
      setValue("cloze", content);
      handleGuessed(false);
      setIsCorrect(false);
    }

    if (guessed) {
      setValue("cloze", "");
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(handleGuess)}>
        <Input
          readOnly={guessed}
          className={cx(classes.default, {
            [classes.correct]: guessed && isCorrect,
            [classes.incorrect]: guessed && !isCorrect,
          })}
          {...register("cloze")}
        />
      </form>

    </Container>
  );
};

export default CardContentCloze;
