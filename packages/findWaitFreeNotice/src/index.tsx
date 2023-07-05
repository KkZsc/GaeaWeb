import styled from '@emotion/native';

import Container from './components/ComponentName';
import {useEffect, useState} from 'react';
import {TNativeProps} from '@gaea-web/shared';
import RTNGaeaNativeData from 'rtn-gaea-native-data/js/NativeGaeaNativeData';
import {NativeEventEmitter, NativeModules} from 'react-native';
import RTNGaeaGradientView, {GradientOrientation} from 'rtn-gaea-gradient-view/js/GaeaGradientViewNativeComponent';
import {FindInfoWaitFreeNoticeModel} from 'packages/shared/src/types/findData/findInfoModel';
import {BubbleTextProps} from '../types';

const {GAViewEventEmitter} = NativeModules;
const updateDataEmitter = new NativeEventEmitter(GAViewEventEmitter);

const BackgroundView = styled.View({
  backgroundColor: '#E1FDEA',
  width: '100%',
  height: 36,
  borderRadius: 6,
  position: 'absolute',
});

const LeftContainer = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
});

const IconImage = styled.Image({
  width: 24,
  height: 24,
  marginLeft: 11,
  marginRight: 1,
});

const TitleText = styled.Text({
  fontSize: 13,
  height: 16,
  lineHeight: 16,
  fontWeight: 'normal',
  textAlign: 'left',
  color: '#222222',
});

const CountText = styled.Text({
  fontSize: 14,
  height: 17,
  lineHeight: 17,
  fontWeight: 'bold',
  textAlign: 'left',
  color: '#222222',
});

const RightContainerView = styled.View({
  height: 16,
  marginRight: 11,
  borderRadius: 8,
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
});

const BubbleText = styled.Text<BubbleTextProps>(props => ({
  fontSize: 10,
  fontWeight: 'normal',
  textAlign: 'center',
  color: props.color || '#222222',
  paddingHorizontal: 6,
}));

const BubbleBackgroundView = ({backgroundColor = []}: {backgroundColor?: string[]}) => {
  if (backgroundColor.length === 0) {
    return null;
  }
  let processedColor = [...backgroundColor];
  if (processedColor.length === 1) {
    processedColor.push(processedColor[0]);
  }
  return (
    <RTNGaeaGradientView
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
      }}
      colors={processedColor.slice(0, 2)}
      gradientOrientation={GradientOrientation.LEFT_RIGHT}
    />
  );
};

const RightView = (param?: FindInfoWaitFreeNoticeModel) => {
  let bubbleText = param?.bubbleText ?? '';
  if (!bubbleText.length) {
    return null;
  }
  return (
    <RightContainerView>
      <BubbleBackgroundView backgroundColor={param?.backgroundColors} />
      <BubbleText color={param?.bubbleFontColor}>{bubbleText}</BubbleText>
    </RightContainerView>
  );
};

const nativeData = async (rootTag: number) => {
  return await RTNGaeaNativeData?.data<FindInfoWaitFreeNoticeModel, any>(rootTag);
};

const PageComponent = (props: TNativeProps) => {
  const [noticeModel, setNoticeModel] = useState<FindInfoWaitFreeNoticeModel>();

  useEffect(() => {
    const refreshData = () => {
      if (props.rootTag) {
        nativeData(props.rootTag).then(result => {
          if (result) {
            const fetchData = result.data;
            const noticeData: FindInfoWaitFreeNoticeModel = fetchData;
            setNoticeModel(noticeData);
          }
        });
      }
    };
    const eventListener = updateDataEmitter.addListener('GaeaViewReloadData', event => {
      if (props.rootTag && event?.rootTag === props.rootTag) {
        refreshData();
      }
    });
    refreshData();
    return () => {
      eventListener.remove();
    };
  }, [props.rootTag]);
  return (
    <Container>
      <BackgroundView />
      <LeftContainer>
        {noticeModel && noticeModel?.icon && <IconImage source={{uri: noticeModel.icon}} />}
        {/* <IconImage source={{uri: noticeModel?.icon}} /> */}
        <TitleText>{noticeModel?.text}</TitleText>
        <CountText>{noticeModel?.count}</CountText>
      </LeftContainer>
      {RightView(noticeModel)}
    </Container>
  );
};

export default PageComponent;
