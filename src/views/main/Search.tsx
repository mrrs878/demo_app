import React, {useEffect, useState, useContext} from "react"
import { withRouter, RouteComponentProps } from 'react-router-dom'

//@ts-ignore
import searchStyle from './search.module.less'
import MIcon from "../../components/m-icon/MIcon";
import MScroll from '../../components/m-scroll/MScroll'
import {IAlbum, IArtist, ISearchResult, ITrack} from "../../interfaces";
import {getSearchRes, getSearchSug} from "../../apis/api";
import {AxiosResponse} from "axios";
import {ISearchRes, ISearchSugRes} from "../../interfaces/ajaxRes";
import {RootContext, types} from "../../store";
import {deepCopy} from "../../utils/tool";
import {SearchResult} from "../../models";

interface ISearchProps extends RouteComponentProps{}

const Search: React.FC<ISearchProps> = props => {
  const [ keyword, setKeyword ] = useState<string>('');
  const [ clear_f, setClear_f ] = useState<boolean>(false);
  const [ searchSug, setSearchSug ] = useState<Array<{ keyword: string }>>();
  const [ searchRes, setSearchRes ] = useState<ISearchResult>(new SearchResult({moreText: '', albums: []}, {moreText: '', artists: []}, {moreText: '', songs: []}));

  const { state, dispatch } = useContext(RootContext);

  useEffect(() => {
    if(keyword) {
      getSearchSug({ keywords: keyword }).then((res: AxiosResponse<ISearchSugRes>) => {
        setSearchSug(res.data.result.allMatch);
      }).catch(e => console.log(e))
    } else {
      setSearchSug([]);
    }
    setSearchRes(new SearchResult({moreText: '', albums: []}, {moreText: '', artists: []}, {moreText: '', songs: []}));
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
  function handleClickTrack(item: ITrack) {
    let playList: Array<ITrack> = deepCopy(state.playList);
    playList.push(item);
    dispatch && dispatch({ type: types.SET_PLAY_LIST, data: playList });
    dispatch({ type: types.SET_SONG, data: item });
    dispatch({ type: types.SET_PLAYING_INDEX, data: playList.length - 1 });
    props.history.push(`/player/${ item.id }`);
  }
  function handleClickAlbum(item: IAlbum) {
    console.log(item)
  }
  function handleClickArtist(item: IArtist) {
    console.log(item)
  }

  return (
    <div className={ searchStyle.content }>
      <header className={ searchStyle.header }>
        <MIcon color="#d44439" name="icon-back" onClick={ () => props.history.goBack() }/>
        <div className={ searchStyle.inputContainer }>
          <input className={ searchStyle.input } autoFocus={true} maxLength={15} type="text" value={keyword} onChange={ handleInputChange } />
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
            <div>
              <span style={{ opacity: searchRes.song.songs.length ? 1: 0 }} className={ searchStyle.title }>单曲</span>
              {
                searchRes.song.songs.map((item, index) => (
                  <li key={index} className={ searchStyle.suggestOrResItem } onClick={ () => handleClickTrack(item) }>{ item.name }</li>
                ))
              }
            </div>
            <div>
              <br/>
              <span style={{ opacity: searchRes.song.songs.length ? 1: 0 }} className={ searchStyle.title }>专辑</span>
              {
                searchRes.album.albums.map((item, index) => (
                  <li key={index} className={ searchStyle.suggestOrResItem } onClick={ () => handleClickAlbum(item) }>{ item.name }</li>
                ))
              }
            </div>
            <div>
              <br/>
              <span style={{ opacity: searchRes.artist.artists.length ? 1: 0 }} className={ searchStyle.title }>歌手</span>
              {
                searchRes.artist.artists.map((item, index) => (
                  <li key={index} className={ searchStyle.suggestOrResItem } onClick={ () => handleClickArtist(item) }>{ item.name }</li>
                ))
              }
            </div>
          </ul>
        </MScroll>
      </div>
    </div>
  )
};

export default withRouter(Search)
