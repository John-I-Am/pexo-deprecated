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
      id="home-how"
      gap="4rem"
      align="center"
      direction="column"
    >
      <Title variant="gradient" ta="center" order={1}> The How </Title>

      <Timeline active={2} bulletSize={30} lineWidth={2}>
        <Timeline.Item bullet={1} title="Create">
          <Text color="dimmed">
            Create flashcards by formulating a question on one side
            and its corresponding answer on the other. Keep them concise
            for effective learning.
          </Text>
        </Timeline.Item>

        <Timeline.Item bullet={2} title="Review">
          <Text color="dimmed">
            Consistently review your flashcards. Our algorithm schedules
            tests at the optimal moment, enhancing retention by challenging
            your memory when its about to fade.
          </Text>
        </Timeline.Item>

        <Timeline.Item title="Repeat" bullet={3} lineVariant="dashed">
          <Text color="dimmed">
            After each successful answer, the interval between reviews lengthens;
            for unsuccessful answers, it shortens. After five consecutive correct
            responses, consider the card mastered
          </Text>
          <Flex justify="center">
            <Demo width="60%" height="60%" />
          </Flex>

        </Timeline.Item>

        <Timeline.Item title="Retain" bullet={4}>
          <Text color="dimmed">
            Once a card is mastered, its archived, sparing you further testing. Focus
            shifts to unmastered concepts for efficient learning.
          </Text>
        </Timeline.Item>
      </Timeline>
    </Flex>
  );
};

export default HomeSectionHow;
