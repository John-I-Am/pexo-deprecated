/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import { ReactElement } from "react";
import {
  Container,
  createStyles,
  Group,
  Title,
  rem,
  Text,
  Flex,
  ThemeIcon,
  Center,
} from "@mantine/core";
import { IconBolt, IconRocket, IconBulb } from "@tabler/icons-react";
import { useWindowScroll } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  container: {
    height: "200vh",
    border: "1px solid red",
  },
  features: {
    position: "sticky",
    top: "40%",
    border: "1px solid green",
  },
}));

const FeatureSection = (): ReactElement => {
  const { classes } = useStyles();
  const [scroll, scrollTo] = useWindowScroll();
  const height: any = document?.getElementById("foo")?.getBoundingClientRect()?.height;
  const heightHero: any = document?.getElementById("home-hero")?.getBoundingClientRect()?.height;
  const heightWhat: any = document?.getElementById("home-hero")?.getBoundingClientRect()?.height;
  const offsetY: any = document?.getElementById("foo")?.getBoundingClientRect()?.y;
  const title = scroll.y > (heightHero + heightWhat + (height / 5)) ? "Language" : "Math";
  return (
    <Container id="foo" className={classes.container}>
      <Group className={classes.features}>
        <h1>{title}</h1>
        <p>test</p>
        <Text>
          Scroll position x
          {heightHero}
          , y:
          {" "}
          {scroll.y}
          {height}
        </Text>
      </Group>
    </Container>
  );
};

export default FeatureSection;
