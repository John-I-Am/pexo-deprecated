import styled, { css } from "styled-components";
import { device, spacing } from "../../../sharedStyles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.smaller};
  width: 100%;
`;

export const Tags = styled.div`
  height: 24px ;
  overflow: auto;
`;

export const DeckSelector = styled.div<any>`  
  display: flex;
  gap: ${spacing.smallest};

  > div:last-child > button {
    :active {
      color: green;
    }
    }

  ${(props: any) => props.noCreate
    && css`

    > button:nth-of-type(2) {
      display: none;
    }
  `};

  @media ${device.mobileL} {
    padding-left: ${spacing.bigger};
  }

  div {
    display: flex;
    overflow: scroll;

    ::-webkit-scrollbar {
      display: none;
    }
  }
`;
