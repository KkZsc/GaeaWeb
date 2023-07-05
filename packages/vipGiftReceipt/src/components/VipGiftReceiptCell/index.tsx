import styled from '@emotion/native';
import {VipGiftReceiptModel} from '../../hooks/useData';
import {OnePixel} from '@gaea-web/shared';

const ContainerView = styled.View({
  height: 72,
  width: '100%',
  justifyContent: 'center',
  backgroundColor: '#ffffff',
});

const ContentContainerView = styled.View({
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const LeftContent = styled.View({
  marginLeft: 20,
  justifyContent: 'center',
});

const RightContent = styled.View({
  marginRight: 20,
  justifyContent: 'center',
  alignItems: 'flex-end',
  width: '60%',
});

const TitleLabel = styled.Text({
  fontSize: 16,
  color: '#333333',
  alignContent: 'center',
});

const DateLabel = styled.Text({
  marginTop: 2,
  fontSize: 12,
  color: '#999999',
});

const AssignLabel = styled.Text({
  fontSize: 16,
  color: '#777777',
});

const TopicLabel = styled.Text({
  marginTop: 2,
  fontSize: 12,
  color: '#777777',
});

export const CellLine = styled.View({
  backgroundColor: '#dfdfdf',
  marginLeft: 20,
  width: '100%',
  height: OnePixel,
  left: 0,
  bottom: 0,
  zIndex: 10,
  position: 'absolute',
});

export const VipGiftReceiptCell = ({viewModel}: {viewModel: VipGiftReceiptModel}) => {
  return (
    <ContainerView>
      <ContentContainerView>
        <LeftContent>
          <TitleLabel>{viewModel.big_bag_title}</TitleLabel>
          <DateLabel>{viewModel.received_time_str}</DateLabel>
        </LeftContent>
        <RightContent>
          <AssignLabel>{viewModel.assigned_title}</AssignLabel>
          {viewModel.topic_title && viewModel.topic_title !== '' && <TopicLabel numberOfLines={1}>{viewModel.topic_title}</TopicLabel>}
        </RightContent>
      </ContentContainerView>
    </ContainerView>
  );
};
