import axios from "axios";
import QS from 'qs';
import {Toast} from 'vant';


if (process.env.NODE_ENV == 'development'){
  axios.defaults.baseURL = '/api';

}
