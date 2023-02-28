/* eslint-disable import/prefer-default-export */
import styled from "styled-components";
import { device, spacing } from "../../sharedStyles";

export const Container = styled.div`
  display: flex;
  height: 100vh;
  background: whitesmoke;

  .expand-drawer {
    display: none;
  }

  @media ${device.mobileL} {
    gap: 0px;

    .nav {
      display: none;
      min-width: 250px;
    }

    .expand-drawer {
      display: inline-block;
      position: absolute;
      left: ${spacing.default};
      top: ${spacing.smaller};
    }
  }
`;
