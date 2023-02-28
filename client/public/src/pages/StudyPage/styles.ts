import styled from "styled-components";
import { primaryColor, device, spacing } from "../../sharedStyles";

export const Container = styled.div`
  padding: ${spacing.smaller};
  display: flex;
  gap: ${spacing.smaller};
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow: hidden;
`;

export const NoCards = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  img {
    width: 80%;
  }

  h2 {
    color: ${primaryColor.default};
    text-align: center;

    @media ${device.mobileL} {
      font-size: ${spacing.small};
    }
  }
`;
