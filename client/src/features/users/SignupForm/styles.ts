import styled from "styled-components";
import {
  spacing, SHADOW, fonts, greyColor,
} from "../../../sharedStyles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${spacing.bigger};
  background: white;
  border-radius: ${spacing.big};
  box-shadow: ${SHADOW};
`;

export const Header = styled.div`
  font-family: ${fonts.default};
  text-align: center;

  p {
    color: ${greyColor.dark};
    font-size: ${spacing.small};
  }
`;

export const Form = styled.form`
  display: flex;
  height: 100%;
  gap: ${spacing.default};
  flex-direction: column;
  justify-content: center;

  span {
    display: flex;
    flex-direction: row;
    gap: ${spacing.default};
  }
`;
