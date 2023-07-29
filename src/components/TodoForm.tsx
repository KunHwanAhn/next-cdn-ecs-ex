import React, { useState } from 'react';

import styles from './TodoForm.module.scss';

export default function TodoForm() {
  const [text, setText] = useState('');
  const disabled = text === '';

  function updateText(event: React.ChangeEvent<HTMLInputElement>) {
    setText(() => event.target.value);
  }

  function addNewTodo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setText(() => '');

    // TODO: TODO 아이템 추가 API 연동
  }

  return (
    <form
      className={styles['todo-form']}
      onSubmit={addNewTodo}
    >
      <input
        type="text"
        value={text}
        onChange={updateText}
      />
      <button
        type="submit"
        disabled={disabled}
      >
        추가
      </button>
    </form>
  );
}
