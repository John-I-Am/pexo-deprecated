/* eslint-disable react/jsx-props-no-spreading */
import { ReactElement, useState } from "react";
import { useForm } from "react-hook-form";

import {
  Textarea, TextInput, Button, Radio, Badge, Group, Stack,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Card, CardType, NewCard } from "types";

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
      examples: data?.examples ? data.examples.split("") : [], // temporary solution for examples needing to be in array. need to refactor backend
      tags,
      deckId: activeDeckId,
    };

    if (card) {
      const updatedCard = {
        ...card,
        ...data,
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
      <form onSubmit={handleSubmit(handleSearchWord)}>
        <TextInput
          error={errors.word?.message}
          label="Autogenerate Vocabulary Card"
          {...register("word", {
            required: "required",
          })}
        />

        <Button my="md" compact type="submit">
          Generate
        </Button>
      </form>

      <form onSubmit={handleSubmitTag(handleAddTag)}>
        <TextInput
          {...registerTag("tag", {
            required: "required",
            maxLength: {
              value: 15,
              message: "Maximum of 15 characters",
            },
          })}
          placeholder="tag"
          label="Tags"
          error={errorsTag.tag?.message}
        />
        <Button mt="xs" compact type="submit">
          Add
        </Button>
      </form>

      <Group spacing="xs">
        {tags?.map((tag: string) => <Badge key={tag}>{tag}</Badge>)}
      </Group>

      <form onSubmit={handleSubmitCard(handleCreateCard)}>
        <Radio.Group
          mb="md"
          name="cardMode"
          label="Select mode"
          defaultValue={card ? card.type : "classic"}
        >
          <Group mt="xs">
            <Radio
              checked
              value="classic"
              label="Classic"
              description="Both sides will be visible"
              {...registerCard("type")}
            />
            <Radio
              value="cloze"
              label="Cloze"
              description="Fill in the blank"
              id="input_cloze"
              {...registerCard("type")}
            />
          </Group>
        </Radio.Group>

        <Group grow>
          <Textarea
            id="input_front"
            placeholder="This will be your answer key in cloze mode"
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

        <Textarea
          id="input_notes"
          placeholder="Your notes"
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
