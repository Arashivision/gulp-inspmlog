var fs        = require('fs');
var path      = require("path");
var util      = require('util');
var gutil     = require('gulp-util');
var through2  = require('through2');
var sutil     = require('./lib/sutil');
var cheerio   = require('cheerio');
var Error     = gutil.PluginError;


/**
 * 给满足筛选条件的节点添加data-inspm-id属性
 * 对于已经生成过data-inspm-id属性的节点，直接跳过
 * 因为data-inspm-id属性需要保持固定，只初始化生成一次
 * 如果需要重新生成，可以把原来的属性删除掉
 */ 

function inspmlog(options) {
    var selector = options.selector;

    return through2.obj(function(file, enc, cb) {

        if (!selector || !util.isString(selector)) {
            return cb(new Error('inspmlog', '缺少元素选择字段：selector'));
        }

        var html = file.contents.toString('utf8');
        var $ = cheerio.load(html)

        $(selector).each(function (index, item) {
          let $item = $(item)

          if(!$item.attr('data-inspm-id')) {
            var locaid = sutil.genRandom().substring(0, 8);
            $item.attr('data-inspm-id', locaid)
          }
        })

        file.contents = new Buffer($.html());

        cb(null, file);
    });
}

module.exports = inspmlog;