import styled from '@emotion/native';

import useSomething from './hooks/useSomething';
import Container from './components/ComponentName';

const InnerView = styled.Pressable({});
const Text = styled.Text({});

const PageComponent = () => {
  const {someState, setSomeState} = useSomething();
  return (
    <Container>
      <InnerView
        onPress={() => {
          setSomeState('another state');
        }}>
        <Text>{someState}</Text>
      </InnerView>
    </Container>
  );
};

export default PageComponent;
