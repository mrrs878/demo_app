import React, {useState, useEffect, useContext} from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import MScroll from '../../components/m-scroll/MScroll'
import { ISingersRes } from '../../interfaces/ajaxRes'
import {ISinger} from "../../interfaces";
import { gertSingers } from '../../apis/api';
//@ts-ignore
import singersStyle from './singers.module.less'
import {AxiosResponse} from "axios";
import { RootContext } from '../../store'
import * as types from '../../store/type'

const categoryTypes = [
  {
    name: "华语男",
    key: "1001"
  },
  {
    name: "华语女",
    key: "1002"
  },
  {
    name: "华语组合",
    key: "1003"
  },
  {
    name: "欧美男",
    key: "2001"
  },
  {
    name: "欧美女",
    key: "2002"
  },
  {
    name: "欧美组合",
    key: "2003"
  },
  {
    name: "日本男",
    key: "6001"
  },
  {
    name: "日本女",
    key: "6002"
  },
  {
    name: "日本组合",
    key: "6003"
  },
  {
    name: "韩国男",
    key: "7001"
  },
  {
    name: "韩国女",
    key: "7002"
  },
  {
    name: "韩国组合",
    key: "7003"
  },
  {
    name: "其他男歌手",
    key: "4001"
  },
  {
    name: "其他女歌手",
    key: "4002"
  },
  {
    name: "其他组合",
    key: "4003"
  },
];
const alphaTypes = [
  {
    key: "A",
    name: "A"
  },
  {
    key: "B",
    name: "B"
  },
  {
    key: "C",
    name: "C"
  },
  {
    key: "D",
    name: "D"
  },
  {
    key: "E",
    name: "E"
  },
  {
    key: "F",
    name: "F"
  },
  {
    key: "G",
    name: "G"
  },
  {
    key: "H",
    name: "H"
  },
  {
    key: "I",
    name: "I"
  },
  {
    key: "J",
    name: "J"
  },
  {
    key: "K",
    name: "K"
  },
  {
    key: "L",
    name: "L"
  },
  {
    key: "M",
    name: "M"
  },
  {
    key: "N",
    name: "N"
  },
  {
    key: "O",
    name: "O"
  },
  {
    key: "P",
    name: "P"
  },
  {
    key: "Q",
    name: "Q"
  },
  {
    key: "R",
    name: "R"
  },
  {
    key: "S",
    name: "S"
  },
  {
    key: "T",
    name: "T"
  },
  {
    key: "U",
    name: "U"
  },
  {
    key: "V",
    name: "V"
  },
  {
    key: "W",
    name: "W"
  },
  {
    key: "X",
    name: "X"
  },
  {
    key: "Y",
    name: "Y"
  },
  {
    key: "Z",
    name: "Z"
  }
];

interface ISingersProps extends RouteComponentProps{}

const Singers: React.FC<ISingersProps> = props => {
  const [ activeType, setActiveType ] = useState<number>(0);
  const [ activeAlpha, setActiveAlpha ] = useState<number>(-1);
  const [ singers, setSingers ] = useState<Array<ISinger>>(new Array<ISinger>());
  const { dispatch }  = useContext(RootContext);

  useEffect(() => {
    gertSingers({ cat: categoryTypes[activeType].key, initial: activeAlpha === -1 ? '' : alphaTypes[activeAlpha].key }).then((res: AxiosResponse<ISingersRes>) => {
      setSingers(res.data.artists)
    }).catch(e => {
    })
  }, [ activeType, activeAlpha ]);

  function handleSingerClick(index: number, id: number) {
    props.history.push(`/singerDetail/${ id }`);
    // @ts-ignore
    dispatch({ type: types.SET_SINGER, data: singers[index] })
  }

  return (
    <div className={ singersStyle.content }>
      <div className={ singersStyle.categoryTypesScroll }>
        <span className={ singersStyle.title }>分类(默认热门):</span>
        <MScroll direction='horizontal'>
          <div className={ singersStyle.categoryTypesContainer }>
            {
              categoryTypes.map((item, index) => (
                <span className={ singersStyle.categoryTypes } onClick={ () => setActiveType(index) } style={{ borderColor: activeType === index ? '#d44439' : '', color: activeType === index ? '#d44439' : '#000' }} key={ index }>{ item.name }</span>
              ))
            }
          </div>
        </MScroll>
      </div>
      <div className={ singersStyle.categoryTypesScroll }>
        <span className={ singersStyle.title }>首字母:</span>
        <MScroll direction='horizontal'>
          <div className={ singersStyle.categoryTypesContainer }>
            {
              alphaTypes.map((item, index) => (
                <span className={ singersStyle.categoryTypes } onClick={ () => setActiveAlpha(index) } style={{ borderColor: activeAlpha === index ? '#d44439' : '', color: activeAlpha === index ? '#d44439' : '#000' }} key={ index }>{ item.name }</span>
              ))
            }
          </div>
        </MScroll>
      </div>
      <div className={ singersStyle.singersContainer }>
        <MScroll>
          <div>
            {
              singers.map((item, index) => (
                <div key={index} className={ singersStyle.singersItem } onClick={ () => handleSingerClick(index, item.id) }>
                  <div className={ singersStyle.img } style={{ backgroundImage: `url(${ item.picUrl })` }}/>
                  <span className={ singersStyle.name }>{ item.name }</span>
                </div>
              ))
            }
          </div>
        </MScroll>
      </div>
    </div>
  )
};

export default withRouter(Singers)
