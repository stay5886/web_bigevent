// 注意每次调用 $.git() $.post() $.ajax()的时候，
// 会先调用 ajaxPrefilter这个函数
// 它可以拿到我们给Ajax的配置对象
// 这样就可以很容易的得到url地址
$.ajaxPrefilter(function (options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url);
})
