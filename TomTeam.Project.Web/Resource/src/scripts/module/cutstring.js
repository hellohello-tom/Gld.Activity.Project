/**
 * 截取字符串长度，包括中文
 * @author Zhao Liubin
 * @date   2016-06-13
 */

import 'getUTFLength.js';
module.exports = function(string, len) {
  if (!len || string.UTFlength < len) {
    return string;
  }
  var arrStr = string.split('');
  var i = 0,
    count = 0;
  for (i; i < arrStr.length; i++) {
    if (arrStr[i].UTFlength > 1) {
      count += 2;
    } else count++;
    if (count > len) {
      return arrStr.slice(0, i).join('');
    } else if (count === len) {
      return arrStr.slice(0, i + 1).join('');
    }
  }
};
