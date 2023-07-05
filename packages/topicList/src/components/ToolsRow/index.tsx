import {Dimensions} from 'react-native';
import styled from '@emotion/native';
import {useLogin} from '../../hooks/useLogin';

const Container = styled.View({
  width: Dimensions.get('window').width,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: 12,
  paddingRight: 12,
});

const ToolsRowTotal = styled.Text(({theme}: {theme: string}) => ({
  fontSize: 12,
  lineHeight: 15,
  color: theme,
}));

const ToolsRowFilter = styled.Pressable({
  flexDirection: 'row',
  alignItems: 'center',
});

const ToolsRowFilterIcon = styled.Image({
  width: 12,
  height: 12,
  marginRight: 4,
});

const ToolsRowFilterText = styled.Text(({theme}: {theme: string}) => ({
  fontSize: 12,
  lineHeight: 21,
  color: theme,
}));

const ToolsRow = ({
  theme,
  total,
  selected,
  onChange,
}: {
  theme: 'white' | 'gray';
  total?: string;
  selected: boolean;
  onChange: (selected: boolean) => void;
}) => {
  const isLogin = useLogin();

  return (
    <Container>
      <ToolsRowTotal theme={theme}>{total}</ToolsRowTotal>
      {isLogin && (
        <ToolsRowFilter onPress={() => onChange(!selected)}>
          <ToolsRowFilterIcon
            source={
              selected
                ? theme === 'white'
                  ? require('@/resource/btn_follow_pre.png')
                  : require('@/resource/ic_list_btn_follow_pre.png')
                : theme === 'white'
                ? require('@/resource/btn_follow.png')
                : require('@/resource/ic_list_btn_follow.png')
            }
          />
          <ToolsRowFilterText theme={theme}>过滤已关注</ToolsRowFilterText>
        </ToolsRowFilter>
      )}
    </Container>
  );
};

export default ToolsRow;
