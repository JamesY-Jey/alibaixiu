$('#logout').on('click', function() {
    var isConfirm = confirm('您确定要退出吗')
    if (isConfirm) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function() {
                location.href = "login.html";
            },
            error: function() {
                alert('退出失败');
            }
        })
    }
});

// 用户侧边栏头像和昵称
$.ajax({
    type: 'get',
    url: '/users/' + userId,
    success: function(res) {
        if (res.avatar) {
            $('.profile>img').attr('src', res.avatar);
        }
        $('.profile>h3').text(res.nickName);
    }
})