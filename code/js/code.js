function code(obj){//传入canvas要插入到的元素
    this.obj=obj;
    this.num=4;//要取的字母个数
    this.yinzi=["a","b","c","d","e","f","g","h","A","B","C","D","E","F","G","H"];//备选的字母
    this.canvas=this.create();//canvas
    this.arr=this.getletter();
}
code.prototype={
    /*创建canvas*/
    create:function(){
        var canvas=document.createElement("canvas");
        this.obj.appendChild(canvas);
        canvas.width=100;
        canvas.height=30;
        canvas.style.background="#ccc";
        return canvas;
    },
    /*获取字母*/
    getletter:function(){
        var that=this;
        var newarr=[];
        for(var i=0;i<that.num;i++){
            var data=Math.floor(Math.random()*(that.yinzi.length-1));//随机下标
            while(that.check(newarr,that.yinzi[data])){
                //有重复的
                data=Math.floor(Math.random()*(that.yinzi.length-1));
            }
            newarr.push(that.yinzi[data]);//放进新数组
        }
        return newarr;
    },
    /*检查去除的字母是否重复*/
    check:function(arr,val){
        for(var i=0;i<arr.length;i++){
            if(arr[i]==val){
                return true;//有重复的
            }
        }
        return false;//没有重复的
    },
    run:function(){
        var that=this;
        var cobj=that.canvas.getContext("2d");
        console.log(that.arr)
        for(var i=0;i<that.arr.length;i++){
            cobj.beginPath();
            cobj.save();
            cobj.translate(20*i+10,10*Math.random())
            cobj.rotate(Math.PI/180*(Math.random()*60-30))
            cobj.font="20px 黑体";
            cobj.textBaseline="top";
            cobj.fillText(that.arr[i],0,0,80);
            cobj.restore();
            cobj.closePath();
        }
        for(var i=0;i<6;i++){
            cobj.beginPath();
            cobj.save();
            cobj.rotate(Math.PI/180*(Math.random()*60-30))
            cobj.moveTo(90*Math.random()+10,10*Math.random()+10);
            cobj.lineTo(90*Math.random()+10,10*Math.random()+10);
            cobj.stroke();
            cobj.restore();
            cobj.closePath();
        }
    },
    clear:function(){
        var cobj=this.canvas.getContext("2d");
        cobj.clearRect(0,0,this.canvas.width,this.canvas.height)
    }
}