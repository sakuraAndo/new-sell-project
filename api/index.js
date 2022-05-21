import { get } from './config';

const getSellers = get('/seller');
const getGoods = get('/goods');
const getRatings = get('/ratings');
export { getSellers, getGoods, getRatings };
