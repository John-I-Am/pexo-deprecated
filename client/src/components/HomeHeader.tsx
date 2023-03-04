import { useNavigate } from "react-router-dom";

import {
  createStyles,
  Header,
  Container,
  Group,
  Button,
  rem,
} from "@mantine/core";
import { ReactComponent as Logo } from "../assets/landing_bird.svg";

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  wraper: {
    borderBottom: 0,
    position: "sticky",
    top: 0,
  },

  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    width: rem(30),
    height: rem(30),
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
}));

const HomeHeader = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();

  return (
    <Header height={HEADER_HEIGHT} mb={50} className={classes.wraper}>
      <Container className={classes.inner} fluid>
        <Logo className={classes.logo} />
        <Group spacing={5}>
          <a
            key="Features"
            href="#home-what"
            className={classes.link}
            onClick={(event) => event.preventDefault()}
          >
            Features
          </a>

          <a
            key="Science"
            href="#home-what"
            className={classes.link}
            onClick={(event) => event.preventDefault()}
          >
            Science
          </a>

          <a
            key="About"
            href="#home-what"
            className={classes.link}
            onClick={(event) => event.preventDefault()}
          >
            About
          </a>
        </Group>
        <Button radius="xl" h={30} onClick={() => navigate("/signup")}>
          Join beta
        </Button>
      </Container>
    </Header>
  );
};

export default HomeHeader;
