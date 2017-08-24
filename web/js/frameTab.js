/**
 * 2017年07月04日17:01:13
 * By Donsen
 * myhonour@jishuwan.com
 * 待完善中....
 */
layui.define(['jquery','layer','element'],function(exports){
        var $ = layui.jquery,layer = layui.layer,element = layui.element();
        var navTab = function (options) {
            this.options = options || {
                    closed : true, // 可关闭
                    openTabNum : 10, // 最大 打开标签数
                    tabFilter : "bodyTab", //过滤标签
                    //navs
                    navEle : '.layui-side .navBar',
                };
        };
        navTab.prototype.init = function () {
        //初始化 tab 读取session tab 处理 第一个tab
        var _this    = this;
        _this.session(function (session) {
            if(!session.getItem('tabMenu')){
                var tabFirst = $('.layui-tab-title.top_tab li').first();
                if(tabFirst.length){  // 有默认 tab 但是 没有设置 lay-id 将和菜单第一项 nav-index 统一 如果设置了 lay-id 请和 菜单中想要默认打开的 nav-index 统一
                    var menuFirst = $('.layui-nav.layui-nav-tree li').first();
                    if(!tabFirst.attr('lay-id')){ // 如果没有 设置lay-id 取菜单 第一项
                        var layId = menuFirst.find('a').attr('nav-index');
                        tabFirst.attr('lay-id',layId);
                        $('.layui-tab-content').find('.layui-tab-item').first().find('iframe').attr('data-id',layId);
                    }
                    //读取session
                    var tabMenu = JSON.parse(session.getItem('tabMenu')) || [];
                    var current = {
                        icon    : menuFirst.find('a').find("i.iconfont").attr("data-icon")!== undefined ? ele.find("i.iconfont").attr("data-icon") : ele.find("i.layui-icon").attr("data-icon"),
                        title   : menuFirst.find('a').find("cite").text(),
                        href    : menuFirst.first().find('a').attr("data-url"),
                        layId   : menuFirst.find('a').attr('nav-index').attr('nav-index'),
                        closed  : false
                    };
                    tabMenu.push(current);
                    session.setItem('tabMenu',JSON.stringify(tabMenu));
                    session.setItem('currentTabMenu',JSON.stringify(current));
                }else{//如果没有默认 tab 则 取菜单第一项
                    $('.layui-tab-content').html('');
                    _this.addTab($('.layui-nav.layui-nav-tree li').first().find('a'),false);
                }
            }else{
                // 还原 session
                var tabMenus = JSON.parse(session.getItem('tabMenu'));
                $.each(tabMenus,function (k,v) {
                    _this.recoveryTab(v);
                });
                var currentTabMenu = JSON.parse(session.getItem('currentTabMenu'));
                if(currentTabMenu){
                    // console.log(currentTabMenu);
                    _this.changeTab(currentTabMenu.layId);
                }else{
                    _this.changeTab(tabMenus[0].layId);
                }
            }
        });
        // 初始化绑定 事件
        $(".layui-nav .layui-nav-item a").on("click",function(){
            _this.addTab($(this));
            $(this).parent("li").siblings().removeClass("layui-nav-itemed");
        });
        $("body").on("click",".top_tab li",function(){
            _this.changeTab($(this).attr("lay-id"));
        });
        $("body").on("click",".top_tab li i.layui-tab-close",function(){
            _this.delTab($(this).parent("li").attr('lay-id'));
        });

    };
        navTab.prototype.leftNav = function (navs,ele) {
            if(navs === undefined) return false;
            //处理navs 可为json 数据 也可为数组对象
            if(typeof navs === 'string'){
                navs = JSON.parse(navs);
                if(!navs) return false;
            }
            //处理元素
            ele = $(ele || this.options.navEle);
            if(!ele.length){
                layer.alert('没有可供容纳菜单的元素！');
                return false;
            }
            this.options.navEle = ele;
            var ulHtml = $('<ul class="layui-nav layui-nav-tree"></ul>');
            var navIndex = 1001;
            for (var i=0;i<navs.length;i++){
                //是否需要默认展开
                var ulLi;
                if(navs[i].spread){
                    ulLi = $('<li class="layui-nav-item layui-nav-itemed"></li>');
                }else{
                    ulLi = $('<li class="layui-nav-item"></li>');
                }
                ulLi.appendTo(ulHtml);
                //判断是否有子菜单的情况
                if(navs[i].children !== undefined && navs[i].children.length){
                    var aEle = $('<a href="javascript:;"></a>');
                    //判断是否存在 图标 注:这里使用了 第三方图标 iconfont 使用其他图标库 在这里更改
                    if(navs[i].icon !== undefined && navs[i].icon !== ''){
                        if(navs[i].icon.indexOf("icon-") !== -1){
                            $('<i class="iconfont '+navs[i].icon+'" data-icon="'+navs[i].icon+'"></i>').appendTo(aEle);
                        }else{
                            $('<i class="layui-icon" data-icon="'+navs[i].icon+'">'+navs[i].icon+'</i>').appendTo(aEle);
                        }
                    }
                    $('<cite>'+navs[i].title+'</cite>').appendTo(aEle);
                    $('<span class="layui-nav-more"></span>').appendTo(aEle);
                    aEle.appendTo(ulLi);
                    //处理子菜单
                    var childDl = $('<dl class="layui-nav-child"></dl>');
                    for(var j=0;j<navs[i].children.length;j++){
                        var dd = $('<dd></dd>');
                        var childA = $('<a href="javascript:;" nav-index="'+navIndex+'" data-url="'+navs[i].children[j].href+'"></a>');
                        navIndex+=1001;
                        //处理 子菜单的 图标
                        if(navs[i].children[j].icon !== undefined && navs[i].children[j].icon !== ''){
                            if(navs[i].children[j].icon.indexOf("icon-") !== -1){
                                $('<i class="iconfont '+navs[i].children[j].icon+'" data-icon="'+navs[i].children[j].icon+'"></i>').appendTo(childA);
                            }else{
                                $('<i class="layui-icon" data-icon="'+navs[i].children[j].icon+'">'+navs[i].children[j].icon+'</i>').appendTo(childA);
                            }
                        }
                        $('<cite>'+navs[i].children[j].title+'</cite>').appendTo(childA);
                        childA.appendTo(dd);
                        dd.appendTo(childDl);
                    }
                    childDl.appendTo(ulLi);
                }else{ //没有子菜单的 情况
                    var oneAEle = $('<a href="javascript:;" nav-index="'+navIndex+'" data-url="'+navs[i].href+'"></a>');
                    navIndex+=1001;
                    //处理 图标
                    if(navs[i].icon !== undefined && navs[i].icon !== ''){
                        if(navs[i].icon.indexOf("icon-") !== -1){
                            $('<i class="iconfont '+navs[i].icon+'" data-icon="'+navs[i].icon+'"></i>').appendTo(oneAEle);
                        }else{
                            $('<i class="layui-icon" data-icon="'+navs[i].icon+'">'+navs[i].icon+'</i>').appendTo(oneAEle);
                        }
                    }
                    $('<cite>'+navs[i].title+'</cite>').appendTo(oneAEle);
                    oneAEle.appendTo(ulLi);
                }
            }
            ulHtml.appendTo(ele);
            ele.height($(window).height()-230);
            element.init();//初始化页面元素
            this.init();
            $(window).resize(function(){
                ele.height($(window).height()-230);
            });

        };
        navTab.prototype.addTab = function (ele,closed) {
               var close = this.options.closed;
               if(closed !== undefined){
                   close = closed;
               }
                // var closed     = this.options.closed,
                var  openTabNum = this.options.openTabNum;
                //判断是有没有 data-url 有就打开 没有就不打开 并且必须要有 nav-index
                if(ele.attr('data-url') && ele.attr('nav-index') !== undefined){
                    var dataUrl = ele.attr('data-url');
                    var navIndex= ele.attr('nav-index');
                    //判断 是否存在此 tab //
                    if(this.hasTab(navIndex)){
                        layer.alert('已存在此标签');
                        element.tabChange(this.options.tabFilter,navIndex);
                        return false;
                    }
                    //判断有没有超出规定打开数目
                    if($(".layui-tab-title.top_tab li").length === openTabNum){
                        layer.msg('只能同时打开'+openTabNum+'个选项卡哦，不然系统会卡的！');
                        return false;
                    }
                    // 组装 tab选项卡  HTML元素
                    var title = '';
                    if(ele.find("i.iconfont").attr("data-icon") !== undefined){
                        title += '<i class="iconfont '+ele.find("i.iconfont").attr("data-icon")+'"></i>';
                    }else{
                        title += '<i class="layui-icon">'+ele.find("i.layui-icon").attr("data-icon")+'</i>';
                    }
                    title += '<cite>'+ele.find("cite").text()+'</cite>';
                    if(close){
                        title += '<i class="layui-icon layui-unselect layui-tab-close">&#x1006;</i>';
                    }
                    element.tabAdd(this.options.tabFilter, {
                        title : title,
                        content :"<iframe src='"+dataUrl+"' data-id='"+navIndex+"'></frame>",
                        id : navIndex
                    });
                    this.changeTab(navIndex);
                    this.session(function (session) {
                        //读取session
                        var tabMenu = JSON.parse(session.getItem('tabMenu')) || [];
                        var current = {
                            icon:ele.find("i.iconfont").attr("data-icon")!== undefined ? ele.find("i.iconfont").attr("data-icon") : ele.find("i.layui-icon").attr("data-icon"),
                            title : ele.find("cite").text(),
                            href : ele.attr("data-url"),
                            layId : navIndex,
                            closed   : close
                        };
                        tabMenu.push(current);
                        session.setItem('tabMenu',JSON.stringify(tabMenu));
                        session.setItem('currentTabMenu',JSON.stringify(current));
                    });
                }
            };
        navTab.prototype.recoveryTab = function (tabObj) {
                    //组装title
                    var title = '';
                    if(tabObj.icon.split("-")[0] === 'icon'){
                        title += '<i class="iconfont '+tabObj.icon+'"></i>';
                    }else{
                        title += '<i class="layui-icon">'+tabObj.icon+'</i>';
                    }
                    title += '<cite>'+tabObj.title+'</cite>';
                    if(tabObj.closed){
                        title += '<i class="layui-icon layui-unselect layui-tab-close">&#x1006;</i>';
                    }
                    element.tabAdd(this.options.tabFilter,{
                        title : title,
                        content :"<iframe src='"+tabObj.href+"' data-id='"+tabObj.layId+"'></frame>",
                        id : tabObj.layId
                    });
            };
        navTab.prototype.session = function (callback) {
                if(!window.sessionStorage) return false;
                callback(window.sessionStorage);
            };
        navTab.prototype.changeTab = function (navIndex) {
                this.session(function (session) {
                    var currentTabMenu = JSON.parse(session.getItem('currentTabMenu'));
                    if(!currentTabMenu) return false;
                    if(currentTabMenu.layId !== navIndex){
                        var tabMenu = JSON.parse(session.getItem('tabMenu'));
                        for (var i = 0;i<tabMenu.length;i++){
                            if(tabMenu[i].layId === navIndex){
                                session.setItem('currentTabMenu',JSON.stringify(tabMenu[i]));break;
                            }
                        }
                    }
                });
                element.tabChange(this.options.tabFilter,navIndex).init();
                //导航 默认选中
                var navLi = this.options.navEle.find('a');
                $.each(navLi,function(k,v){
                    var index = $(v).attr('nav-index');
                    if (index !== undefined && index === navIndex) {
                        if ($(v).parent('dd').length) {//拥有父元素
                            $(v).parents('li').addClass('layui-nav-itemed');
                            $(v).parent('dd').addClass('layui-this');
                        }else{
                            $(v).parent('li').addClass('layui-this');
                        }
                    }else{
                        if ($(v).parent('dd').length) {//拥有父元素
                            $(v).parents('li').removeClass('layui-nav-itemed');
                            $(v).parent('dd').removeClass('layui-this');
                        }else{
                            $(v).parent('li').removeClass('layui-this');
                        }
                    }

                });
            };
        navTab.prototype.delTab = function (navIndex) {
                this.session(function (session) {
                   var tabMenu = JSON.parse(session.getItem('tabMenu'));
                   for (var i = 0;i<tabMenu.length;i++){
                       if(tabMenu[i].layId === navIndex){
                               tabMenu.splice(i,1);
                       }
                   }
                   session.setItem('tabMenu',JSON.stringify(tabMenu));
                   var currentTabMenu = JSON.parse(session.getItem('currentTabMenu'));
                   if(currentTabMenu.layId === navIndex){
                       session.setItem('currentTabMenu',JSON.stringify(tabMenu.pop()));
                   }
                });
                element.tabDelete(this.options.tabFilter,navIndex).init();
            };
        navTab.prototype.hasTab = function (navIndex) {
                var tabIndex = 0;
                $(".layui-tab-title.top_tab li").each(function(k,v){
                    if($(v).attr('lay-id') === navIndex){
                        tabIndex++;
                    }
                });
                return tabIndex;
            };
        exports('frameTab',function (options) {
            return new navTab(options);
        });
});
