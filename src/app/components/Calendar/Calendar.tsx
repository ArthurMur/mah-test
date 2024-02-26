'use client';
import React, { useState, useEffect } from 'react';
import styles from './Calendar.module.scss';
import ButtonLeft from '@/app/ui/Buttons/ButtonLeft';
import ButtonRight from '@/app/ui/Buttons/ButtonRight';
import { months, weekdays } from '@/app/utils/constants';

interface CalendarProps {
  selectedDate: Date;
  onSelect: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onSelect }) => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(selectedDate);
  const [selectedDates, setSelectedDates] = useState<any[]>([]); // Данные из localStorage

  useEffect(() => {
    // Получаем данные из localStorage при монтировании компонента
    const storedDates = localStorage.getItem('selectedDates');
    if (storedDates) {
      setSelectedDates(JSON.parse(storedDates)); // Парсим JSON и устанавливаем полученные данные в состояние
    }
  }, []);

  const renderCalendar = () => {
    // Определение первого дня текущего месяца
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    // Определение количества дней в текущем месяце
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();

    // Определение дня недели, с которого начинается месяц
    let startingDay = firstDayOfMonth.getDay();

    if (startingDay === 0) {
      startingDay = 6; // Если день недели - воскресенье, то начинаем с 6 (понедельника)
    } else {
      startingDay--;
    }

    // Генерация пустых ячеек в начале месяца
    const blanks = Array.from({ length: startingDay }, (_, i) => (
      <td key={`blank-${i}`} className={styles.empty}></td>
    ));

    const daysInMonthArray: JSX.Element[] = []; // Массив для ячеек с датами текущего месяца

    // Создаем ячейки для каждого дня в месяце
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        i
      );
      const isFutureDay = dayDate > today; // Проверяем, является ли день будущим
      const color = getColorForDate(dayDate); // Получаем цвет для дня
      const dayOfWeek = dayDate.getDay(); // Получаем день недели (0 - воскресенье, 1 - понедельник, и так далее)

      // Проверяем, является ли текущий день недели выходным
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      // Если текущий день недели - выходной, красим в красный
      const dayClassName = isWeekend ? styles.weekendDay : '';
      daysInMonthArray.push(
        <td
          key={`day-${i}`}
          className={`${styles.day} ${selectedDate.getDate() === i && currentDate.getMonth() === selectedDate.getMonth() && currentDate.getFullYear() === selectedDate.getFullYear() ? styles.selected : ''} ${isFutureDay ? styles.futureDay : ''} ${dayClassName}`}
          onClick={() => handleDayClick(i)}
        >
          {i}
          <div
            className={styles.indicator}
            style={{ backgroundColor: color ? color : 'gray' }}
          ></div>
        </td>
      );
    }

    const totalSlots = [...blanks, ...daysInMonthArray]; // Объединяем массив пустых ячеек и ячеек с датами
    const rows: JSX.Element[] = [];
    let cells: JSX.Element[] = [];

    totalSlots.forEach((day, i) => {
      // Разбиение массива на строки и ячейки таблицы
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
                <ButtonLeft onClick={prevMonth} />
                {/* Название месяца и год */}
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

  // Функция для переключения на предыдущий месяц
  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  // Функция для переключения на следующий месяц
  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  // Обработка клика по дню в календаре
  const handleDayClick = (day: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    // Проверка, является ли выбранный день прошедшим или текущим
    if (newDate <= today) {
      onSelect(newDate); // Вызываем onSelect с новой выбранной датой
    }
  };

  // Получаем цвет для указанной даты
  const getColorForDate = (date: Date): string | undefined => {
    const dateString = date.toDateString();
    const selectedDate = selectedDates.find(
      (entry: any) => entry.date === dateString
    );
    return selectedDate ? selectedDate.color : undefined;
  };

  return <div className={styles.calendarContainer}>{renderCalendar()}</div>;
};

export default Calendar;
