import React, { useState } from 'react';
import styles from './Calendar.module.scss';
import ButtonLeft from '@/app/ui/Buttons/ButtonLeft';
import ButtonRight from '@/app/ui/Buttons/ButtonRight';

interface CalendarProps {
  selectedDate: Date;
  onSelect: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onSelect }) => {
  const today = new Date(); // Получаем текущую дату
  const [currentDate, setCurrentDate] = useState(selectedDate);

  const renderCalendar = () => {
    const weekdays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
    const months = [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь',
    ];

    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    let startingDay = firstDayOfMonth.getDay();

    if (startingDay === 0) {
      startingDay = 6;
    } else {
      startingDay--;
    }

    const blanks: JSX.Element[] = [];
    for (let i = 0; i < startingDay; i++) {
      blanks.push(
        <td key={`blank-${i}`} className={styles.empty}>
          {''}
        </td>
      );
    }

    const daysInMonthArray: JSX.Element[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i
      );
      const isFutureDay = dayDate > today; // Проверяем, является ли день будущим
      daysInMonthArray.push(
        <td
          key={`day-${i}`}
          className={`${styles.day} ${selectedDate.getDate() === i && currentDate.getMonth() === selectedDate.getMonth() && currentDate.getFullYear() === selectedDate.getFullYear() ? styles.selected : ''} ${isFutureDay ? styles.futureDay : ''}`}
          onClick={() => handleDayClick(i)}
        >
          {i}
          <div className={styles.indicator}></div>
        </td>
      );
    }

    const totalSlots = [...blanks, ...daysInMonthArray];
    const rows: JSX.Element[] = [];
    let cells: JSX.Element[] = [];

    totalSlots.forEach((day, i) => {
      if (i % 7 !== 0) {
        cells.push(day);
      } else {
        rows.push(<tr key={`row-${i / 7}`}>{cells}</tr>);
        cells = [];
        cells.push(day);
      }
      if (i === totalSlots.length - 1) {
        rows.push(<tr key={`row-${i / 7 + 1}`}>{cells}</tr>);
      }
    });

    return (
      <table className={styles.calendarTable}>
        <thead>
          <tr>
            <th colSpan={7}>
              <div className={styles.calendarHeader}>
                {' '}
                {/* Используем стилизованный класс */}
                <ButtonLeft onClick={prevMonth} />
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                <ButtonRight onClick={nextMonth} disabled={false} />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {weekdays.map((day, index) => (
              <td key={`weekday-${index}`} className={styles.weekday}>
                {day}
              </td>
            ))}
          </tr>
          {rows}
        </tbody>
      </table>
    );
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleDayClick = (day: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    if (newDate <= today) {
      // Проверка, является ли выбранный день прошедшим или текущим
      onSelect(newDate);
    }
  };

  return <div className={styles.calendarContainer}>{renderCalendar()}</div>;
};

export default Calendar;
