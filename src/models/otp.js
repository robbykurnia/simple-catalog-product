import axios from 'axios';
import { API_KEY, AUTH_API_URL } from '../../config';

export default class otpAPI {
  static reqOTP(data) {
    return axios({
      method: 'post',
      data,
      headers: {
        "X-API-Key": `${API_KEY}`,
        "Content-Type": "application/json"
      },
      url: `${AUTH_API_URL}/token-auth/otp/`
    });
  }

  static sentOTP(data) {
    return axios({
      method: 'post',
      data,
      headers: {
        "X-API-Key": `${API_KEY}`,
        "Content-Type": "application/json"
      },
      url: `${AUTH_API_URL}/token-auth/`
    });
  }
}

