import React from 'react';
import styles from './Button.module.scss';

type Props = { onClick: () => void };

export default function ButtonLeft({ onClick }: Props) {
  return (
    <button className={styles.button} onClick={onClick}>
      ﹤
    </button>
  );
}
