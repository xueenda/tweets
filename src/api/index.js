import axios from 'axios'
// axios.defaults.withCredentials = true

let url = Config.api_url,
  instance = axios.create({
    baseURL: url,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })


/** Use post(url[, data][, options]) or get() for automatic token refresh on a failed request.
 *  Example: post("pubnub/grant", {auth_key: "random"}) */

export default {
  search: function(term) {
    return _request('/search?term=' + term);
  }
}

function _request(url) {
  return instance.get(url).then(res => Promise.resolve(res.data));
}
