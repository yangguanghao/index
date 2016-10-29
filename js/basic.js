/**
 * Created by lexiaohao on 2016/10/26.*/
//完美运动框架
function getStyle(obj, name)
{
    if(obj.currentStyle)
    {
        return obj.currentStyle[name];
    }
    else
    {
        return getComputedStyle(obj, false)[name];
    }
}


//startMove(oDiv, {width: 400, height: 400})


function startMove(obj, json, fnEnd)
{
    clearInterval(obj.timer);
    obj.timer=setInterval(function (){
        var bStop=true;		//假设：所有值都已经到了

        for(var attr in json)
        {
            var cur=0;

            if(attr=='opacity')
            {
                cur=Math.round(parseFloat(getStyle(obj, attr))*100);
            }
            else
            {
                cur=parseInt(getStyle(obj, attr));
            }

            var speed=(json[attr]-cur)/6;
            speed=speed>0?Math.ceil(speed):Math.floor(speed);

            if(cur!=json[attr])
                bStop=false;

            if(attr=='opacity')
            {
                obj.style.filter='alpha(opacity:'+(cur+speed)+')';
                obj.style.opacity=(cur+speed)/100;
            }
            else
            {
                obj.style[attr]=cur+speed+'px';
            }
        }

        if(bStop)
        {
            clearInterval(obj.timer);

            if(fnEnd)fnEnd();
        }
    }, 30);
}
window.onload=function () {
//    图片轮播
    var oDiv1 = document.getElementsByClassName('ad')[0].getElementsByClassName('ad_bar')[0],
        oUl=oDiv1.getElementsByClassName('ad_pic')[0],
        aA=oDiv1.getElementsByClassName('move_tag')[0].getElementsByTagName('a'),
        now=0;
    for(var i=0; i<aA.length; i++){
        aA[i].index=i;
        aA[i].onclick=function () {
            now=this.index;
            tab();
        }
    }
    function tab() {
        for(var i=0; i<aA.length; i++){
            aA[i].className='';
        }
        aA[now].className='active';
        startMove(oUl,{left:-811*now})
    }
    function auto() {
        now++;
        if(now==aA.length){
            now=0;
        }
        tab();
    }
    var timer=setInterval(auto,3000);
    oDiv1.onmouseover=function () {
        clearInterval(timer);
    }
    oDiv1.onmouseout=function () {
        timer=setInterval(auto,3000);
    }
    //移入变色
    var aDiv1=document.getElementsByClassName('goods')[0].getElementsByClassName('itemdown');
    var aDiv2=document.getElementsByClassName('goods')[1].getElementsByClassName('itemdown');
    for(var i=0; i<aDiv1.length; i++){
        aDiv2[i].onmouseover=aDiv1[i].onmouseover=function () {
            var oP1=this.getElementsByTagName('p')[0];
            oP1.style.color='#FF7201';
        }
        aDiv2[i].onmouseout=aDiv1[i].onmouseout=function () {
            var oP2=this.getElementsByTagName('p')[0];
            oP2.style.color='#000';
        }
    }
}
