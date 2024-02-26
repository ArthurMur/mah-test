'use client';
import React, { useState } from 'react';
import Header from './components/Header/Header';
import styles from './page.module.css';
import DayDataField from './components/DayDataField/DayDataField';

interface Props {}

const Home: React.FC<Props> = () => {
  // Состояние для хранения текущей даты
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  // Функция для проверки, является ли заданная дата сегодняшней
  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Функция для изменения текущей даты на определенное количество дней вперед или назад
  const handleDateChange = (amount: number): void => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + amount);
    setCurrentDate(newDate);
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Header
          onPrevClick={() => handleDateChange(-1)}
          onNextClick={() => handleDateChange(1)}
          disableNext={isToday(currentDate)}
          currentDate={currentDate}
          onSelectDate={setCurrentDate}
        />
        <DayDataField date={currentDate} />
      </div>
    </main>
  );
};

export default Home;
