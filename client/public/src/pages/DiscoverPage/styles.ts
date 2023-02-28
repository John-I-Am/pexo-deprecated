/* eslint-disable import/prefer-default-export */
import styled from "styled-components";
import { device, spacing } from "../../sharedStyles";

export const Container = styled.div`
  display: flex ;
  flex-direction: column;
  gap: ${spacing.default};
  width: 100%;
  overflow: hidden;
  padding: ${spacing.smaller};

  form {
    height: 40px;
    
    @media ${device.mobileL} {
    padding-left: ${spacing.bigger};
  }
  }
`;

export const DeckList = styled.div`
    display: flex;
    gap: ${spacing.default};
    flex-wrap: wrap;
`;
