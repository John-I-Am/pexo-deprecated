/* eslint-disable import/prefer-default-export */
import styled, { css } from "styled-components";
import { SHADOW, spacing, fontWeights } from "../../sharedStyles";

export const Container = styled.div<any>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 70px;
  transition: width .2s;
  box-shadow: ${SHADOW};
  background: white;
  overflow: hidden ;
  z-index: 2;
  gap: ${spacing.big};

  img {
    width: 100%;
  }

  .nav-link {
    height: 40px;
    width: 70px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: ${spacing.big};
    padding: ${spacing.smaller} 0px ${spacing.smaller} 0px;
    text-decoration: none;
    color: black;

    :hover {
      background: whitesmoke;
    }

    svg {
      color: inherit;
      width: 24px;
    }

    p {
      color: inherit;
      font-weight: ${fontWeights.bolder};
      font-size: ${spacing.small};
    }
  }

  @keyframes fadeIn {
    0% { 
      opacity: 0; 
    }

    100% { 
      opacity: 1; 
    }
  }

  @keyframes fadeOut {
    0% { 
      opacity: 1; 
    }
    100% { 
      opacity: 0; 
    }
  }

  ${({ expanded }) => expanded && css`
      width : 250px !important;
      display: flex !important;

      p {
        animation: fadeIn 1s;
      }

      .nav-link {
        padding-left: 70px;
        justify-content: flex-start;
        width: 200px;
      }

  `};

  ${({ expanded }) => expanded === false && css`
      p {
        display: none;
        animation: fadeOut 1s;
      }
  `};
`;
