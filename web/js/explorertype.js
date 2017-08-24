//判断当前浏览类型
function BrowserType()
{
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf( "compatible" ) > -1 && userAgent.indexOf( "MSIE" ) > -1 && !isOpera; //判断是否IE11以下浏览器
    var isIE11 = userAgent.indexOf( "Trident" ) > -1 && userAgent.indexOf( "rv:11" ) > -1;//判断是否IE11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1; //判断是Edge浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
    var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
    if (isIE) 
    {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 7)
        { return "IE7";}
        else if(fIEVersion == 8)
        { return "IE8";}
        else if(fIEVersion == 9)
        { return "IE9";}
        else if(fIEVersion == 10)
        { return "IE10"; }
        else if ( fIEVersion == 11 )
        { return "IE11"; }
        else
        { return "0"}//IE版本过低
    }//isIE end
    if ( isIE11 ) { return "IE11"; }
    if ( isEdge ) { return "Edge"; }
    if ( isSafari ) { return "Safari"; }
    if ( isChrome ) { return "Chrome"; }
    if (isFF) { return "Firefox";}
    if (isOpera) { return "Opera";}
}//myBrowser() end

//判断是否是IE浏览器
function isIE()
{
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf( "Opera" ) > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf( "compatible" ) > -1 && userAgent.indexOf( "MSIE" ) > -1 && !isOpera; //判断是否IE浏览器
    var isIE11 = userAgent.indexOf( "Trident" ) > -1 && userAgent.indexOf( "rv:11" ) > -1;//判断是否IE11浏览器
if(isIE||isIE11)
{
    return true;
}
else
{
    return false;
}
}


//判断是否是IE浏览器，包括Edge浏览器
function IEVersion()
{
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf( "Opera" ) > -1; //判断是否Opera浏览器
var isIE = userAgent.indexOf( "compatible" ) > -1 && userAgent.indexOf( "MSIE" ) > -1 && !isOpera; //判断是否IE浏览器
var isIE11 = userAgent.indexOf( "Trident" ) > -1 && userAgent.indexOf( "rv:11" ) > -1;//判断是否IE11浏览器
var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器
if(isIE)
{
var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
reIE.test(userAgent);
var fIEVersion = parseFloat(RegExp["$1"]);
if(fIEVersion == 7)
{ return "IE7";}
else if(fIEVersion == 8)
{ return "IE8";}
else if(fIEVersion == 9)
{ return "IE9";}
else if(fIEVersion == 10)
{ return "IE10";}
else if(fIEVersion == 11)
{ return "IE11";}
else
{ return "0"}//IE版本过低
}
else if ( isIE11 ) {
    return "IE11";
}
else if(isEdge)
{
return "Edge";
}
else
{
    return false;//非IE
}
}