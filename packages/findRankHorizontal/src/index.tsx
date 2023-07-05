import styled from '@emotion/native';
import {useState, useEffect} from 'react';
import FindHorizonRankListItemCell from './views/findRankHorizontalItem';
import {FindInfoBannerModel} from '@gaea-web/shared/src/findData/findInfoBanner';
import RTNGaeaNativeData from 'rtn-gaea-native-data/js/NativeGaeaNativeData';
import {Dimensions, FlatList, NativeEventEmitter, NativeModules} from 'react-native';
import {TNativeProps} from 'packages/shared';
import {FindInfoButtonModel} from '@gaea-web/shared/src/types/findData/findInfoButton';
import FindHorizonRankMoreCell from './views/findHorizonRankMoreItem';

const {GAViewEventEmitter} = NativeModules;
const updateDataEmitter = new NativeEventEmitter(GAViewEventEmitter);

const Container = styled.View({
  width: Dimensions.get('window').width,
  height: 128,
});

const RenderItem = ({
  rootTag,
  item,
  inItemPos,
  isFirstItem,
  isLastItem,
  isComicPage,
  saParams,
  HL_ModuleType,
  HL_ModulePos,
}: {
  item: FindInfoBannerModel | FindInfoButtonModel;
  inItemPos: number;
  isFirstItem: boolean;
  isLastItem: boolean;
  isComicPage: boolean;
  rootTag: number;
  saParams: {};
  HL_ModuleType: string;
  HL_ModulePos: number;
}) => {
  return (
    <FindHorizonRankListItemCell
      bannerModel={item as FindInfoBannerModel}
      inItemPos={inItemPos}
      isFirstItem={isFirstItem}
      isLastItem={isLastItem}
      isComicPage={isComicPage}
      saParams={saParams}
      rootTag={rootTag}
      HL_ModuleType={HL_ModuleType}
      HL_ModulePos={HL_ModulePos}
    />
  );
};

interface FindInfoModel {
  title: string;
  isComicPage: boolean;
  moduleIndex: number;
  bannerList: FindInfoBannerModel[];
  buttonList: FindInfoButtonModel[];
}

const nativeData = async (rootTag: number) => {
  return await RTNGaeaNativeData?.data<FindInfoModel, any>(rootTag);
};

const FindRankHorizontal = (props: TNativeProps) => {
  const [bannerList, setBannerList] = useState<FindInfoBannerModel[]>([]);
  const [footerButtonModel, setFooterButtonModel] = useState<FindInfoButtonModel>();
  const [isComicPage, setComicPage] = useState(false);
  const [saParams, setSaParams] = useState({});
  const [HL_ModuleType, setHL_ModuleType] = useState('无');
  const [HL_ModulePos, setHL_ModulePos] = useState(0);

  useEffect(() => {
    const getData = () => {
      if (props.rootTag) {
        nativeData(props.rootTag).then(result => {
          if (result) {
            const fetchData = result.data;
            setSaParams(result.saParams);
            if (fetchData) {
              setComicPage(fetchData.isComicPage);
              setHL_ModuleType(fetchData.title);
              setHL_ModulePos(fetchData.moduleIndex);
              const dataList: FindInfoBannerModel[] = [];
              const banner: FindInfoBannerModel[] = fetchData.bannerList;
              dataList.push(...banner);
              setBannerList(dataList);
              setFooterButtonModel(fetchData.buttonList[0]);
            }
          }
        });
      }
    };
    const eventListener = updateDataEmitter.addListener('GaeaViewReloadData', event => {
      if (props.rootTag && event?.rootTag === props.rootTag) {
        getData();
      }
    });

    getData();

    return () => {
      eventListener.remove();
    };
  }, [props.rootTag]);

  return (
    <Container>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={bannerList}
        keyExtractor={(item, index) => `${item.bannerID}-${index}`}
        renderItem={({item, index}: {item: FindInfoBannerModel; index: number}) => {
          return (
            <RenderItem
              item={item}
              inItemPos={index}
              isFirstItem={index === 0}
              isLastItem={footerButtonModel === undefined && index === bannerList.length - 1}
              isComicPage={isComicPage}
              saParams={saParams}
              rootTag={props.rootTag ? props.rootTag : 0}
              HL_ModuleType={HL_ModuleType}
              HL_ModulePos={HL_ModulePos}
            />
          );
        }}
        ListFooterComponent={
          footerButtonModel ? (
            <FindHorizonRankMoreCell
              buttonModel={footerButtonModel}
              isComicPage={isComicPage}
              saParams={saParams}
              rootTag={props.rootTag ? props.rootTag : 0}
            />
          ) : null
        }
      />
    </Container>
  );
};

export default FindRankHorizontal;
