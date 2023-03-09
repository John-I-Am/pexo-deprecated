import { Outlet } from "react-router-dom";
import { ReactElement, useRef, useState } from "react";
import { Burger, createStyles, Group } from "@mantine/core";

import { setUser } from "../../features/users/usersSlice";
import { useAppDispatch } from "../../hooks/hooks";

import NavBar from "../../components/NavBar";

const useStyles = createStyles((theme) => ({
  burger: {
    zIndex: 2,

    [`@media (min-width: ${theme.breakpoints.sm})`]: {
      display: "none",
    },
  },
}));

interface localStorage {
  token: string
  userId: string
}

const MainPage = (): ReactElement => {
  const dispatch = useAppDispatch();
  const [open, setOpened] = useState<boolean>(false);
  const navBarRef: any = useRef();
  const { classes } = useStyles();

  let currentUserParsed: localStorage | null;
  const currentUser: string | null = window.localStorage.getItem("currentUser");
  if (currentUser) {
    currentUserParsed = JSON.parse(currentUser);
    dispatch(setUser(currentUserParsed));
  } else {
    alert("Session expired or user not found");
  }

  const handleOpen = () => {
    setOpened(!open);
    navBarRef.current.toggleExpanded();
  };

  return (
    <Group
      align="apart"
      noWrap
      sx={{ height: "100vh" }}
    >
      <NavBar ref={navBarRef} />
      <Burger className={classes.burger} opened={open} onClick={handleOpen} />
      <Outlet />
    </Group>
  );
};

export default MainPage;
