import React from 'react'

import { ActivityIndicator  } from 'antd-mobile'

interface ILoadingProps {
  isLoading: boolean,
  error: boolean
}

const Loading: React.FC<ILoadingProps> = (props) => {
  if(props.isLoading) return <ActivityIndicator animating={true} toast text="加载页面中..."/>;
  else if(props.error) {
    console.log(props.error);
    return <div>error!!!</div>
  }
  else return null
};

export default Loading
