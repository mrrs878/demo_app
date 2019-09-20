import ajax from '../utils/ajax'

const BASE_URL = 'http://localhost:4000'
const PERSONALIZED_URL = `${BASE_URL}/personalized`

export const getBanners = () => ajax.get(`${BASE_URL}/banner`)
export const getRecommendList = () => ajax.get(`${PERSONALIZED_URL}`)