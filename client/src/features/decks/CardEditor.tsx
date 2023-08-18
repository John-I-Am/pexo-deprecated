/* eslint-disable react/jsx-props-no-spreading */
import { ReactElement, useState } from "react";
import { useForm } from "react-hook-form";

import {
  Textarea, TextInput, Button, Badge, Group, Stack, ActionIcon, Text,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Card, CardType, NewCard } from "types";

import {
  Icon360, IconPlus, IconUnderline,
} from "@tabler/icons-react";
import dictionaryService from "../../services/dictionary";
import { useAppSelector } from "../../hooks/hooks";
import { useCreateCardMutation, useUpdateCardMutation } from "../api/apiSlice";

type FormValueWord = {
  word: string
}

type FormValueTag = {
  tag: string
}

type FormValueCard = {
  front: string;
  back: string;
  examples: string;
  type: CardType;
  audio: string;
}

type CardEditorProp = {
  card: Card | null | undefined
}

const CardEditor = ({ card }: CardEditorProp): ReactElement => {
  const activeDeckId = useAppSelector((state: any) => state.decks.activeDeckId);
  const [tags, setTags] = useState(card ? card.tags : []);

  const [mode, setMode] = useState<CardType>(card?.type || "classic");

  const [createCard, { isLoading: isLoadingCreate }] = useCreateCardMutation();
  const [updateCard, { isLoading: isLoadingUpdate }] = useUpdateCardMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValueWord>();

  const {
    register: registerCard,
    handleSubmit: handleSubmitCard,
    setValue: setValueCard,
    formState: { errors: errorsCard },
  } = useForm<FormValueCard>();

  const {
    register: registerTag,
    handleSubmit: handleSubmitTag,
    setValue: setValueTag,
    setError: setErrorTag,
    formState: { errors: errorsTag },
  } = useForm<FormValueTag>();

  const handleSearchWord = async ({ word }: { word: string}): Promise<void> => {
    try {
      const entry = await dictionaryService.define(word);
      setValueCard("front", word);
      setValueCard("back", entry.definition);
      setValueCard("audio", (entry.pronunciation));
      setValueCard("examples", entry?.examples?.join("\n"));
    } catch (e) {
      setError("word", {
        type: "manual",
        message: "Unable to find definition, check your spelling",
      });
    }
  };

  const handleCreateCard = async (data: FormValueCard): Promise<void> => {
    const newCard: NewCard = {
      ...data,
      type: mode,
      examples: data?.examples ? data.examples.split("") : [], // temporary solution for examples needing to be in array. need to refactor backend
      tags,
      deckId: activeDeckId,
    };

    if (card) {
      const updatedCard = {
        ...card,
        ...data,
        type: mode,
        level: undefined,
        examples: data?.examples ? data.examples.split("") : [], // temporary solution for examples needing to be in array. need to refactor backend
        tags,
      };

      await updateCard(updatedCard);
      showNotification({
        title: "Card updated",
        message: "Successfully changed card",
      });
    } else {
      await createCard(newCard);
      setTags([]);
      setValueCard("front", "");
      setValueCard("back", "");
      setValueCard("audio", "");
      showNotification({
        title: "Card Created",
        message: "Successfully created card",
      });
    }
  };

  const handleAddTag = ({ tag }: {tag: string}) => {
    if (!(tags?.includes(tag))) {
      setTags(tags?.concat(tag));
      setValueTag("tag", "");
    } else {
      setErrorTag("tag", {
        type: "manual",
        message: "Tag already added",
      });
    }
  };

  return (
    <Stack
      id="cardEditor"
    >
      <Group noWrap spacing="lg">
        <Stack spacing="sm" align="center">
          <ActionIcon size="5rem" color="blue" variant={mode === "classic" ? "filled" : "light"} onClick={() => setMode("classic")}>
            <Icon360 size="2rem" />
          </ActionIcon>
          <Text fz="sm">Classic</Text>
          <Text fz="xs" c="dimmed" lh="0">flip to reveal</Text>
        </Stack>

        <Stack spacing="sm" align="center">
          <ActionIcon size="5rem" color="blue" variant={mode === "cloze" ? "filled" : "light"} onClick={() => setMode("cloze")}>
            <IconUnderline size="2rem" />
          </ActionIcon>
          <Text fz="sm">Cloze</Text>
          <Text fz="xs" c="dimmed" lh="0">fill in the blanks</Text>
        </Stack>
      </Group>

      <form onSubmit={handleSubmitTag(handleAddTag)}>
        <Group spacing="sm" p="sm" sx={(theme) => ({ border: ".5px solid grey", borderRadius: theme.radius.sm })}>
          {tags?.map((tag: string) => <Badge key={tag}>{tag}</Badge>)}
          <Group noWrap>
            <TextInput
              radius="xl"
              styles={(theme) => ({
                input: {
                  border: "none",
                  background: theme.colorScheme === "light" ? theme.colors.gray[0] : theme.colors.dark[5],
                },
              })}
              {...registerTag("tag", {
                required: true,
                maxLength: {
                  value: 15,
                  message: "Max 15 characters",
                },
                pattern: /^(?!\s*$).+/,
              })}
              placeholder="add tag"
              error={errorsTag.tag?.message}
            />

            <ActionIcon color="blue" type="submit" variant="filled">
              <IconPlus />
            </ActionIcon>
          </Group>
        </Group>
      </form>

      <Group>
        <form onSubmit={handleSubmit(handleSearchWord)}>
          <TextInput
            // rightSection={<Loader size="xs" />}
            error={errors.word?.message}
            label="Autofill"
            description="Generates vocabulary card"
            {...register("word", {
              required: true,
            })}
          />

          <Button my="md" compact type="submit">
            Generate
          </Button>
        </form>
      </Group>

      <form onSubmit={handleSubmitCard(handleCreateCard)}>
        {mode === "classic" && (
        <Group grow>
          <Textarea
            id="input_front"
            autosize
            placeholder="Front of card"
            label="Front"
            error={errorsCard.front?.message}
            defaultValue={card?.front}
            {...registerCard("front", {
              required: "required",
              maxLength: {
                value: 254,
                message: "Maximum characters of 254.",
              },
            })}
          />

          <Textarea
            id="input_back"
            autosize
            placeholder="Back of card"
            {...registerCard("back", {
              required: "required",
              maxLength: {
                value: 254,
                message: "Maximum characters of 254.",
              },
            })}
            defaultValue={card?.back}
            label="Back"
            error={errorsCard.back?.message}
          />
        </Group>
        )}

        {/* / TODO: implement custom editor for cloze type. currently same as classic  */}
        {mode === "cloze" && (
        <Group grow>
          <Textarea
            id="input_front"
            autosize
            placeholder="Front of card"
            label="Front"
            error={errorsCard.front?.message}
            defaultValue={card?.front}
            {...registerCard("front", {
              required: "required",
              maxLength: {
                value: 254,
                message: "Maximum characters of 254.",
              },
            })}
          />

          <Textarea
            id="input_back"
            autosize
            placeholder="Back of card"
            {...registerCard("back", {
              required: "required",
              maxLength: {
                value: 254,
                message: "Maximum characters of 254.",
              },
            })}
            defaultValue={card?.back}
            label="Back"
            error={errorsCard.back?.message}
          />
        </Group>
        )}

        <Textarea
          id="input_notes"
          autosize
          placeholder="Card notes..."
          label="Notes"
          error={errorsCard.examples?.message}
          defaultValue={card?.examples}
          {...registerCard("examples", {
            maxLength: {
              value: 254,
              message: "Maximum characters of 254.",
            },
          })}
        />

        <TextInput
          {...registerCard("audio")}
          placeholder="URL"
          defaultValue={card?.audio}
          label="Audio Url"
          error={errorsCard.audio?.message}
        />

        <Button loading={isLoadingCreate || isLoadingUpdate} mt="md" id="create" type="submit">
          {card ? "Edit" : "Create"}
        </Button>
      </form>
    </Stack>
  );
};

export default CardEditor;
