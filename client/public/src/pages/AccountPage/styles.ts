/* eslint-disable import/prefer-default-export */
import styled from "styled-components";
import { spacing } from "../../sharedStyles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: ${spacing.smaller};
  overflow: hidden;
  margin-top: ${spacing.default};

  hr {
    border-top: 0.5px solid grey;    
    width: 80%;
  }

  h1 {
    font-size: 16px;
  }

  input {
    height: 40px;
    width: 100%;
    border-radius: 10px;
    border: none;
    background: white;
    box-sizing: border-box;
    padding-left: 20px;
    margin-bottom: 20px;
  }

  input::placeholder {
    font-style: italic;
    font-size: 12px;
  }

  label {
    font-size: 12px;
    padding-left: 20px;
  }

  section {
    display: flex;
    justify-content: space-evenly;
    padding: ${spacing.small};

    form {
      display: flex;
      flex-direction: column;
    }

    span {
      align-self: end;
    }

    button {
      width: 50%;
      align-self: end;
    }

    p {
      font-size: ${spacing.small}
    }
  }
`;
