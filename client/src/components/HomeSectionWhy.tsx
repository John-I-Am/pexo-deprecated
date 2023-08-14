import {
  Group, Stack, Title, Text,
} from "@mantine/core";
import { ReactComponent as Why } from "../assets/images/why.svg";

const HomeSectionWhy = () => {
  console.log("why section rendered");

  return (
    <Group id="home-why" position="center" spacing="xl" sx={{ background: "#bbd0ff", borderRadius: "3rem", padding: "2rem" }}>
      <Why width="50%" height="50%" />
      <Stack spacing="4rem" sx={{ width: "20rem" }}>
        <Title c="black" ta="center" order={1}> The Why </Title>
        <Text c="black">
          Step into the realm of effective learning with spaced repetition,
          a technique rooted in cognitive science. Inspired by the 19th-century
          Ebbinghaus forgetting curve, spaced repetition strategically revisits
          material, capitalizing on the brains tendency to retain information
          through spaced intervals. By aligning your study routine with this
          natural cognitive rhythm, you optimize memory retention and promote
          deeper understanding.

        </Text>
      </Stack>
    </Group>
  );
};

export default HomeSectionWhy;
