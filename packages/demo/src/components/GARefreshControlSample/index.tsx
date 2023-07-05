import styled from '@emotion/native';
import React from 'react';
import {Pressable, FlatList} from 'react-native';
import GARefreshControl from 'rtn-gaea-pull-refresh-view/js/GaeaPullRefreshViewNativeComponent';
import Toolbar from '@gaea-web/components/toolbar';
import {SafeAreaContainer} from '@gaea-web/components/container';

const Container = styled.View({
  flex: 1,
  width: '100%',
});

const Item = styled.View({
  paddingHorizontal: 16,
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  height: 56,
  backgroundColor: '#fff',
});

const ItemText = styled.Text({
  color: '#303030',
  fontSize: 16,
  flex: 1,
});

const ListItem = ({item}: {item: string}) => {
  return (
    <Pressable
      onPress={() => {
        console.log('item', item);
      }}>
      <Item>
        <ItemText>{item}</ItemText>
      </Item>
    </Pressable>
  );
};

const datalist = Array.from({length: 100}).map((_, index) => `item-${index}`);

export default () => {
  const [refreshing, setIsRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaContainer>
      <Toolbar title="PullRefreshView" />
      <Container>
        <FlatList
          data={datalist}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({item}) => <ListItem item={item} />}
          refreshControl={<GARefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      </Container>
    </SafeAreaContainer>
  );
};
