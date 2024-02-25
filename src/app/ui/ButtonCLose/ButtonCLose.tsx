import React from 'react';
import styles from './ButtonCLose.module.scss';

type Props = { onClick: () => void };

export default function ButtonCLose({ onClick }: Props) {
  return (
    <button className={styles.buttonCLose} onClick={onClick}>
      Закрыть
    </button>
  );
}
