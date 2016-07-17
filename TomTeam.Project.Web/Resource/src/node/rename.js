var data=require('./data.json')

console.log(data.name[0].firstname);

function hello(){
	console.info('Hello world')
}
hello();

var fs=require('fs');
var src='underscors';

fs.readdir(src,function(err,files){
	files.forEach(function(file){
		var oldPath=`${src}/${file}`,newPath=`${src}/${file.replace(/_/g,'-')}`;

		fs.rename(oldPath,newPath,function(err){
			if(!err){
				console.log(file+'下划线替换成功2')
			}
		})
	})
})