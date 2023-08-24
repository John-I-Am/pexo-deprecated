/* eslint-disable react/jsx-props-no-spreading */
import { ReactElement, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  TextInput, Button, Badge, Group, Stack, ActionIcon, Text,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Card, NewCard } from "types";

import {
  Icon360, IconPlus, IconUnderline,
} from "@tabler/icons-react";

import TextEditor from "../../components/TextEditor";
import dictionaryService from "../../services/dictionary";
import { useAppSelector } from "../../hooks/hooks";
import { useCreateCardMutation, useUpdateCardMutation } from "../api/apiSlice";

/* VERY MESSY FILE, REFACTOR NEEDED */

type FormValueWord = {
  word: string
}

type FormValueTag = {
  tag: string
}

type FormValueCard = {
  front: string;
  back: string;
  notes: string;
  audio: string;
}

type CardEditorProp = {
  card: Card | null | undefined
}

const CardEditor = ({ card }: CardEditorProp): ReactElement => {
  const activeDeckId = useAppSelector((state: any) => state.decks.activeDeckId);
  const [tags, setTags] = useState(card ? card.tags : []);

  const [mode, setMode] = useState<any>(card?.content.type || "classic");

  const [createCard, { isLoading: isLoadingCreate }] = useCreateCardMutation();
  const [updateCard, { isLoading: isLoadingUpdate }] = useUpdateCardMutation();

  // react-hook-form controller value (for tiptap editor) can not and should not
  // (according to RHF docs) be changed via setValue api. So the below is a workaround;
  // values will be passed to editor when
  // user generates values from handleSearchWord function
  const [autofillFront, setAutofillFront] = useState<any>("");
  const [autofillBack, setAutofillBack] = useState<any>("");

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
    control: controlCard,
  } = useForm<FormValueCard>({
    defaultValues:
    {
      front: (card?.content as any)?.front || "",
      back: (card?.content as any)?.back || "",
      notes: (card?.notes as any) || "",
    },
  });

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
      // below code required to programmatically change editor content
      setAutofillFront(word);
      setAutofillBack(entry.definition);
      // below code still required for RHF to know content been changed
      setValueCard("front", word);
      setValueCard("back", entry.definition);
      setValueCard("audio", (entry.pronunciation));
      setValueCard("notes", entry?.examples?.join("\n"));
    } catch (e) {
      setError("word", {
        type: "manual",
        message: "Unable to find definition, check your spelling",
      });
    }
  };

  const handleCreateCard = async (data: FormValueCard): Promise<void> => {
    const newCard: NewCard = {
      content: { type: mode, front: data.front, back: data.back },
      notes: data?.notes ? data.notes : "",
      tags,
      deckId: activeDeckId,
      audio: "",
    };

    if (card) {
      const updatedCard = {
        ...card,
        content: { ...data, type: mode },
        level: undefined,
        notes: data?.notes ? data.notes : "",
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
        <Stack spacing="lg">
          {mode === "classic" as any && (
          <Stack spacing="lg">
            <Controller
              control={controlCard}
              rules={{
                required: "required",
                maxLength: {
                  value: 254,
                  message: "Maximum characters of 254.",
                },
              }}
              name="front"
              render={({
                field: {
                  onChange,
                  value,
                },
              }) => (
                <TextEditor
                  label="Front"
                  type="classic"
                  content={value}
                  onChange={onChange}
                  autofill={autofillFront}
                />
              )}
            />
            {errorsCard.front && <Text fz="xs" c="red">{errorsCard.front.message}</Text>}

            <Controller
              control={controlCard}
              rules={{
                required: "required",
                maxLength: {
                  value: 254,
                  message: "Maximum characters of 254.",
                },
              }}
              name="back"
              render={({
                field: {
                  onChange,
                  value,
                },
              }) => (
                <TextEditor
                  label="Back"
                  type="classic"
                  content={value}
                  onChange={onChange}
                  autofill={autofillBack}
                />
              )}
            />
            {errorsCard.back && <Text fz="xs" c="red">{errorsCard.back.message}</Text>}
          </Stack>
          )}

          {mode === "cloze" && (
          <Stack>
            <Controller
              control={controlCard}
              rules={{
                required: "required",
                maxLength: {
                  value: 254,
                  message: "Maximum characters of 254.",
                },
              }}
              name="front"
              render={({
                field: {
                  onChange,
                },
              }) => (
                <TextEditor
                  label="Cloze content"
                  type="cloze"
                  content={(card?.content as any)?.front || ""}
                  onChange={onChange}
                />
              )}
            />
          </Stack>
          )}

          <Stack>
            <Controller
              control={controlCard}
              rules={{
                maxLength: {
                  value: 254,
                  message: "Maximum characters of 254.",
                },
              }}
              name="notes"
              render={({
                field: {
                  onChange,
                  value,
                },
              }) => (
                <TextEditor
                  label="Notes"
                  type="classic"
                  content={value}
                  onChange={onChange}
                />
              )}
            />
            {errorsCard.notes?.message}
          </Stack>

          <TextInput
            {...registerCard("audio")}
            placeholder="URL"
            defaultValue={card?.audio}
            label="Audio Url"
            error={errorsCard.audio?.message}
            styles={(theme) => ({ label: { fontSize: theme.fontSizes.xs } })}
          />

          <Button loading={isLoadingCreate || isLoadingUpdate} mt="md" id="create" type="submit">
            {card ? "Edit" : "Create"}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default CardEditor;
