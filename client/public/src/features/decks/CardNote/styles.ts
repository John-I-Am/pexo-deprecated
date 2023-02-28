/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import styled, { css } from "styled-components";
import {
  fonts, primaryColor, SHADOW, spacing,
} from "../../../sharedStyles";

export const Container: any = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: ${spacing.default};
  border-radius: ${spacing.small};
  box-shadow: ${SHADOW};
  background: ${primaryColor.darker}; 
  font-family: ${fonts.text};
  color: white;
  overflow: scroll;

  ${(props: any) => !props.visible
    && css`
      display: none;
    `};

`;
