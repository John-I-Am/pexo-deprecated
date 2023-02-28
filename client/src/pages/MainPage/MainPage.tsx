import { Outlet } from "react-router-dom";
import { ReactElement, useRef } from "react";

import { ActionIcon } from "@mantine/core";
import { setUser } from "../../features/users/usersSlice";
import { useAppDispatch } from "../../hooks/hooks";

import NavBar from "../../components/NavBar/NavBar";
import { Container } from "./styles";
import { ReactComponent as ChevronRight } from "../../assets/chevronRight.svg";

interface localStorage {
  token: string
  userId: string
}

const MainPage = (): ReactElement => {
  const dispatch = useAppDispatch();
  const expandRef: any = useRef();

  let currentUserParsed: localStorage | null;
  const currentUser: string | null = window.localStorage.getItem("currentUser");
  if (currentUser) {
    currentUserParsed = JSON.parse(currentUser);
    dispatch(setUser(currentUserParsed));
  } else {
    alert("Session expired or user not found");
  }

  return (
    <Container>
      <NavBar ref={expandRef} />
      <ActionIcon className="expand-drawer" onClick={() => expandRef.current.toggleExpanded()}>
        <ChevronRight />
      </ActionIcon>
      <Outlet />
    </Container>
  );
};

export default MainPage;
