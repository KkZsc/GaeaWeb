import {useState} from 'react';
import Svg, {Circle, Path, SvgProps} from 'react-native-svg';

export type CircleProgressProps = {
  percent: number;
  size?: number;
  strokeWidth?: number;
  circleColor?: string;
} & SvgProps;

const CircleProgress = (props: CircleProgressProps) => {
  const [layoutSize, setLayoutSize] = useState(0);
  const size = props.size ?? layoutSize;
  const strokeWidth = props.strokeWidth ?? 3;
  const circleColor = props.circleColor ?? '#34E766';
  const r = (size - strokeWidth) / 2;

  const percent = props.percent;
  const angle = Math.PI / 2 - percent * 2 * Math.PI;
  const cx = size / 2;
  const cy = size / 2;
  const endX = r * Math.cos(angle) + cx;
  const endY = -r * Math.sin(angle) + cy;
  const largeArcFlag = percent > 0.5 ? 1 : 0;

  return (
    <Svg
      {...props}
      height="100%"
      width="100%"
      fill="none"
      onLayout={e => {
        if (!props.size) {
          setLayoutSize(Math.min(e.nativeEvent.layout.width, e.nativeEvent.layout.height));
        }
        console.log('height:', e.nativeEvent.layout.height);
      }}>
      {size <= 0 ? null : (
        <>
          <Circle cx={cx} cy={cy} r={r} stroke={percent >= 1 ? circleColor : '#FFFFFF'} strokeWidth={strokeWidth} opacity={percent >= 1 ? 1 : 0.5} />
        </>
      )}
      {percent <= 0 || percent >= 1 ? null : (
        <Path
          strokeWidth={strokeWidth}
          stroke={circleColor}
          strokeLinecap="round"
          d={`M${cx},${strokeWidth / 2} A${r},${r},0,${largeArcFlag},1,${endX},${endY}`}
        />
      )}
    </Svg>
  );
};

export default CircleProgress;
