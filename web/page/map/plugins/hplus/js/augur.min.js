$( document ).ready( function ()
{
//
//
//
//*******图层餐单部分*******
//
//
//
    //图层菜单的打开方式
    $( ".layermenu" ).pageslide( { direction: "right", modal: true } );
    //打开菜单时刷新图层状态
    $( "#tool_3" ).on( "click", function ()
    {
        refreshLayerMenu();
    } );
    function refreshLayerMenu()
    {
        var visibleConfig = JSON.parse( sessionStorage.getItem( "visibleConfig" ) );
        if ( visibleConfig )
        {
            for ( var i = 0; i < visibleConfig.length; i++ )//设置checkbox状态
            {
                var a = visibleConfig[i].id == "dituTLayer" ? $( "a.dituLayer" ) : $( "a." + visibleConfig[i].id );
                if ( a != null )
                {
                    if ( visibleConfig[i].visible )
                    {
                        a.addClass( "checked" );
                    } else
                    {
                        a.removeClass( "checked" );
                    }
                }
            }
        } else
        {
            location.reload();
        }
    }
    //文字开关点击事件
    $( "#list3" ).each( function ( i, obj )
    {
        $( obj ).find( "a" ).on( "click", function ()
        {
            $( this ).toggleClass( "checked" );

            if ( $( this ).hasClass( "dituLayer" ) )
            {//底图控制双图层并联动卫星影像
                var layer = map.getLayer( "dituDLayer" );
                layer.setVisibility( !layer.visible );
                var layer = map.getLayer( "dituTLayer" );
                layer.setVisibility( !layer.visible );
                var layer = map.getLayer( "weixingyingxiangLayer" );
                layer.setVisibility( !layer.visible );
                $( "a.weixingyingxiangLayer" ).toggleClass( "checked" );
                setVisibleSessionStorage( ["weixingyingxiangLayer", "dituDLayer", "dituTLayer"] );
            } else if ( $( this ).hasClass( "weixingyingxiangLayer" ) )
            {//卫星影像联动底图
                var layer = map.getLayer( "weixingyingxiangLayer" );
                layer.setVisibility( !layer.visible );
                var layer = map.getLayer( "dituDLayer" );
                layer.setVisibility( !layer.visible );
                var layer = map.getLayer( "dituTLayer" );
                layer.setVisibility( !layer.visible );
                $( "a.dituLayer" ).toggleClass( "checked" );
                setVisibleSessionStorage( ["weixingyingxiangLayer", "dituDLayer", "dituTLayer"] );
            }//开启水利、排水组的联动处理
            else if ( $( this ).hasClass( 'checked' )&&($( this ).parent().hasClass( "shuili" ) || $( this ).parent().hasClass( "paishui" )) )
            {
                var group = new Array();
                group[0] = $( this ).parent().attr( "class" ) + 'Layer';
                //总图的开启
                if ( $( this ).hasClass( group[0] ) )
                {
                    var layer = map.getLayer( group[0] );
                    layer.setVisibility( !layer.visible );
                    for ( var i = 0, len = $( this ).siblings('.checked').length; i < len; i++ )
                    {
                        var layername = $( this ).siblings( '.checked' ).attr( "class" ).split( ' ' )[0];
                        var layer = map.getLayer( layername );
                        layer.setVisibility( !layer.visible );
                        group[i + 1] = layername;
                        $( '.' + layername ).removeClass( "checked" );
                    }
                    setVisibleSessionStorage( group );
                } else
                {//单层的开启
                    var layername = $( this ).attr( "class" ).split( ' ' )[0];
                    var layer = map.getLayer( layername );
                    layer.setVisibility( !layer.visible );
                    $( this ).addClass( 'checked' );
                    group[1] = layername;
                    //总图已开
                    if ( $( '.' + group[0] ).hasClass( 'checked' ) )
                    {
                        var layername = group[0];
                        var layer = map.getLayer( layername );
                        layer.setVisibility( !layer.visible );
                        $( '.' + group[0] ).removeClass( 'checked' );
                        setVisibleSessionStorage( group );
                    } else
                    {//总图未开
                        setVisibleSessionStorage( [group[1]] );
                    }
                }
            }else
            {//简单开关
                if ( $( this ).hasClass( "checked" ) )
                {
                    $( this ).removeClass( "checked" );
                    var layername = $( this ).attr( "class" );
                    $( this ).addClass( "checked" );
                } else
                {
                    var layername = $( this ).attr( "class" );
                }
                var layer = map.getLayer( layername );
                layer.setVisibility( !layer.visible );
                setVisibleSessionStorage( [layername] );
            }
        } );
    } );
    //文字开关的状态存储
    function setVisibleSessionStorage( ids )
    {
        var visibleConfig = JSON.parse( sessionStorage.getItem( "visibleConfig" ) );
        for ( i = 0; i < visibleConfig.length; i++ )//设置checkbox状态
        {
            for ( j = 0; j < ids.length; j++ )
            {
                if ( visibleConfig[i].id == ids[j] )
                {
                    visibleConfig[i].visible = !visibleConfig[i].visible;
                }
            }
        }
        sessionStorage.setItem( "visibleConfig", JSON.stringify( visibleConfig ) );
    }

//
//
//
//*******左侧菜单部分*******
//
//
//

    //工具栏弹出框
    $( ".down" ).each( function ( i, obj )
    {
        $( obj ).hover(
            function ()
            {
                $( this ).find( "ul" ).stop( true, true ).fadeIn();
            },
            function ()
            {
                $( this ).find( "ul" ).stop( true, true ).fadeOut();
            }
        );
    } );
    //各按钮点击事件
    $( "#list1" ).each( function ( i, obj )
    {
        $( obj ).find( "a" ).on( "click", function ()
        {
            $( this ).parent().addClass( "highlight" ).siblings().removeClass( "highlight" );
            var measureName = $( this ).text();
            switch ( measureName )
            {
                case "测线":
                    break;
                case "测面":
                    break;
            }
        } );
    } );
    $( "#list2" ).each( function ( i, obj )
    {
        $( obj ).find( "a" ).on( "click", function ()
        {
            $( this ).parent().addClass( "highlight" ).siblings().removeClass( "highlight" );
        } );
    } );
    
    $( "#list4" ).each( function ( i, obj )
    {
        $( obj ).find( "a" ).on( "click", function ()
        {
            $( this ).parent().addClass( "highlight" ).siblings().removeClass( "highlight" );
        } );
    } );

    $( "#list5" ).each( function ( i, obj )
    {
        $( obj ).find( "a" ).on( "click", function ()
        {
            $( this ).parent().addClass( "highlight" ).siblings().removeClass( "highlight" );
        } );
    } );

//
//
//
//*******其他部分*******
//
//
//

    $( "input" ).on( {
        blur: function () { this.placeholder = "查找河流(涌)、设施等"; }
    } );
    //$("#sole-input").bind('keypress', function (event) {
    $( "#sole-input" ).keypress( function ( event )
    {
        if ( event.keyCode == 13 )
        {
            $( "#search-button" ).click();
        }
    } );  
    var toggle = true;
    $("#search-button").on("click", function () {
        //if (toggle) {
        //    $("#search").animate({ width: "335px" }, 1000);
        //    $("#inputBox").animate({ width: "80%" }, 1000);
        //    toggle = false;
        //}
        //else {
        //    $("#search").animate({ width: "58px" }, 1000);
        //    $("#inputBox").animate({ width: "0" }, 1000);
        //    toggle = true;
        //}
        layerQuery();
        $("#toggleLayer").addClass("icon-up").removeClass("icon-bottom");
        mark = false;
    });
    var mark = true;
    $("#toggleLayer").click(function () {
        if (mark) {
            $("#selectLayer").slideDown("slow");
            $(this).addClass("icon-up").removeClass("icon-bottom");
            mark = false;
        } else {
            $("#selectLayer").slideUp("slow");
            $(this).addClass("icon-bottom").removeClass("icon-up");
            mark = true;
        }
        closeInfo();
    });

    
    
    
    $(".layerStyle").each(function (i, obj) {
        $(obj).find("a").on("click", function (obj) {
            $(this).parent().addClass("highlight").siblings().removeClass("highlight");
        });
    });

    $("#mapType").hover(
		function () {
		    $("#mapType-wrapper").addClass("expand");
		},
		function () {
		    $("#mapType-wrapper").removeClass("expand");
		}
	)
    $("[data-name]").on("click", function () {
        var actionName = $(this).data("name");
        switch (actionName) {
            case "normalMap":
                layerVisible(shiliangLayer, true);
                layerVisible(yingxiangLayer, false);
                break;
            case "earth":
                layerVisible(shiliangLayer, false);
                layerVisible(yingxiangLayer, true);
                break;
        }
        $(this).addClass("active").siblings().removeClass("active");
    });
    $("#closeExpand").bind("click", function () {
        closeInfo();
    });
    $("#closeAll").bind("click", function () {
        $(".allInfoBox").hide();
    });
    $("#extentResultCloseAll").bind("click", function () {
        $("#extentResultWindow").hide();
    });
} );
//函数部分
function showData() {
    $(".expandBox").animate({ width: "25em" }, "slow");
}
function closeInfo() {
    $(".expandBox").animate({ width: "0em" }, "slow");
}