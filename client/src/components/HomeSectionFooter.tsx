import {
  Group, Stack, Text, ThemeIcon,
} from "@mantine/core";
import {
  IconBrandHtml5,
  IconBrandMantine,
  IconBrandReact,
  IconBrandTypescript,
  IconPhoto,
} from "@tabler/icons-react";
import { ReactElement } from "react";

const HomeSectionFooter = (): ReactElement => {
  console.log("why section rendered");

  return (
    <Group position="apart" spacing="4rem" sx={{ padding: "2rem", margin: "-20px", borderTop: ".5px solid #e0e0e0" }}>
      <Stack>
        <ThemeIcon radius="md" size="xl">
          <IconPhoto />
        </ThemeIcon>
        <Text fz="sm">@Pexo 2023</Text>
      </Stack>

      <Group spacing="lg">
        <Text fw="500" fz="sm"> Home </Text>
        <Text fw="500" fz="sm"> FAQ </Text>
        <Text fw="500" fz="sm"> Preview </Text>
        <Text fw="500" fz="sm"> Contact </Text>
        <Text fw="500" fz="sm"> Terms of Service </Text>
        <Text fw="500" fz="sm"> Privacy Policy </Text>
      </Group>

      <Stack>
        <Group>
          <ThemeIcon radius="md" size="xl">
            <IconBrandReact />
          </ThemeIcon>

          <ThemeIcon radius="md" size="xl">
            <IconBrandTypescript />
          </ThemeIcon>

          <ThemeIcon radius="md" size="xl">
            <IconBrandHtml5 />
          </ThemeIcon>

          <ThemeIcon radius="md" size="xl">
            <IconBrandMantine />
          </ThemeIcon>
        </Group>

        <Text fz="sm"> Built with the above techs </Text>
      </Stack>
    </Group>
  );
};

export default HomeSectionFooter;
