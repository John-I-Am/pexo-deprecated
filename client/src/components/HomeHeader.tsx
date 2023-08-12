import {
  createStyles,
  Header,
  Group,
  Button,
  Divider,
  Box,
  Burger,
  Drawer,
  ScrollArea,
  rem,
  ThemeIcon,
} from "@mantine/core";
import { IconPhoto } from "@tabler/icons-react";

import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    }),
  },

  dropdownFooter: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

const HomeHeader = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const { classes, theme } = useStyles();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        zIndex: 2,
        position: "sticky",
        top: 0,
      }}
    >
      <Header height={60} px="md">
        <Group position="apart" sx={{ height: "100%" }}>
          <ThemeIcon radius="md" size="xl">
            <IconPhoto />
          </ThemeIcon>

          <Group sx={{ height: "100%" }} spacing={0} className={classes.hiddenMobile}>
            <a key="Home" href="#home-home" className={classes.link} onClick={(event) => event.preventDefault()}>
              Home
            </a>
            <a key="learn" href="#home-learn" className={classes.link} onClick={(event) => event.preventDefault()}>
              Learn
            </a>
            <a key="Feature" href="#home-features" className={classes.link} onClick={(event) => event.preventDefault()}>
              Features
            </a>
          </Group>

          <Group className={classes.hiddenMobile}>
            <ThemeToggle />
            <Button variant="default" onClick={() => navigate("/login")}>Log in</Button>
            <Button onClick={() => navigate("/signup")}>Sign up</Button>
          </Group>
          <Burger opened={drawerOpened} onClick={toggleDrawer} className={classes.hiddenDesktop} />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="md"
        padding="md"
        title="Navigation"
        className={classes.hiddenDesktop}
        zIndex={3}
      >
        <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
          <Divider my="sm" color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"} />

          <a key="Home" href="#home-home" className={classes.link} onClick={(event) => event.preventDefault()}>
            Home
          </a>
          <a key="learn" href="#home-learn" className={classes.link} onClick={(event) => event.preventDefault()}>
            Learn
          </a>
          <a key="Feature" href="#home-features" className={classes.link} onClick={(event) => event.preventDefault()}>
            Features
          </a>

          <Divider my="sm" color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"} />

          <Group position="center" grow pb="xl" px="md">
            <ThemeToggle />
            <Button variant="default" onClick={() => navigate("/login")}>Log in</Button>
            <Button onClick={() => navigate("/signup")}>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
};

export default HomeHeader;
