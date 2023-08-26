/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import { ReactElement, useState } from "react";
import { useForm } from "react-hook-form";

import {
  TextInput, Button, Badge, Group, Stack, ActionIcon, Text,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Card, NewCard } from "types";

import {
  Icon360, IconPlus, IconUnderline,
} from "@tabler/icons-react";

import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { useEditor } from "@tiptap/react";
import { useCreateCardMutation, useUpdateCardMutation } from "../api/apiSlice";
import { useAppSelector } from "../../hooks/hooks";
import dictionaryService from "../../services/dictionary";
import TextEditor from "../../components/TextEditor";

type FormValueWord = {
  word: string
}

type FormValueTag = {
  tag: string
}

type FormValueCard = {
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

  const editorExtensions = [
    StarterKit,
    Underline,
    TextAlign.configure({ types: ["heading", "paragraph"] }),
    Link,
    Highlight,
  ];

  const textEditorFront = useEditor({
    extensions: editorExtensions,
    content: (card?.content as any)?.front || (card?.content as any)?.hint || "",
    onUpdate({ editor }) {
      editor.getHTML();
    },
  });

  // Remap database data into JSON that can be used by editor
  let cardClozeReconstructed: any;
  if (card?.content.type === "cloze") {
    cardClozeReconstructed = card.content.text.map((ele) => {
      if (ele[1]) {
        return ({ type: "text", text: ele[0], marks: [{ type: "highlight" }] });
      }
      return ({ type: "text", text: ele[0] });
    });
  }

  const textEditorBack = useEditor({
    extensions: editorExtensions,
    content: (card?.content as any)?.back || {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: cardClozeReconstructed,
        },
      ],
    },
    onUpdate({ editor }) {
      editor.getHTML();
    },
  });

  const textEditorNote = useEditor({
    extensions: editorExtensions,
    content: (card?.notes as any) || "",
    onUpdate({ editor }) {
      editor.getHTML();
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
      textEditorFront?.commands.setContent(word);
      textEditorBack?.commands.setContent(entry.definition);
      textEditorNote?.commands.setContent(entry.examples);
      setValueCard("audio", (entry.pronunciation));
    } catch (e) {
      setError("word", {
        type: "manual",
        message: "Unable to find definition, check your spelling",
      });
    }
  };

  const handleCreateCard = async (data: FormValueCard): Promise<void> => {
    if (textEditorFront?.isEmpty) {
      textEditorFront?.commands.focus();
      return;
    }

    if (textEditorBack?.isEmpty) {
      textEditorBack?.commands.focus();
      return;
    }

    let content: any;

    if (mode === "classic") {
      content = {
        type: mode,
        front: textEditorFront?.getHTML() as any,
        back: textEditorBack?.getHTML() as any,
      };
    }

    if (mode === "cloze") {
      const editorOutput = textEditorBack?.getJSON()?.content?.[0].content;
      const text: any = [];
      editorOutput?.forEach((ele: any) => {
        if (ele.marks !== undefined) {
          text.push([ele.text, true]);
        } else {
          text.push([ele.text, false]);
        }
      });
      content = { type: mode, hint: textEditorFront?.getHTML() as any, text };
    }

    const newCard: NewCard = {
      content,
      notes: textEditorNote?.getHTML() as any,
      tags,
      deckId: activeDeckId,
      audio: "",
    };

    if (card) {
      const updatedCard = {
        ...card,
        content,
        level: undefined,
        notes: textEditorNote?.getHTML() as any,
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
          <ActionIcon
            size="5rem"
            color="blue"
            variant={mode === "cloze" ? "filled" : "light"}
            onClick={() => {
              setMode("cloze");
              textEditorBack?.chain() // removes all formatting when clicked; inconsistent
                .focus()
                .clearNodes()
                .unsetAllMarks()
                .run();
            }}
          >
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

          <Stack spacing="lg">
            <TextEditor label={mode === "classic" ? "Front" : "Hint"} type="classic" editor={textEditorFront} />
            <TextEditor label={mode === "classic" ? "Back" : "Cloze"} type={mode === "classic" ? "classic" : "cloze"} editor={textEditorBack} />
            <TextEditor label="Notes" type="classic" editor={textEditorNote} />
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
