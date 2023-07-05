import styled from '@emotion/native';
import Toolbar from '@gaea-web/components/toolbar';
import {SafeAreaContainer} from '@gaea-web/components/container';
import {Dimensions, Pressable, ScrollView} from 'react-native';
import {protocolList} from './data';
import {ProtocolView} from './components/Item';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RTNGaeaDebugInfo from 'rtn-gaea-debug-info/js/NativeGaeaDebugInfo';
import {useState, useRef} from 'react';
import {TNativeProps} from '@gaea-web/shared';

const ContentContainer = styled.View({
  flex: 1,
  alignItems: 'center',
  backgroundColor: '#F7F9FA',
});

const LogoImage = styled.Image({
  borderRadius: 18,
  marginTop: 50,
  height: 94,
  width: 94,
});

const TextLogoImage = styled.Image({
  marginTop: 50,
  height: 19,
  width: 61,
});

const VersionText = styled.Text({
  fontSize: 12,
  color: '#ffab15',
  marginTop: 5,
  marginBottom: 50,
});

const CompanyText = styled.Text({
  marginTop: 20,
  textAlign: 'center',
  fontSize: 14,
  color: '#757575',
});

const EmailText = styled.Text({
  textAlign: 'center',
  marginTop: 16,
  fontSize: 12,
  color: '#757575',
});

const TelText = styled.Text({
  textAlign: 'center',
  marginTop: 12,
  marginBottom: 20,
  fontSize: 12,
  color: '#757575',
});

const AboutUs = (props: TNativeProps) => {
  console.log(JSON.stringify(props));
  const tapCount = useRef(0);
  const [debugInfo, setDebugInfo] = useState('');

  const companyTitleTapped = () => {
    if (debugInfo.length > 0) {
      return;
    }
    tapCount.current++;
    if (tapCount.current >= 10) {
      let debugInfoStr = RTNGaeaDebugInfo?.aboutUsBottomDebugInfoString() || '';
      setDebugInfo(debugInfoStr);
    }
  };

  return (
    <SafeAreaProvider
      initialMetrics={{
        insets: {top: 0, bottom: 0, left: 0, right: 0},
        frame: {
          x: 0,
          y: 0,
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        },
      }}>
      <SafeAreaContainer>
        <Toolbar title={'关于快看'} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <ContentContainer>
            <LogoImage source={require('@/resource/kuaikan_logo.png')} />
            <TextLogoImage source={require('@/resource/kuaikan_text.png')} />
            <VersionText>{props.versionInfo}</VersionText>
            {protocolList.map(item => ProtocolView(item))}
            {debugInfo.length === 0 ? null : <CompanyText>{debugInfo}</CompanyText>}
            <Pressable onPress={companyTitleTapped}>
              <CompanyText>快看世界(北京)科技有限公司</CompanyText>
            </Pressable>
            <EmailText>举报邮箱：jubaoyouxiang@kkworld.com</EmailText>
            <TelText>举报电话：010-58527324</TelText>
          </ContentContainer>
        </ScrollView>
      </SafeAreaContainer>
    </SafeAreaProvider>
  );
};

export default AboutUs;
