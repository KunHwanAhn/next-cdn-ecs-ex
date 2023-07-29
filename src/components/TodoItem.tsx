import React from 'react';
import Link from 'next/link';

import logger from '@/logger';

import styles from './TodoItem.module.scss';

interface TodoItemProps {
  id: number;
  text: string;
}
export default function TodoItem({ id, text }: TodoItemProps) {
  const removeTodo = (targetId: number) => {
    logger.info(`remove ${targetId}`);
  };

  return (
    <li className={styles['todo-item']}>
      <Link href={`/${id}`}>
        {text}
      </Link>
      <button
        type="button"
        onClick={() => { removeTodo(id); }}
      >
        삭제
      </button>
    </li>
  );
}
