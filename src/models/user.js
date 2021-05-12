import axios from 'axios';
import Cookies from 'universal-cookie';
import { API_KEY, AUTH_API_URL } from '../../config';

const cookies = new Cookies();

export default class userAPI {
  static getInfo() {
    return axios({
      method: 'post',
      data: { token: `${cookies.get('token')}` },
      headers: {
        "X-API-Key": `${API_KEY}`,
        "Content-Type": "application/json"
      },
      url: `${AUTH_API_URL}/token-info/`
    });
  }
}

