/* eslint-disable react/jsx-props-no-spreading */
import { ReactElement, useState } from "react";
import { useForm } from "react-hook-form";

import {
  Textarea, TextInput, Button, Radio, Badge,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
  Card, CardType, DictionaryEntry, NewCard,
} from "types";
import {
  TagList, Container, MainContent, SecondaryContent, InputContainer,
} from "./style";
import { Error } from "../../../sharedStyles";

import { useAppSelector } from "../../../hooks/hooks";
import dictionaryService from "../../../services/dictionary";
import { useCreateCardMutation, useUpdateCardMutation } from "../../api/apiSlice";

type FormValueWord = {
  word: string
}

type FormValueTag = {
  tag: string
}

type FormValueCard = {
  front: string,
  back: string
  type: CardType,
  audio: string
}

type Prop = {
  card: Card | null | undefined
}

const CardEditor = ({ card }: Prop): ReactElement => {
  const activeDeckId = useAppSelector((state: any) => state.decks.activeDeckId);

  const [examples, setExamples] = useState<any>(card?.examples ? card.examples : []);
  const [tags, setTags] = useState(card ? card.tags : []);

  const [createCard] = useCreateCardMutation();
  const [updateCard] = useUpdateCardMutation();

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
      const entry: DictionaryEntry = await dictionaryService.define(word);
      setValueCard("front", word);
      setValueCard("back", entry.definition);
      setValueCard("audio", (entry.pronunciation));
      setExamples(examples.concat(entry.examples));
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
      tags,
      deckId: activeDeckId,
      examples,
    };

    if (card) {
      const updatedCard = {
        ...card,
        ...data,
        tags,
        examples,
      };

      await updateCard(updatedCard);
      showNotification({
        title: "Card updated",
        message: "Successfully changed card",
      });
    } else {
      await createCard(newCard);
      setExamples([]);
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
    <Container id="cardEditor">
      <MainContent>
        <form onSubmit={handleSubmitCard(handleCreateCard)}>
          <fieldset>
            <legend>Choose Card Type</legend>
            <Radio {...registerCard("type", { required: "required" })} value="classic" label="Classic" description="Both sides will be visible" defaultChecked={card?.type === "classic"} />
            <Radio id="input_cloze" {...registerCard("type")} value="cloze" label="Cloze" description="Front value will be the answer key" defaultChecked={card?.type === "cloze"} />
            <Error>
              { errorsCard.type?.message }
            </Error>
          </fieldset>

          <InputContainer>
            <TextInput
              {...registerCard("audio")}
              placeholder="URL"
              defaultValue={card?.audio}
              label="Audio Url"
            />
            <Error>
              { errorsCard.audio?.message }
            </Error>
          </InputContainer>

          <InputContainer>
            <Textarea
              id="input_front"
              placeholder="2+2...?"
              defaultValue={card?.front}
              label="Front"
              {...registerCard("front", {
                required: "required",
                maxLength: {
                  value: 254,
                  message: "Maximum characters of 254.",
                },
              })}
            />
            <Error>
              {errorsCard.front?.message }
            </Error>
          </InputContainer>

          <InputContainer>
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
              placeholder="4!"
              label="Back"
            />
            <Error>
              { errorsCard.back?.message }
            </Error>
          </InputContainer>

          <Button id="create" type="submit">
            {card ? "Edit" : "Create"}
          </Button>
        </form>
      </MainContent>

      <SecondaryContent>
        <form onSubmit={handleSubmit(handleSearchWord)}>
          <InputContainer>
            <TextInput
              label="Dictionary Lookup"
              {...register("word", {
                required: "required",
                disabled: true,
              })}
            />
            <Error>
              { errors.word?.message }
            </Error>
          </InputContainer>

          <Button compact type="submit" disabled>
            Generate card
          </Button>
        </form>

        <form onSubmit={handleSubmitTag(handleAddTag)}>
          <InputContainer>
            <TextInput
              {...registerTag("tag", {
                required: "required",
                maxLength: {
                  value: 15,
                  message: "Maximum of 15 characters",
                },
              })}
              placeholder="tag"
              label="Add Tags"
            />
            <Error>
              { errorsTag.tag?.message }
            </Error>
          </InputContainer>

          <Button compact type="submit"> Add Tag </Button>
        </form>

        <TagList>
          {tags?.map((tag: string) => <Badge key={tag}>{tag}</Badge>)}
        </TagList>
      </SecondaryContent>
    </Container>
  );
};

export default CardEditor;
