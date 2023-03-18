import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../../store";

export const apiSlice: any = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).user;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["User", "Deck", "Card"],
  endpoints: (builder) => ({
    authenticateUser: builder.query({
      query: (UserCredentials) => ({
        url: "/login",
        method: "POST",
        body: UserCredentials,
      }),
    }),
    createUser: builder.mutation({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
      providesTags: ["User"] as any,
    }),
    getUser: builder.query({
      query: (userId) => `/users/${userId}`,
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (updatedUser) => ({
        url: `/users/${updatedUser.id}`,
        method: "PUT",
        body: updatedUser,
      }),
      providesTags: ["User"] as any,
      invalidatesTags: ["User"],
    }),
    getDecks: builder.query({
      query: () => ({
        url: "/decks",
        method: "GET",
      }),
      providesTags: ["Deck"],
    }),
    addNewDeck: builder.mutation({
      query: () => ({
        url: "/decks",
        method: "POST",
      }),
      providesTags: ["Deck"] as any,
      invalidatesTags: ["Deck"],
    }),
    updateDeck: builder.mutation({
      query: (updatedDeck) => ({
        url: `/decks/${updatedDeck.id}`,
        method: "PUT",
        body: updatedDeck,
      }),
      providesTags: ["Deck"] as any,
      invalidatesTags: ["Deck"],
    }),
    deleteDeck: builder.mutation({
      query: (deckToDeleteId) => ({
        url: `/decks/${deckToDeleteId}`,
        method: "DELETE",
      }),
      providesTags: ["Deck"] as any,
      invalidatesTags: ["Deck"],
    }),
    createCard: builder.mutation({
      query: (newCard) => ({
        url: "/cards",
        method: "POST",
        body: newCard,
      }),
      providesTags: ["Card"] as any,
      invalidatesTags: ["Card", "Deck"],
    }),
    updateCard: builder.mutation({
      query: (updatedCard) => ({
        url: `/cards/${updatedCard.id}`,
        method: "PUT",
        body: updatedCard,
      }),
      providesTags: ["Card"] as any,
      invalidatesTags: ["Card", "Deck"],
    }),
    deleteCard: builder.mutation({
      query: (cardToDelete) => ({
        url: `/cards/${cardToDelete.id}`,
        method: "DELETE",
      }),
      providesTags: ["Card"] as any,
      invalidatesTags: ["Card", "Deck"],
    }),
  }),
});

export const {
  useAuthenticateUserQuery,
  useCreateUserMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useGetDecksQuery,
  useAddNewDeckMutation,
  useUpdateDeckMutation,
  useDeleteDeckMutation,
  useCreateCardMutation,
  useUpdateCardMutation,
  useDeleteCardMutation,
} = apiSlice;
