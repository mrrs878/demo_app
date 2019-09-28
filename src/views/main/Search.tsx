import React, {useEffect, useState, useContext} from "react"
import { withRouter, RouteComponentProps } from 'react-router-dom'

//@ts-ignore
import searchStyle from './search.module.less'
import MIcon from "../../components/m-icon/MIcon";
import MScroll from '../../components/m-scroll/MScroll'
import {ISearchResult, ITrack} from "../../interfaces";
import {getSearchRes, getSearchSug} from "../../apis/api";
import {AxiosResponse} from "axios";
import {ISearchRes, ISearchSugRes} from "../../interfaces/ajaxRes";
import {RootContext, types} from "../../store";
import {deepCopy} from "../../utils/tool";

interface ISearchProps extends RouteComponentProps{}

const Search: React.FC<ISearchProps> = props => {
  const [ keyword, setKeyword ] = useState<string>('');
  const [ clear_f, setClear_f ] = useState<boolean>(false);
  const [ searchSug, setSearchSug ] = useState<Array<{ keyword: string }>>();
  const [ searchRes, setSearchRes ] = useState<ISearchResult>();

  const { state, dispatch } = useContext(RootContext);

  useEffect(() => {
    if(keyword) {
      getSearchSug({ keywords: keyword }).then((res: AxiosResponse<ISearchSugRes>) => {
        setSearchSug(res.data.result.allMatch);
      }).catch(e => console.log(e))
    } else {
      setSearchSug([])
    }
  }, [ keyword ]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setKeyword(e.currentTarget.value);
    if(!clear_f) setClear_f(true);
    if(!e.currentTarget.value) setClear_f(false);
  }
  function handleClear() {
    setClear_f(false);
    setKeyword('');
  }
  async function handleSubmit(value?: string) {
    setSearchSug([]);
    let res: AxiosResponse<ISearchRes> = await getSearchRes({ keywords: value || keyword });
    setSearchRes(res.data.result)
  }
  function handleSetSong(item: ITrack) {
    let playList: Array<ITrack> = deepCopy(state.playList);
    playList.push(item);
    dispatch && dispatch({ type: types.SET_PLAY_LIST, data: playList });
    //@ts-ignore
    dispatch({ type: types.SET_SONG, data: item });
    //@ts-ignore
    dispatch({ type: types.SET_PLAYING_INDEX, data: playList.length - 1 });
    props.history.push(`/player/${ item.id }`);
  }

  return (
    <div className={ searchStyle.content }>
      <header className={ searchStyle.header }>
        <MIcon color="#d44439" name="icon-back" onClick={ () => props.history.goBack() }/>
        <div className={ searchStyle.inputContainer }>
          <input className={ searchStyle.input } maxLength={15} type="text" value={keyword} onChange={ handleInputChange } />
          <MIcon name="icon-clear" size={16} className={ searchStyle.clearIcon } visible={clear_f} onClick={ handleClear } />
        </div>
        <button className={ searchStyle.submit } onClick={ () => handleSubmit }>搜索</button>
      </header>
      <div className={ searchStyle.scrollContainer }>
        <MScroll>
          <ul className={ searchStyle.suggestOrResContainer }>
            {
              searchSug && searchSug.map((item, index) => (
                <li key={index} className={ searchStyle.suggestOrResItem } onClick={ () => handleSubmit(item.keyword) }>{ item.keyword }</li>
              ))
            }
            {
              searchRes && searchRes.song.songs.map((item, index) => (
                <li key={index} className={ searchStyle.suggestOrResItem } onClick={ () => handleSetSong(item) }>{ item.name }</li>
              ))
            }
          </ul>
        </MScroll>
      </div>
    </div>
  )
};

export default withRouter(Search)
