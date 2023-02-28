import styled from "styled-components";
import {
  device, fonts, greyColor, primaryColor, secondaryColor, spacing,
} from "../../sharedStyles";

export const Container = styled.div`
  width: 100%;
`;

export const Header = styled.div<any>`
  position: sticky;
  display: flex;
  justify-content: space-around;
  align-items: center;
  top: 0;
  height: 60px;
  box-shadow: 0 2px 2px -2px rgba(0,0,0,.2);
  background: white;
  z-index: 1;
  padding: 0 ${spacing.default} 0 0;

  a {
    color: ${primaryColor.default};
    font-weight: 700;
    font-size : clamp(16px, 1.5vw, 2vw);
    text-decoration: none;
  }

  img {
    width: 80px;
    height: 80px;
  }

  #home-link {
    padding: 0 10px 0 10px;
    display: flex;
    justify-content: center;
    gap: ${spacing.big};
    width: 100%;
  }

  #home-nav {
    display: flex;
    justify-content: flex-end;
    gap: ${spacing.default};
  }
  
`;

export const SectionOne = styled.div<any>`
  display: flex;
  padding: 5%;
  background: whitesmoke;

  h1 {
    font-family: ${fonts.default};
    font-size : clamp(5vw, 5vw, 5vw);
  }

  @media ${device.mobileL} {
    align-items: center;
    text-align: center;
    flex-direction: column;
  }


  div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  img {
    max-width: 60%;
    height: auto;
  }

  h2 {
    font-size : 3vw;
  }

  h2 span:nth-child(1) {
    display: inline;
    animation: slidein 1s;
    color: ${primaryColor.default};
  }

  h2 span:nth-child(2){
    display: inline;
    animation: slidein 2s;
    color: ${secondaryColor.default};
  }

  h2 span:nth-child(3) {
    display: inline;
    animation: slidein 3s;
    color: ${primaryColor.default};
  }

  @keyframes slidein {
    0% { margin-left:-100px; }
    100% { margin-left:0px; }
  } 
`;

export const ScrollContainer = styled.div`
  height: 200vh;
  position: relative;
`;

export const SectionTwo = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: ${spacing.big};
  padding: 5%;
  background: whitesmoke;
  height: fit-content;
  position: sticky;
  top: 20%;

  @media ${device.tablet} {
    flex-direction: column;
  }

  p {
    color: ${greyColor.dark};
    font-weight: 500;
  }

  > div:nth-of-type(1) {
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    width: 50%;
    gap: ${spacing.default};

    svg {
      width: 100%;
      height: auto;
    }
  }

  > div:nth-of-type(2) {
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    flex-wrap: wrap;
  }

  > div:nth-of-type(3) {
    display: flex;
    justify-content: center;
    width: 100%;
    flex-wrap: wrap;
    gap: ${spacing.default};

    div {
      display: flex;
      flex-grow: 1;
      align-items: center;
      gap: ${spacing.default};
      width: 20%;
      min-width: 200px;
    
      svg {
          border-radius: ${spacing.default};
          background: #bbd0ff;
          max-width: 50px;
          min-width: 50px;
          width: 100%;
          height: auto;
        }
    }
  }
`;

export const SectionThree = styled.div`
  display: flex;
  padding: 5%;
  gap: ${spacing.big};
  flex-wrap: wrap;

  p {
    color: ${greyColor.dark};
    font-family: ${fonts.text};
    font-size: ${spacing.default};
  }

  > div:first-child {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 60%;
    flex-grow: 1;

    div > div {
      display: flex;
      gap: 20px;
      font-size: 16px;
      padding-bottom: 20px;

      svg {
        border-radius: ${spacing.default};
        background: #bbd0ff;
        max-width: 100px;
        width: 100%;
        height: auto;
      }
    }   
  }

  > div:nth-of-type(2) {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
      width: 30%;
      min-width:  250px;

      img {
        width: 100%;
        height: auto;
    }
  }
`;

export const SectionFour = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${spacing.biggest};
`;

export const Footer = styled.div`
  background: whitesmoke;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${spacing.biggest};

  > div:first-of-type {
    display: flex;
    width: 100%;
    justify-content: space-evenly;

    img {
      max-width: 150px;
      width: 100%;
      height: auto;
    }
  }

  > div:nth-of-type(2) {
    display: flex;
    justify-content: center;
    gap: ${spacing.biggest};
  }
`;
