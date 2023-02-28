/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DeckState {
  activeDeckId: number | null;
  tags: string[],
}

const deckSlice = createSlice({
  name: "decks",
  initialState: {
    activeDeckId: null,
    tags: [] as string[],
  } as DeckState,
  reducers: {
    setActive(state: DeckState, action: PayloadAction<number | null>) {
      state.activeDeckId = action.payload;
      state.tags = [];
    },
    addTag(state: DeckState, action: PayloadAction<string>) {
      if (!state.tags.includes(action.payload)) {
        state.tags.push(action.payload);
      } else {
        state.tags = state.tags.filter((tag: string) => tag !== action.payload);
      }
    },
  },
});

export const { setActive, addTag } = deckSlice.actions;

export default deckSlice.reducer;
