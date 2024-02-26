import React from 'react';
import styles from './ButtonSelect.module.scss';

type Props = { onClick: () => void };

export default function ButtonSelect({ onClick }: Props) {
  return (
    <button className={styles.button} onClick={onClick}>
      Выбрать
    </button>
  );
}
