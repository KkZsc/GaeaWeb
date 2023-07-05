import styled from '@emotion/native';
import {ListRenderItemInfo} from 'react-native';

const TestContentFlatListItem = styled.Text({
  backgroundColor: 'white',
  height: 28,
});

export default {
  data: Array(100).fill(0),
  renderItem: ({index}: ListRenderItemInfo<number>) => <TestContentFlatListItem>{index}</TestContentFlatListItem>,
  keyExtractor: (_: number, index: number) => index.toString(),
};
