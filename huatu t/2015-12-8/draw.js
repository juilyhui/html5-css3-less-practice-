function draw(canvas, cobj,cbox) {
    this.canvas = canvas;
    this.cobj = cobj;
    this.cbox=cbox;
    this.clientW = canvas.width;
    this.clientH = canvas.height;
    this.strokeColor = "#000";
    this.fillColor = "#000";
    this.lineWidth = 1;
    this.type = "";
    this.style = "stroke";
    this.arr = [];
    this.xpsize=6;
    this.xiangpi=this.createXp();

}
draw.prototype = {
    init: function () {
        this.cobj.strokeStyle = this.strokeColor;
        this.cobj.fillStyle = this.fillColor;
        this.cobj.lineWidth = this.lineWidth;
    },
    drawFun: function () {
        var that = this;
        that.cbox.onmousedown=null;
        that.cbox.onmousemove=null;
        that.cbox.onmouseup=null;
        that.xiangpi.css("display","none");
        that.canvas.onmousedown = function (e) {
            that.init();
            var startx = e.offsetX;
            var starty = e.offsetY;
            document.title = startx + "--" + starty;
            that.canvas.onmousemove = function (e) {
                that.cobj.clearRect(0, 0, that.clientW, that.clientH);
                if (that.arr.length != 0) {
                    that.cobj.putImageData(that.arr[that.arr.length - 1], 0, 0);
                }
                var endx = e.offsetX;
                var endy = e.offsetY;
                if (!that.type) {
                    return false;
                }
                that[that.type](startx, starty, endx, endy);

            }
            that.canvas.onmouseup = function () {
                that.arr.push(that.cobj.getImageData(0, 0, that.clientW, that.clientH));
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
            e.preventDefault();
        }
    },

    line: function (x, y, x1, y1) {
        this.cobj.beginPath();
        this.cobj.moveTo(x, y);
        this.cobj.lineTo(x1, y1);
        this.cobj.stroke();
        this.cobj.closePath();
    },
    rect: function (x, y, x1, y1) {
        var w = x1 - x;
        var h = y1 - y;
        this.cobj.beginPath();
        this.cobj.rect(x, y, w, h);
        this.cobj[this.style]();
        this.cobj.closePath();
    },

    circle: function (x, y, x1, y1) {
        var r = Math.sqrt((x1 - x) * (x1 - x) + (y1 - y) * (y1 - y));
        this.cobj.beginPath();
        this.cobj.arc(x, y, r, 0, 2 * Math.PI);
        this.cobj[this.style]();
        this.cobj.closePath();
    },
    createXp:function(){
        var that=this;
        return $("<div>").css({
            width:that.xpsize,
            height:that.xpsize,
            position:"absolute",
            left:0,top:0,border:"1px solid #000",display:"none"
        }).appendTo(that.cbox);
    },

    //擦除方法
    clear:function() {
        var that = this;
        that.canvas.onmousedown = null;
        that.canvas.onmousemove = null;
        that.canvas.onmouseup = null;

        that.xiangpi.mousemove(function (e) {
            e.stopPropagation();
        })
        that.xiangpi.mouseout(function (e) {
            e.stopPropagation();
        })

        that.cbox.onmouseout=function(){
            that.xiangpi.css("display","none")
        }
        that.cbox.onmousemove = function (e) {
            var ox = e.offsetX;
            var oy = e.offsetY;
            var left = ox - that.xpsize / 2;
            var top = oy - that.xpsize / 2;
            if (left < 0) {
                left = 0;
            }
            if (top < 0) {
                top = 0;
            }
            if (left > that.clientW - that.xpsize) {
                left = that.clientW - that.xpsize
            }
            if (top > that.clientH - that.xpsize) {
                top = that.clientH - that.xpsize
            }

            that.xiangpi.css({
                left: left,
                top: top,
                width: that.xpsize,
                height: that.xpsize,
                display: "block"
            })
        }

        that.cbox.onmousedown = function () {
            that.cbox.onmousemove = function (e) {
                var ox = e.offsetX;
                var oy = e.offsetY;
                var left = ox - that.xpsize / 2;
                var top = oy - that.xpsize / 2;
                if (left < 0) {
                    left = 0;
                }
                if (top < 0) {
                    top = 0;
                }
                if (left > that.clientW - that.xpsize) {
                    left = that.clientW - that.xpsize
                }
                if (top > that.clientH - that.xpsize) {
                    top = that.clientH - that.xpsize
                }

                that.xiangpi.css({
                    left: left,
                    top: top,
                    width: that.xpsize,
                    height: that.xpsize,
                    display: "block"
                })
                that.cobj.clearRect(left, top, that.xpsize, that.xpsize)
            }


            that.cbox.onmouseup = function () {
                that.cbox.onmouseup = null;
                that.cbox.onmousemove = null;
                that.arr.push(that.cobj.getImageData(0, 0, that.clientW, that.clientH));
                that.clear();
            }
        }

    }


}
