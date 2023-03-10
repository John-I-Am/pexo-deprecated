import {
  ActionIcon, Button, Container, Group, Text, Modal,
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
        noWrap
        position="apart"
        sx={(theme: any) => ({
          backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.blue[9],
          width: "100%",
          padding: "0 16px 0 16px",
          borderRadius: theme.radius.md,

          [`@media (max-width: ${theme.breakpoints.sm})`]: {
          },
        })}
      >
        <Text fw={700}>
          {`Level: ${card.level}`}
        </Text>
        <Group sx={{ display: card.type !== "classic" ? "none" : "" }}>
          <Button uppercase color="green" leftIcon={<IconCheck size="1rem" />} onClick={() => handleGuessed(true)}>correct</Button>
          <Button uppercase color="red" leftIcon={<IconX size="1rem" />} onClick={() => handleGuessed(false)}>incorrect</Button>
        </Group>
        <Group>
          <Container>
            <ActionIcon color="white" size="2rem" onClick={() => open()} variant="transparent">
              <IconNote />
            </ActionIcon>
          </Container>

          <Container display={card.audio ? "" : "none"}>
            <ActionIcon color="white" size="2rem" onClick={() => audio.play()} variant="transparent">
              <IconVolume />
            </ActionIcon>
          </Container>

          <Container display={checked ? "" : "none"}>
            <Button rightIcon={<IconChevronRight size="1rem" />} onClick={() => handleGuessed(false)}>Next</Button>
          </Container>
        </Group>
      </Group>
    </>

  );
};

export default CardToolbar;
