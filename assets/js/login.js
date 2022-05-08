$(function () {
    $('#link_reg').click(function () {
        $('.reg-box').show()    
        $('.login-box').hide()
    })
    $('#link_login').click(function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    /* 从layui中获取form对象 */
    var form = layui.form
    var layer = layui.layer
// 通过form.verify() 函数自定义校验规则
form.verify({
    // 自定义一个叫做pwd校验规则
    // pwd: [/^[\s]{6,12}$/, '密码必须6到12位,且不能出现空格'],
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 检验两次密码是否一致的规则
    repwb: function (value) {
    // 通过形参拿到的是确认密码框中的内容
    // 还需要拿到密码框中的内容
        // 然后进行一次等于的判断
        // 如果判断失败，则return一个提示消息
        // val()是拿到密码框的值
        var pwd = $('.reg-box [name=password]').val()
        if (pwd !== value) {
            return '两次密码不一致'
        }
    }
})
    
// 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        var dats =  {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        // 1.阻止默认提交行为
        e.preventDefault()
        // 2.发起Ajax的POST请求   接着是请求体（参数对象）
        $.post('http://www.liulongbin.top:3007/api/reguser',dats, function (res) {
                if (res.status !== 0) {
                return layer.msg(res.message)
            }
                layer.msg('注册成功，请登录')
                
                // 模拟人的提交行为
                $('#link_login').click()
        })
        
})

// 监听登录表单提交事件
    $('#form_login').submit(function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            // serialize()是jQuery中的一个方法
            data: $(this).serialize(),
            success: function (res) {
                // res.status 代表客户端向服务器请求的状态 1代表失败 0 代表成功
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登陆成功')
                // 将登录成功得到的token字符串，保存到
                // localStorage(本地存储)中 到时时候访问有权限的接口直接调用 
                localStorage.setItem('token', res.token)
                //跳转到后台主页
            location.href = '/index.html'
            }
        })
    })
})
