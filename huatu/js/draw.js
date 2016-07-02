function draw(canvas,cobj,copy){
    this.canvas=canvas;
    this.cobj=cobj;
    this.copy=copy;
    this.clientX=canvas.width;//画布宽度
    this.clientY=canvas.height;//画布高度
    this.lineWidth=1;//线条宽度
    this.strokeColor="#000";//线条颜色
    this.fillColor="#000";//填充颜色
    this.style="stroke";//绘制的模式（线条/填充）
    this.type="line";//绘制的图形（线条/矩形/圆）
    this.arr=[];//保存每次状态的数组
    this.xpsize=5;//橡皮大小
    this.xp=this.createxp();//橡皮
    /*选择框 位置 宽高*/
    this.sx=0;
    this.sy=0;
    this.sw=0;
    this.sh=0;
    this.s=this.creates();//选择框

}

draw.prototype={
    /*初始化*/
    init:function(){
        this.s.css("display","none");
        this.cobj.lineWidth=this.lineWidth;
        this.cobj.strokeStyle=this.strokeColor;
        this.cobj.fillStyle=this.fillColor;
    },
    /*画图的方法*/
    drawfun:function(){
        var that=this;
        that.copy.onmousedown=null;
        that.copy.onmousemove=null;
        that.copy.onmouseup=null;
        that.xp.css("display","none");
        that.copy.onmousedown=function(e){
            that.init();
            var se= e.offsetX;
            var sy= e.offsetY;
            var dataobj;
            that.copy.onmousemove=function(e){
                that.cobj.clearRect(0,0,that.clientX,that.clientY);
                if(that.arr.length!=0){
                    that.cobj.putImageData(that.arr[that.arr.length-1],0,0);
                }
                var ex= e.offsetX;
                var ey= e.offsetY;
                //判断是否有画图的方法，内有代码不执行
                if(that.type==""){
                    return false;
                }
                that[that.type](se,sy,ex,ey)
            }
            that.copy.onmouseup=function(){
                dataobj=that.cobj.getImageData(0,0,that.clientX,that.clientY)
                that.arr.push(dataobj);
                that.copy.onmousemove=null;
            }
            e.preventDefault();
        }
    },
        /*铅笔*/
    pen:function(){
        var that=this;
        that.copy.onmousedown=function(e){
            var ox= e.offsetX;
            var oy= e.offsetY;
            that.cobj.beginPath();
            that.cobj.moveTo(ox,oy);
            that.copy.onmousemove=function(e){
                var ex= e.offsetX;
                var ey= e.offsetY;
                that.cobj.lineTo(ex,ey);
                that.cobj.stroke();
            }
            that.copy.onmouseup=function(){
                that.cobj.closePath();
                that.arr.push(that.cobj.getImageData(0,0,that.clientX,that.clientY));
                that.copy.onmouseup=null;
                that.copy.onmousemove=null;
            }
        }
    },
        /*画直线*/
    line:function(x,y,x1,y1){
        this.cobj.beginPath();
        this.cobj.moveTo(x,y);
        this.cobj.lineTo(x1,y1);
        this.cobj.stroke();
        this.cobj.closePath();
    },
        /*画矩形*/
    rect:function(x,y,x1,y1){
        this.cobj.beginPath();
        this.cobj.rect(x,y,x1-x,y1-y);
        this.cobj[this.style]();
        this.cobj.closePath();
    },
        /*画圆*/
    cicle:function(x,y,x1,y1){
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        this.cobj.beginPath();
        this.cobj.arc(x,y,r,0,Math.PI*2)
        this.cobj[this.style]();
        this.cobj.closePath();
    },
    /*创建橡皮*/
    createxp:function(){
        var that=this;
        return $("<div>").css({
            "width":that.xpsize,
            "height":that.xpsize,
            "border":"1px solid #000",
            "position":"absolute",
            "left":0,"top":0,
            "display":"none"
        }).appendTo($(".canvasbox"))
    },
    /*擦除方法*/
    clear:function(){
        var that=this;
        that.copy.onmousemove=function(e){
            var sx= e.offsetX;
            var sy= e.offsetY;
            var left=sx-that.xpsize/2;
            var top=sy-that.xpsize/2;
            if(left<0){
                left=0;
            }
            if(left>that.clientX-that.xpsize/2){
                left=that.clientX-that.xpsize/2;
            }
            if(top<0){
                top=0;
            }
            if(top>that.clientY-that.xpsize/2){
                top=that.clientY-that.xpsize/2;
            }
            that.xp.css({
                "width":that.xpsize,
                "height":that.xpsize,
                "display":"block",
                "left":left,
                "top":top
            })

        }
        that.copy.onmousedown=function(){
            that.copy.onmousemove=function(e){
                var ex= e.offsetX;
                var ey= e.offsetY;
                var left=ex-that.xpsize/2;
                var top=ey-that.xpsize/2;
                if(left<0){
                    left=0;
                }
                if(left>that.clientX-that.xpsize/2){
                    left=that.clientX-that.xpsize/2;
                }
                if(top<0){
                    top=0;
                }
                if(top>that.clientY-that.xpsize/2){
                    top=that.clientY-that.xpsize/2;
                }
                that.xp.css({
                    "width":that.xpsize,
                    "height":that.xpsize,
                    "display":"block",
                    "left":left,
                    "top":top
                })
                that.cobj.clearRect(left,top,that.xpsize,that.xpsize);
            }
        }
        that.copy.onmouseup=function(){
            that.copy.onmousemobe=null;
            that.copy.onmouseup=null;
            that.arr.push(that.cobj.getImageData(0, 0, that.clientX, that.clientY));
            that.clear();
        }
    },
    /*创建选择框*/
    creates:function(){
        var that=this;
        return $("<div>").css({
            width:that.sw,
            height:that.sh,
            border:"1px dashed #000",
            position:"absolute",
            left:that.sx,
            top:that.sy
        }).appendTo($(".canvasbox"));
    },
    /*选择方法*/
    select:function(){
        var that=this;
        that.copy.onmousedown=function(e){
            var startx= e.offsetX;
            var starty= e.offsetY;
            var endx,endy;
            that.copy.onmousemove=function(e){
                endx= e.offsetX;
                endy= e.offsetY;
                that.s.css({
                    display:"block",
                    width:endx-startx,
                    height:endy-starty,
                    position:"absolute",
                    left:startx,
                    top:starty
                });
            }
            that.copy.onmouseup=function(){
                that.sx=startx;
                that.sy=starty;
                that.sw=endx-startx;
                that.sh=endy-starty;
                that.copy.onmousemove=null;
                that.copy.onmouseup=null;
                that.move();
            }
        }
    },
    /*move方法*/
    move:function(){
        var that=this;
        var flag=true;
        that.copy.onmousemove=function(e){
            var ox= e.offsetX;
            var oy= e.offsetY;
            /*判断鼠标是否在选择框内*/
            if(ox>that.sx&&ox<(that.sx+that.sw)&&oy>that.sy&&oy<(that.sy+that.sh)){
                that.copy.style.cursor="move";
                flag=true;
            }else{
                that.copy.style.cursor="default";
                flag=false;
            }
            that.copy.onmousedown=function(e){
                var sx= e.offsetX;
                var sy= e.offsetY;
                var left,top;
                if(!flag){
                    return;
                }
                //可移动
                that.sdata = that.cobj.getImageData(that.sx, that.sy, that.sw, that.sh);//保存选择框区域数据
                that.cobj.clearRect(that.sx, that.sy, that.sw, that.sh);//删除选择框区域数据
                that.arr.push(that.cobj.getImageData(0, 0, that.clientX, that.clientY))//将画板所有数据保存到arr
                that.cobj.putImageData(that.sdata, that.sx, that.sy);//再把选择框区域的数据放回去
                that.copy.onmousemove = function (e) {
                    var ox = e.offsetX;
                    var oy = e.offsetY;
                    left = ox - that.sw / 2;
                    top = oy - that.sh / 2;
                    that.s.css({
                        left: left,
                        top: top
                    })
                    that.cobj.clearRect(0, 0, that.clientX, that.clientY);
                    that.cobj.putImageData(that.arr[that.arr.length - 1], 0, 0);
                    that.cobj.putImageData(that.sdata, left, top);
                }
                that.copy.onmouseup = function () {
                    that.sx = left;
                    that.sy = top;
                    that.copy.onmousemove = null;
                    that.copy.onmouseup = null;
                    that.move();
                    that.arr.push(that.cobj.getImageData(0, 0, that.clientX, that.clientY));
                }



                }

        }
    }


}
