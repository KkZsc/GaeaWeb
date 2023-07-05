import {Dimensions} from 'react-native';
import {SecondaryBookListTopicModel, SecondaryBookListModel} from '../../hooks/useData';
import styled from '@emotion/native';

const {width} = Dimensions.get('window');

const cellHorizontalSpacing = 12;

const moreLabelWidth = 26;
const arrowImageWidth = 12;
const arrowImageHeight = 12;

const topicsLeftRightSpacing = 16;
const topicsItemHorizontalSpacing = 8;
const topicsImageWidth = (width - cellHorizontalSpacing * 2 - topicsLeftRightSpacing * 2 - topicsItemHorizontalSpacing * 2) / 3;
const topicsImageHeight = (135 / 101) * topicsImageWidth;
const topicsItemVerticalSpacing = 16;

const ModuleTitleContainerView = styled.View({
  marginLeft: topicsLeftRightSpacing,
  marginRight: topicsLeftRightSpacing,
  height: 22,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const ModuleTitle = styled.Text({
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'left',
  color: '#333333',
  width: width - cellHorizontalSpacing * 2 - topicsLeftRightSpacing * 2 - 30 - 12,
});

const MoreContainerView = styled.View({
  width: moreLabelWidth + arrowImageWidth,
  flexDirection: 'row',
  alignItems: 'center',
});

const MoreText = styled.Text({
  fontSize: 13,
  fontWeight: 'normal',
  color: '#999999',
});

const ArrowImage = styled.Image({
  width: arrowImageWidth,
  height: arrowImageHeight,
});

const ModuleSubtitle = styled.Text({
  marginTop: 4,
  marginLeft: 16,
  marginRight: 8,
  marginBottom: 12,
  height: 14,
  fontSize: 11,
  fontWeight: 'normal',
  textAlign: 'left',
  color: '#999999',
});

const CoverImageContainerView = styled.View({
  height: topicsImageHeight,
  borderRadius: 2,
  overflow: 'hidden',
});

const CoverImage = styled.Image({
  flex: 1,
});

const TopicTitleText = styled.Text({
  fontSize: 14,
  fontWeight: 'normal',
  textAlign: 'left',
  textAlignVertical: 'center',
  color: '#333333',
  height: 18,
  marginTop: 8,
});

const TopicBottomText = styled.Text({
  fontSize: 11,
  fontWeight: 'normal',
  textAlign: 'right',
  textAlignVertical: 'center',
  color: '#FFFFFF',
  bottom: 7,
  right: 5,
  left: 5,
  top: topicsImageHeight - 18,
  position: 'absolute',
});

const ItemContainerView = styled.View({
  flexDirection: 'column',
  flex: 0.33,
  marginLeft: topicsItemHorizontalSpacing / 2,
  marginRight: topicsItemHorizontalSpacing / 2,
});

const ItemPressable = styled.Pressable({
  flex: 1,
});

const ThreePicRowView = styled.View({
  flexDirection: 'row',
  paddingLeft: topicsLeftRightSpacing - topicsItemHorizontalSpacing / 2,
  paddingRight: topicsLeftRightSpacing - topicsItemHorizontalSpacing / 2,
  paddingBottom: topicsItemVerticalSpacing,
});

const ModuleContainerView = styled.View({
  flexDirection: 'column',
  borderRadius: 8,
  paddingTop: 20,
  paddingBottom: 24 - topicsItemVerticalSpacing,
  marginTop: 6,
  marginBottom: 6,
  overflow: 'hidden',
  backgroundColor: '#FFFFFF',
});

export const SecondaryBookListItem = ({
  item,
  viewTapped,
}: {
  item: SecondaryBookListTopicModel;
  viewTapped?: (item: SecondaryBookListTopicModel) => void;
}) => {
  return (
    <ItemContainerView>
      <ItemPressable
        onPress={() => {
          viewTapped?.(item);
        }}>
        <CoverImageContainerView>
          <CoverImage source={{uri: item.vertical_image_url}} />
          <TopicBottomText numberOfLines={1}>{item.text.right_bottom}</TopicBottomText>
        </CoverImageContainerView>
        <TopicTitleText numberOfLines={1}>{item.title}</TopicTitleText>
      </ItemPressable>
    </ItemContainerView>
  );
};

export default SecondaryBookListItem;

export const SecondaryBookThreePicRow = ({
  items,
  viewTapped,
}: {
  items: SecondaryBookListTopicModel[];
  viewTapped?: (item: SecondaryBookListTopicModel) => void;
}) => {
  return (
    <ThreePicRowView>
      {items.map((topic: SecondaryBookListTopicModel, index: number) => {
        return <SecondaryBookListItem key={index} item={items[index]} viewTapped={viewTapped} />;
      })}
    </ThreePicRowView>
  );
};

export const SecondaryBookModule = ({
  list,
  itemTapped,
  moreTapped,
}: {
  list: SecondaryBookListModel;
  itemTapped?: (topic: SecondaryBookListTopicModel, list: SecondaryBookListModel) => void;
  moreTapped?: (list: SecondaryBookListModel) => void;
}) => {
  let rows = Math.floor(list.topics.length / 3);
  let result: SecondaryBookListTopicModel[][] = [];
  for (let i = 0; i < rows; i++) {
    result[i] = list.topics.slice(i * 3, (i + 1) * 3);
  }
  return (
    <ModuleContainerView>
      <ModuleTitleContainerView>
        <ModuleTitle numberOfLines={1} ellipsizeMode="tail">
          {list.title}
        </ModuleTitle>
        <ItemPressable
          onPress={() => {
            moreTapped?.(list);
          }}>
          <MoreContainerView>
            <MoreText>更多</MoreText>
            <ArrowImage source={require('@/resource/ic_book_list_right_arrow.png')} />
          </MoreContainerView>
        </ItemPressable>
      </ModuleTitleContainerView>
      <ModuleSubtitle>{list.sub_title}</ModuleSubtitle>
      {result.map((separatedList: SecondaryBookListTopicModel[], index: number) => {
        return (
          <SecondaryBookThreePicRow
            key={index}
            items={separatedList}
            viewTapped={(item: SecondaryBookListTopicModel) => {
              itemTapped?.(item, list);
            }}
          />
        );
      })}
    </ModuleContainerView>
  );
};
