import styled from "styled-components";
import {
  // eslint-disable-next-line no-unused-vars
  spacing, SHADOW, fonts, greyColor, fontWeights,
} from "../../../sharedStyles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 500px;
  width: 450px;
  padding: ${spacing.bigger};
  border-radius: ${spacing.big};
  background: white;
  box-shadow: ${SHADOW};
`;

export const Header = styled.div`
  font-family: ${fonts.default};
  text-align: center;

  p {
    color: ${greyColor.dark};
    font-size: ${spacing.small};
    line-height: ${spacing.smaller};
  }
`;

export const Form = styled.form`
  display: flex;
  height: 100%;
  width: 100%;
  gap: ${spacing.default};
  flex-direction: column;
  justify-content: center;

  Label {
    color: black;
  }
`;
