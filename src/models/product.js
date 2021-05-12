import axios from 'axios';
import { API_KEY, API_URL } from '../../config';

export default class ProductAPI {
  static getProduct() {
    return axios({
      method: 'get',
      headers: {
        "X-API-Key": `${API_KEY}`,
        "Content-Type": "application/json"
      },
      url: `${API_URL}/catalog/api/product/search/?q=blue`
    });
  }
}

