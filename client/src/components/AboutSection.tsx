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
import demo from "../assets/images/demo.gif";

const useStyles = createStyles((theme) => ({
  intro: {
  },
  features: {
    flex: 1,
  },
}));

const AboutSection = (): ReactElement => {
  const { classes } = useStyles();
  return (
    <Flex id="home-what" wrap="wrap">
      <Container fluid className={classes.intro}>
        <Title variant="gradient" ta="center" order={1}> The What. </Title>
        <Text ta="center">
          {" "}
          Spaced repetition is an evidence-based learning technique that is usually
          performed with flashcards. Newly introduced and more difficult flashcards
          are shown more frequently, while older and less difficult flashcards are
          shown less frequently in order to exploit the psychological spacing effect.
          The use of spaced repetition has been proven to increase the rate of learning. Heres
          The rundonw of how it works.

        </Text>
      </Container>
      <Group>
        <Container className={classes.features}>
          <Group noWrap>
            <ThemeIcon variant="light" size="100px">
              <IconRocket size="70px" />
            </ThemeIcon>
            <Container>
              <Text fw={700}>Excel</Text>
              <p>Remember anything, and everything.</p>
            </Container>
          </Group>

          <Group noWrap>
            <ThemeIcon variant="light" size="100px">
              <IconBolt size="70px" />
            </ThemeIcon>
            <Container>
              <Text fw={700}>Learn more in less time</Text>
              <p>Algorithm designed to maximise learning.</p>
            </Container>
          </Group>

          <Group noWrap>
            <ThemeIcon variant="light" size="100px">
              <IconBulb size="70px" />
            </ThemeIcon>
            <Container>
              <Text fw={700}>Backed by science</Text>
              <p>SRS backed by decades of clinical research.</p>
            </Container>
          </Group>

        </Container>
        <img className={classes.features} src={demo} alt="demostration of spaced repetition" />
      </Group>
    </Flex>
  );
};

export default AboutSection;
