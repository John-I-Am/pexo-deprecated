/* eslint-disable import/no-extraneous-dependencies */
import { Container, Text } from "@mantine/core";
import { ReactElement } from "react";
import parser from "html-react-parser";

const CardNote = ({ notes = "" }: {notes: string | undefined}): ReactElement => {
  console.log("");
  return (
    <Container>
      <Text>{parser(notes)}</Text>
    </Container>
  );
};

export default CardNote;
