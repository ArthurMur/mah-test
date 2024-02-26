import React from 'react';
import styles from './ButtonSelect.module.scss';

type Props = {};

export default function ButtonSelect({}: Props) {
  return <button className={styles.button}>Выбрать</button>;
}
