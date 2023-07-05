import styled from '@emotion/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toolbar from '@gaea-web/components/toolbar';
import RTNGaeaGradientView, {GradientOrientation} from 'rtn-gaea-gradient-view/js/GaeaGradientViewNativeComponent';
import ToolsRow from '../ToolsRow';
import RankFlatList from '../RankList';
import {ITopicListHead} from '../../../types';

const backgroundImageHeight = 193;
const rankListHeight = 164;

const Container = styled.View(({height}: {height: number}) => ({
  height,
}));

const Header = styled.View({
  width: '100%',
  height: backgroundImageHeight,
});

const BackgroundImage = styled.ImageBackground({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
});

const TopicListTitle = styled.Text({
  position: 'absolute',
  left: 12,
  bottom: 27,
  fontSize: 24,
  lineHeight: 34,
  color: 'white',
  fontWeight: '500',
});

const TopicListSubTitle = styled.View({
  position: 'absolute',
  left: 0,
  bottom: 8,
});

const LinearGradientContainer = styled.View({
  position: 'absolute',
  left: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
});

const LinearGradientBackground = styled(RTNGaeaGradientView)({
  width: '100%',
  height: '100%',
});

const TopicListHeader = ({
  head,
  title,
  isFilterFav,
  onChange,
}: {
  head: ITopicListHead | null;
  title: string;
  isFilterFav: boolean;
  onChange: (selected: boolean) => void;
}) => {
  const maskLinearGradientColors = head?.text_mask ? [`#00${head.text_mask.slice(1)}`, `#FF${head.text_mask.slice(1)}`] : ['#00000000', '#80000000'];
  return (
    <Container height={head?.rank ? backgroundImageHeight + rankListHeight : backgroundImageHeight}>
      <Header>
        {head?.image && <BackgroundImage source={{uri: head.image}} />}
        <LinearGradientContainer>
          <LinearGradientBackground colors={maskLinearGradientColors} gradientOrientation={GradientOrientation.TOP_BOTTOM} />
        </LinearGradientContainer>
        <SafeAreaView edges={['top']}>
          <Toolbar tintColor="#FFFFFF" />
        </SafeAreaView>
        <TopicListTitle>{title}</TopicListTitle>
        <TopicListSubTitle>
          <ToolsRow theme="white" total={head?.total} selected={isFilterFav} onChange={onChange} />
        </TopicListSubTitle>
      </Header>
      {head?.rank && <RankFlatList rank={head.rank} />}
    </Container>
  );
};

export default TopicListHeader;
