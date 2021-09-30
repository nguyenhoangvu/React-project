import axios from "axios";

const TOKEN =
  "Basic a2QwMUBhYmFuay52bjpFMzRKRDE5NTNFMTIyTDg3MFY0NTMyODExMUwwOTQzNFA=";

const instance = axios.create({
  baseURL: "https://vbiapitest.evbi.vn/",
});

instance.defaults.headers.common["Authorization"] = TOKEN;
instance.defaults.headers["Content-Type"] = "application/json";

instance.interceptors.request.use(
  (request) => {
    if (request.method === "get" && request.params) {
      let url = request.url + "?";
      for (const propName of Object.keys(request.params)) {
        const value = request.params[propName];
        var part = encodeURIComponent(propName) + "=";
        if (value !== null && typeof value !== "undefined") {
          if (typeof value === "object") {
            for (const key of Object.keys(value)) {
              let params = propName + "[" + key + "]";
              var subPart = encodeURIComponent(params) + "=";
              url += subPart + encodeURIComponent(value[key]) + "&";
            }
          } else {
            url += part + encodeURIComponent(value) + "&";
            console.log("vu url: ", url);
          }
        }
      }
      url = url.slice(0, -1);
      request.params = {};
      request.url = url;
    }
    return request;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    // const code = res.data.code || 200;
    // const msg = res.data.msg;

    return res.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
