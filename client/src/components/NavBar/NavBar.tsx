import {
  ReactElement, useState, forwardRef, useImperativeHandle,
} from "react";
import { NavLink } from "react-router-dom";

import { Tooltip, ActionIcon } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { useAppDispatch } from "../../hooks/hooks";

import { Container } from "./styles";
import { primaryColor } from "../../sharedStyles";
import logo from "../../assets/logo.png";
import { ReactComponent as NavIconLearn } from "../../assets/navIconLearn.svg";
import { ReactComponent as NavIconDiscover } from "../../assets/navIconDiscover.svg";
import { ReactComponent as NavIconEdit } from "../../assets/navIconEdit.svg";
import { ReactComponent as NavIconDashboard } from "../../assets/navIconDashboard.svg";
import { ReactComponent as NavIconProfile } from "../../assets/navIconProfile.svg";
import { ReactComponent as NavIconExit } from "../../assets/navIconExit.svg";
import { ReactComponent as ChevronLeft } from "../../assets/chevronLeft.svg";
import { ReactComponent as ChevronRight } from "../../assets/chevronRight.svg";
import { clearUser } from "../../features/users/usersSlice";
import { apiSlice } from "../../features/api/apiSlice";

const NavBar = forwardRef((props, refs): ReactElement => {
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(false);

  const ref = useClickOutside(() => setExpanded(false));

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  useImperativeHandle(refs, () => ({
    toggleExpanded,
  }));

  const handleLogout = (): void => {
    dispatch(clearUser());
    dispatch(apiSlice.util.resetApiState());
  };

  return (
    <Container className="nav" ref={ref} expanded={expanded}>
      <img src={logo} alt="logo" />

      <div>
        <NavLink
          id="nav_test"
          onClick={() => setExpanded(false)}
          className="nav-link"
          to="/main/learn"
          style={({ isActive }) => ({
            background: isActive ? "WhiteSmoke" : "",
            color: isActive ? primaryColor.default : "black",
          })}
        >
          <Tooltip disabled={expanded} label="Study" position="right" withArrow offset={20}>
            <NavIconLearn />
          </Tooltip>
          <p>Study</p>
        </NavLink>

        <NavLink
          id="discover"
          onClick={() => setExpanded(false)}
          className="nav-link"
          to="/main/discover"
          style={({ isActive }) => ({
            background: isActive ? "WhiteSmoke" : "",
            color: isActive ? primaryColor.default : "black",
          })}
        >
          <Tooltip disabled={expanded} label="Discover" position="right" withArrow offset={20}>
            <NavIconDiscover />
          </Tooltip>
          <p>Discover</p>
        </NavLink>

        <NavLink
          id="nav_editor"
          onClick={() => setExpanded(false)}
          className="nav-link"
          to="/main/editor"
          style={({ isActive }) => ({
            background: isActive ? "WhiteSmoke" : "",
            color: isActive ? primaryColor.default : "black",
          })}
        >
          <Tooltip disabled={expanded} label="Editor" position="right" withArrow offset={20}>
            <NavIconEdit />
          </Tooltip>
          <p>Edit Deck</p>
        </NavLink>

        <NavLink
          id="nav_dashboard"
          onClick={() => setExpanded(false)}
          className="nav-link"
          to="/main/dashboard"
          style={({ isActive }) => ({
            background: isActive ? "WhiteSmoke" : "",
            color: isActive ? primaryColor.default : "black",
          })}
        >
          <Tooltip disabled={expanded} label="Dashboard" position="right" withArrow offset={20}>
            <NavIconDashboard />
          </Tooltip>
          <p>Dashboard</p>
        </NavLink>

        <NavLink
          id="nav_account"
          onClick={() => setExpanded(false)}
          className="nav-link"
          to="/main/account"
          style={({ isActive }) => ({
            background: isActive ? "WhiteSmoke" : "",
            color: isActive ? primaryColor.default : "black",
          })}
        >
          <Tooltip disabled={expanded} label="Account" position="right" withArrow offset={20}>
            <NavIconProfile />
          </Tooltip>
          <p>Account</p>
        </NavLink>

        <NavLink
          onClick={handleLogout}
          className="nav-link"
          to="/"
        >
          <Tooltip disabled={expanded} label="Logout" position="right" withArrow offset={20}>
            <NavIconExit />
          </Tooltip>
          <p>Logout</p>
        </NavLink>
      </div>

      <div>
        <Tooltip disabled={expanded} label="expand" position="right" withArrow offset={20}>
          <ActionIcon onClick={() => toggleExpanded()}>
            {expanded ? <ChevronLeft /> : <ChevronRight />}
          </ActionIcon>
        </Tooltip>
      </div>

    </Container>
  );
});

export default NavBar;
