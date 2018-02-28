(function(w){
    function Bubble(config){
        //画笔
        this.drawPen = null;
        //圆心坐标
        this.x = null;
        this.y = null;
        //半径
        this.radius = null;
        //圆的颜色
        this.color = null;
        //获取画布
        this.cvs = null;
        this.cvsWidth = null;
        this.cvsHeight = null;
        if(config){
            this.init(config);
        }
    }
    Bubble.prototype = {
        init: function(config){
            var that = this;
            var cvs = document.getElementById(config.id);
            //初始化画笔
            this.drawPen = cvs.getContext("2d");
            // 获取浏览器窗口宽高,初始化画布的宽高自适应
            var w = window.innerWidth;
            var h = window.innerHeight;
            this.cvsWidth = cvs.width = w;
            this.cvsHeight = cvs.height = h;
            window.onresize = function(){
                w = window.innerWidth;
                h = window.innerHeight;
                this.cvsWidth = cvs.width = w;
                this.cvsHeight = cvs.height = h;
            }
            //初始化圆
            //初始化每个圆的起始坐标
            this.x = this.random( 0 , this.cvsWidth );
            this.y = this.random( 0 , this.cvsHeight );
            //初始化圆的半径
            this.radius = this.random(config.radius.min,config.radius.max) || this.random(2,4);
            //初始化圆的颜色
            var rColor = ["#FF6E97","#5ED5D1","#1DB0D8","#82A6F5","#F6D6FF","#56A36C","#E9F01D"];
            // this.color =rColor[Math.floor(this.random(0,rColor.length-1))] || config.color[Math.floor(this.random(0,config.color.length-1))]; (有bug)
            //调用draw方法绘制
            if(config.color){
                this.color = config.color[Math.floor(this.random(0,config.color.length))];
            }else{
                this.color = rColor[Math.floor(this.random(0,rColor.length))]
            }

            //this.draw();
        },
        draw: function(){
            var that = this;
            //定时器,每隔1000/60ms清除画布,并重新绘制
            //setInterval(function(){
                for(var i=0;i<10;i++){

                    that.drawPen.beginPath();
                    //that.drawPen.clearRect(0,0,that.cvsWidth,that.cvsHeight);
                    that.drawPen.fillStyle = that.color;
                    that.drawPen.arc(that.x,that.y,that.radius,0,Math.PI*2);
                    //碰撞检测
                    // if((that.x + that.radius)>=that.cvsWidth || that.x<=that.radius){
                    //     -that.x++;
                    // }
                    // if((that.y + that.radius)>= that.cvsHeight || that.y<= that.radius){
                    //     -that.y++;
                    // }
                    that.drawPen.fill();
                }
            //},1000/60);
        },
        //bubble移动距离
        // move:function(){
        //     var moveX = this.random(0,1);
        //     var moveY = this.random(0,1);
        //     this.x += moveX;
        //     this.y += moveY;
        // },
        random: function(min,max){
            return Math.random()*(max-min)+min;
        }
    };
    //向外界暴露Bubble构造函数
    w.Bubble = Bubble;
})(window);