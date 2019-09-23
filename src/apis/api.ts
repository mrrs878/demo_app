import ajax from '../utils/ajax'

import * as apiParams from './apiParams'

const BASE_URL = 'http://localhost:4000'
const PERSONALIZED_URL = `${BASE_URL}/personalized`

export const getBanners = () => ajax.get(`${BASE_URL}/banner`)
export const getRecommendList = () => ajax.get(`${PERSONALIZED_URL}`)
export const getListDetail = (params: apiParams.IGetListDetail) => ajax.get(`${BASE_URL}/playlist/detail?id=${params.id}`)

export const getSongURL = (params: apiParams.IGetSongURL) => ajax.get(`${BASE_URL}/song/url?id=${params.id}`)

export const gertSingers = (params: apiParams.IGetSingers) => ajax.get(`${BASE_URL}/artist/list?cat=${params.cat}&initial=${params.initial}`)
