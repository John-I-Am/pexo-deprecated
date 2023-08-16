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
  checked: boolean;
}

const CardToolbar = ({
  card, handleGuessed, checked,
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

          <ActionIcon size="lg" color="green" variant="filled" disabled={checked} onClick={() => handleGuessed(true)} display={card.type !== "classic" ? "none" : ""}>
            <IconCheck />
          </ActionIcon>

          <ActionIcon size="lg" color="red" variant="filled" disabled={checked} onClick={() => handleGuessed(false)} display={card.type !== "classic" ? "none" : ""}>
            <IconX />
          </ActionIcon>

          <ActionIcon size="lg" color="dark" display={checked ? "" : "none"} onClick={() => handleGuessed(false)}>
            <IconChevronRight />
          </ActionIcon>
        </Group>
      </Group>
    </>

  );
};

export default CardToolbar;
