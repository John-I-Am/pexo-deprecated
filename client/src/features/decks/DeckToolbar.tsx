/* eslint-disable react/jsx-props-no-spreading */
import { ReactElement, useEffect } from "react";
import {
  Modal, Text, Group, TextInput, Textarea, Stack, Button,
} from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus, IconTrash, IconEdit } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { Deck } from "types";
import { useAppDispatch } from "../../hooks/hooks";
import CardEditor from "./CardEditor";
import { useDeleteDeckMutation, useUpdateDeckMutation } from "../api/apiSlice";
import { setActive } from "./decksSlice";
import SearchBar from "../../components/SearchBar";

interface FormValues {
  title: string;
  description: string;
}

const DeckToolbar = ({ deck, searchCallback }: { deck: Deck, searchCallback: Function })
  : ReactElement => {
  const dispatch = useAppDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteDeck] = useDeleteDeckMutation();
  const [updateDeck, { isLoading: isLoadingUpdate }] = useUpdateDeckMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormValues>({ defaultValues: { title: deck.title, description: deck.description || "" } });

  useEffect(() => {
    reset({
      title: deck.title,
      description: deck.description,
    });
  }, [deck]);

  const handleChangeDeckInfo = async ({ title, description }: FormValues): Promise<void> => {
    await updateDeck({
      ...deck,
      title,
      description: description || " ", // TODO: not optional, need to alter backend to allow empty string
    });
  };

  const handleDeleteDeck = (): void => {
    openConfirmModal({
      title: "Confirm Action",
      children: (
        <Text transform="uppercase" weight={700} c="red" size="sm">
          Deleted decks are unrecoverable.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onConfirm: () => {
        deleteDeck(deck?.id);
        dispatch(setActive(null));
      },
    });
  };

  return (
    <>
      <Modal
        zIndex={2000}
        opened={opened}
        onClose={close}
        size="xl"
        withCloseButton={false}
      >
        <CardEditor card={undefined} />
      </Modal>
      <Group pt="sm" spacing="0">
        <Stack w="100%" align="center">
          <form onSubmit={handleSubmit(handleChangeDeckInfo)}>
            <Group>
              <TextInput
                radius="lg"
                styles={(theme) => ({
                  input: {
                    border: "none",
                    background: theme.colorScheme === "light" ? theme.colors.gray[0] : theme.colors.dark[5],
                  },
                })}
                error={errors.title?.message}
                disabled={!deck?.id}
                {...register("title", {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z0-9_ ]{1,20}$/i,
                    message: "length exceeded / invalid characters",
                  },
                })}
              />
              <Button leftIcon={<IconEdit size="1rem" />} loading={isLoadingUpdate} compact display={isDirty ? "" : "none"} type="submit">
                Edit
              </Button>
            </Group>

            <Textarea
              styles={(theme) => ({ input: { color: theme.colors.gray[6] } })}
              autosize
              variant="unstyled"
              size="xs"
              placeholder={deck.id ? "description.." : "Viewing combined decks, Select deck to edit"}
              error={errors.description?.message}
              {...register("description", {
                pattern: {
                  value: /^[a-zA-Z0-9_ ]{0,120}$/i,
                  message: "length exceeded / invalid characters",
                },
              })}
            />
          </form>
        </Stack>

        <Group grow>
          <SearchBar callback={searchCallback} />
          <Button leftIcon={<IconPlus size="1rem" />} disabled={!deck?.id} onClick={() => open()} compact>
            Create Card
          </Button>
          <Button leftIcon={<IconTrash size="1rem" />} c="red" disabled={!deck?.id} onClick={handleDeleteDeck} compact>
            Delete Deck
          </Button>
        </Group>
      </Group>
    </>
  );
};

export default DeckToolbar;
