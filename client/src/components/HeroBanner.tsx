import {
  createStyles,
  Title,
  Text,
  List,
  ThemeIcon,
  rem,
  Box,
  Group,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import hero from "../assets/images/hero.mp4";

const useStyles = createStyles((theme) => ({
  content: {
    maxWidth: rem(480),
    paddingLeft: rem(40),
    paddingRight: rem(40),

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

  return (
    <Group position="center">
      <div className={classes.content}>
        <Title className={classes.title}>
          Pexo - A modern spaced repetition system
        </Title>
        <Text color="dimmed" mt="md">
          Uncover the magic of spaced repetition flashcards,
          enhancing your memory and knowledge retention. Embrace
          a tailored learning journey that adapts to your pace,
          ensuring mastery at every step. Say hello to smarter studying.
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
          </List.Item>
          <List.Item>
            <b>Free and open source </b>
          </List.Item>
          <List.Item>
            <b>Paperless </b>
          </List.Item>
        </List>
      </div>

      <Box
        sx={(theme) => ({
          borderRadius: theme.radius.lg,
          width: "100%",
          height: "100%",
          maxWidth: "400px",
        })}
      >
        <video width="100%" height="100%" autoPlay muted loop>
          <source src={hero} type="video/mp4" />
        </video>
      </Box>
    </Group>
  );
};

export default HeroBanner;
