import React from 'react';
import styles from './Button.module.scss';

type Props = { onClick: () => void; disabled: boolean };

export default function ButtonRight({ onClick, disabled }: Props) {
  return (
    <button className={styles.button} onClick={onClick} disabled={disabled}>
      ﹥
    </button>
  );
}
