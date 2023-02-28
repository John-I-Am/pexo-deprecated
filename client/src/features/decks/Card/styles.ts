import styled, { css } from "styled-components";
import { fonts, spacing } from "../../../sharedStyles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: ${spacing.big};
  height: 100%;
  width: 80%;
`;

export const GuessForm = styled.form<any>`
  input {
    border: none;
    border-bottom: 2px solid grey;
    text-align: center;
    font-size: 7vw;
    border-radius: ${spacing.smaller};

    ${(props: any) => props.isCorrect === "correct"
    && css`
      color: green;
      border-bottom: 2px solid green;
    `};

    ${(props: any) => props.isCorrect === "incorrect" && css`
      color: red;
      border-bottom: 2px solid red;
      `};

    ${(props: any) => props.isCorrect === "" && css`color: black;`}
  }
`;

export const CardFront = styled.div<any>`
  display: inline-block;
  word-break: break-word; 
  overflow-wrap: break-word;
  font-family: ${fonts.text};
  font-size: 3vw;
`;

export const CardBack = styled.div<any>`
  display: inline-block;
  word-break: break-word;
  overflow-wrap: break-word;
  font-family: ${fonts.text};
  font-size: 3vw;

  ${(props: any) => props.blur && css`filter: blur(7px);`}
`;
