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
        var parsedHtml = html.replace(/<a( |\n)(.|\n)*?>/g, function(str) {
            if(/data-inspm-id/g.test(str)) {
                return str
            }
            var locaid = sutil.genRandom().substring(0, 8);
            var ret = str.slice(0, -1) + ' data-inspm-id="' + locaid + '">'
            console.log(ret)
            return ret 
        })
        // console.log('eleArray:', eleArray)

        // replacedArray = eleArray.filter(function (ele) {
        //     if(/<a( |\n)([^>]|\n)*data-inspm-id(.|\n)*?>/g.test(ele)) {
        //         return false
        //     }
        //     return true
        // })

        // replacedArray.

        // let $item = $(item)

        // if(!$item.attr('data-inspm-id')) {
        // $item.attr('data-inspm-id', locaid)
        // }

        file.contents = new Buffer(parsedHtml);

        cb(null, file);
    });
}

module.exports = inspmlog;