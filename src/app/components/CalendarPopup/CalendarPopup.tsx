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
  const [selectedDate, setSelectedDate] = useState(date);

  // Классы для стилизации попапа
  const popupClass = isOpen ? `${styles.popup} ${styles.active}` : styles.popup;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const popupInner = document.getElementById('popup-inner');
      // Закрываем попап, если клик был совершен вне области попапа
      if (popupInner && !popupInner.contains(event.target as Node)) {
        onClose();
      }
    };

    // Прослушиватель событий для обнаружения кликов за пределами всплывающего окна.
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Удаление прослушивателя событий, когда всплывающее окно закрыто
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Эффект для обновления выбранной даты при изменении пропса date
  useEffect(() => {
    setSelectedDate(date);
  }, [date]);

  // Обработчик выбора даты
  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    onSelect(date); // Передаем выбранную дату в родительский компонент
  };

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
