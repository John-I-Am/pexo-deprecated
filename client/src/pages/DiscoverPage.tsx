/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import { Group, Stack } from "@mantine/core";
import { ReactElement, useState } from "react";
import SearchBar from "../components/SearchBar";
import Deck from "../features/decks/Deck/Deck";
import { useAppDispatch } from "../hooks/hooks";
import { alphabetCards, monthCards } from "../utils/demoCards";

const DiscoverPage = (): ReactElement => {
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<string>("");

  return (
    <Stack>
      <SearchBar />
      <Group>
        <Deck cards={alphabetCards} />
        <Deck cards={monthCards} />
      </Group>
    </Stack>
  );
};

export default DiscoverPage;
