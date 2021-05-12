import axios from 'axios';
import Cookies from 'universal-cookie';
import { API_KEY, API_URL } from '../../config';

const cookies = new Cookies();

export default class cartAPI {
  static getCart() {
    return axios({
      method: 'get',
      headers: {
        "X-API-Key": `${API_KEY}`,
        "Authorization": `jwt ${cookies.get('token')}`,
        "Content-Type": "application/json"
      },
      url: `${API_URL}/sales/api/cart/0/`
    });
  }
}

