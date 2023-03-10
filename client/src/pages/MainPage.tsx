import { Outlet } from "react-router-dom";
import { ReactElement, useState } from "react";
import { Box, Burger, Group } from "@mantine/core";

import { setUser } from "../features/users/usersSlice";
import { useAppDispatch } from "../hooks/hooks";

import NavBar from "../components/NavBar";

interface localStorage {
  token: string
  userId: string
}

const MainPage = (): ReactElement => {
  const dispatch = useAppDispatch();
  const [open, setOpened] = useState<boolean>(false);

  let currentUserParsed: localStorage | null;
  const currentUser: string | null = window.localStorage.getItem("currentUser");
  if (currentUser) {
    currentUserParsed = JSON.parse(currentUser);
    dispatch(setUser(currentUserParsed));
  } else {
    alert("Session expired or user not found");
  }

  return (
    <Group
      align="apart"
      noWrap
      sx={{
        height: "100vh",
        gap: 0,
      }}
    >
      <NavBar opened={open} handleOpen={setOpened} />
      <Burger
        sx={(theme) => ({
          [`@media (min-width: ${theme.breakpoints.sm})`]: {
            display: "none",
          },
        })}
        opened={open}
        onClick={() => setOpened(!open)}
      />
      <Box sx={(theme) => ({
        width: "100%",
        height: "100%",
        [`@media (max-width: ${theme.breakpoints.sm})`]: {
          display: open ? "none" : "",
        },
      })}
      >
        <Outlet />
      </Box>

    </Group>
  );
};

export default MainPage;
