var $ = require('jquery')
var Smooth = require('../smooth/smooth.js')

$(document).ready(function(){

    var $loading = $('#loading'),
        $tip = $loading.find('p'),
        $bar = $loading.find('.progress-bar')
    
    function hint(info, progress){
        $tip.text(info)
        $bar.css({transform: 'scale(' + progress + ', 1)'})        
    }
    if(!('ontouchstart' in window)) return $tip.text('浏览器不支持！:(')
    hint('smooth正在初始化...', 0.15)

    var smooth = document.querySelector('main')
    window.app = new Smooth(smooth, {
        animations: {},
        methods: {}
    })

    app.on('loadstart', function(e){
            hint('图片资源开始加载...', 0.3)
        })
        .on('progress', function(e){
            var text = '图片资源已加载' + e.current + '/' + (e.total - 1)
            var progress = 0.3 + 0.6 * e.current / e.total
            hint(text, progress)
        })
        .on('ready', function(e){
            var cached = localStorage._smoothIndex,
                self = this  //app
            hint('加载完毕！', 1)
            setTimeout(function(){
                if(cached){
                    self._load(self.stages[cached])
                }else{
                    self._load(self.stages[0])
                }
                $loading.remove()
            }, 400)
        })
        .on('paging', function(e){
            var $page = $(page)
            $page.text((e.current + 1) + '/' + e.total)
        })
})























