$(function(){
    var box=$(".box");
    var canvasBox=$(".canvas");
    var canvas=$("canvas");
    var cobj=canvas[0].getContext("2d");
    var nav=$("nav");
    canvasBox.css("height",box.height()-nav.height());
    canvas.attr("width",box.width());
    canvas.attr("height",box.height()-nav.height());
    /*下拉菜单*/
    $(".menu:not(.no)").hover(function(){
        $(this).find(".son").finish();
         $(this).find(".son").slideToggle(100);
    })

    //绘制图形
    var obj=new draw(canvas[0],cobj,canvasBox[0]);

    //绘制图形

    $(".menu:eq(1)").find("li").click(function(){
        obj.type=$(this).attr("data-role");
        obj.drawFun();
    })

    //改变填充方式
    $(".menu:eq(2)").find("li").click(function(){
        obj.style=$(this).attr("data-role");
        obj.drawFun();
    })

    //线条的粗细

    $(".menu:eq(3)").find("li").click(function(){
        obj.lineWidth=$(this).attr("data-role");
        obj.drawFun();
    })

    //线条的颜色
    $(".menu:eq(4)").find("input").change(function(){
        obj.strokeColor=$(this).val();
        obj.drawFun();
    })

    //填充的颜色
    $(".menu:eq(5)").find("input").change(function(){
        obj.fillColor=$(this).val();
        obj.drawFun();
    })

    //文件

    $(".menu:eq(0)").find("li").click(function(){

        var index=$(this).index(".menu:eq(0) li");
        if(index==0){
            if(obj.arr.length>0){
             var yes= window.confirm("需要保存吗");
                if(yes==true){
                    location.href=canvas[0].toDataURL().replace("image/png","image/octet-stream");

                }
                obj.arr=[];
                cobj.clearRect(0,0,canvas.width(),canvas.height());
            }
        }else if(index==1){

            cobj.clearRect(0,0,canvas.width(),canvas.height());
            if(obj.arr.length==0){
                alert("top");
                return false;
            }

            obj.arr.pop();
            cobj.putImageData(obj.arr[obj.arr.length-1],0,0);


        }else if(index==2){

            location.href=canvas[0].toDataURL().replace("image/png","image/octet-stream");

        }
    })



    $(".menu:eq(6)").find("li").click(function(){
        obj.xpsize=$(this).attr("data-role");
        obj.clear();
    })




})