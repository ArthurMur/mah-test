'use client';
import { CalendarIcon } from '@/app/ui/CalendarIcon';
import styles from './DateDisplay.module.scss';
import { useState } from 'react';
import CalendarPopup from '../CalendarPopup/CalendarPopup';

interface DateDisplayProps {
  date: Date;
  onSelectDate: (date: Date) => void;
}

const DateDisplay: React.FC<DateDisplayProps> = ({ date, onSelectDate }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Открытие/закрытие попапа
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  // Форматирование даты
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
  };

  // Обработчик выбора даты в попапе
  const handleSelectDate = (selectedDate: Date) => {
    onSelectDate(selectedDate); // Обновление выбранной даты в родительском компоненте
    togglePopup(); // Закрытие попапа после выбора даты
  };

  return (
    <>
      {isPopupOpen && (
        <CalendarPopup
          onClose={togglePopup}
          isOpen={isPopupOpen}
          date={date}
          onSelect={handleSelectDate}
        />
      )}
      <div className={styles.dateDisplay} onClick={togglePopup}>
        <CalendarIcon />
        <span className={styles.date}>
          {date.toLocaleDateString('ru-RU', options)}
        </span>
      </div>
    </>
  );
};

export default DateDisplay;
