var fs        = require('fs');
var path      = require("path");
var util      = require('util');
var gutil     = require('gulp-util');
var through2  = require('through2');
var sutil     = require('./lib/sutil');
var Error     = gutil.PluginError;


/**
 * 给满足筛选条件的节点添加data-inspm-id属性
 * 对于已经生成过data-inspm-id属性的节点，直接跳过
 * 因为data-inspm-id属性需要保持固定，只初始化生成一次
 * 如果需要重新生成，可以把原来的属性删除掉
 */ 

function inspmlog(options) {
    return through2.obj(function(file, enc, cb) {
        let count = 0;
        var html = file.contents.toString('utf8');
        var parsedHtml = html.replace(/<a( |\n)(.|\n)*?>/g, function(str) {
            if(/data-inspm-id/g.test(str)) {
                return str
            }
            count++
            var locaid = sutil.genRandom().substring(0, 8);
            var ret = str.slice(0, -1) + ' data-inspm-id="' + locaid + '">'
            return ret 
        })
        let relativePath = path.relative(__dirname, file.path)
        console.log('%s %d tag has been tagged.', relativePath, count)

        file.contents = new Buffer(parsedHtml);

        cb(null, file);
    });
}

module.exports = inspmlog;