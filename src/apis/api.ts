import ajax from '../utils/ajax'

import * as apiParams from './apiParams'

const BASE_URL = 'http://39.108.164.108:9123';
// const BASE_URL = 'http://192.168.5.210:4000';
const PERSONALIZED_URL = `${BASE_URL}/personalized`;
const SEARCH_URL = `${BASE_URL}/search`;

export const getBanners = () => ajax.get(`${BASE_URL}/banner`);
export const getRecommendList = () => ajax.get(`${PERSONALIZED_URL}`);
export const getListDetail = (params: apiParams.IGetListDetail) => ajax.get(`${BASE_URL}/playlist/detail?id=${params.id}`);

export const getSongURL = (params: apiParams.IGetSongURL) => ajax.get(`${BASE_URL}/song/url?id=${params.id}`);

export const gertSingers = (params: apiParams.IGetSingers) => ajax.get(`${BASE_URL}/artist/list?cat=${params.cat}&initial=${params.initial}`);

export const getSingerSongs = (params: apiParams.IGetSingerSongs) => ajax.get(`${BASE_URL}/artists?id=${params.id}`);

export const getLyric = (params: apiParams.IGetLyric) => ajax.get(`${BASE_URL}/lyric?id=${params.id}`);

export const getSearchSug = (params: apiParams.IGetSearchSug) => ajax.get(`${SEARCH_URL}/suggest?keywords=${params.keywords}&type=mobile`);
export const getSearchRes = (params: apiParams.IGetSearchRes) => ajax.get(`${SEARCH_URL}?keywords=${params.keywords}&type=1018`);


