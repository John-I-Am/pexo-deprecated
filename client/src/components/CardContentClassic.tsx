import { Container, createStyles, Text } from "@mantine/core";
import { ReactElement, useState } from "react";

const useStyles = createStyles(() => ({
  textContent: {
    display: "inline-block",
    wordBreak: "break-word",
    overflowWrap: "break-word",
    fontSize: "1rem",
  },
}));

interface CardContentClassicProps {
  content: string;
  guessed: boolean;
}

const CardContentClassic = ({ content, guessed }: CardContentClassicProps): ReactElement => {
  const [blurred, setBlurred] = useState<boolean>(!guessed);
  const { classes } = useStyles();
  return (
    <Container onClick={() => setBlurred(!blurred)}>
      <Text className={classes.textContent} sx={{ filter: blurred ? "blur(6px)" : "" }}>{content}</Text>
    </Container>
  );
};

export default CardContentClassic;
