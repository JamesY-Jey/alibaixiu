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
        console.log(res);
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