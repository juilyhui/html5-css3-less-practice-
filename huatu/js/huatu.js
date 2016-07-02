$(window).resize(function(){
    /*定义canvas宽高*/
    console.log($(".box").width()-$(".nav").width())
    $("canvas").attr({width:$(".box").width(),height:$(".box").height()-$(".nav").height()})
    $(".copy").css({width:$("canvas").width(),height:$("canvas").height()})
})

$(function(){
/*定义canvas宽高*/
    $("canvas").attr({width:$(".box").width(),height:$(".box").height()-$(".nav").height()})
    $(".copy").css({width:$("canvas").width(),height:$("canvas").height()})

/*下拉菜单*/
    $(".parent").hover(function(){
        $(this).find(".son").finish();
        $(this).find(".son").slideToggle();
    })

/*绘制图形*/
    var canvas=$("canvas");//jquery对象
    var cobj=canvas[0].getContext("2d");//原生对象
    var copy=$(".copy");//jquery对象
    var obj=new draw(canvas[0],cobj,copy[0]);//传入三个原生对象
    /*文件*/
    $(".parent:eq(0)").find("li").click(function(){
        var index=$(this).index();
        if(index==1){
            cobj.clearRect(0,0,canvas.width(),canvas.height());
            if(obj.arr.length==0){
                alert("已经撤销到最后一步");
                return;
            }
            obj.arr.pop();
            cobj.putImageData(obj.arr[obj.arr.length-1],0,0);
        }else if(index==0){
            if(obj.arr.length>0){
                var yes= window.confirm("确认保存吗？");
                if(yes==true){
                    location.href=canvas[0].toDataURL().replace("image/png","image/octet-stream");
                }
                obj.arr=[];
                cobj.clearRect(0,0,canvas.width(),canvas.height());
            }
        }else if(index==2){
            location.href=canvas[0].toDataURL().replace("image/png","image/octet-stream");
        }
    })
    /*画图*/
    $(".parent:eq(1)").find(".son>li").click(function(){
        var role=$(this).attr("data-role");
        if(role=="pen"){
            obj.pen();
        }else{
            obj.type=role;
            obj.drawFun();
        }
    })
    /*样式*/
    $(".parent:eq(2)").find(".son>li").click(function(){
        obj.style=$(this).attr("data-role");
        obj.drawfun();
    })
    /*线条的宽度*/
    $(".parent:eq(3)").find(".son>li").click(function(){
        obj.lineWidth=$(this).attr("data-role");
        obj.drawfun();
    })
    /*线条的颜色*/
    $(".parent:eq(4)").find(".son>input").click(function(){
        $(this).change(function(){
            obj.strokeColor=$(this).val();
        })
        obj.drawfun();
    })
    /*填充的颜色*/
    $(".parent:eq(5)").find(".son>input").click(function(){
        $(this).change(function(){
            obj.fillColor=$(this).val();
        })
        obj.drawfun();
    })
    /*擦除*/
    $(".parent:eq(6)").find(".son>li").click(function(){
        obj.xpsize=$(this).attr("data-role");
        obj.clear();
    })
    /*选择*/
    $(".parent:eq(7)").find(".menu").click(function(){
        obj.select();
    })


})