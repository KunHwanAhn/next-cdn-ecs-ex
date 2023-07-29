import React from 'react';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import {
  dehydrate, DehydratedState, QueryClient, useQuery,
} from '@tanstack/react-query';

import { QUERY_KEY } from '@/constants/index';
import { getTodos } from '@/services/index';

import TodoForm from '@/components/TodoForm';
import TodoItem from '@/components/TodoItem';

import style from './index.module.scss';

type TodoListSsrProps = { dehydratedState: DehydratedState; };
export const getServerSideProps: GetServerSideProps<TodoListSsrProps> = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY.TODOS],
    queryFn: () => getTodos(),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function TodoList() {
  const {
    isLoading: isTodoLoading,
    data: todoList,
  } = useQuery(
    {
      queryKey: [QUERY_KEY.TODOS],
      queryFn: () => getTodos(),
    },
  );

  return (
    <>
      <Head>
        <title>TODO List</title>
      </Head>
      {isTodoLoading && <div>loading...</div>}
      {!isTodoLoading && todoList && (
      <>
        <h1 className={style['todo-list-title']}>{`TODO #${todoList.length}`}</h1>
        <TodoForm />
        <ul className={style['todo-list-container']}>
          {todoList.map((todoItem) => (
            <TodoItem
              key={todoItem.id}
              id={todoItem.id}
              text={todoItem.title}
            />
          ))}
        </ul>
      </>
      )}
    </>
  );
}
