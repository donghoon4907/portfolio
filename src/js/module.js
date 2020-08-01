/**
 * 브라우저 반환
 * */
export const getBrowser = () => {
  const agent = navigator.userAgent.toLowerCase(),
    name = navigator.appName;
  let browser;

  // MS 계열 브라우저를 구분하기 위함.
  if (
    name === "Microsoft Internet Explorer" ||
    agent.indexOf("trident") > -1 ||
    agent.indexOf("edge/") > -1
  ) {
    browser = "ie";
    if (name === "Microsoft Internet Explorer") {
      // IE old version (IE 10 or Lower)
      agent = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(agent);
      browser += parseInt(agent[1]);
    } else {
      // IE 11+
      if (agent.indexOf("trident") > -1) {
        // IE 11
        browser += 11;
      } else if (agent.indexOf("edge/") > -1) {
        // Edge
        browser = "edge";
      }
    }
  } else if (agent.indexOf("safari") > -1) {
    // Chrome or Safari
    if (agent.indexOf("opr") > -1) {
      // Opera
      browser = "opera";
    } else if (agent.indexOf("chrome") > -1) {
      // Chrome
      browser = "chrome";
    } else {
      // Safari
      browser = "safari";
    }
  } else if (agent.indexOf("firefox") > -1) {
    // Firefox
    browser = "firefox";
  }

  // IE: ie7~ie11, Edge: edge, Chrome: chrome, Firefox: firefox, Safari: safari, Opera: opera
  return browser;
};

/**
 * viewport 너비 및 높이 반환
 * @param {String} browser - 브라우저 영문명
 * */
export const getViewPortSize = browser => {
  let width, height;
  if (browser === "safari") {
    width = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
  } else {
    width = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
  }
  height = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );

  return {
    width,
    height
  };
};
/**
 * get url parameter value
 * @param {String} param - url parameter key
 * @returns {String} param's value || null
 */
export const getParameter = param => {
  let result = null;
  const { search } = location;
  const parameters = search
    .slice(search.indexOf("?") + 1, search.length)
    .split("&");

  parameters.some(v => {
    const [key, value] = v.split("=");
    if (key.toUpperCase() == param.toUpperCase()) {
      result = value;
      return true;
    }
  });
  return result;
};
/**
 * 바이트 계산
 * @param {String} value - input value
 * @param {String} ko_count - korean count
 * @param {Number} maxByte = condition maxByte
 * @returns {Boolean} is_max
 */
export const checkMaxByte = (value, ko_count, maxByte) => {
  const ls_str = value;
  const li_str_len = ls_str.length;
  let li_byte = 0;
  let li_len = 0;
  let ls_one_char = "";

  for (let i = 0; i < li_str_len; i++) {
    ls_one_char = ls_str.charAt(i);

    if (escape(ls_one_char).length > 4) {
      li_byte += ko_count;
    } else {
      li_byte++;
    }
    if (li_byte <= maxByte) {
      li_len = i + 1;
    }
  }

  if (li_byte > maxByte) {
    return false;
  } else {
    return true;
  }
};
/**
 * create store
 */
export const createStore = () => {
  const store = {};

  const getItem = key => {
    store[key].data || null;
  };

  const setItem = (key, value) => {
    store[key] = store[key] || {};
    store[key].data = value || null;
  };

  const removeItem = key => {
    delete store[key];
  };

  const clear = () => {
    store = {};
  };

  const key = n => Object.keys(store)[n] || null;

  const log = () => console.log(store);

  return {
    getItem,
    setItem,
    removeItem,
    clear,
    key,
    log
  };
};
