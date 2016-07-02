window.onload=function(){
    var cence=document.getElementsByClassName("sence")[0];
    var boxs=[];
    var num=10;
    for(var i=0;i<num;i++){
        var smallcence=document.createElement("div");
        smallcence.style.cssText="width:100%;height:"+100/num+"%;perspective-origin:center "+(((num-1)-i)*(500/num))+"px;position:relative;perspective:4000px;";
        cence.appendChild(smallcence);
        var box=document.createElement("div");
        box.style.cssText="width:100%;height:100%;position:relative;transform-style:preserve-3d;transform-origin:center center 250px;transition:transform 2s linear "+(i/10)+"s";
        smallcence.appendChild(box)
        boxs.push(box);
        for(var j=0;j<6;j++){
            var panel=document.createElement("div");
            panel.style.cssText="position:absolute;left:0;top:0;";
            if(j==0){//上
                panel.style.width="500px";
                panel.style.height="500px";
                panel.style.transform="rotateX(90deg)";
                panel.style.transformOrigin="top";
                panel.style.background=""
            }else if(j==1){//左
                panel.style.width="500px";
                panel.style.height=(500/num)+"px";
                panel.style.transform="rotateY(-90deg)";
                panel.style.transformOrigin="left";
                panel.style.background="url(img/1.jpg) no-repeat 0 "+(500/num)*-i+"px"
            }else if(j==2){//背
                panel.style.width="500px";
                panel.style.height=(500/num)+"px";
                panel.style.transform="rotateY(180deg)"
                panel.style.background="url(img/2.jpg) no-repeat 0 "+(500/num)*-i+"px"
            }else if(j==3){//右
                panel.style.width="500px";
                panel.style.height=(500/num)+"px";
                panel.style.transform="rotateY(90deg)";
                panel.style.transformOrigin="right";
                panel.style.background="url(img/3.jpg) no-repeat 0 "+(500/num)*-i+"px"
            }else if(j==4){//下
                panel.style.width="500px";
                panel.style.height="500px";
                panel.style.bottom=0;
                panel.style.transform="rotateX(-90deg)";
                panel.style.transformOrigin="bottom";
                panel.style.background=""
            }else if(j==5){//前
                panel.style.width="500px";
                panel.style.height=(500/num)+"px";
                panel.style.transform="translateZ(500px)";
                panel.style.background="url(img/4.jpg) no-repeat 0 "+(500/num)*-i+"px"
            }
            box.appendChild(panel)
        }
    }
    var aa=0
    var t=setInterval(move,4000)
    function move(){
        aa++;
        for(var i=0;i<boxs.length;i++){
            boxs[i].style.transform="rotateY("+aa*90+"deg)"
        }
    }
    window.onblur=function(){
        clearInterval(t)
    }
    window.onfocus=function(){
        setInterval(move,4000)
    }
}