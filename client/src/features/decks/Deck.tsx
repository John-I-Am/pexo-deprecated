/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import {
  createStyles, Text, RingProgress, Group, Modal, Button, Stack,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useDisclosure } from "@mantine/hooks";
import { Deck } from "types";
import { useCardsDue } from "../../hooks/hooks";
import { useCreateCardMutation, useAddNewDeckMutation } from "../api/apiSlice";
import CardTable from "./CardTable";

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    border: `.5px solid ${theme.colors.gray[5]}`,
    padding: theme.spacing.xl,
    borderRadius: theme.spacing.md,

    [theme.fn.smallerThan("sm")]: {
      justifyContent: "center",
    },
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    lineHeight: 1,
  },
}));

const DeckInfo = ({ deck }: any) => {
  const { classes, theme } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const [addNewDeck, { isSuccess: isSuccessDeck }] = useAddNewDeckMutation();
  const [createCard, { isSuccess: isSuccessCard }] = useCreateCardMutation();

  const totalCards = deck.cards?.length ?? 0;
  const cardsDue = useCardsDue(deck.cards ?? []).length;

  const handleAddDeck = async () => {
    const newDeck: any = await addNewDeck();
    deck.cards.forEach(async (newCard: any) => {
      newCard.deckId = newDeck.data.id;
      await createCard(newCard);
    });
    if (isSuccessDeck) {
      notifications.show({
        title: "Success",
        message: "Deck added!",
      });
    }
  };

  return (
    <>
      <Group className={classes.wrapper}>
        <Stack>
          <Text fz="xl" className={classes.label}>
            {deck.title}
          </Text>
          <div>
            <Text fz="xs" color="dimmed">
              {deck.description}
            </Text>
          </div>
          <Group mt="lg">
            <Text className={classes.label}>{totalCards}</Text>
            <Text size="xs" color="dimmed">
              Total cards
            </Text>
          </Group>
          <Group>
            <Button onClick={open}>View cards</Button>
            <Button onClick={() => handleAddDeck()}>Add Deck</Button>
          </Group>
        </Stack>

        <RingProgress
          roundCaps
          thickness={6}
          size={150}
          sections={[{ value: (cardsDue / totalCards) * 100, color: theme.primaryColor }]}
          label={(
            <div>
              <Text ta="center" fz="lg" className={classes.label}>
                {((cardsDue / totalCards) * 100).toFixed(0)}
                %
              </Text>
              <Text ta="center" fz="xs" c="dimmed">
                Reviewed
              </Text>
            </div>
            )}
        />
      </Group>

      <Modal
        size="xl"
        withCloseButton={false}
        opened={opened}
        onClose={close}
      >
        <CardTable cards={deck.cards} viewOnly />
      </Modal>
    </>

  );
};

export default DeckInfo;
