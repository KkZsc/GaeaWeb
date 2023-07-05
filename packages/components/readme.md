### 组件列表

- dialog
- loading
- modal
- navigation
- toast

### loading

使用时需先修改页面根组件：

```javascript
// in your entry file like `App.js`
import { RootView } from '@gaea-web/components/root-view';

// in your render function, and Loading,Toast,Modal will be render in RootView
return (
  <RootView>  // <- use RootView to wrap your root component
    <App />
  </RootView>
);

// 使用处
import Loading from '@gaea-web/components/loading'

Loading.show();
Loading.hide();
```

### modal

使用方式同 loading

### toast

使用方式同 loading
