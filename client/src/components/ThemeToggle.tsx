import {
  Switch, useMantineColorScheme, useMantineTheme,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import { useUpdateUserMutation } from "../features/api/apiSlice";
import { useAppSelector } from "../hooks/hooks";
import { RootState } from "../store";

const ThemeToggle = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [checked, setChecked] = useState<boolean>(colorScheme === "light");
  const theme = useMantineTheme();

  const [updateUser] = useUpdateUserMutation();
  const userId: string = useAppSelector((state: RootState) => state.user.id);

  useEffect(() => {
    setChecked(colorScheme === "light");
  }, [colorScheme]);

  const handleToggleColorScheme = async () => {
    toggleColorScheme();
    setChecked(!checked);

    if (userId) {
      await updateUser({ id: userId, preferences: { colorScheme: colorScheme === "dark" ? "light" : "dark" } });
    }
  };

  return (
    <Switch
      styles={(themes) => ({
        thumb: {
          background: checked ? "black" : "white",
        },
        track: {
          background: themes.colors.yellow[4],
        },
        trackLabel: {
          color: checked ? "white" : "black",
        },
      })}
      sx={{ thumb: "yellow" }}
      checked={checked}
      onChange={() => handleToggleColorScheme()}
      size="xl"
      color={theme.colorScheme === "dark" ? "light" : "dark"}
      onLabel="Night"
      offLabel="Day"
      thumbIcon={checked
        ? <IconMoonStars size="1.25rem" color={theme.colors.blue[4]} stroke={2} />
        : <IconSun size="1.25rem" color={theme.colors.yellow[6]} stroke={2} />}
    />
  );
};

export default ThemeToggle;
