/* eslint-disable react/jsx-props-no-spreading */
import { ReactElement } from "react";
import {
  Modal, ActionIcon, Text, Group, Input,
} from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus, IconTrash, IconEdit } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { Deck } from "types";
import { useAppDispatch } from "../../hooks/hooks";
import CardEditor from "./CardEditor/CardEditor";
import { useDeleteDeckMutation, useUpdateDeckMutation } from "../api/apiSlice";
import { setActive } from "./decksSlice";
import SearchBar from "../../components/SearchBar";

interface FormValues {
  title: string;
}

const DeckToolbar = ({ deck, searchCallback }: {deck: Deck, searchCallback: Function})
  : ReactElement => {
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteDeck] = useDeleteDeckMutation();
  const [updateDeck] = useUpdateDeckMutation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>();

  const handleChangeTitle = async (data: {title: string}): Promise<void> => {
    await updateDeck({ activeDeckId: deck.id, title: data });
    setValue("title", data.title);
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
      <Modal opened={opened} onClose={close} size="xl" withCloseButton={false}>
        <CardEditor card={undefined} />
      </Modal>
      <Group p="md" position="apart">
        <Group spacing="xs" align="start">
          <SearchBar callback={searchCallback} />

          <form onSubmit={handleSubmit(handleChangeTitle)}>
            <Input
              {...register("title", {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9_ ]{1,20}$/i,
                  message: "length exceeded / invalid characters",
                },
              })}
              disabled={!deck?.id}
              placeholder={deck?.title}
              icon={<IconEdit />}
            />
          </form>
          <Text c="red" fz="sm" role="alert">
            {errors.title && errors.title.message}
          </Text>
        </Group>

        <Group>
          <Group>
            <ActionIcon id="add_card" size="xl" disabled={!deck?.id} onClick={() => open()}><IconPlus /></ActionIcon>
            <Text fz="sm">New Card</Text>
          </Group>
          <Group>
            <ActionIcon size="xl" disabled={!deck?.id} onClick={handleDeleteDeck}><IconTrash /></ActionIcon>
            <Text fz="sm">Delete Deck</Text>
          </Group>
        </Group>
      </Group>
    </>
  );
};

export default DeckToolbar;
