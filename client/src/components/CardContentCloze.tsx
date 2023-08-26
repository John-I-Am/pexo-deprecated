/* eslint-disable react/jsx-props-no-spreading */
import {
  createStyles, Input, Stack, Text,
} from "@mantine/core";
import { ReactElement, useState } from "react";
import { useForm } from "react-hook-form";

interface CardContentClozeProps {
  content: any;
  handleGuessed: Function;
  guessed: boolean;
}

const useStyles = createStyles((theme) => ({
  default: {
    input: {
      color: theme.colorScheme === "dark" ? "white" : "black",
      border: "none",
      borderBottom: "1px solid grey",
      fontSize: "2rem",
      textAlign: "center",
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

  const handleGuess = (data: any, index: any) => {
    if (data[`cloze${index}`].toLowerCase() === content.text[index][0].toLowerCase()) {
      handleGuessed(true);
      setIsCorrect(true);
    } else {
      setValue(`cloze${index}`, content.text[index][0]);
      handleGuessed(false);
      setIsCorrect(false);
    }

    if (guessed) {
      setValue("cloze", "");
    }
  };

  return (
    <Stack justify="center" h="100%" spacing="lg" align="center">
      <Text>{content?.hint}</Text>
      {content.text.map((element: any, index: any) => {
        if (element[1] === true) {
          return (
            <form onSubmit={handleSubmit((data) => handleGuess(data, index))}>
              <Input
                readOnly={guessed}
                className={cx(classes.default, {
                  [classes.correct]: guessed && isCorrect,
                  [classes.incorrect]: guessed && !isCorrect,
                })}
                {...register(`cloze${index}`)}
              />
            </form>
          );
        }
        return <Text>{element[0]}</Text>;
      })}
    </Stack>
  );
};

export default CardContentCloze;
