import axios from 'axios'
axios.defaults.withCredentials = true

let url = Config.api_url,
  instance = axios.create({
    baseURL: url
  })


/** Use post(url[, data][, options]) or get() for automatic token refresh on a failed request.
 *  Example: post("pubnub/grant", {auth_key: "random"}) */

export default {
  partnerHot: function() {
    return get("partner/hot")
  }
}

function getHeader() {
  let headers = {}
  if (localStorage.getItem("token") || window.tweet_token) {
    headers = {
      Authorization: "Bearer " + (localStorage.getItem("token") || window.tweet_token)
    }
  }
  return { headers: headers }
}

function requestWithRetry(op, url, data, options) {
  return op.apply(instance, (op === instance.get) ? [url, options] : [url, data, options])
    .then(res => res.data, err => {
      return instance.post("auth/refresh", {
          "refresh_token": localStorage.getItem("refresh_token")
        }, getHeader())
        .then(resp => {
          localStorage.setItem("token", resp.data.token)
          let newOptions = Object.assign({}, options, getHeader()),
            args = (op === instance.get) ? [url, newOptions] : [url, data, newOptions]
          return op.apply(instance, args)
        })
    })
}

function post(url, data, options) {
  return requestWithRetry(instance.post, url, data, options || getHeader())
}

function get(url, options) {
  return requestWithRetry(instance.get, url, null, options || getHeader())
}
