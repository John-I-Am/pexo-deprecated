import {
  createStyles,
  Title,
  Text,
  List,
  ThemeIcon,
  rem,
  Group,
  Stack,
  keyframes,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

const typing = keyframes(
  `from { width: 0 }
  to { width: 100% }`,
);

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

  stats: {
    overflow: "hidden",
    whiteSpace: "nowrap",
    animation: `${typing} 2s steps(20, end)`,
    fontWeight: 700,

    span: {
      color: "#734F96",
    },
  },
}));

const HeroBanner = () => {
  const { classes } = useStyles();

  return (
    <Group position="center" spacing={rem(160)}>
      <div className={classes.content}>
        <Title fz={rem(44)} variant="gradient" c="blue">
          Pexo - A modern spaced repetition system
        </Title>
        <Text mt="md">
          Uncover the magic of spaced repetition flashcards,
          enhancing your memory and knowledge retention. Embrace
          a tailored learning journey that adapts to your pace,
          ensuring mastery at every step. Say hello to smarter studying.
        </Text>
      </div>

      <Stack align="center" justify="space-around" spacing="xl">
        <Title order={1}>The who</Title>

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
            <Text className={classes.stats}>
              <span>142</span>
              {" "}
              users registered
            </Text>
          </List.Item>
          <List.Item>
            <Text className={classes.stats}>
              <span>2414</span>
              {" "}
              cards created
            </Text>
          </List.Item>
          <List.Item>
            <Text className={classes.stats}>
              <span>63</span>
              {" "}
              decks built
            </Text>
          </List.Item>
        </List>
      </Stack>
    </Group>
  );
};

export default HeroBanner;
