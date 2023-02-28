import styled, { css } from "styled-components";
import { primaryColor, secondaryColor, spacing } from "../../../sharedStyles";

export const Table = styled.table<any>`  
  display: block;
  overflow: auto;
  height: 70vh;
  background: white;
  box-shadow: 0px 2px 4px rgba(0,0,0,0.2);
  border-radius: 0px 0px 10px 10px;
  border-collapse: collapse;
  text-align: center;
  font-size: 12px;

  th {
    overflow: auto;
    background: white;
    width: 25vw;
    color: ${primaryColor.darker};
    font-size: 16px;
    position: sticky; 
    top: 0;
    z-index: 1;
  }

  td {
    padding: ${spacing.big} ${spacing.small} ${spacing.big} ${spacing.small};
    overflow-wrap: break-word;
    max-width: 25vw;
  }

  ${(props: any) => props.viewOnly
    && css`
      td:nth-of-type(1) {
        p:nth-of-type(1) {
          display: none;
        }
      }

      th:nth-of-type(4) {
        display: none;
      }

      td:nth-of-type(4) {
        display: none;
      }
    `};
`;

export const ToolBar = styled.div<any>`
  display: flex;
  justify-content: center;
  gap: ${spacing.small};

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  ${(props: any) => props.viewOnly && css`
    display: none;
  `}


`;

export const TableFront = styled.td`
  color: ${secondaryColor.default};
  background: #303030;
`;
