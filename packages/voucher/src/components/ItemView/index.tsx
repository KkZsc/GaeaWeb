import styled from '@emotion/native';
import {Dimensions, TouchableOpacity} from 'react-native';
import {VoucherClientSectionModel, VoucheRedPacketInfoModel, VoucheRedPacketType} from '../../../types';
import {useRef} from 'react';

const {width} = Dimensions.get('window');
const containerViewHorizontalPadding = 16;
const containerViewVerticalPadding = 10;
const containerViewH = (220 * (width - containerViewHorizontalPadding * 2)) / 343;
const contentViewH = containerViewH - containerViewVerticalPadding * 2;
const BottomContainerViewH = 50;
const CoverImageContainerViewH = contentViewH - BottomContainerViewH;

const sectionContainerViewH = 44;

// const ItemPressable = styled.Pressable({});

const ContainerView = styled.View({
  height: containerViewH,
  width: '100%',
  justifyContent: 'center',
});

const ContentView = styled.Pressable({
  height: contentViewH,
  borderRadius: 10,
  overflow: 'hidden',
});

const ShadowView = styled.View({
  height: contentViewH,
  marginHorizontal: containerViewHorizontalPadding,
  borderRadius: 10,
  shadowColor: 'rgba(0, 0, 0, 0.2)',
  shadowOffset: {width: 2, height: 3},
  shadowOpacity: 0.5,
  shadowRadius: 4,
  elevation: 1.5,
});

const CoverImageContainerView = styled.View({
  marginTop: 0,
  marginHorizontal: 0,
  height: CoverImageContainerViewH,
  position: 'relative',
});

const CoverImage = styled.Image({
  flex: 1,
  height: CoverImageContainerViewH,
  width: '100%',
});

const GradientView = styled.Image({
  height: 50,
  width: '100%',
  bottom: 0,
  position: 'absolute',
});

const TopicTitleText = styled.Text({
  fontSize: 18,
  fontWeight: 'normal',
  textAlign: 'left',
  textAlignVertical: 'center',
  color: '#ffffff',
  height: 42,
  lineHeight: 42,
  left: 8,
  bottom: 0,
  right: 110,
  position: 'absolute',
});

const DiscountText = styled.Text({
  fontSize: 12,
  height: 36,
  width: 100,
  lineHeight: 36,
  fontWeight: 'normal',
  textAlign: 'right',
  textAlignVertical: 'center',
  color: '#ffffff',
  right: 8,
  bottom: 0,
  position: 'absolute',
  verticalAlign: 'middle',
});

const DetailContainer = styled.Pressable({
  flexDirection: 'row',
  alignItems: 'center',
  height: 20,
  width: 80,
  position: 'absolute',
  right: 3,
  top: 4,
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  borderRadius: 10,
});

const DetailIconImage = styled.Image({
  width: 12,
  height: 12,
  marginLeft: 6.5,
});

const DetailText = styled.Text({
  fontSize: 12,
  width: 50,
  fontWeight: 'normal',
  textAlign: 'center',
  textAlignVertical: 'center',
  color: '#ffffff',
  marginLeft: 5,
});

const BottomContainer = styled.View({
  flexDirection: 'row',
  bottom: 0,
  width: '100%',
  height: BottomContainerViewH,
  backgroundColor: 'white',
});

const TotalPriceText = styled.Text({
  fontSize: 32,
  height: BottomContainerViewH,
  lineHeight: BottomContainerViewH,
  fontWeight: 'normal',
  textAlign: 'center',
  textAlignVertical: 'center',
  color: '#ff751a',
  marginLeft: 8,
  paddingHorizontal: 2,
});

const TotalPriceLabelText = styled.Text({
  fontSize: 12,
  height: 36,
  lineHeight: 36,
  fontWeight: 'normal',
  textAlign: 'center',
  textAlignVertical: 'center',
  color: '#ff751a',
  top: BottomContainerViewH - 36,
});

const BottomLineView = styled.View({
  backgroundColor: '#d8d8d8',
  width: 1,
  height: 15,
  marginLeft: 5,
  marginTop: 25,
});

const BottomDateText = styled.Text({
  fontSize: 10,
  height: 36,
  lineHeight: 36,
  fontWeight: 'normal',
  textAlign: 'center',
  textAlignVertical: 'center',
  color: '#999999',
  marginLeft: 5,
  top: 14,
});

const BottomUseButton = styled.Text({
  fontSize: 18,
  width: 75,
  height: BottomContainerViewH,
  lineHeight: BottomContainerViewH,
  textAlign: 'center',
  textAlignVertical: 'center',
  color: '#432504',
  backgroundColor: '#fbde30',
  right: 0,
  bottom: 0,
  position: 'absolute',
});

const MaskView = styled.View({
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(146, 146, 146, 0.6)',
  position: 'absolute',
});

const renderMaskView = (item: VoucheRedPacketInfoModel) => {
  if (item.type === VoucheRedPacketType.canUse) {
    return null;
  }
  return <MaskView pointerEvents="none" />;
};

interface voucherItemViewParams {
  item: VoucheRedPacketInfoModel;
  onCoverViewTapped?: (item: VoucheRedPacketInfoModel, nativeTag: number) => void;
  onDetailRuleTapped?: (item: VoucheRedPacketInfoModel) => void;
}

export const VoucherItemView = (param: voucherItemViewParams) => {
  const viewRef = useRef<TouchableOpacity | null>(null);
  return (
    <ContainerView>
      <ShadowView>
        <ContentView
          ref={viewRef}
          onPress={() => {
            const nativeTag = (viewRef.current as any)._nativeTag;
            param.onCoverViewTapped?.(param.item, nativeTag);
          }}>
          <CoverImageContainerView>
            <CoverImage source={{uri: param.item.cover_image_url}} />
            <DetailContainer
              onPress={() => {
                param.onDetailRuleTapped?.(param.item);
              }}>
              <DetailIconImage source={require('@/resource/ic_voucher_help_white.png')} />
              <DetailText>优惠规则</DetailText>
            </DetailContainer>
            <GradientView source={require('@/resource/ic_voucher_title_bg.png')} resizeMode="stretch" />
            <TopicTitleText numberOfLines={1} ellipsizeMode="tail">
              {param.item.topic_title}
            </TopicTitleText>
            <DiscountText>当前可抵扣{param.item.next_discount}%</DiscountText>
          </CoverImageContainerView>
          <BottomContainer>
            <TotalPriceText>{param.item.total}</TotalPriceText>
            <TotalPriceLabelText>KK币</TotalPriceLabelText>
            <BottomLineView />
            <BottomDateText>有效期至{param.item.expire_at_string}</BottomDateText>
            <BottomUseButton>使用</BottomUseButton>
          </BottomContainer>
          {renderMaskView(param.item)}
        </ContentView>
      </ShadowView>
    </ContainerView>
  );
};

const SectionContainerView = styled.View({
  height: sectionContainerViewH,
  width: '100%',
  backgroundColor: 'transparent',
  position: 'relative',
});

const SectionLineView = styled.View({
  height: 1,
  left: 10,
  right: 10,
  bottom: 16.5,
  backgroundColor: '#e6e6e6',
  position: 'absolute',
});

const SectionTitleText = styled.Text({
  fontSize: 12,
  height: 34,
  lineHeight: 34,
  fontWeight: 'normal',
  textAlign: 'center',
  textAlignVertical: 'center',
  color: '#999999',
  position: 'absolute',
  backgroundColor: '#F5F5F5',
  bottom: 0,
  left: (width - 100) / 2.0,
  width: 100,
});

export const VoucherHeaderView = ({section}: {section: VoucherClientSectionModel}) => {
  return (
    <SectionContainerView>
      <SectionLineView />
      <SectionTitleText>{section.sectionTitle}</SectionTitleText>
    </SectionContainerView>
  );
};
