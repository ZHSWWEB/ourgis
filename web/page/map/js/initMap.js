
//初始化相关的脚本
require([
    "esri/map",
    "esri/geometry/Extent",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/layers/ArcGISImageServiceLayer",
    "esri/layers/FeatureLayer",
    "esri/layers/GraphicsLayer",
    "esri/layers/LOD", 
    "esri/tasks/query",
    "esri/InfoTemplate",
    "esri/graphic",
    "esri/geometry/Point",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/PictureMarkerSymbol",
    "esri/SpatialReference",
    "custom/MeasureTools",
    "custom/tdt/TDTLayer"
]);
require(["dojo/ready"], function (ready) {
    ready(function () {
        initMap();
    });
} );
//获取url传值
function geturl( key ) {
    var reg = new RegExp( "(^|\\?|&)" + key + "=([^&]*)(\\s|&|$)", "i" );
    if ( reg.test( location.href ) )
        return unescape( RegExp.$2.replace( /\+/g, " " ) );
    return "";
};

//初始化全局变量、
var overScale = 1.5;
var map;
var shiliangLayer;
var yingxiangLayer;
var yingxiangQYLayer;
var bengzhanLayer;
var shuizhaLayer;
var heicongLayer;
var shuimianLayer;
var rengonghuLayer;
var quanjingLayer;
var shuiliditu_Polygon;
var shuiliditu_Line;
var poiLayer;
var labelLayer;
var roadNet;
var pipeLayer;
var gl;
var wkt;
var mapClickOn;
var isDrawing = false;//判断是否正在增加绘制，如果是，则地图点击查询的功能需要暂时停止。
var drawEnd;//用于绑定绘制完毕事件
var egeo//用于存储绘制工具得到的图形


//初始化地图map
function initMap(Map) {
    //esri.bundle.toolbars.draw.addPoint = "Add a new tree to the map";
    //设置坐标系等参数
    wkt = 'PROJCS["gz",GEOGCS["GCS_Beijing_1954",DATUM["D_Beijing_1954",SPHEROID["Krasovsky_1940",6378245.0,298.3]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Gauss_Kruger"],PARAMETER["False_Easting",41805.106],PARAMETER["False_Northing",-2529665.281],PARAMETER["Central_Meridian",113.3],PARAMETER["Scale_Factor",1.0],PARAMETER["Latitude_Of_Origin",0.0],UNIT["Meter",1.0]]';
    //设置坐标系等参数
    //设置显示等级/比例尺
    var lods = [
        { "level": 0, "resolution": 264.5838, "scale": 1000000 },
        { "level": 1, "resolution": 132.2919, "scale": 500000 },
        { "level": 2, "resolution": 66.14595, "scale": 250000 },
        { "level": 3, "resolution": 26.45838, "scale": 100000 },
        { "level": 4, "resolution": 13.22919, "scale": 50000 },
        { "level": 5, "resolution": 6.614595, "scale": 25000 },
        { "level": 6, "resolution":2.645838, "scale": 10000 },
        { "level": 7, "resolution":1.322919,"scale": 5000 },
        { "level": 8, "resolution": 0.529168,"scale": 2000 },
        { "level": 9, "resolution": 0.264584,"scale": 1000 }
        //{ "level": 10, "resolution": 0.132292,"scale": 500 }
    ];
    //设置显示等级/比例尺

    var fill = new esri.symbol.SimpleFillSymbol("solid", null, new dojo.Color("#A4CE67"));

    //创建地图对象map在mapDiv中使用
    map = new esri.Map("mapDiv", {
        logo: false,
        lods: lods,
        //extent: new esri.geometry.Extent({ xmin: 67357.21886412139, ymin: -7476.340476482183, xmax: 71539.6305041214, ymax: -4927.683383357179  }),
        showLabels: true//spatialReference: { wkt: wkt }
    });
    //创建地图对象map在mapDiv中使用
    //添加服务ServiceLayer到地图
    weixingyingxiangLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerConfiguration.baseMap.weixingyingxiang, { visible: false, id: "weixingyingxiangLayer" });
    map.addLayer(weixingyingxiangLayer);

    dituTLayer = new esri.layers.ArcGISTiledMapServiceLayer(layerConfiguration.baseMap.dituT, { visible: true, minScale:99999,id: "dituTLayer" });
    map.addLayer(dituTLayer);
    dituDLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerConfiguration.baseMap.dituD, { visible: true, maxScale: 100000,id: "dituDLayer" });
    map.addLayer(dituDLayer);

    shuiliLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerConfiguration.baseMap.shuili, { visible: true, id: "shuiliLayer" });
    map.addLayer(shuiliLayer);

    jichushujuLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerConfiguration.baseMap.jichushuju, { visible: true, id: "jichushujuLayer" });
    map.addLayer(jichushujuLayer);

    paishuiLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerConfiguration.baseMap.paishui, { visible: true, id: "paishuiLayer" });
    //paishuiLayer = new esri.layers.ArcGISTiledMapServiceLayer(layerConfiguration.baseMap.paishui, { visible: true, id: "paishuiLayer" });
    map.addLayer( paishuiLayer );

    jietubiaoLayer = new esri.layers.ArcGISDynamicMapServiceLayer( layerConfiguration.baseMap.jietubiao, { visible: false, id: "jietubiaoLayer" } );
    map.addLayer( jietubiaoLayer );

    //paishuidianLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerConfiguration.baseMap.paishuidian, { visible: false, id: "paishuidianLayer" });
    //map.addLayer(paishuidianLayer);
    //paishuixianLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerConfiguration.baseMap.paishuixian, { visible: false, id: "paishuixianLayer" });
    //map.addLayer(paishuixianLayer);
    //paishuimianLayer = new esri.layers.ArcGISDynamicMapServiceLayer(layerConfiguration.baseMap.paishuimian, { visible: false, id: "paishuimianLayer" });
    //map.addLayer(paishuimianLayer);
    //添加服务ServiceLayer到地图
    //添加图层layer到地图
    for (var key in layerConfiguration.dissertation) {
        if (layerConfiguration.dissertation[key].addToMap == true) {//当配置文件中addToMap为true时，把图层添加到地图中
            var tempLayer = new esri.layers.FeatureLayer(layerConfiguration.dissertation[key].url, { outFields: ["*"], visible: layerConfiguration.dissertation[key].visitflag, id: key });
            map.addLayer(tempLayer);
        }
    }
    //添加图层layer到地图
    //记录或读取各图层的visible状态到sessionStorage
    var visibleConfig = sessionStorage.getItem( "visibleConfig" );
    if ( visibleConfig == null )//首次打开写入sessionStorage
    {

        visibleConfig = [];
        var ids = map.layerIds.concat( map.graphicsLayerIds )
        for ( i = 0; i < ids.length; i++ )
        {
            var layerr = {};
            layerr.id = ids[i];
            layerr.visible = map.getLayer( layerr.id ).visible;
            visibleConfig.push( layerr );
        }
        sessionStorage.setItem( "visibleConfig", JSON.stringify( visibleConfig ) );
    } else//二次打开读取sessionStorage并设置图层
    {
        visibleConfig = JSON.parse( visibleConfig );
        for ( i = 0; i < visibleConfig.length; i++ )
        {
            map.getLayer( visibleConfig[i].id ).visible = visibleConfig[i].visible;
        }
    }
    
    //设置地图的显示范围
    map.centerAt(new esri.geometry.Point(66295, 50180, new esri.SpatialReference(wkt)));//定位到广州的范围
    map.setScale(1000000);


    //隐藏infoWindow的缩放至按钮
    map.infoWindow.domNode.getElementsByClassName("action zoomTo")[0].style.display = "none";
    //隐藏infoWindow的缩放至按钮
    //信息框切换选中的数据时，重新生成信息框的内容
    map.infoWindow.on("selection-change", function () {
        //选择图层非空后获取信息内容
        var selectedFeature = map.infoWindow.getSelectedFeature();
        if (selectedFeature != null) {
            getInfoWindowContent(selectedFeature, selectedFeature.key);
        }
        //选择图层非空后获取信息内容
    });
    //信息框切换选中的数据时，重新生成信息框的内容
    //信息窗大小
    map.infoWindow.resize(350, 200);
    //信息窗大小
    //捕获点击进行点击查询
    mapClickOn = map.on('click', mapClickQuery);
    //鼠标移动地图
    map.on('mouse-move', mapMouseMove);
    //初始化测量工具
    initTools();
}

//初始化各个工具
function initTools() {
    require( [
        "esri/map",
        "custom/MeasureTools",
        "esri/toolbars/navigation",
        "esri/toolbars/draw",
        "esri/layers/FeatureLayer",
        "esri/dijit/Legend",
        "dojo/_base/array",
        "dojo/parser",
        "dijit/layout/BorderContainer",
        "dijit/layout/ContentPane",
        "dijit/layout/AccordionContainer",
        "dojo/domReady!"
    ], function (
        Map, deMeasureTools, Navigation, Draw, FeatureLayer, Legend, arrayUtils, parser
    ) {
            //测量工具
            var measureTool = new deMeasureTools( {
                map: map
            }, "measureTools" );

            //导航工具
            var navToolbar = new Navigation( map );
            var drawTool = new Draw( map );

            drawTool.on( "draw-end", extentQuery );
            map.NavToolbar = navToolbar;//用于在其他地方调用，例如在测量面积时，先禁用导航工具

            //缩放与平移
            document.getElementById( "tool_zoom_out" ).onclick = function () {
                measureTool.toolbar.deactivate();
                drawTool.deactivate();
                navToolbar.activate( Navigation.ZOOM_OUT );
            };
            document.getElementById( "tool_zoom_in" ).onclick = function () {
                measureTool.toolbar.deactivate();
                drawTool.deactivate();
                navToolbar.activate( Navigation.ZOOM_IN );
            };
            document.getElementById( "tool_zoom_pan" ).onclick = function () {
                measureTool.toolbar.deactivate();
                drawTool.deactivate();
                navToolbar.activate( Navigation.PAN );
            };

            //拉框查询
            document.getElementById( "tool_rec_select" ).onclick = function () {
                map.DrawTool = drawTool;
                //停止缩放工具以及测量工具，以免冲突
                navToolbar.deactivate();
                measureTool.toolbar.deactivate();
                drawTool.activate( Draw.EXTENT );
            };

            //清除选择
            document.getElementById( "tool_clear_select" ).onclick = function () {
                //停止缩放工具以及测量工具，以免冲突
                $( "#toggleLayer" ).click();
                navToolbar.deactivate();
                measureTool.toolbar.deactivate();
                drawTool.deactivate();
                map.graphics.clear();
            };

            //用于新增兴趣项的绘制工具
            var addInterestTool = new Draw( map );

            //捕捉信息窗的关闭后清空已绘制图形
            map.infoWindow.on( "hide", function () {
                //离开绘图状态
                isDrawing = false;
                //离开绘图状态
                //清空图形绘制层
                map.graphics.clear();
                //清空图形绘制层
            } );
            //启用项目信息的绘制
            document.getElementById( "projectPoint" ).onclick = function () {
                //开始绘制状态
                isDrawing = true;
                //开始绘制状态
                //停止缩放工具以及测量工具，以免冲突
                navToolbar.deactivate();
                drawTool.deactivate();
                measureTool.toolbar.deactivate();
                //停止缩放工具以及测量工具，以免冲突
                map.DrawTool = addInterestTool;
                //绘制完成转到存储方法
                drawEnd = addInterestTool.on( "draw-end", addProjectPointToMap );
                //绘制完成转到存储方法
                //调用Draw工具绘制
                addInterestTool.activate( Draw.POINT );
                //调用Draw工具绘制
            };
            //启用兴趣项的绘制
            document.getElementById( "interest_point" ).onclick = function () {
                //开始绘制状态
                isDrawing = true;
                //开始绘制状态
                //停止缩放工具以及测量工具，以免冲突
                navToolbar.deactivate();
                drawTool.deactivate();
                measureTool.toolbar.deactivate();
                //停止缩放工具以及测量工具，以免冲突
                map.DrawTool = addInterestTool;
                //绘制完成转到存储方法
                drawEnd = addInterestTool.on( "draw-end", addPointToMap );
                //绘制完成转到存储方法
                //调用Draw工具绘制
                addInterestTool.activate( Draw.POINT );
                //调用Draw工具绘制
            };
            document.getElementById( "interest_multipoint" ).onclick = function () {
                //开始绘制状态
                isDrawing = true;
                //开始绘制状态
                //停止缩放工具以及测量工具，以免冲突
                navToolbar.deactivate();
                drawTool.deactivate();
                measureTool.toolbar.deactivate();
                //停止缩放工具以及测量工具，以免冲突
                map.DrawTool = addInterestTool;
                //绘制完成转到存储方法
                drawEnd = addInterestTool.on( "draw-end", addMultiPointToMap );
                //绘制完成转到存储方法
                //调用Draw工具绘制
                addInterestTool.activate( Draw.MULTI_POINT );
                //调用Draw工具绘制
            };
            document.getElementById( "interest_polyline" ).onclick = function () {
                //开始绘制状态
                isDrawing = true;
                //开始绘制状态
                //停止缩放工具以及测量工具，以免冲突
                navToolbar.deactivate();
                drawTool.deactivate();
                measureTool.toolbar.deactivate();
                //停止缩放工具以及测量工具，以免冲突
                map.DrawTool = addInterestTool;
                //绘制完成转到存储方法
                drawEnd = addInterestTool.on( "draw-end", addPolylineToMap );
                //绘制完成转到存储方法
                //调用Draw工具绘制
                addInterestTool.activate( Draw.POLYLINE );
                //调用Draw工具绘制
            };
            document.getElementById( "interest_polygon" ).onclick = function () {
                //开始绘制状态
                isDrawing = true;
                //开始绘制状态
                //停止缩放工具以及测量工具，以免冲突
                navToolbar.deactivate();
                drawTool.deactivate();
                measureTool.toolbar.deactivate();
                //停止缩放工具以及测量工具，以免冲突
                map.DrawTool = addInterestTool;
                //绘制完成转到存储方法
                drawEnd = addInterestTool.on( "draw-end", addPolygonToMap );
                //绘制完成转到存储方法
                //调用Draw工具绘制
                addInterestTool.activate( Draw.POLYGON );
                //调用Draw工具绘制
            };
            //初始化图例控件
            //var layers = new Array();
            //for (var key in layerConfiguration.dissertation) {
            //    var tempLayer = new esri.layers.FeatureLayer(layerConfiguration.dissertation[key].url, { outFields: '*' });
            //    tempLayer.name = layerConfiguration.dissertation[key].name;
            //    layers.push(tempLayer);
            //}
            //var layerInfo = arrayUtils.map(layers, function (layer, index) {
            //    return { layer: layer, title: layer.name };
            //});
            //if (layerInfo.length > 0) {
            //    var legendDijit = new Legend({
            //        map: map,
            //        layerInfos: layerInfo
            //    }, "divLegendWindow");
            //    legendDijit.startup();
            //}
        } );
    //传值定位
    var layerat = geturl( "layerat" );//用于url传值定位图层
    var objectidat = geturl( "objectidat" );//用于url传值定位OBJECTID
    if ( layerat != "" && objectidat != "" ) {
        quaryGraphic( objectidat, layerat );
    }
    //传值建项目信息点 row428
    var APP = geturl( "APP" )
    if (APP != ""){
        addProjectPointSelect();
    }
}


//捕获地图上鼠标的移动后运行
function mapMouseMove(e) {
    //动态显示当前坐标与比例尺
    var coorDiv = document.getElementById('coorDiv');
    coorDiv.innerHTML = 'x &nbsp : &nbsp' + parseInt(e.mapPoint.x) + '<br> y &nbsp : &nbsp' + parseInt(e.mapPoint.y) ;
    var scaleDiv = document.getElementById('scaleDiv');
    scaleDiv.innerHTML = '比例    1:  ' + parseInt(map.getScale());
}

//地图点击查询
function mapClickQuery(e) {

    if (isDrawing == false) {
        document.getElementById("svgloading").style.display = "block";
        map.infoWindow.hide();
        map.infoWindow.clearFeatures();//清空原来选中的要素
        map.infoWindow.pagingControls = true;
        map.infoWindow.pagingInfo = true;
        map.selectedFeatures = new Array();//用于保存点击时选中的要素
        //if (isDrawing == false) {
        var order = {};
        var orderLen = 0
        for (var key in layerConfiguration.dissertation) {
            //判断是否符合查询条件
            if (layerConfiguration.dissertation[key].queryflag == 1 || (layerConfiguration.dissertation[key].queryflag == 3 && map.getLayer(key).visible) || (layerConfiguration.dissertation[key].queryflag == 4 && map.getLayer(layerConfiguration.dissertation[key].followvisit).visible)) {
                sc = parseInt(map.getScale());
                la = layerConfiguration.dissertation[key];
                //判断限制scale的有无并进行查询
                if (la.minScale == 0 && la.maxScale == 0) {
                    order[orderLen] = key;
                    orderLen++;
                }
                if (la.minScale > 0 && la.maxScale == 0 && sc <= la.minScale) {
                    order[orderLen] = key;
                    orderLen++;
                }
                if (la.minScale == 0 && la.maxScale > 0 && sc >= la.maxScale) {
                    order[orderLen] = key;
                    orderLen++;
                }
                if (la.minScale > 0 && la.maxScale > 0 && sc <= la.minScale && sc >= la.maxScale) {
                    order[orderLen] = key;
                    orderLen++;
                }
            }
        }
        if (orderLen != 0) {
            for (var key in order) {
                complete = key == "" + (orderLen - 1);
                querySingleLayer(order[key], e, complete);
            }
        } else {
            document.getElementById("svgloading").style.display = "none";
        }
    }
}

//单个图层查询函数
function querySingleLayer(key,e,complete) {
    var tempLayer = new esri.layers.FeatureLayer(layerConfiguration.dissertation[key].url, { outFields: layerConfiguration.dissertation[key].outFields, id: key });
    query = new esri.tasks.Query();
    query.returnGeometry = true;
    query.outFields = layerConfiguration.dissertation[key].outFields;
    var extentFlag = 500;//小矩形的查询范围，大比例尺默认20，小比例尺需要更大，要不选不上
    //根据比例尺重新生成查询范围
    extentFlag = map.getScale() / 1000;
    //因为点选的话，对于点图层，比较难选中，因此根据鼠标点的坐标，x/y个加减20，生成一个小矩形，用于查询的范围
    var polygonJson = { "rings": [[[e.mapPoint.x - extentFlag, e.mapPoint.y - extentFlag], [e.mapPoint.x + extentFlag, e.mapPoint.y - extentFlag], [e.mapPoint.x + extentFlag, e.mapPoint.y + extentFlag], [e.mapPoint.x - extentFlag, e.mapPoint.y + extentFlag]]], "spatialReference": { "wkt": wkt } };
    var polygonnn = new esri.geometry.Polygon(polygonJson);
    query.geometry = polygonnn;
    tempLayer.queryFeatures(query, function (response) {
        if (response.features != null && response.features.length > 0) {
            //每个feature添加key属性，以方便在弹出框时，得到显示的字段等配置
            for (var i = 0; i < response.features.length; i++) {
                response.features[i].key = key; 
                response.features[i].spatialReference = null;
            }
            for (var i = 0; i < response.features.length; i++) {
                map.selectedFeatures.push(response.features[i]);
            }
            map.infoWindow.setFeatures(map.selectedFeatures);
            if (map.infoWindow.count > 0) {
                getInfoWindowContent(map.infoWindow.features[0], map.infoWindow.features[0].key);
                map.infoWindow.select(0);
                map.infoWindow.popupWindow = true;
                map.infoWindow.show(e.mapPoint);
            }
        }
        if (complete) {
            document.getElementById("svgloading").style.display = "none";
        }
    });
}

//选择添加项目点
function addProjectPointSelect() {
    layui.use( 'layer', function () {
        var layer = layui.layer;
        var index = layer.confirm( '准备好新建一个项目了吗？<br><small>建议寻定区域后再确认</small>', {
            area: '260px', offset: ['5px', '410px'],
            shade: 0, closeBtn: 0, resize: false, move: false,
            title:'提示',icon:3,
            btn: ['准备好了'], //按钮
            yes: function () {
                layer.close( index );
                layer.open( {
                    type: 1,
                    area: ['240px', '150px'], offset: ['5px', '410px'],
                    shade: 0, closeBtn: 0, resize: false, move: false, anim: -1,
                    title: '请在地图上选点',
                    content: '<div style="padding:20px;font-size:14px;font-family:\'Microsoft YaHei\'">已禁用部分地图工具<br>长按左键可拖动地图<br>点击左键可选定地点</div>'
                } );
                document.getElementById( "projectPoint" ).click();
                //禁用不兼容功能
                document.getElementById( "tool_2" ).title = "已禁用";
                document.getElementById( "list2" ).innerHTML = "";
                document.getElementById( "tool_4" ).title = "已禁用";
                document.getElementById( "list4" ).innerHTML = "";
                document.getElementById( "tool_5" ).title = "已禁用";
                document.getElementById( "list5" ).innerHTML = "";
            }
        } );
    } );              
}

//显示项目点
function addProjectPointToMap(e) {
    //定义符号后显示
    var Symbol = new esri.symbol.SimpleMarkerSymbol( esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10,
        new esri.symbol.SimpleLineSymbol( esri.symbol.SimpleLineSymbol.STYLE_SOLID,
            new dojo.Color( [255, 0, 0, 0.25] ), 1 ),
        new dojo.Color( [0, 255, 0, 0.25] ) );
    map.graphics.add( new esri.Graphic( e.geometry, Symbol ) );
    map.DrawTool.deactivate();
    //弹出信息框
    map.infoWindow.clearFeatures();
    resize( 100, 20 )
    map.infoWindow.on( "hide", function () { document.getElementById( "projectPoint" ).click(); } ); //信息窗口最小化事件  
    map.infoWindow.setContent( "<div><big>确认选在这里吗？&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</big><input type='button' style='width:20%' value='确认' onclick='addProjcetPoint()'></input><input type='button' style='width:20%' value='重选' onclick='map.infoWindow.hide()'></input></div>" );
    map.infoWindow.show( e.geometry );
    //转存到全局变量
    egeo = e.geometry;
    //转存到全局变量
    drawEnd.remove();
}
//绘制兴趣项
function addPointToMap(e) {
    //定义符号后显示
    var Symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10,
                            new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
                            new dojo.Color([255, 0, 0,0.25]), 1),
                            new dojo.Color([0, 255, 0, 0.25]));
    map.graphics.add(new esri.Graphic(e.geometry, Symbol));
    map.DrawTool.deactivate();
    //弹出信息框
    map.infoWindow.clearFeatures();
    map.infoWindow.setContent("<div><p>新建名称:</p><input id = 'interestName_input' type='text' style='width:100%'></input><p></div><div>备注（最长600字）:</p><textarea id = 'interestRemark_input'  type='text'  style='width:99%'></textarea></div><div><input type='button' style='width:30%' value='保存' onclick='addPoint()'></input></div>");
    map.infoWindow.show(e.geometry);
    //转存到全局变量
    egeo = e.geometry;
    //转存到全局变量
    drawEnd.remove();
}
function addMultiPointToMap(e) {
    //定义符号后显示
    var Symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10,
        new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
        new dojo.Color([255, 0, 0,0.25]), 3),
        new dojo.Color([0, 255, 0, 0.25]));
    map.graphics.add(new esri.Graphic(e.geometry, Symbol));
    map.DrawTool.deactivate();
    //弹出信息框
    map.infoWindow.clearFeatures();
    map.infoWindow.setContent("<div><p>新建名称:</p><input id = 'interestName_input' type='text' style='width:100%'></input><p></div><div>备注（最长600字）:</p><textarea id = 'interestRemark_input'  type='text'  style='width:99%'></textarea></div><div><input type='button' style='width:30%' value='保存' onclick='addMultiPoint()'></input></div>");
    map.infoWindow.show(e.geometry.getPoint(e.geometry.points.length - 1));
    //转存到全局变量
    egeo = e.geometry;
    //转存到全局变量
    drawEnd.remove();
}
function addPolylineToMap(e) {
    //定义符号后显示
    var Symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,new dojo.Color([255, 0, 0]), 1)
    map.graphics.add(new esri.Graphic(e.geometry, Symbol));
    map.DrawTool.deactivate();
    //弹出信息框
    map.infoWindow.clearFeatures();
    map.infoWindow.setContent("<div><p>新建名称:</p><input id = 'interestName_input' type='text' style='width:100%'></input><p></div><div>备注（最长600字）:</p><textarea id = 'interestRemark_input'  type='text'  style='width:99%'></textarea></div><div><input type='button' style='width:30%' value='保存' onclick='addPolyline()'></input></div>");
    map.infoWindow.show(e.geometry.getPoint(0, e.geometry.paths[0].length - 1));
    //转存到全局变量
    egeo = e.geometry;
    //转存到全局变量
    drawEnd.remove();
}
function addPolygonToMap(e) {
    //定义符号后显示
    var Symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, 
        new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
            new dojo.Color([255, 0, 0, 0.25]), 1),
        new dojo.Color([0, 255, 0, 0.25]));
    map.graphics.add(new esri.Graphic(e.geometry, Symbol));
    map.DrawTool.deactivate();
    //弹出信息框
    map.infoWindow.clearFeatures();
    map.infoWindow.setContent("<div><p>新建名称:</p><input id = 'interestName_input' type='text' style='width:100%'></input><p></div><div>备注（最长600字）:</p><textarea id = 'interestRemark_input'  type='text'  style='width:99%'></textarea></div><div><input type='button' style='width:30%' value='保存' onclick='addPolygon()'></input></div>");
    map.infoWindow.show(e.geometry.getPoint(0, e.geometry.rings[0].length - 2));
    //转存到全局变量
    egeo = e.geometry;
    //转存到全局变量
    drawEnd.remove();
}
//保存项目信息
function addProjcetPoint() {
    map.infoWindow.setContent("<div><big>已选定</big></div>");
    layer.open( {
        type: 1,
        area: ['240px', '150px'], offset: ['5px', '410px'],
        shade: 0.2, closeBtn: 0, resize: false, move: false, anim: -1,
        title: '选点成功',
        content: '<div style="padding:20px;font-size:14px;font-family:\'Microsoft YaHei\'">请返回表单<br>继续完成表单的编辑</div>'
    } );
    //将定点情况返回给表单iframe
    //parent.document.getElementById( "form1" ).contentWindow.document.getElementById( "pointReady" ).innerText = "1";
    var pointReadyDiv = parent.document.getElementById("pointReady");
    pointReadyDiv.setAttribute("data-value", '1');
    pointReadyDiv.setAttribute("style", "color:forestgreen;font-family:'Microsoft YaHei';font-weight:bold");
    pointReadyDiv.innerText = "已选定项目位置";
    timedCount();
}
//判断是否存储
var t;
function timedCount() {
    str = document.getElementById( "projectPoint" ).innerText;
    t = setTimeout( "timedCount()", 200 )
    if ( str == "" ) {
        saveProjectPoint()
    }
}
//停止计时
function stopCount() {
    clearTimeout( t )
}
//存储到数据库
function saveProjectPoint() {
    stopCount();//停止计时
    var graphic = new esri.Graphic( egeo, null, { "SYSTEMID": -1 }, null );
    saveInterestEdit( [graphic], null, null, 'projectInfo' );
    //将保存情况返回给表单iframe
    //parent.document.getElementById( "form" ).contentWindow.document.getElementById( "pointSaved" ).innerText = "1";
    parent.document.getElementById("pointSaved").setAttribute("data-value", '1');
}
//保存兴趣项到数据库
function addPoint() {
    var interestName = document.getElementById('interestName_input').value;
    if (interestName == "" || interestName == null) {
        alert('请输入点名称');
        return;
    }
    var interestRemark = document.getElementById('interestRemark_input').value;
    var attr = { "NAME": interestName, "REMARK": interestRemark};
    var graphic = new esri.Graphic(egeo, null, attr, null);
    saveInterestEdit( [graphic], null, null, 'interestPoint' )
    map.graphics.clear();
}
function addMultiPoint() {
    var interestName = document.getElementById('interestName_input').value;
    if (interestName == "" || interestName == null) {
        alert('请输入点集名称');
        return;
    }
    var interestRemark = document.getElementById('interestRemark_input').value;
    var attr = { "NAME": interestName, "REMARK": interestRemark };
    var graphic = new esri.Graphic(egeo, null, attr, null);
    saveInterestEdit([graphic], null, null, 'interestMultiPoint')
    map.graphics.clear();
}
function addPolyline() {
    var interestName = document.getElementById('interestName_input').value;
    if (interestName == "" || interestName == null) {
        alert('请输入线名称');
        return;
    }
    var interestRemark = document.getElementById('interestRemark_input').value;
    var attr = { "NAME": interestName, "REMARK": interestRemark };
    var graphic = new esri.Graphic(egeo, null, attr, null);
    saveInterestEdit([graphic], null, null, 'interestPolyline')
    map.graphics.clear();
}
function addPolygon() {
    var interestName = document.getElementById('interestName_input').value;
    if (interestName == "" || interestName == null) {
        alert('请输入面名称');
        return;
    }
    var interestRemark = document.getElementById('interestRemark_input').value;
    var attr = { "NAME": interestName, "REMARK": interestRemark };
    var graphic = new esri.Graphic(egeo, null, attr, null);
    saveInterestEdit([graphic], null, null, 'interestPolygon')
    map.graphics.clear();
}

//删除指定的兴趣项
function deleteinterest() {
    saveInterestEdit(null, null, [map.selectedInterestfeature], map.selectedInterestfeature.key);
}

//保存指定兴趣项的编辑
function saveinterestEdit() {
    //离开绘图状态
    isDrawing = false;
    //离开绘图状态
    var newName = $('#info_interestName').val();
    var newRemark = $('#info_interestRemark').val();
    map.selectedInterestfeature.attributes['NAME'] = newName;
    map.selectedInterestfeature.attributes['REMARK'] = newRemark;
    saveInterestEdit(null, [map.selectedInterestfeature], null, map.selectedInterestfeature.key);
}

//兴趣项保存函数
function saveInterestEdit( adds, updates, deletes, layerId )
{
    //保存兴趣项的编辑，四个参数对应新增的、更新的、删除的、图层id
    var interestLayer = map.getLayer( layerId );
    var loged = document.cookie.indexOf( "userId" );//检查是否已经登入
    if ( loged == -1 )//无cookie，判定未登陆，拒绝操作
    {
        alert( "请登陆后再进行操作" );
    } else//已登陆
    {
        if ( deletes != null )//判断为删除操作
        {
            var table = interestLayer.id;
            //完成存储后，使用ajax post到后台
            $.post( "editHelper.aspx",
                {
                    table: table,
                    objectid: deletes[0].attributes.OBJECTID,
                    method: "delete"
                },
                function ()//回调刷新地图
                {
                    interestLayer.refresh();
                    map.infoWindow.hide();
                } );
        } else//增改操作
        {
            //applyEdits(adds?, updates?, deletes?, callback?, errback?)
            interestLayer.applyEdits( adds, updates, deletes, function ( a, u, d )
            {//成功回调add,updata,delete
                if ( a.length > 0 )//判断操作类型
                {
                    var objectid = a[0].objectId;
                    var status = a[0].success;
                    var method = "add"
                } else if ( u.length > 0 )
                {
                    var objectid = u[0].objectId;
                    var status = u[0].success;
                    var method = "update"
                }
                if ( status == true )//操作成功
                {
                    var table = interestLayer.id;
                    //完成存储后，使用ajax post到后台
                    $.post( "editHelper.aspx",
                        {
                            table: table,
                            objectid: objectid,
                            method: method
                        },
                        function ( data, status )
                        {
                            interestLayer.refresh();
                            map.infoWindow.hide();
                        } );
                }
            }, function ( e )
                {//失败回调
                    alert( e );
                } );
        }
    }
}

//使兴趣点弹窗内容可编辑
function enableEdit() {
    try {
        $('#info_interestName').removeAttr('readonly');
        $('#info_interestRemark').removeAttr('readonly');
        //进入绘图状态
        isDrawing = true;
        //进入绘图状态
    }
    catch (err) {}
}

//获取指定要素的信息框样式
function getInfoWindowContent(feature, key) {
    var graJson = feature.toJson();
    var attr = feature.attributes;
    var title = layerConfiguration.dissertation[key].name; //attr[layerConfiguration.dissertation[key].titleField];
    //if (title == null) {
    //    title = "";
    //}
    //if (title.replace(/(^\s*)|(\s*$)/g, "") == "") {
    //    title = "";
    //}
    var infoContent = "";
    if (1){
        //判断key是否为720数据
        if (key == 'quanjingtu') {
            //infoContent += "<a href='#' onclick=\"show720('" + feature.attributes[layerConfiguration.dissertation[key].outFields[1]] + "')\">切换720全景视图</a>"
            infoContent += "<a href='data/720/" + feature.attributes[layerConfiguration.dissertation[key].outFields[2]] + "' target='_blank'>切换720全景视图</a>"
            title += "-" + feature.attributes["NAME"];
        }
        //如非720即判断是否为兴趣项
        else if (key.indexOf("interest") == 0) {
            map.selectedInterestfeature = feature;
            var interestName = feature.attributes['NAME'];
            var interestRemark = feature.attributes['REMARK'];
            var interestCJR = feature.attributes['CJR'];
            var interestCJBM = feature.attributes['CJBM'];
            var interestCJRQ = feature.attributes['CJRQ'];
            var interestXGR = feature.attributes['XGR'];
            var interestXGBM = feature.attributes['XGBM'];
            var interestXGRQ = feature.attributes['XGRQ'];
            if ( interestName == null ) { interestName = ""; }
            if ( interestRemark == null ) { interestRemark = ""; }
            var interestCJ;
            if ( interestCJRQ == null )
            {
                interestCJ = "";
            } else
            {
                var dataa = new Date( interestCJRQ );
                var year = dataa.getFullYear();
                var month = dataa.getMonth() + 1;
                var day = dataa.getDate();
                var hour = dataa.getHours() - 8;
                var minu = dataa.getMinutes();
                var sec = dataa.getSeconds();
                //传入显示
                interestCJRQ = year + '年' + OO( month ) + '月' + OO( day ) + '日 ' + OO( hour ) + '时' + OO( minu ) + '分' + OO( sec ) + '秒';
                interestCJ = interestCJR + "-" + interestCJBM + "-" + interestCJRQ;
            }
            var interestXG;
            if ( interestXGRQ == null )
            {
                interestXG = "";
            } else
            {
                var dataa = new Date( interestXGRQ );
                var year = dataa.getFullYear();
                var month = dataa.getMonth() + 1;
                var day = dataa.getDate();
                var hour = dataa.getHours() - 8;
                var minu = dataa.getMinutes();
                var sec = dataa.getSeconds();
                //传入显示
                interestXGRQ = year + '年' + OO( month ) + '月' + OO( day ) + '日 ' + OO( hour ) + '时' + OO( minu ) + '分' + OO( sec ) + '秒';
                interestXG = interestXGR + "-" + interestXGBM + "-" + interestXGRQ;
            }
            //显示信息
            infoContent += "<div style='height:10%'><input id = 'divInterestId' style='display:none' value ='" + feature.attributes['OBJECTID'] + "'></input><p>兴趣点名称：</p><input id = 'info_interestName' type='text' value = '" + interestName + "' readonly='readonly' style = 'width:100%'></input></div><div style='height:80%'><div>备注：</div><textarea id = 'info_interestRemark' style='width:100%;height:90%;' readonly='readonly'>" + interestRemark + "</textarea><div>创建编辑人：</div><input id = 'info_interestCJ' type='text' value = '" + interestCJ + "' readonly='readonly' style = 'width:100%'></input><div>最后编辑人：</div><input id = 'info_interestXG' type='text' value = '" + interestXG + "' readonly='readonly' style = 'width:100%'></input>";
            //显示菜单
            infoContent += "<div style= 'width:100%'> <input type='button' value='修改' onclick='enableEdit()'></input> <input type='button' value='保存' onclick='saveinterestEdit()'></input> <input type='button' value='删除' onclick='deleteinterest()'></input></div ></div > ";
        }
        //如非720且非兴趣项的普通框
        else {
            infoContent += "<table class='customTable2' cellspacing='0' style='width:100%'>";
            //获取图层的配置
            var displayFields = layerConfiguration.dissertation[key].displayFields;
            var outFields = layerConfiguration.dissertation[key].outFields;
            var dateFields = layerConfiguration.dissertation[key].dateFields
            for (var i = 0; i < displayFields.length; i++) {
                //处理各项的查询值显示格式
                var valueAttr = graJson.attributes[outFields[i]];
                if (valueAttr == null || valueAttr == undefined) { valueAttr = ""; }
                else if (containsss(dateFields, displayFields[i])) {
                    var dataa = new Date(valueAttr);
                    var year = dataa.getFullYear();
                    var month = dataa.getMonth() + 1;
                    var day = dataa.getDate();
                    var hour = dataa.getHours() - 8;
                    var minu = dataa.getMinutes();
                    var sec = dataa.getSeconds();
                    //传入显示
                    valueAttr = year + '年' + OO( month ) + '月' + OO( day ) + '日&nbsp' + OO( hour ) + '时' + OO( minu ) + '分' + OO( sec ) + '秒';
                    //定时循环调用
                } else {
                    //字符串型的处理，判断是字符串且首字母为非0数字,转为浮点保留2位
                    if (typeof (valueAttr) == "number"||(typeof (valueAttr) == "string" && parseInt(valueAttr.substr(0, 1)>0))) {
                        valueAttr = parseFloat(valueAttr).toFixed(2);
                        if (parseFloat(valueAttr).toFixed(2) - parseFloat(valueAttr).toFixed(0) == 0) {
                            valueAttr = parseFloat(valueAttr).toFixed(0);
                        }
                    } 
                }
                infoContent += "<tr><td width='50%'>" + displayFields[i] + "</td><td width='50%'>" + valueAttr + "</td></tr>";
            }
            infoContent += "</table>";
        }
    }
    map.infoWindow.setTitle(title+"("+(map.infoWindow.selectedIndex+1)+"/"+map.infoWindow.count+")");
    map.infoWindow.setContent(infoContent);
}

//时间格式的两位0补位
function OO(num) {
    return (Array(2).join(0) + num).slice(-2)
}

//判断obj是否在arr组内
function containsss(arr,obj) {
    var i = arr.length;
    while (i--) {
          if (arr[i] === obj) {
                return true;
          }
     }
    return false;
}

//拉框查询
function extentQuery(e) {

    //清空地图绘制的graphics元素
    map.graphics.clear();

    document.getElementById("svgloading").style.display = "block";
    //清空结果窗口
    $("#selectLayer").slideDown("slow");
    //$('#divExtentResult').html('');
    $("#searchResultTitle").html('');
    $("#searchResultInfo").html('');

    $("#divSearchResultTitle").css('display', 'block');
    $("#searchResultInfo").css('display', 'block');

    firstTab = 'block';
    
    //根据selectedKey查询
    //如果选择的图层都为空，则在全部图层中根据范围查找，暂时不做
    //if (selectKey == '') {
    //    //使用该范围查询
    //    for (var key in layerConfiguration.dissertation) {
    //        spatialQuery(e.geometry, key);
    //    }
    //}
    //else {
    //    spatialQuery(e.geometry, selectKey);
    //}

    //使用矩形范围遍历图层查询
    var order = {};
    var orderLen = 0;
    for (var key in layerConfiguration.dissertation) {
        //判断图层是否符合查询条件
        if (layerConfiguration.dissertation[key].queryflag == 1 || (layerConfiguration.dissertation[key].queryflag == 3 && map.getLayer(key).visible) || (layerConfiguration.dissertation[key].queryflag == 4 && map.getLayer(layerConfiguration.dissertation[key].followvisit).visible)) {
            //对图层进行spatial查询
            order[orderLen] = key;
            orderLen++;
        }
    }
    if (orderLen != 0) {
        for (var key in order) {
            spatialQuery(e.geometry, order[key]);
        }
    } else {
        document.getElementById("svgloading").style.display = "none";
    }
    //定义矩形符号
    var recSymb = new esri.symbol.SimpleFillSymbol(
        esri.symbol.SimpleFillSymbol.STYLE_NULL,
        new esri.symbol.SimpleLineSymbol(
            esri.symbol.SimpleLineSymbol.STYLE_SHORTDASHDOTDOT,
            new dojo.Color([105, 105, 105]),
            2
        ), new dojo.Color([255, 255, 0, 0.25])
    );
    //使用矩形符号绘制图形
    map.graphics.add(new esri.Graphic(e.geometry, recSymb));
    //关闭绘制工具
    map.DrawTool.deactivate();
}

//设置tab内容
function initExtentTabContent(features,key,length) {
    //获取面板标题内容
    var titleHtml = "<li class=\"active\" style=\"background: transparent;\"><a id=\"tab_Chart\" href=\"#" + key + "\" style=\"background: transparent;\"><font color=\"black\">" + layerConfiguration.dissertation[key].name + "(" + length + ")</font></a></li>";

    //获取面板内容
    var div = initSearchResultContent(features, key);

    var resulthtml = "<div id=\"" + key + "\" class=\"tab_content\" style=\"display:" + firstTab + ";width:100%;max-height:260px;overflow-y:auto\"></div>";
    firstTab = 'none';

    $("#searchResultTitle").append(titleHtml);

    $("#searchResultInfo").append(resulthtml);

    $("#" + key).append(div);
    $("#" + key).mCustomScrollbar("update");

    initTabContent(false);
}

//spatial查询
function spatialQuery(extent, key) {
    var query = new esri.tasks.Query();
    query.outFields = layerConfiguration.dissertation[key].outFields; // 名称 like '%B%'
    query.geometry = extent;
    query.returnGeometry = true;
    var tempLayer = new esri.layers.FeatureLayer(layerConfiguration.dissertation[key].url, { outFields: layerConfiguration.dissertation[key].outFields, id: key });
    tempLayer.queryFeatures(query, function (featureSet) {
        var features = featureSet.features;
        if (features.length > 0) {

            //在结果面板生成tab
            //只在面板上显示100个要素，所以先取出前10个要素
            var tempFeatures = new Array();
            if (features.length > 100) {
                tempFeatures = features.slice(0, 100);
            }
            else {
                tempFeatures = features;
            }
            //如果length>=1000，则重新查询一个总个数
            if (features.length >= 1000) {

                var queryTask = new esri.tasks.QueryTask(layerConfiguration.dissertation[key].url);

                queryTask.executeForCount(query, function (count) {

                    initExtentTabContent(tempFeatures, key, count);

                }, function (error) {
                    console.log(error);
                });

            }
            else {
                initExtentTabContent(tempFeatures, key, features.length);
            }

            for (var i = 0; i < features.length; i++) {
                var type = features[i].geometry.type;
                var graphicsPnt;
                //如果为点类型，则直接作为标注的位置
                //如果为线类型或者多边形，则找出范围类x最大的点，作为标注点，以免标注位置超出拉框的范围
                if (type == "point") {
                    graphicsPnt = features[i].geometry;
                }
                else if (type == "polyline") {
                    var polyline = features[i].geometry;
                    graphicsPnt = getMaxXPoint(polyline, extent);//获取范围内x最大的点
                }
                else if (type == "polygon") {
                    var polygon = features[i].geometry;
                    graphicsPnt = getMaxXPoint(polygon, extent);//获取范围内x最大的点
                }
                else {
                    break;
                }
                //图片样式
                var pictureMarkerSymbol = new esri.symbol.PictureMarkerSymbol('plugins/hplus/img/Thumbtack.png', 30, 30).setOffset(15,15);
                var tempGraphic = new esri.Graphic(graphicsPnt, pictureMarkerSymbol)
                map.graphics.add(tempGraphic);
                //添加标注
                //先获取显示的名称
                var titleField = layerConfiguration.dissertation[key].titleField;
                var title = features[i].attributes[titleField];
                var textSymbol = new esri.symbol.TextSymbol(title).setColor(
                    new esri.Color([128, 0, 0])).setAlign(esri.symbol.Font.ALIGN_END).setAngle(0).setFont(
                    new esri.symbol.Font("12pt").setWeight(esri.symbol.Font.WEIGHT_BOLD)).setOffset(15, 35);
                var labelGraphic = new esri.Graphic(graphicsPnt, textSymbol);
                map.graphics.add(labelGraphic);
            }
        
        }
        document.getElementById("svgloading").style.display = "none";
    });
}

//获取几何图形，x值最大的点
function getMaxXPoint(geometry, extent) {
    //先把所有点放到数组中
    var points = new Array();
    //点直接返回
    if (geometry.type == 'point') {
        return geometry;
    }
    //线沿paths遍历添加
    else if (geometry.type == 'polyline') {
        var polyline = geometry;
        for (var z = 0; z < polyline.paths.length; z++) {
            for (var j = 0; j < polyline.paths[z].length; j++) {
                var vertex = new esri.geometry.Point(polyline.paths[z][j][0], polyline.paths[z][j][1], polyline.spatialReference);
                points.push(vertex);
            }
        }
    }
    //面沿rings遍历添加
    else if (geometry.type == 'polygon') {
        var polygon = geometry;
        for (var z = 0; z < polygon.rings.length; z++) {
            for (var j = 0; j < polygon.rings[z].length; j++) {
                var vertex = new esri.geometry.Point(polygon.rings[z][j][0], polygon.rings[z][j][1], polygon.spatialReference);
                points.push(vertex);
            }
        }
    }
    //多点遍历添加
    else if ( geometry.type == 'multipoint' )
    {
        var multipoint = geometry;
        for ( var j = 0; j < multipoint.points.length; j++ )
        {
            var vertex = new esri.geometry.Point( multipoint.points[j][0], multipoint.points[j][1], multipoint.spatialReference );
            points.push( vertex );
        }
    }

    //遍历points
    var tempPnt = points[0];
    //有范围限制时
    if (extent != null) {
        for (var i = 1; i < points.length; i++) {
            //判断是否在extent这个范围内
            if (points[i].x <= extent.xmax && points[i].x >= extent.xmin && points[i].y <= extent.ymax && points[i].y >= extent.ymin) {
                //取x最大
                if (points[i].x > tempPnt.x) {
                    tempPnt = points[i];
                }
            }
        }
    }
    //无范围限制时
    else {
        for (var i = 1; i < points.length; i++) {
            if (points[i].x > tempPnt.x) {
                tempPnt = points[i];
            }
        }
    }
    return tempPnt;
}

//显示720数据
function show720(url) {
    var frame = $("#iframe720");
    frame.attr("src", "data/720/" + url);
    frame.show();
    return map;
}