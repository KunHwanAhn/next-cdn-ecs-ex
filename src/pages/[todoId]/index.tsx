import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  DehydratedState, QueryClient, dehydrate, useQuery,
} from '@tanstack/react-query';

import { QUERY_KEY } from '@/constants/index';
import { getTodo } from '@/services/index';
import { getQueryStringAsString } from '@/utils/index';
import { Todo } from '@/@types/index';
import style from './index.module.scss';

type TodoItemSsrProps = { dehydratedState: DehydratedState; };
type TodoItemId = string;
interface TodoItemPageParams extends ParsedUrlQuery {
  todoId: TodoItemId;
}
type GetTodoQueryKey = readonly [typeof QUERY_KEY.TODO, TodoItemId];
// eslint-disable-next-line max-len
export const getServerSideProps: GetServerSideProps<TodoItemSsrProps, TodoItemPageParams> = async (ctx) => {
  const queryClient = new QueryClient();
  const todoId = ctx.params?.todoId;

  if (todoId) {
    await queryClient.prefetchQuery<Todo, unknown, Todo, GetTodoQueryKey>({
      queryKey: [QUERY_KEY.TODO, todoId],
      queryFn: (prefetchCtx) => {
        const [, prefetchTodoId] = prefetchCtx.queryKey;

        return getTodo({ todoId: prefetchTodoId });
      },
    });
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function TodoDetail() {
  const router = useRouter();
  const todoId = getQueryStringAsString(router.query.todoId);

  const {
    isLoading: isTodoLoading,
    data: todoItem,
  } = useQuery<Todo, unknown, Todo, GetTodoQueryKey>(
    {
      queryKey: [QUERY_KEY.TODO, todoId],
      queryFn: async (queryCtx) => {
        const [, queryTodoId] = queryCtx.queryKey;

        return getTodo({ todoId: queryTodoId });
      },
    },
  );

  return (
    <>
      <Head>
        <title>{`Detail - #${todoId}`}</title>
      </Head>
      <div className={style['move-list']}>
        <Link href="/">{'< 목록으로'}</Link>
      </div>
      {isTodoLoading && <div>loading...</div>}
      {!isTodoLoading && todoItem && (
        <>
          <h3 className={style.title}>{`Detail Page / #${todoId}`}</h3>
          <div>{todoItem.title}</div>
        </>
      )}

    </>
  );
}
