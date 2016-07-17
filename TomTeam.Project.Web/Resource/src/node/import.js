var fs = require('fs');

var htmlList = {
  src: {
    mobile: 'dist/HTMLS/mobile',
    PC: 'dist/HTMLS/PC',
    DOC: 'docs'
  },
  tpl: 'TPLindex.html'
};

var serializeTitle = function(filesrc, tpl) {
  var htmlStr = '';
  new Promise(function(resolve) {
    fs.readdir(filesrc, function(err, files) {
      files.forEach(function(filename) {
        if (/\.html/i.test(filename)) {
          var data = fs.readFileSync(`${filesrc}/${filename}`, 'utf8');
          var title = data.match(/<title>\s*(.*?)\s*<\/title>/)[1];
          htmlStr += `<li><a href="${filesrc}/${filename}">${title}</a></li>`;
        }

        // var dataReplace = data.replace(/<link\s+rel="import"\s+href="(.*)">/gi, function(matches, m1) {
        //   return fs.readFileSync(`${src}/${m1}`, {
        //     encoding: 'utf8'
        //   })
        // });

        // dataReplace = dataReplace.replace(/"\.\.\//g, '"');

        // fs.writeFile(dest + filename, dataReplace, {
        //   encoding: 'utf8'
        // }, function(err) {
        //   if (err) throw err;
        //   console.log(filename + 'OK');
        // })
      });
      resolve(htmlStr);
    });
  }).then(function(value) {
    var htmlTpl = fs.readFileSync(tpl, 'utf8');
    // htmlTpl = htmlTpl.replace('{{'+htmlList.src[el]+'}}', value);
    console.log(htmlTpl);
  });
};

var stream = require('stream'),
  Readable = stream.Readable;
var rs = new Readable;
rs.push('beep ');
rs.push('boop\n');
rs.push(null);
rs.pipe(process.stdout);

// serializeTitle(htmlList.src.DOC,htmlList.tpl);

// Object.keys(htmlList.src).forEach(function(el, index) {
//   serializeTitle(htmlList.src[el], htmlList.tpl);
// })
