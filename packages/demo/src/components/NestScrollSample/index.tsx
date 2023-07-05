import {FlatList, Text, Animated, ScrollView} from 'react-native';
import NestedScrollScaffold, {HeaderOverlayBehaviorEmerge} from '@gaea-web/components/nested-scroll';
import styled from '@emotion/native';
import ToolBar from '@gaea-web/components/toolbar';
import shareFlatListProps from '../../sharedProps/shareFlatListProps';
import {FullScreenContainer, MatchParentView} from '@gaea-web/components/container';
import {StatusBarHeight} from '@gaea-web/shared/src/uiConstant';
import PagerView from 'react-native-pager-view';

const ToolbarContainer = styled.View({
  backgroundColor: 'white',
  paddingTop: StatusBarHeight,
});

const ToolbarAnimateView = styled(Animated.View)({
  width: '100%',
  height: 1,
  backgroundColor: 'blue',
});

const StickHeaderText = styled.Text({
  backgroundColor: '#B3C99C',
  height: 56,
  textAlign: 'center',
});

const ExpandHeaderView = styled.View({
  backgroundColor: '#A4BC92',
  height: 300,
  paddingTop: StatusBarHeight,
});

const FooterText = styled.Text({
  height: 56,
  textAlign: 'center',
  backgroundColor: '#FFF3E2',
});

const PagerViewStyled = styled(PagerView)({
  flex: 1,
});

const ScrollItem = styled.Text({
  backgroundColor: '#F2E3DB',
  height: 42,
});

export default () => {
  return (
    <FullScreenContainer>
      <NestedScrollScaffold
        renderHeaderOverlay={offsetPercent => {
          return (
            <ToolbarContainer>
              <ToolBar title={'吸顶demo'} />
              <ToolbarAnimateView
                style={[
                  {
                    //通过拿到的offsetPercent做的动效
                    transform: [{scaleX: offsetPercent}],
                  },
                ]}
              />
            </ToolbarContainer>
          );
        }}
        headerOverlayBehavior={new HeaderOverlayBehaviorEmerge(0.2, 1)}
        renderExpandHeader={() => (
          <ExpandHeaderView>
            <Text>扩展部分</Text>
          </ExpandHeaderView>
        )}
        renderContent={() => (
          <MatchParentView>
            {/* 由于保证了Content部分上拉结束后铺满呈现 */}
            <StickHeaderText>吸顶部分</StickHeaderText>
            <PagerViewStyled>
              <FlatList {...shareFlatListProps} />
              <ScrollView>
                {Array(100)
                  .fill(0)
                  .map((_, i) => (
                    <ScrollItem key={i}>{i}</ScrollItem>
                  ))}
              </ScrollView>
            </PagerViewStyled>
          </MatchParentView>
        )}
      />
      <FooterText>底部Footer</FooterText>
    </FullScreenContainer>
  );
};
