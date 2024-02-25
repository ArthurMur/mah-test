import React from 'react';
import DateDisplay from '../DateDisplay/DateDisplay';
import styles from './Buttons.module.scss';
import ButtonLeft from '@/app/ui/Buttons/ButtonLeft';
import ButtonRight from '@/app/ui/Buttons/ButtonRight';

interface ButtonsProps {
  onPrevClick: () => void;
  onNextClick: () => void;
  disableNext: boolean;
  currentDate: Date;
  onSelectDate: (date: Date) => void;
}

const Buttons: React.FC<ButtonsProps> = ({
  onPrevClick,
  onNextClick,
  disableNext,
  currentDate,
  onSelectDate,
}) => {
  return (
    <div className={styles.container}>
      <ButtonLeft onClick={onPrevClick} />
      <DateDisplay date={currentDate} onSelectDate={onSelectDate} />
      <ButtonRight onClick={onNextClick} disabled={disableNext} />
    </div>
  );
};

export default Buttons;
