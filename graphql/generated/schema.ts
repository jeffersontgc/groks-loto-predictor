import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateSorteoInput = {
  drawDate: Scalars['String']['input'];
  drawNumber: Scalars['String']['input'];
  drawTime: Scalars['String']['input'];
  multiplier: Scalars['String']['input'];
  multiplierValue: Scalars['String']['input'];
  winningNumber: Scalars['Int']['input'];
};

export type HitRate = {
  __typename?: 'HitRate';
  hitRate: Scalars['Int']['output'];
  hits: Scalars['Int']['output'];
  source: Scalars['String']['output'];
  totalSuggested: Scalars['Int']['output'];
};

export type Metrics = {
  __typename?: 'Metrics';
  aiMetrics: HitRate;
  crossMetrics: HitRate;
  grokMetrics: HitRate;
};

export type Mutation = {
  __typename?: 'Mutation';
  createSorteo: SuccessResponse;
  deleteSorteo: SuccessResponse;
  updateSorteo: SuccessResponse;
};


export type MutationCreateSorteoArgs = {
  args: CreateSorteoInput;
};


export type MutationDeleteSorteoArgs = {
  uuid: Scalars['String']['input'];
};


export type MutationUpdateSorteoArgs = {
  args: UpdateSorteoInput;
};

export type Query = {
  __typename?: 'Query';
  sorteoByUuid: Sorteo;
  sorteos: Array<Sorteo>;
  suggestNumbers: SuggestNumbersResponse;
};


export type QuerySorteoByUuidArgs = {
  uuid: Scalars['String']['input'];
};


export type QuerySuggestNumbersArgs = {
  drawDate: Scalars['String']['input'];
};

export type Sorteo = {
  __typename?: 'Sorteo';
  drawDate: Scalars['String']['output'];
  drawNumber: Scalars['String']['output'];
  drawTime: Scalars['String']['output'];
  id: Scalars['String']['output'];
  multiplier: Scalars['String']['output'];
  multiplierValue: Scalars['String']['output'];
  uuid: Scalars['String']['output'];
  winningNumber: Scalars['String']['output'];
};

export type SuccessResponse = {
  __typename?: 'SuccessResponse';
  status: Scalars['String']['output'];
};

export type SuggestNumbersResponse = {
  __typename?: 'SuggestNumbersResponse';
  message?: Maybe<Scalars['String']['output']>;
  metrics?: Maybe<Metrics>;
  numbers: Array<Scalars['Int']['output']>;
  status: Scalars['String']['output'];
};

export type UpdateSorteoInput = {
  drawDate?: InputMaybe<Scalars['String']['input']>;
  drawNumber?: InputMaybe<Scalars['String']['input']>;
  drawTime?: InputMaybe<Scalars['String']['input']>;
  multiplier?: InputMaybe<Scalars['String']['input']>;
  multiplierValue?: InputMaybe<Scalars['String']['input']>;
  uuid: Scalars['String']['input'];
  winningNumber?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateSorteoMutationVariables = Exact<{
  args: CreateSorteoInput;
}>;


export type CreateSorteoMutation = { __typename?: 'Mutation', createSorteo: { __typename?: 'SuccessResponse', status: string } };

export type UpdateSorteoMutationVariables = Exact<{
  args: UpdateSorteoInput;
}>;


export type UpdateSorteoMutation = { __typename?: 'Mutation', updateSorteo: { __typename?: 'SuccessResponse', status: string } };

export type DeleteSorteoMutationVariables = Exact<{
  uuid: Scalars['String']['input'];
}>;


export type DeleteSorteoMutation = { __typename?: 'Mutation', deleteSorteo: { __typename?: 'SuccessResponse', status: string } };

export type SorteoByUuidQueryVariables = Exact<{
  uuid: Scalars['String']['input'];
}>;


export type SorteoByUuidQuery = { __typename?: 'Query', sorteoByUuid: { __typename?: 'Sorteo', id: string, uuid: string, drawDate: string, drawTime: string, drawNumber: string, winningNumber: string, multiplier: string, multiplierValue: string } };

export type GetSorteosQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSorteosQuery = { __typename?: 'Query', sorteos: Array<{ __typename?: 'Sorteo', id: string, uuid: string, drawDate: string, drawTime: string, drawNumber: string, winningNumber: string, multiplier: string, multiplierValue: string }> };

export type SuggestNumbersQueryVariables = Exact<{
  drawDate: Scalars['String']['input'];
}>;


export type SuggestNumbersQuery = { __typename?: 'Query', suggestNumbers: { __typename?: 'SuggestNumbersResponse', status: string, numbers: Array<number>, message?: string | null, metrics?: { __typename?: 'Metrics', aiMetrics: { __typename?: 'HitRate', source: string, hitRate: number, hits: number, totalSuggested: number }, grokMetrics: { __typename?: 'HitRate', source: string, hitRate: number, hits: number, totalSuggested: number }, crossMetrics: { __typename?: 'HitRate', source: string, hitRate: number, hits: number, totalSuggested: number } } | null } };


export const CreateSorteoDocument = gql`
    mutation CreateSorteo($args: CreateSorteoInput!) {
  createSorteo(args: $args) {
    status
  }
}
    `;
export type CreateSorteoMutationFn = Apollo.MutationFunction<CreateSorteoMutation, CreateSorteoMutationVariables>;

/**
 * __useCreateSorteoMutation__
 *
 * To run a mutation, you first call `useCreateSorteoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSorteoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSorteoMutation, { data, loading, error }] = useCreateSorteoMutation({
 *   variables: {
 *      args: // value for 'args'
 *   },
 * });
 */
export function useCreateSorteoMutation(baseOptions?: Apollo.MutationHookOptions<CreateSorteoMutation, CreateSorteoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSorteoMutation, CreateSorteoMutationVariables>(CreateSorteoDocument, options);
      }
export type CreateSorteoMutationHookResult = ReturnType<typeof useCreateSorteoMutation>;
export type CreateSorteoMutationResult = Apollo.MutationResult<CreateSorteoMutation>;
export type CreateSorteoMutationOptions = Apollo.BaseMutationOptions<CreateSorteoMutation, CreateSorteoMutationVariables>;
export const UpdateSorteoDocument = gql`
    mutation UpdateSorteo($args: UpdateSorteoInput!) {
  updateSorteo(args: $args) {
    status
  }
}
    `;
export type UpdateSorteoMutationFn = Apollo.MutationFunction<UpdateSorteoMutation, UpdateSorteoMutationVariables>;

/**
 * __useUpdateSorteoMutation__
 *
 * To run a mutation, you first call `useUpdateSorteoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSorteoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSorteoMutation, { data, loading, error }] = useUpdateSorteoMutation({
 *   variables: {
 *      args: // value for 'args'
 *   },
 * });
 */
export function useUpdateSorteoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSorteoMutation, UpdateSorteoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSorteoMutation, UpdateSorteoMutationVariables>(UpdateSorteoDocument, options);
      }
export type UpdateSorteoMutationHookResult = ReturnType<typeof useUpdateSorteoMutation>;
export type UpdateSorteoMutationResult = Apollo.MutationResult<UpdateSorteoMutation>;
export type UpdateSorteoMutationOptions = Apollo.BaseMutationOptions<UpdateSorteoMutation, UpdateSorteoMutationVariables>;
export const DeleteSorteoDocument = gql`
    mutation DeleteSorteo($uuid: String!) {
  deleteSorteo(uuid: $uuid) {
    status
  }
}
    `;
export type DeleteSorteoMutationFn = Apollo.MutationFunction<DeleteSorteoMutation, DeleteSorteoMutationVariables>;

/**
 * __useDeleteSorteoMutation__
 *
 * To run a mutation, you first call `useDeleteSorteoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSorteoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSorteoMutation, { data, loading, error }] = useDeleteSorteoMutation({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useDeleteSorteoMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSorteoMutation, DeleteSorteoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSorteoMutation, DeleteSorteoMutationVariables>(DeleteSorteoDocument, options);
      }
export type DeleteSorteoMutationHookResult = ReturnType<typeof useDeleteSorteoMutation>;
export type DeleteSorteoMutationResult = Apollo.MutationResult<DeleteSorteoMutation>;
export type DeleteSorteoMutationOptions = Apollo.BaseMutationOptions<DeleteSorteoMutation, DeleteSorteoMutationVariables>;
export const SorteoByUuidDocument = gql`
    query SorteoByUuid($uuid: String!) {
  sorteoByUuid(uuid: $uuid) {
    id
    uuid
    drawDate
    drawTime
    drawNumber
    winningNumber
    multiplier
    multiplierValue
  }
}
    `;

/**
 * __useSorteoByUuidQuery__
 *
 * To run a query within a React component, call `useSorteoByUuidQuery` and pass it any options that fit your needs.
 * When your component renders, `useSorteoByUuidQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSorteoByUuidQuery({
 *   variables: {
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useSorteoByUuidQuery(baseOptions: Apollo.QueryHookOptions<SorteoByUuidQuery, SorteoByUuidQueryVariables> & ({ variables: SorteoByUuidQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SorteoByUuidQuery, SorteoByUuidQueryVariables>(SorteoByUuidDocument, options);
      }
export function useSorteoByUuidLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SorteoByUuidQuery, SorteoByUuidQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SorteoByUuidQuery, SorteoByUuidQueryVariables>(SorteoByUuidDocument, options);
        }
export function useSorteoByUuidSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SorteoByUuidQuery, SorteoByUuidQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SorteoByUuidQuery, SorteoByUuidQueryVariables>(SorteoByUuidDocument, options);
        }
export type SorteoByUuidQueryHookResult = ReturnType<typeof useSorteoByUuidQuery>;
export type SorteoByUuidLazyQueryHookResult = ReturnType<typeof useSorteoByUuidLazyQuery>;
export type SorteoByUuidSuspenseQueryHookResult = ReturnType<typeof useSorteoByUuidSuspenseQuery>;
export type SorteoByUuidQueryResult = Apollo.QueryResult<SorteoByUuidQuery, SorteoByUuidQueryVariables>;
export const GetSorteosDocument = gql`
    query GetSorteos {
  sorteos {
    id
    uuid
    drawDate
    drawTime
    drawNumber
    winningNumber
    multiplier
    multiplierValue
  }
}
    `;

/**
 * __useGetSorteosQuery__
 *
 * To run a query within a React component, call `useGetSorteosQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSorteosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSorteosQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSorteosQuery(baseOptions?: Apollo.QueryHookOptions<GetSorteosQuery, GetSorteosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSorteosQuery, GetSorteosQueryVariables>(GetSorteosDocument, options);
      }
export function useGetSorteosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSorteosQuery, GetSorteosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSorteosQuery, GetSorteosQueryVariables>(GetSorteosDocument, options);
        }
export function useGetSorteosSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSorteosQuery, GetSorteosQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSorteosQuery, GetSorteosQueryVariables>(GetSorteosDocument, options);
        }
export type GetSorteosQueryHookResult = ReturnType<typeof useGetSorteosQuery>;
export type GetSorteosLazyQueryHookResult = ReturnType<typeof useGetSorteosLazyQuery>;
export type GetSorteosSuspenseQueryHookResult = ReturnType<typeof useGetSorteosSuspenseQuery>;
export type GetSorteosQueryResult = Apollo.QueryResult<GetSorteosQuery, GetSorteosQueryVariables>;
export const SuggestNumbersDocument = gql`
    query SuggestNumbers($drawDate: String!) {
  suggestNumbers(drawDate: $drawDate) {
    status
    numbers
    message
    metrics {
      aiMetrics {
        source
        hitRate
        hits
        totalSuggested
      }
      grokMetrics {
        source
        hitRate
        hits
        totalSuggested
      }
      crossMetrics {
        source
        hitRate
        hits
        totalSuggested
      }
    }
  }
}
    `;

/**
 * __useSuggestNumbersQuery__
 *
 * To run a query within a React component, call `useSuggestNumbersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSuggestNumbersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSuggestNumbersQuery({
 *   variables: {
 *      drawDate: // value for 'drawDate'
 *   },
 * });
 */
export function useSuggestNumbersQuery(baseOptions: Apollo.QueryHookOptions<SuggestNumbersQuery, SuggestNumbersQueryVariables> & ({ variables: SuggestNumbersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SuggestNumbersQuery, SuggestNumbersQueryVariables>(SuggestNumbersDocument, options);
      }
export function useSuggestNumbersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SuggestNumbersQuery, SuggestNumbersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SuggestNumbersQuery, SuggestNumbersQueryVariables>(SuggestNumbersDocument, options);
        }
export function useSuggestNumbersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SuggestNumbersQuery, SuggestNumbersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SuggestNumbersQuery, SuggestNumbersQueryVariables>(SuggestNumbersDocument, options);
        }
export type SuggestNumbersQueryHookResult = ReturnType<typeof useSuggestNumbersQuery>;
export type SuggestNumbersLazyQueryHookResult = ReturnType<typeof useSuggestNumbersLazyQuery>;
export type SuggestNumbersSuspenseQueryHookResult = ReturnType<typeof useSuggestNumbersSuspenseQuery>;
export type SuggestNumbersQueryResult = Apollo.QueryResult<SuggestNumbersQuery, SuggestNumbersQueryVariables>;