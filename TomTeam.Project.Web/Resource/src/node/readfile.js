var fs = require('fs');
var src = 'src/HTMLS/common',
  filesrc = 'src/HTMLS/src',
  dest = 'src/HTMLS/dest/';

var fnImport = function(src, filesrc) {

	fs.readdir(filesrc,function(err,files){
		files.forEach(function(filename){
			fs.readFile(`${filesrc}/${filename}`, {
      encoding: 'utf8'
    }, function(err, data) {
      var dataReplace = data.replace(/<link\s+rel="import"\s+href="(.*)">/gi, function(matches, m1) {
        return fs.readFileSync(`${src}/${m1}`, {
          encoding: 'utf8'
        })
      });

      dataReplace = dataReplace.replace(/"\.\.\//g, '"');

      fs.writeFile(dest + filename, dataReplace, {
        encoding: 'utf8'
      }, function(err) {
        if (err) throw err;
        console.log(filename + 'OK');
      })

		})
	})

  
  });
}

fnImport(src, filesrc);
