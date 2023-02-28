/* eslint-disable arrow-body-style */
import { ReactElement } from "react";
import { Container } from "./styles";

const CardNote = ({ notes, visible }: any): ReactElement => {
  return (
    <Container visible={visible}>
      <h1>Examples</h1>
      {notes?.map((examples?: any) => (
        <p key={Date.now() * Math.random()}>{examples}</p>
      ))}
    </Container>
  );
};

export default CardNote;
