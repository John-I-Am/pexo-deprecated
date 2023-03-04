import styled from "styled-components";

export const themeDefault = {
  headings: {
    fontFamily: "Varela Round",
  },
};

export const device = {
  mobileS: "(max-width: 320px)",
  mobileM: "(max-width: 375px)",
  mobileL: "(max-width: 425px)",
  tablet: "(max-width: 768px)",
  laptop: "(max-width: 1024px)",
  laptopL: "(max-width: 1440px)",
  desktop: "(max-width: 2560px)",
};

export const fontWeights = {
  default: "400",
  bolder: "700",
};

// multiples of 16
export const spacing = {
  smallest: "4px",
  smaller: "8px",
  small: "12px",
  default: "16px",
  medium: "24px",
  big: "32px",
  bigger: "48px",
  biggest: "64px",
};

// blue
export const primaryColor = {
  lighter: "#26A3F6",
  light: "#0A8DE5",
  default: "#0873b8",
  dark: "#07629F",
  darker: "#065285",
};

// orange
export const secondaryColor = {
  darker: "#B65B00",
  dark: "#DB6D00",
  default: "#FF7F00",
  light: "#FF9224",
  lighter: "#FFA449",
};

// purple
export const tertiaryColor = {
  lighter: "#D8A0FF",
  light: "#D08DFF",
  default: "#c87aff",
  dark: "#B144FF",
  darker: "#9B0FFF",
};

// grey
export const greyColor = {
  lighter: "#f5f7fa",
  light: "#edf1f5",
  default: "#d4dde9",
  dark: "#617691",
  darker: "#122740",
};

export const fonts = {
  default: "Varela Round",
  title: "Crete Round",
  text: "Roboto",
};

export const SHADOW = "0px 0px 5px rgba(0,0,0,0.2)";

export const Input = styled.input`
  height: 40px;
  width: 100%;
  border-radius: ${spacing.small};
  border: none;
  background: ${greyColor.lighter};
  box-sizing: border-box;
  padding-left: ${spacing.default};

  ::placeholder {
  font-style: italic;
  font-size: ${spacing.small};
}
`;

export const SearchBar = styled.input`
  height: 100%;
  border-radius: ${spacing.smallest};
  border: none;
  background: white;
  box-sizing: border-box;
  padding-left: ${spacing.default};
  width: 100px;
`;

export const Label = styled.label`
  font-size: ${spacing.small};
  padding-left: ${spacing.default};
`;

export const Error = styled.p`
  display: inline;
  color: red;
  font-size: ${spacing.small};
`;
