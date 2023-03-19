import { ReactElement, useState } from "react";
import { NavLink } from "react-router-dom";

import {
  Navbar,
  SegmentedControl,
  createStyles,
  getStylesRef,
  rem,
  Tooltip,
  Button,
  Stack,
  Group,
  Container,
} from "@mantine/core";
import {
  IconLicense,
  IconPlus,
  IconBellRinging,
  IconKey,
  IconUsers,
  IconLogout,
  IconSwitchHorizontal,
  IconSearch,
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
  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
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

  footer: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing.xs,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingTop: theme.spacing.md,
  },
}));

const navs = [
  { link: "/main/learn", label: "Study", icon: IconBellRinging },
  { link: "/main/discover", label: "Discover", icon: IconSearch },
  { link: "/main/editor", label: "Editor", icon: IconLicense },
  // { link: "/main/dashboard", label: "Dashboard", icon: IconKey },
  { link: "/main/account", label: "Account", icon: IconUsers },
];

interface NavBarProps {
  opened: boolean;
  handleOpen: Function;
}

const NavBar = ({ opened, handleOpen }: NavBarProps): ReactElement => {
  const { classes, cx } = useStyles();
  const [section, setSection] = useState<"navigate" | "decks">("navigate");
  const dispatch = useAppDispatch();
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
      offset={20}
      p="0px"
      radius="xl"
      sx={(theme) => ({
        color: theme.colorScheme === "light" ? theme.colors.dark[7] : theme.white,
      })}
    >
      <Button
        className={cx({ [classes.linkActive]: deck.id === activeDeckId || activeDeckId === null })}
        variant="outline"
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
        <item.icon className={classes.linkIcon} stroke={1.5} />
      </Tooltip>
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <Navbar
      id="nav_bar"
      height="100%"
      sx={(theme) => ({
        width: opened ? 300 : 100,
        transition: "width .2s",

        [`@media (max-width: ${theme.breakpoints.sm})`]: {
          display: opened ? "flex" : "none",
        },
      })}
      p="md"
    >
      <Navbar.Section>
        <SegmentedControl
          id="nav_segment"
          sx={{ visibility: opened ? "visible" : "hidden" }}
          value={section}
          onChange={(value: "navigate" | "decks") => setSection(value)}
          transitionTimingFunction="ease"
          fullWidth
          data={[
            { label: "Navigate", value: "navigate" },
            { label: "Decks", value: "decks" },
          ]}
        />
      </Navbar.Section>

      <Navbar.Section grow mt="xl" sx={{ overflow: "scroll" }}>
        {section === "navigate"
          ? links
          : (
            <Stack>
              <Stack>
                <Group>
                  <Tooltip disabled={opened} label="Create" position="right" withArrow offset={20}>
                    <Button onClick={() => addNewDeck()} leftIcon={<IconPlus />}>
                      {opened ? "Create" : ""}
                    </Button>
                  </Tooltip>
                  <Tooltip disabled={opened} label="All" position="right" withArrow offset={20}>
                    <Button onClick={() => dispatch(setActive(null))} leftIcon={<IconKey />}>
                      {opened ? "All" : ""}
                    </Button>
                  </Tooltip>
                </Group>

                <SearchBar display={opened ? "" : "none"} callback={setFilter} />
              </Stack>
              {deckList}
            </Stack>
          )}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
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
