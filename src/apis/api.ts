import ajax from '../utils/ajax'

import * as apiParams from './apiParams'

const BASE_URL = 'http://39.108.164.108:9123';
// const BASE_URL = 'http://192.168.5.210:4000';
const PERSONALIZED_URL = `${BASE_URL}/personalized`;
const SEARCH_URL = `${BASE_URL}/search`;
const COMMENT_URL = `${BASE_URL}/comment`;

export const getBanners = () => ajax.get(`${BASE_URL}/banner`);
export const getRecommendList = () => ajax.get(`${PERSONALIZED_URL}`);
export const getListDetail = (params: apiParams.TGetListDetail) => ajax.get(`${BASE_URL}/playlist/detail?id=${params.id}`);

export const getSongURL = (params: apiParams.TGetSongURL) => ajax.get(`${BASE_URL}/song/url?id=${params.id}`);

export const gertSingers = (params: apiParams.TGetSingers) => ajax.get(`${BASE_URL}/artist/list?cat=${params.cat}&initial=${params.initial}`);

export const getSingerSongs = (params: apiParams.TGetSingerSongs) => ajax.get(`${BASE_URL}/artists?id=${params.id}`);

export const getLyric = (params: apiParams.TGetLyric) => ajax.get(`${BASE_URL}/lyric?id=${params.id}`);

export const getSearchSug = (params: apiParams.TGetSearchSug) => ajax.get(`${SEARCH_URL}/suggest?keywords=${params.keywords}&type=mobile`);
export const getSearchRes = (params: apiParams.TGetSearchRes) => ajax.get(`${SEARCH_URL}?keywords=${params.keywords}&type=1018`);

export const getSongComment = (params: apiParams.TGetSongComment) => ajax.get(`${COMMENT_URL}/music?id=${params.id}&offset=${params.offset}`);
