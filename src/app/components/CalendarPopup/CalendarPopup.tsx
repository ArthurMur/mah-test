'use client';
import React, { useEffect, useState } from 'react';
import Calendar from '../Calendar/Calendar';
import styles from './CalendarPopup.module.scss';
import ButtonCLose from '@/app/ui/ButtonCLose/ButtonCLose';

interface CalendarPopupProps {
  onClose: () => void;
  isOpen: boolean;
  date: Date;
  onSelect: (date: Date) => void;
}

const CalendarPopup: React.FC<CalendarPopupProps> = ({
  onClose,
  isOpen,
  date,
  onSelect,
}) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const popupInner = document.getElementById('popup-inner');
      if (popupInner && !popupInner.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const [selectedDate, setSelectedDate] = useState(date);

  useEffect(() => {
    setSelectedDate(date); // Обновляем selectedDate при изменении date
  }, [date]);

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    onSelect(date); // Передаем выбранную дату в родительский компонент
  };

  const popupClass = isOpen
    ? `${styles.popup} ${styles.active}`
    : `${styles.popup}`;

  return (
    <div className={popupClass}>
      <div
        id="popup-inner"
        className={styles.popupInner}
        onClick={(e) => e.stopPropagation()}
      >
        <ButtonCLose onClick={onClose} />
        <p className={styles.title}>Календарь</p>
        <Calendar selectedDate={selectedDate} onSelect={handleSelectDate} />
      </div>
    </div>
  );
};

export default CalendarPopup;
