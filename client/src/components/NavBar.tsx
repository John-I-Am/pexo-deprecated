import {
  forwardRef, ReactElement, useImperativeHandle, useState,
} from "react";
import { Link } from "react-router-dom";
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

import SearchBar from "./SearchBar";

import { apiSlice, useAddNewDeckMutation, useGetDecksQuery } from "../features/api/apiSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { setActive } from "../features/decks/decksSlice";
import { clearUser } from "../features/users/usersSlice";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "width .2s",
  },

  scrollSection: {
    overflow: "scroll",
  },

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

const NavBar = forwardRef((props, refs): ReactElement => {
  const { classes, cx } = useStyles();
  const [section, setSection] = useState<"navigate" | "decks">("navigate");
  const [expanded, setExpanded] = useState(true);
  const [active, setActiveLink] = useState("Study");
  const dispatch = useAppDispatch();
  const [addNewDeck] = useAddNewDeckMutation();
  const activeDeckId = useAppSelector((state) => state.decks.activeDeckId);
  const { data: decks = [] } = useGetDecksQuery();

  useImperativeHandle(refs, () => ({
    toggleExpanded: () => setExpanded(!expanded),
  }));

  const handleLogout = (): void => {
    dispatch(clearUser());
    dispatch(apiSlice.util.resetApiState());
  };

  const [filter, setFilter] = useState<string>("");
  const decksToShow: any = filter === ""
    ? decks
    : decks.filter((deck: any) => (deck.title).toLowerCase().includes(filter.toLowerCase()));

  const deckList = decksToShow.map((deck: any) => (
    <Tooltip disabled={expanded} label={deck.title} position="right" withArrow offset={20}>
      <Button
        className={cx({ [classes.linkActive]: deck.id === activeDeckId || activeDeckId === null })}
        variant="outline"
        key={deck.id}
        fullWidth
        onClick={() => dispatch(setActive(deck.id as any) as any)}
      >
        <p>{deck.title}</p>
      </Button>
    </Tooltip>
  ));

  const links = navs.map((item) => (
    <Link
      className={cx(classes.link, {
        [classes.linkCompact]: !expanded,
        [classes.linkActive]: active === item.label,
      })}
      to={item.link}
      key={Math.random()}
      onClick={() => setActiveLink(item.label)}
    >
      <Tooltip disabled={expanded} label={item.label} position="right" withArrow offset={20}>
        <item.icon className={classes.linkIcon} stroke={1.5} />
      </Tooltip>
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <Navbar
      height="100%"
      sx={{
        width: expanded ? 300 : 100,
      }}
      display={expanded ? "block" : "none"}
      p="md"
      className={classes.navbar}
    >
      <Navbar.Section>
        <SegmentedControl
          display={expanded ? "" : "none"}
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

      <Navbar.Section grow mt="xl" className={classes.scrollSection}>
        {section === "navigate"
          ? links
          : (
            <Stack>
              <Stack>
                <Group>
                  <Tooltip disabled={expanded} label="Create" position="right" withArrow offset={20}>
                    <Button onClick={() => addNewDeck()} leftIcon={<IconPlus />}>
                      {expanded ? "Create" : ""}
                    </Button>
                  </Tooltip>
                  <Tooltip disabled={expanded} label="All" position="right" withArrow offset={20}>
                    <Button onClick={() => dispatch(setActive(null))} leftIcon={<IconKey />}>
                      {expanded ? "All" : ""}
                    </Button>
                  </Tooltip>
                </Group>

                <SearchBar display={expanded ? "" : "none"} callback={setFilter} />
              </Stack>
              {deckList}
            </Stack>
          )}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Container
          className={cx(classes.link, { [classes.linkCompact]: !expanded })}
          onClick={() => setExpanded(!expanded)}
        >
          <Tooltip disabled={expanded} label="Expand" position="right" withArrow offset={20}>
            <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          </Tooltip>
          <span>Expand</span>
        </Container>

        <Link
          className={cx(classes.link, {
            [classes.linkCompact]: !expanded,
          })}
          to="/"
          onClick={handleLogout}
        >
          <Tooltip disabled={expanded} label="Logout" position="right" withArrow offset={20}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
          </Tooltip>
          <span>Logout</span>
        </Link>
      </Navbar.Section>
    </Navbar>
  );
});

export default NavBar;
