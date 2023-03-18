/* eslint-disable react/jsx-props-no-spreading */
import { ReactElement, useEffect, useState } from "react";
import {
  Modal, ActionIcon, Text, Group, Input, Textarea, Stack, Button,
} from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { useDisclosure, useClickOutside } from "@mantine/hooks";
import { IconPlus, IconTrash, IconEdit } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
// import { Deck } from "types";
import { useAppDispatch } from "../../hooks/hooks";
import CardEditor from "./CardEditor";
import { useDeleteDeckMutation, useUpdateDeckMutation } from "../api/apiSlice";
import { setActive } from "./decksSlice";
import SearchBar from "../../components/SearchBar";

interface FormValues {
  title: string;
  description: string;
}

// deck: Deck returns error: description not in type Deck
const DeckToolbar = ({ deck, searchCallback }: any): ReactElement => {
  const dispatch = useAppDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [deleteDeck] = useDeleteDeckMutation();
  const [updateDeck, { isLoading: isLoadingUpdate }] = useUpdateDeckMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>();

  const resetFormState = () => {
    setValue("title", deck.title);
    setValue("description", deck.description as string);
  };

  const ref = useClickOutside(() => {
    setIsEditable(false);
    resetFormState();
  });

  useEffect(() => {
    setValue("title", deck.title);
    setValue("description", deck.description as string);
  }, [deck]);

  const handleChangeDeckInfo = async ({ title, description }: FormValues): Promise<void> => {
    await updateDeck({
      ...deck,
      title,
      description: description || " ", // TODO: not optional, need to alter backend to allow empty string
    });
    setIsEditable(false);
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
      <Group p="md" position="apart">
        <Stack>
          <form ref={ref} onSubmit={handleSubmit(handleChangeDeckInfo)}>
            <Input
              styles={{ input: { fontSize: "2rem" } }}
              readOnly={!isEditable}
              variant={isEditable ? "default" : "unstyled"}
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

            <Textarea
              styles={(theme) => ({ input: { color: theme.colors.gray[6] } })}
              autosize
              readOnly={!isEditable}
              placeholder="description.."
              variant={isEditable ? "default" : "unstyled"}
              defaultValue={deck?.description ?? ""}
              error={errors.description?.message}
              {...register("description", {
                pattern: {
                  value: /^[a-zA-Z0-9_ ]{0,120}$/i,
                  message: "length exceeded / invalid characters",
                },
              })}
            />

            <Group position="apart">
              <ActionIcon
                disabled={!deck?.id}
                onClick={() => {
                  setIsEditable(!isEditable);
                  resetFormState();
                }}
              >
                <IconEdit size="1rem" />
              </ActionIcon>
              <Button loading={isLoadingUpdate} compact display={isEditable ? "" : "none"} type="submit">
                Submit
              </Button>
            </Group>
          </form>
        </Stack>

        <Group>
          <Group>
            <ActionIcon id="add_card" size="xl" disabled={!deck?.id} onClick={() => open()}><IconPlus /></ActionIcon>
            <Text fz="sm">New Card</Text>
          </Group>
          <Group>
            <ActionIcon size="xl" disabled={!deck?.id} onClick={handleDeleteDeck}><IconTrash /></ActionIcon>
            <Text fz="sm">Delete Deck</Text>
          </Group>
          <SearchBar callback={searchCallback} />
        </Group>
      </Group>
    </>
  );
};

export default DeckToolbar;
