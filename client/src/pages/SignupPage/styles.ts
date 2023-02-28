/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import styled, { css } from "styled-components";
import { device, primaryColor, tertiaryColor } from "../../sharedStyles";

export const Container = styled.div<any>`
  display: flex;
  background: linear-gradient(45deg, ${tertiaryColor.default} 0%,  ${primaryColor.default} 100%);
  height: 100vh;
  justify-content: center;
  align-items: center;
`;
