/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import styled, { css } from "styled-components";
import { primaryColor, secondaryColor, spacing } from "../../../sharedStyles";

export const Container: any = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  overflow: scroll;
  border-radius: ${spacing.small};
  font-size: ${spacing.default};
  font-weight: 900;
  color: ${secondaryColor.lighter};
  background: ${primaryColor.default};
`;
