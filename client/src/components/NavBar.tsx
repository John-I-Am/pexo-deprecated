import { ReactElement, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  Navbar,
  createStyles,
  getStylesRef,
  rem,
  Tooltip,
  Button,
  Stack,
  Group,
  Container,
  Title,
  ActionIcon,
} from "@mantine/core";

import {
  IconPlus,
  IconBellRinging,
  IconUsers,
  IconLogout,
  IconSwitchHorizontal,
  IconSearch,
  IconCursorText,
  IconChecks,
} from "@tabler/icons-react";

import { Deck } from "types";
import DeckInfo from "../features/decks/Deck";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

import {
  apiSlice, useAddNewDeckMutation, useGetDecksQuery,
} from "../features/api/apiSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setActive } from "../features/decks/decksSlice";
import { clearUser } from "../features/users/usersSlice";

const useStyles = createStyles((theme) => ({
  section: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: "1rem",
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.xs,
    color: theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    width: "100%",

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  linkCompact: {
    span: {
      display: "none",
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color: theme.colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({ variant: "light", color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
      },
    },
  },
}));

const navs = [
  { link: "/main/learn", label: "Study", icon: IconBellRinging },
  { link: "/main/discover", label: "Discover", icon: IconSearch },
  // { link: "/main/dashboard", label: "Dashboard", icon: IconKey },
  { link: "/main/account", label: "Account", icon: IconUsers },
];

interface NavBarProps {
  opened: boolean;
  handleOpen: Function;
}

const NavBar = ({ opened, handleOpen }: NavBarProps): ReactElement => {
  const { classes, cx } = useStyles();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [addNewDeck] = useAddNewDeckMutation();
  const activeDeckId = useAppSelector((state) => state.decks.activeDeckId);
  const { data: decks = [] } = useGetDecksQuery();

  const handleLogout = (): void => {
    dispatch(clearUser());
    dispatch(apiSlice.util.resetApiState());
  };

  const [filter, setFilter] = useState<string>("");
  const decksToShow: Deck[] = filter === ""
    ? decks
    : decks.filter((deck: Deck) => (deck.title).toLowerCase().includes(filter.toLowerCase()));

  const deckList = decksToShow.map((deck: Deck) => (
    <Tooltip
      key={deck.id}
      label={<DeckInfo deck={deck} readOnly />}
      position="right"
      p="0px"
      radius="xl"
      sx={(theme) => ({
        color: theme.colorScheme === "light" ? theme.colors.dark[7] : theme.white,
      })}
    >
      <Button
        className={cx({ [classes.linkActive]: deck.id === activeDeckId || activeDeckId === null })}
        compact
        radius="md"
        variant="subtle"
        key={deck.id}
        onClick={() => dispatch(setActive(deck.id as any) as any)}
      >
        <p>{deck.title}</p>
      </Button>
    </Tooltip>
  ));

  const links = navs.map((item) => (
    <NavLink
      id={`nav_${item.label}`}
      className={({ isActive }) => (isActive
        ? cx(classes.link, classes.linkActive, { [classes.linkCompact]: !opened })
        : cx(classes.link, { [classes.linkCompact]: !opened }))}
      to={item.link}
      key={item.label}
    >
      <Tooltip disabled={opened} label={item.label} position="right" withArrow offset={20}>
        <item.icon className={classes.linkIcon} stroke={1.5} size="1.2rem" />
      </Tooltip>
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <Navbar
      id="nav_bar"
      mr="lg"
      sx={(theme) => ({
        width: opened ? 300 : 100,
        transition: "width .2s",

        [`@media (max-width: ${theme.breakpoints.sm})`]: {
          display: opened ? "flex" : "none",
        },
      })}
      p="sm"
    >

      <Navbar.Section className={classes.section}>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.section} h="1%" grow>
        <Group py="1rem" position="apart">
          <Title order={6}> Decks</Title>
          <Group position="left">
            <Tooltip label="Create deck" withArrow position="right">
              <ActionIcon id="creator" variant="default" size={18} onClick={() => addNewDeck()}>
                <IconPlus size="0.8rem" stroke={1.5} />
              </ActionIcon>
            </Tooltip>

            <Tooltip label="Select all" withArrow position="right">
              <ActionIcon id="select_all" variant="default" size={18} onClick={() => dispatch(setActive(null))}>
                <IconChecks size="0.8rem" stroke={1.5} />
              </ActionIcon>
            </Tooltip>

            <Tooltip label="Editor" withArrow position="right">
              <ActionIcon id="editor" variant="default" size={18} onClick={() => navigate("/main/editor")}>
                <IconCursorText size="0.8rem" stroke={1.5} />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>

        <SearchBar display={opened ? "" : "none"} callback={setFilter} />

        <Stack sx={{ overflow: "scroll" }} pt="1rem">
          {deckList}
        </Stack>
      </Navbar.Section>

      <Navbar.Section className={classes.section} py="1rem" sx={{ border: "none" }}>
        <ThemeToggle />

        <Container
          id="nav_expand"
          className={cx(classes.link, {
            [classes.linkCompact]: !opened,
          })}
          onClick={() => handleOpen(!opened)}
        >
          <Tooltip disabled={opened} label="Expand" position="right" withArrow offset={20}>
            <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          </Tooltip>
          <span>Hide</span>
        </Container>

        <NavLink
          className={cx(classes.link, {
            [classes.linkCompact]: !opened,
          })}
          to="/"
          onClick={handleLogout}
        >
          <Tooltip disabled={opened} label="Logout" position="right" withArrow offset={20}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
          </Tooltip>
          <span>Logout</span>
        </NavLink>
      </Navbar.Section>
    </Navbar>
  );
};

export default NavBar;
