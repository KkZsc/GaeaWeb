declare const process: {
  env: {
    WEBPACK: string;
  };
};

declare const ga: {
  webAppConfig: {
    boxes: App[];
  };
  Notification: Notification;
  webAppConfig: {
    boxes: App[];
  };
};
interface Bundle {
  md5: string;
  filename: string;
  resourceID: string;
  downloadURL: string;
}
interface App {
  webAppName: string;
  webpAppHash: string;
  preLoadUrl: string;
  finalLoadUrl: string;
  bundles: {
    lib: Bundle;
    entry: Bundle;
    assets: Bundle;
  };
}
interface Notification {
  new (): Notification;
  addEventListener(
    name: string,
    callback: (jsonStr: string) => void,
  ): () => void;

  postNotification(eventJson: string): void;
}
