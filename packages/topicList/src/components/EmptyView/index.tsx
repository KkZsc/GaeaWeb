import styled from '@emotion/native';

const EmptyContainer = styled.View({
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
});

const EmptyImage = styled.Image({});

export default () => {
  return (
    <EmptyContainer>
      <EmptyImage source={require('@/resource/ic_module_list_empty.png')} />
    </EmptyContainer>
  );
};
