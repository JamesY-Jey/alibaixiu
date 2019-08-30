// ajax请求数据构建模板并渲染  热门推荐
$.ajax({
    type: 'GET',
    url: '/posts/recommend',
    success: function(res) {
        var temp = `
            {{each data}}
            <li>
                <a href="detail.html?id={{$value._id}}">
                    <img src="{{$value.thumbnail}}" alt="">
                    <span>{{$value.title}}</span>
                </a>
            </li>
            {{/each}}
        `;
        var str = template.render(temp, { data: res });
        $('#recommend').html(str);
    }
})