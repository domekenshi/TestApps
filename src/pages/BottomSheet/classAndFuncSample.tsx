import React from 'react';
import Gorhom from './GorhomSampleScreen'; // Gorhomコンポーネントをインポート
// 関数コンポーネントをそのまま使用
class MyClassComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>My Class Component</h1>
        <Gorhom />
      </div>
    );
  }
}

export default MyClassComponent;
