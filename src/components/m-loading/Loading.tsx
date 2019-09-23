import React from 'react'

interface ILoadingProps {
  isLoading: boolean,
  error: boolean
}

const Loading: React.FC<ILoadingProps> = (props) => {
  if(props.isLoading) return <div>loading...</div>
  else if(props.error) {
    console.log(props.error)
    return <div>error!!!</div>
  }
  else return null
}

export default Loading
