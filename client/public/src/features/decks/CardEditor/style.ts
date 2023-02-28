import styled from "styled-components";
import { device, fonts, spacing } from "../../../sharedStyles";

export const Container = styled.div`
  display: flex;  
  gap: ${spacing.big};

  label {
    font-family: ${fonts.default};
  }

  @media ${device.mobileL} {
    flex-direction: column;
  }
`;

export const TagList = styled.div`
  overflow: scroll;
  margin-top: ${spacing.small};
  margin-bottom: ${spacing.small};
`;

export const MainContent = styled.div`
  width: 60%;

  @media ${device.mobileL} {
    width: 100%;
  }
`;

export const SecondaryContent = styled.div`
  width: 40%;

  @media ${device.mobileL} {
    width: 100%;
  }
`;

export const InputContainer = styled.div`
  margin-top: ${spacing.small};
  margin-bottom: ${spacing.small};
`;
