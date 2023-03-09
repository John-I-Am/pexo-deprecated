/* eslint-disable import/prefer-default-export */
import styled from "styled-components";
import {
  fonts,
  greyColor,
  primaryColor, SHADOW, spacing,
} from "../../../sharedStyles";

export const Container: any = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${SHADOW};
  border-radius: ${spacing.default};
  padding: ${spacing.default};
  font-family: ${fonts.text};
  background: ${greyColor.default};

  h2 {
    color: ${primaryColor.dark};
    font-family: ${fonts.default}
  }
  
  div:last-child {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
  }
`;
