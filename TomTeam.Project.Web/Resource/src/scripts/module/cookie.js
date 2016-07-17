/**
 * cookie get and set method
 * @author Zhao Liubin
 * @type {Object}
 */
module.exports = {
  get(key) {
    var cookie = document.cookie;
    if (!key || cookie.indexOf(key + '=') < 0) {
      return '';
    } else {
      return cookie.substr(cookie.indexOf(key + '=')).split('; ')[0].split('=')[1];
    }
  },
  set(key, value) {
    if (key && value) {
      document.cookie = key + '=' + value;
      return document.cookie;
    }
  }
};
