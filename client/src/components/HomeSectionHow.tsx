import { ReactElement } from "react";
import {
  Text,
  Flex,
  Timeline,
  Title,
} from "@mantine/core";

import { ReactComponent as Demo } from "../assets/images/demo.svg";

const HomeSectionHow = (): ReactElement => {
  console.log("rendered How Section");

  return (
    <Flex
      align="center"
      direction="column"
    >
      <Title variant="gradient" ta="center" order={1}> The How </Title>

      <Timeline active={2} bulletSize={40} lineWidth={2}>
        <Timeline.Item bullet={1} title="Create">
          <Text color="dimmed" size="sm">
            Create flashcards by formulating a question on one side
            and its corresponding answer on the other. Keep them concise
            for effective learning.
          </Text>
        </Timeline.Item>

        <Timeline.Item bullet={2} title="Review">
          <Text color="dimmed" size="sm">
            Consistently review your flashcards. Our algorithm schedules
            tests at the optimal moment, enhancing retention by challenging
            your memory when its about to fade.
          </Text>
        </Timeline.Item>

        <Timeline.Item title="Repeat" bullet={3} lineVariant="dashed">
          <Text color="dimmed" size="sm">
            After each successful answer, the interval between reviews lengthens;
            for unsuccessful answers, it shortens. After five consecutive correct
            responses, consider the card mastered
          </Text>
          <Demo width="100%" height="100%" />
        </Timeline.Item>

        <Timeline.Item title="Retain" bullet={4}>
          <Text color="dimmed" size="sm">
            Once a card is mastered, its archived, sparing you further testing. Focus
            shifts to unmastered concepts for efficient learning.
          </Text>
        </Timeline.Item>
      </Timeline>
    </Flex>
  );
};

export default HomeSectionHow;
