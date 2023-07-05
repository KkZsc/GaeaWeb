export enum ActionTypeDef {
  PAGE_INNER_WEB = 1,
  PAGE_TOPIC = 2,
  PAGE_COMIC = 3,
  PAGE_HYBRID = 18,
  PAGE_SEARCH_TOPIC_RESULT = 19,
  PAGE_AUTHOR_DETAIL = 28,
  PAGE_POST_DETAIL = 29,
  NORMAL_LABEL_DETAIL = 31,
  ADVANCED_LABEL_DETAIL = 32,
  PAGE_PERSON_CENTER = 33,
  SOUND_POST_VIDEO = 46,
  LABEL_DETAIL_PAGE = 54,
  SEARCH_RESULTS = 56,
  BATCH_CONTINUE_COMIC = 68,
  BATCH_SHOW_BRIEF_COMIC = 69,
  COMPILATION_DETAIL = 99,
  ACTION_TYPE_COMIC_VIDEO_ALBUM = 101,
  ACTION_TYPE_COMIC_VIDEO_LASTLY = 105,
}

export const DEFAULT_STRING_VALUE = '无';

export type ActionModel = {
  action_type?: number;
  type?: number;
  parent_target_id?: number;
  target_id?: number;
  target_title?: string;
};

export const getActionType = (actionModel: ActionModel) => {
  return (actionModel.type && actionModel.type !== 0 ? actionModel.type : actionModel.action_type) ?? 0;
};

export const getContentType = (actionModel: ActionModel) => {
  switch (getActionType(actionModel)) {
    case (ActionTypeDef.PAGE_TOPIC, ActionTypeDef.BATCH_SHOW_BRIEF_COMIC):
      return '专题';
    case (ActionTypeDef.PAGE_COMIC, ActionTypeDef.BATCH_CONTINUE_COMIC):
      return '漫画';
    case (ActionTypeDef.ACTION_TYPE_COMIC_VIDEO_LASTLY, ActionTypeDef.ACTION_TYPE_COMIC_VIDEO_ALBUM):
      return '视频漫合集';
    case (ActionTypeDef.PAGE_AUTHOR_DETAIL, ActionTypeDef.PAGE_PERSON_CENTER):
      return '用户';
    case (ActionTypeDef.PAGE_POST_DETAIL, ActionTypeDef.SOUND_POST_VIDEO):
      return '帖子';
    case (ActionTypeDef.LABEL_DETAIL_PAGE, ActionTypeDef.NORMAL_LABEL_DETAIL, ActionTypeDef.ADVANCED_LABEL_DETAIL):
      return '标签';
    case ActionTypeDef.COMPILATION_DETAIL:
      return '帖子合集';
    case (ActionTypeDef.PAGE_SEARCH_TOPIC_RESULT, ActionTypeDef.SEARCH_RESULTS):
      return '搜索关键词';
    case (ActionTypeDef.PAGE_INNER_WEB, ActionTypeDef.PAGE_HYBRID):
      return 'H5链接';
    default:
      return DEFAULT_STRING_VALUE;
  }
};

export const getContentIdByActionType = (actionModel: ActionModel) => {
  if (getContentType(actionModel) === DEFAULT_STRING_VALUE) {
    return DEFAULT_STRING_VALUE;
  }
  switch (getActionType(actionModel)) {
    case ActionTypeDef.PAGE_COMIC:
      return DEFAULT_STRING_VALUE;
    case ActionTypeDef.BATCH_CONTINUE_COMIC:
      return actionModel.parent_target_id?.toString() ?? DEFAULT_STRING_VALUE;
    default:
      return actionModel.target_id && actionModel.target_id !== 0 ? actionModel.target_id.toString() : DEFAULT_STRING_VALUE;
  }
};

export const getRelatedIdByActionType = (actionModel: ActionModel) => {
  switch (getActionType(actionModel)) {
    case (ActionTypeDef.PAGE_COMIC, ActionTypeDef.BATCH_CONTINUE_COMIC):
      return actionModel.target_id?.toString() ?? DEFAULT_STRING_VALUE;
    default:
      return DEFAULT_STRING_VALUE;
  }
};

export const getRelatedNameByActionType = (actionModel: ActionModel) => {
  switch (getActionType(actionModel)) {
    case (ActionTypeDef.PAGE_COMIC, ActionTypeDef.BATCH_CONTINUE_COMIC):
      return actionModel.target_title ?? DEFAULT_STRING_VALUE;
    default:
      return DEFAULT_STRING_VALUE;
  }
};
