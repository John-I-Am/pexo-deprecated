import {
  Group, Stack, Title, Text,
} from "@mantine/core";
import { ReactComponent as Why } from "../assets/images/why.svg";

const HomeSectionWhy = () => {
  console.log("why section rendered");

  return (
    <Group position="center" spacing="xl" sx={{ background: "#bbd0ff", borderRadius: "32px" }}>
      <Why width="50%" height="50%" />
      <Stack sx={{ width: "200px" }}>
        <Title c="black" ta="center" order={1}> The Why </Title>
        <Text c="black" size="sm">
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
