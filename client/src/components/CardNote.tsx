import { Container, Title } from "@mantine/core";
import { ReactElement } from "react";

const CardNote = ({ notes }: {notes: string[] | undefined}): ReactElement => {
  console.log("");
  return (
    <Container>
      <Title order={2} c="blue">Examples</Title>
      {notes?.map((examples?: any) => (
        <p key={Date.now() * Math.random()}>{examples}</p>
      ))}
    </Container>
  );
};

export default CardNote;
