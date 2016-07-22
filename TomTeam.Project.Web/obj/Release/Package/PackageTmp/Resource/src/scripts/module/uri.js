/**
 * URI操作，存取query及取hash
 * @author Zhao Liubin
 * @type {Object}
 */
module.exports = {
  query: {
    locTop: top.window.location.href,
    loc: window.location.href,
    get(key, top) {
      var loc = this.loc;
      if (top === 'top') {
        loc = this.locTop;
      }
      if (!key || loc.indexOf(key + '=') < 0) {
        return '';
      }
      loc = loc.split('#')[0];
      return loc.slice(loc.indexOf(key + '=') + key.length + 1).split('&')[0];
    },
    set(key, value, top) {
      var loc = this.loc;
      if (top === 'top') {
        loc = this.locTop;
      }
      if (!key || !value) {
        return loc;
      }
      if (value) {
        var query = this.get(key);
        console.log(query);
        if (query) {
          return loc.replace(this.get(key), value);
        } else {
          var arrTemp = loc.split('#'),
            newURL;
          newURL = arrTemp[0] + '&' + key + '=' + value;
          if (arrTemp[1]) {
            newURL += '#' + arrTemp[1];
          }
          return newURL;
        }
      }
    }
  },
  hash: {
    hashTop: top.window.location.hash,
    hash: window.location.hash,
    get(top) {
      var hash = this.hash;
      if (top === 'top') {
        hash = this.hashTop;
      }
      return hash.split('#')[1];
    },
    set(value, top) {
      if (value) {
        if (top === 'top') {
          return top.window.location.hash = value;
        }
        return window.location.hash = value;
      }
    }
  }
};
