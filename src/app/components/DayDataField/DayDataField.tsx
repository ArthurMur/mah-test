import React, { useEffect, useState } from 'react';
import styles from './DayDataField.module.scss';
import { colors } from '@/app/utils/constants';

type Props = { date: Date };

export default function DayDataField({ date }: Props) {
  const [selectedDates, setSelectedDates] = useState<any[]>([]); // Здесь будем хранить данные из localStorage

  useEffect(() => {
    // Получаем данные из localStorage при монтировании компонента
    const storedDates = localStorage.getItem('selectedDates');
    if (storedDates) {
      setSelectedDates(JSON.parse(storedDates));
    } else {
      // Если в localStorage нет сохраненных дат, устанавливаем по умолчанию цвет "gray"
      updateLocalStorage(date.toDateString(), 'gray');
    }
  }, []);

  const handleTextClick = (selectedDate: string, color: string) => {
    updateLocalStorage(selectedDate, color);
  };

  const updateLocalStorage = (selectedDate: string, color: string) => {
    // Получаем текущий массив дат и цветов из localStorage
    const existingDates = JSON.parse(
      localStorage.getItem('selectedDates') || '[]'
    );

    // Проверяем, есть ли уже выбранная дата в массиве
    const index = existingDates.findIndex(
      (entry: any) => entry.date === selectedDate
    );

    // Если дата уже есть, обновляем ее цвет
    if (index !== -1) {
      existingDates[index].color = color;
    } else {
      // Если даты еще нет, добавляем новую запись
      existingDates.push({ date: selectedDate, color: color });
    }

    // Обновляем массив в localStorage
    localStorage.setItem('selectedDates', JSON.stringify(existingDates));
    // Обновляем состояние
    setSelectedDates(existingDates);
  };

  const dateString = date.toDateString();

  return (
    <div className={styles.dayDataField}>
      {colors.map((item, index) => (
        <div
          key={index}
          style={{ color: item.color }}
          onClick={() => handleTextClick(dateString, item.color)}
          className={
            selectedDates.find(
              (entry) => entry.date === dateString && entry.color === item.color
            )
              ? styles.selectedColor
              : ''
          }
        >
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
}
