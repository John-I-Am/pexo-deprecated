/* eslint-disable import/no-extraneous-dependencies */
import {
  createStyles,
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import Hero from "../assets/images/hero.svg";

const useStyles = createStyles((theme) => ({
  content: {
    maxWidth: rem(480),

    [theme.fn.smallerThan("md")]: {
      maxWidth: "100%",
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontSize: rem(44),
    lineHeight: 1.2,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(28),
    },
  },
}));

const HeroBanner = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Container>
      <div className={classes.content}>
        <Title className={classes.title}>
          Pexo - A modern spaced repetition system
        </Title>
        <Text color="dimmed" mt="md">
          An Advanced learning system
        </Text>

        <List
          mt={30}
          spacing="sm"
          size="sm"
          icon={(
            <ThemeIcon size={20} radius="xl">
              <IconCheck size={rem(12)} stroke={1.5} />
            </ThemeIcon>
              )}
        >
          <List.Item>
            <b>Backed by science </b>
            – Proven techique
          </List.Item>
          <List.Item>
            <b>Free and open source </b>
            – Open-sourced learning
          </List.Item>
          <List.Item>
            <b>Paperless </b>
            – Go digital!, no annoying papers
          </List.Item>
          <h2>In active development - come and see the progress!</h2>
        </List>

        <Group mt={30}>
          <Button radius="xl" size="md" onClick={() => navigate("/signup")}>
            Get started
          </Button>
        </Group>
      </div>
      <Image src={Hero} />
    </Container>
  );
};

export default HeroBanner;
