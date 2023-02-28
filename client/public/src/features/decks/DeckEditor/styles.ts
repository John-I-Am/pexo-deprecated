import styled from "styled-components";
import { secondaryColor, spacing } from "../../../sharedStyles";

export const Container = styled.div`  
  display: flex;
  background: white;
  padding-top: 20px;
  box-shadow: 0px 2px 4px rgba(0,0,0,0.2);
  border-radius: 10px 10px 0px 0px;
  border-bottom: 1px ghostwhite solid;
  font-size: ${spacing.small};
`;

export const TitleInput = styled.input`
    display: flex;
    align-items: center;
    text-align: center;
    height: 40px;
    border-radius: 10px;
    border: none;
    background: whitesmoke;
`;

export const EditorTools = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const TableFront = styled.td`
  color: ${secondaryColor.default};
  background: #303030;
`;
