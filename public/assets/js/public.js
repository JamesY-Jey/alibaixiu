// 随机推荐
$.ajax({
    type: 'get',
    url: '/posts/random',
    success: function(res) {
        // console.log(res)
        var temp = `
            {{each data}}
            <li>
                <a href="detail.html?id={{$value._id}}">
                    <p class="title">{{$value.title}}</p>
                    <p class="reading">阅读({{$value.meta.views}})</p>
                    <div class="pic">
                        <img src="{{$value.thumbnail}}" alt="">
                    </div>
                </a>
            </li>
            {{/each}}
        `;
        var str = template.render(temp, {
            data: res
        });
        $('.random').html(str);
    }
});

// 导航
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(res) {
        // console.log(res);
        var navTpl = `
            {{each data}}
                <li>
                    <a href="list.html?categoryId={{$value._id}}">
                        <i class="fa {{$value.className}}"></i>{{$value.title}}
                    </a>
                </li>
            {{/each}}
        `;
        var navStr = template.render(navTpl, { data: res })
        $('.nav_item').html(navStr);
    }
});

// 评论
$.ajax({
    type: 'get',
    url: '/comments/lasted',
    success: function(res) {
        // console.log(res);
        var comTpl = `
        {{each data}}
            <li>
                <a href="javascript:;">
                    <div class="avatar">
                        <img src="{{$value.author.avatar}}" alt="">
                    </div>
                    <div class="txt">
                        <p>
                            <span>{{$value.author.nickName}}</span>{{$imports.formateDate($value.createAt)}}说:
                        </p>
                        <p>{{$value.content}}</p>
                    </div>
                </a>
            </li>
        {{/each}}
        `;
        var comStr = template.render(comTpl, { data: res });
        $('#commentBox').html(comStr);
    }
});

// 点击搜索按钮注册事件
$('.search form').on('submit', function() {
    // 获取到搜索框里的内容
    var keys = $(this).find('.keys').val();
    console.log(keys);
    // 跳转到搜索页面并传值
    location.href = "/search.html?key=" + keys;
    // 阻止表单默认提交行为
    return false;
});

// 处理日期时间格式
function formateDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}

// 从浏览器的地址栏中获取查询参数
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&');
    // 循环数据
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];
        }
    }
    return -1;
}