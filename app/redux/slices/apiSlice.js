import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Constants from '../../Constants';


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: Constants.BASE_URL }),
    endpoints: builder => ({
        getTags: builder.query({
            query: () => '/tags?sortBy=quoteCount',
        }),
        getAuthors: builder.query({
            query: (page = 1) => `/authors?limit=50&page=${page}&sortBy=quoteCount`,
        }),
        getQuotes: builder.query({
            query: ({ param, value, page }) => `/quotes?${param}=${value}&page=${page}`,
        }),
        searchQuotes: builder.query({
            query: ({ query, page }) => `/search/quotes?query=${query}&page=${page}`
        }),
    })
});


export const { useGetTagsQuery, useGetAuthorsQuery, useGetQuotesQuery, useSearchQuotesQuery } = apiSlice;