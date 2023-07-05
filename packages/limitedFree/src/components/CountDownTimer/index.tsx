import styled from '@emotion/native';
import {useEffect, useState} from 'react';

interface CountDownProps {
  initialTime: number;
  onFinish: () => void;
  format?: string;
}

const CountText = styled.Text({
  fontSize: 14,
  color: '#999999',
});

const formatTime = (time: number, format: string) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time - hours * 3600) / 60);
  const seconds = time - hours * 3600 - minutes * 60;

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return format.replace('HH', formattedHours).replace('mm', formattedMinutes).replace('ss', formattedSeconds);
};

const CountDownTimer = ({initialTime, onFinish, format}: CountDownProps) => {
  const [timeText, setTimeText] = useState<string>(formatTime(initialTime, format || 'HH:mm:ss'));
  useEffect(() => {
    let _rt = initialTime;
    const timer = setInterval(() => {
      if (_rt > 0) {
        setTimeText(formatTime(_rt, format || 'HH:mm:ss'));
        _rt--;
      } else {
        clearInterval(timer);
        onFinish();
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [onFinish, initialTime, format]);
  return <CountText>{timeText}</CountText>;
};

export default CountDownTimer;
