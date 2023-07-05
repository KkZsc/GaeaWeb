import {MatchParentView} from '@gaea-web/components';
import Svg, {Circle} from 'react-native-svg';

export default () => {
  const size = 54;
  return (
    <MatchParentView>
      <Svg height="50%" width="50%">
        <Circle cx={size / 2} cy={size / 2} r={size / 2 - 3} strokeLinecap={'round'} stroke={'#34E766'} strokeWidth={'3'} fillOpacity={0} />
      </Svg>
    </MatchParentView>
  );
};
