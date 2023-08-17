import {
  ActionIcon, Group, Text, Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactElement } from "react";
import { Card } from "types";
import {
  IconX, IconCheck, IconChevronRight, IconVolume, IconNote,
} from "@tabler/icons-react";

import CardNote from "./CardNote";

interface CardToolbarProps {
  card: Card;
  handleGuessed: Function;
  handleCorrect: Function;
  handleIncorrect: Function;
  checked: boolean;
}

const CardToolbar = ({
  card, handleGuessed, checked, handleCorrect, handleIncorrect,
}: CardToolbarProps): ReactElement => {
  const audio = new Audio(card?.audio);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Notes">
        <CardNote notes={card?.examples} />
      </Modal>
      <Group
        px="sm"
        position="apart"
        sx={(theme: any) => ({
          borderRadius: theme.radius.md,
          borderBottom: "1px solid black",
        })}
      >

        <Group>
          <Text fw={700}>
            {`Level: ${card.level}`}
          </Text>
          <Text fs="italic" fz="sm">
            {card.type}
          </Text>
        </Group>

        <Group noWrap>
          <ActionIcon color="cyan" onClick={() => open()} variant="transparent">
            <IconNote />
          </ActionIcon>

          <ActionIcon display={card.audio ? "" : "none"} color="cyan" onClick={() => audio.play()} variant="transparent">
            <IconVolume />
          </ActionIcon>

          <Group display={checked ? "none" : "flex"}>
            <ActionIcon size="lg" color="green" variant="filled" onClick={() => handleCorrect()} display={card.type !== "classic" ? "none" : ""}>
              <IconCheck />
            </ActionIcon>

            <ActionIcon size="lg" color="red" variant="filled" disabled={checked} onClick={() => handleIncorrect()} display={card.type !== "classic" ? "none" : ""}>
              <IconX />
            </ActionIcon>
          </Group>

          <ActionIcon size="lg" color="blue" variant="filled" display={card.type === "cloze" ? "" : "none"} onClick={() => handleGuessed()}>
            <IconChevronRight />
          </ActionIcon>
        </Group>
      </Group>
    </>

  );
};

export default CardToolbar;
