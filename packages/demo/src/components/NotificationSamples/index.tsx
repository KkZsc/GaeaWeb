import * as React from 'react';
import styled from '@emotion/native';

const FavText = styled.Text({
  color: '#303030',
  fontSize: 16,
  marginTop: 50,
  fontWeight: 'bold',
});

const Container = styled.View({
  flex: 1,
});

export default () => {
  const [isFavorite, setFavorite] = React.useState<boolean>(false);
  React.useEffect(() => {
    const notification = new ga.Notification();
    const unregister = notification.addEventListener('test', () => {
      setFavorite(true);
    });
    return () => {
      unregister();
    };
  }, []);
  return (
    <Container>
      {isFavorite && <FavText>取消关注</FavText>}
      {!isFavorite && <FavText>关注</FavText>}
    </Container>
  );
};
