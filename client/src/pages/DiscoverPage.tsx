/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import { Group, Stack } from "@mantine/core";
import { ReactElement, useState } from "react";
import SearchBar from "../components/SearchBar";
import DeckInfo from "../features/decks/Deck";
import { useAppDispatch } from "../hooks/hooks";
import { alphabetCards, monthCards } from "../utils/demoCards";

const DiscoverPage = (): ReactElement => {
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<string>("");

  return (
    <Stack>
      <SearchBar />
      <Group>
        <DeckInfo deck={alphabetCards} />
        <DeckInfo deck={monthCards} />
      </Group>
    </Stack>
  );
};

export default DiscoverPage;
