'use client';
import { useState } from 'react';
import Buttons from './components/Buttons/Buttons';
import styles from './page.module.css';
import DayDataField from './components/DayDataField/DayDataField';

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevDay = () => {
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);
    setCurrentDate(prevDate);
  };

  const handleSelectDate = (date: Date) => {
    setCurrentDate(date);
  };

  const handleNextDay = () => {
    if (currentDate.toDateString() === new Date().toDateString()) {
      return;
    }
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    setCurrentDate(nextDate);
  };

  const disableNext = currentDate.toDateString() === new Date().toDateString();
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Buttons
          onPrevClick={handlePrevDay}
          onNextClick={handleNextDay}
          disableNext={disableNext}
          currentDate={currentDate}
          onSelectDate={handleSelectDate}
        />
        <DayDataField />
      </div>
    </main>
  );
}
