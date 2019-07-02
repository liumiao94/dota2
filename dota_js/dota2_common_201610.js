;(function() {
    var now = '20190621'
    var body = document.querySelector('body')

    /***************** add common js&css ********************/
    var loadScript = function(url) {
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = url
        document.querySelector('body').appendChild(script)
    }
    var cur_Url = /^http(s)?:\/\/www-[\w]+\.dota2\.com\.cn/gi.test(
        location.href
    )
        ? ''
        : '//www.dota2.com.cn'

    loadScript('//static.games.wanmei.com/public/js/stat.js')
    loadScript(cur_Url + '/public/js/top_nav.js?v=' + now)
    loadScript(cur_Url + '/public/js/bottom-cover.js?v=' + now)

    /***************** fix rel1100 ********************/
    function isIe() {
        return 'ActiveXObject' in window
    }
    // var css = document.createElement('style');
    // css.type = 'text/css';
    // css.setAttribute("id", "cssinsert");
    // var ie11 = navigator.appName.indexOf("Netscape");
    // if (isIe()) {
    //     if (ie11 === 0) {
    //         css.innerHTML = '.rel1100{margin:0 auto;width:1100px;position: relative;}';
    //     } else {
    //         css.styleSheet.cssText = '.rel1100{margin:0 auto;width:1100px;position: relative;}';
    //     }
    // } else {
    //     css.innerHTML = '.rel1100{margin:0 auto;width:1100px;position: relative;}';
    // }

    // document.getElementsByTagName('head')[0].appendChild(css);

    /***************** loadico ********************/
    function loadico(filename, filerel) {
        var fileref = document.createElement('link')
        fileref.setAttribute('rel', filerel)
        fileref.setAttribute('href', filename)

        document.getElementsByTagName('head')[0].appendChild(fileref)
    }
    loadico('//www.dota2.com.cn/favicon.ico', 'bookmark')
    loadico('//www.dota2.com.cn/favicon.ico', 'Shortcut Icon')
})()