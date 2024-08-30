import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getUsers: builder.query<any, { limit: number; skip: number }>({
      query: ({ limit, skip }) => `users?limit=${limit}&skip=${skip}`,
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
