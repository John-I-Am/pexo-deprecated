/* eslint-disable import/no-extraneous-dependencies */
import {
  Container, createStyles, Stack, Text,
} from "@mantine/core";
import parser from "html-react-parser";
import { ReactElement, useState } from "react";

const useStyles = createStyles((theme) => ({
  textContent: {
    display: "inline-block",
    wordBreak: "break-word",
    overflowWrap: "break-word",
    fontSize: "1rem",
    fontWeight: 500,
  },

  card: {
    width: "100%",
    height: "100%",
    transformStyle: "preserve-3d",
    transition: "transform 0.5s",
    borderRadius: theme.radius.lg,
    boxShadow: theme.shadows.lg,
    padding: 0,
  },

  flip: {
    transform: "rotateY(180deg)",
  },

  cardContent: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backfaceVisibility: "hidden",
    padding: "5rem",
  },
}));

interface CardContentClassicProps {
  front: string;
  back: string;
}

const CardContentClassic = ({ front, back }: CardContentClassicProps): ReactElement => {
  const { classes, cx } = useStyles();
  const [flipped, setFlipped] = useState<Boolean>(false);

  return (
    <Container
      className={cx(
        classes.card,
        { [classes.flip]: flipped === true },
      )}
      onClick={() => setFlipped(!flipped)}
    >
      <Stack justify="center" align="center" className={classes.cardContent}>
        <Text className={classes.textContent}>{parser(front)}</Text>
      </Stack>
      <Stack justify="center" align="center" className={classes.cardContent} sx={{ transform: "rotateY(180deg)" }}>
        <Text className={classes.textContent}>{parser(back)}</Text>
      </Stack>
    </Container>
  );
};

export default CardContentClassic;
