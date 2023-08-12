import { ReactElement } from "react";
import {
  Container,
  Group,
  Title,
  rem,
  Text,
  ThemeIcon,
  Stack,
} from "@mantine/core";
import {
  IconTableOptions, IconDeviceMobile, IconSpyOff, IconAdOff,
} from "@tabler/icons-react";

const HomeSectionWhat = (): ReactElement => {
  console.log("what section rendered");

  return (
    <Stack id="home-what">
      <Title variant="gradient" ta="center" order={1}> The What </Title>

      <Group position="center">
        <Stack align="center" sx={{ width: "200px" }}>
          <ThemeIcon variant="light" size={rem(80)} radius="lg">
            <IconTableOptions size={rem(60)} />
          </ThemeIcon>
          <Container>
            <Text align="center" fw={700}>Customization</Text>
            <Text align="center" color="dimmed" size="sm">Learn what you want. How you want.</Text>
          </Container>
        </Stack>

        <Stack align="center" sx={{ width: "200px" }}>
          <ThemeIcon variant="light" size={rem(80)} radius="lg">
            <IconDeviceMobile size={rem(60)} />
          </ThemeIcon>
          <Container>
            <Text align="center" fw={700}>Cross-platform</Text>
            <Text align="center" color="dimmed" size="sm">Mobile-friendly UI allows you to study on the go.</Text>
          </Container>
        </Stack>

        <Stack align="center" sx={{ width: "200px" }}>
          <ThemeIcon variant="light" size={rem(80)} radius="lg">
            <IconSpyOff size={rem(60)} />
          </ThemeIcon>
          <Container>
            <Text align="center" fw={700}>Privacy-friendly</Text>
            <Text align="center" color="dimmed" size="sm">No non-essential data-tracking.</Text>
          </Container>
        </Stack>

        <Stack align="center" sx={{ width: "200px" }}>
          <ThemeIcon variant="light" size={rem(80)} radius="lg">
            <IconAdOff size={rem(60)} />
          </ThemeIcon>
          <Container>
            <Text align="center" fw={700}>Ad-free</Text>
            <Text align="center" color="dimmed" size="sm">No ads. Ever.</Text>
          </Container>
        </Stack>

      </Group>
    </Stack>
  );
};

export default HomeSectionWhat;
