import styled from '@emotion/native';
import {OnePixel} from '@gaea-web/shared';

export const TopicFollowButton = styled.Pressable(({favourite, width}: {favourite: boolean; width: number}) => ({
  justifyContent: 'center',
  alignItems: 'center',
  width,
  flexGrow: 0,
  height: 28,
  borderRadius: 14,
  borderColor: '#CCCCCC',
  borderStyle: 'solid',
  borderWidth: favourite ? 0 : OnePixel,
  backgroundColor: favourite ? '#F5F5F5' : 'white',
}));

export const TopicFollowButtonText = styled.Text(({favourite}: {favourite: boolean}) => ({
  fontSize: 13,
  fontWeight: '500',
  color: favourite ? '#CCCCCC' : '#222222',
}));
