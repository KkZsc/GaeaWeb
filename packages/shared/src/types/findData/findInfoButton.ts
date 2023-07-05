import {CommonActionModel} from 'rtn-gaea-navigation/js/NativeGaeaNavigation';

enum FindInfoButtonType {
  Unknow = 0,
  RightTop,
  Bottom,
  RightSlip,
}

enum FindInfoButtonStatus {
  Unknow = 0,
  PostRequest,
  GetRequest,
  Change,
  ActionType,
  AutoRefresh,
  NoActon,
  CustomAction,
}
interface FindInfoButtonLabelModel {
  backgroundColor: string;
  fontColor: string;
  text: string;
}

export interface FindInfoButtonModel {
  buttonStatus: FindInfoButtonStatus;
  buttonType: FindInfoButtonType;
  backgroundColor: string;
  fontColor: string;
  text: string;
  hitParam: {[key: string]: any};
  actionType?: CommonActionModel;
  afterButton: FindInfoButtonModel;
  labelModel: FindInfoButtonLabelModel;
  targetSourceModuleTitle: string;
}
