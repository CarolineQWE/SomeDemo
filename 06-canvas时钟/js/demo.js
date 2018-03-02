/*
    constructor: Clock
    parem: element  画布
    parem: drawPen 画笔
    parem: clockRadius  时钟半径
    parem: clockColor   时钟边框颜色
    parem: hourColor    时针颜色
    parem: minuteColor  分针颜色
    parem: secondColor  秒针颜色
    parem: textColor    文字颜色
    parem: timeColor    时刻颜色
*/
(function (w) {
    function Clock(config) {
        this.ele = null;
        this.cvsWidth = 0;
        this.cvsHeight = 0;
        this.drawPen = null;
        this.clockRadius = 0;
        this.clockColor = null;
        this.hourColor = null;
        this.minuteColor = null;
        this.secondColor = null;
        this.textColor = null;
        this.timeColor = null;
        config ? this.init(config) : this.error();
    }

    Clock.prototype = {
        init: function (config) {
            var that = this;
            this.ele = document.getElementById(config.ele);
            this.drawPen = this.ele.getContext("2d");
            this.clockRadius = config.clockRadius || 50;
            this.clockColor = config.clockColor || "#000";
            this.hourColor = config.hourColor || "#000";
            this.minuteColor = config.minuteColor || "#666";
            this.secondColor = config.secondColor || "red";
            this.textColor = config.textColor || "blue";
            this.timeColor = config.timeColor || "green";
            var w = window.innerWidth;
            var h = window.innerHeight;
            this.cvsWidth = this.ele.width = w;
            this.cvsHeight = this.ele.height = h;
            window.onresize = function () {
                w = window.innerWidth;
                h = window.innerHeight;
                that.cvsWidth = that.ele.width = w;
                that.cvsHeight = that.ele.height = h;
            }
            var now = new Date();
            var cHour = now.getHours();
            var cMinute = now.getMinutes();
            var cSecond = now.getSeconds();
            this.drawPen.translate(this.cvsWidth/2,this.cvsHeight/2);
            this.drawPen.save();    // 保存 translate到中心点的状态
            this.drawCenter();
            this.drawClock();
            this.drawHour(cHour);
            this.drawPen.restore();
            this.drawPen.save();
            this.drawMinute(cMinute);
            this.drawPen.restore();
            this.drawPen.save();
            this.drawSecond(cSecond);
            this.drawPen.restore();
            this.drawText();
            this.drawTime();
            this.render();
        },
        //画中心点
        drawCenter: function () {
            this.drawPen.beginPath();
            this.drawPen.arc(0, 0, 6 * this.clockRadius / 200, 0, Math.PI * 2);
            this.drawPen.fill();
        },
        //画时钟外壳
        drawClock: function () {
            this.drawPen.beginPath();
            this.drawPen.strokeStyle = this.clockColor;
            this.drawPen.lineWidth = 10 * this.clockRadius / 200;
            this.drawPen.arc(0, 0, this.clockRadius, 0, Math.PI * 2);
            this.drawPen.stroke();
        },
        //画时针
        drawHour: function (cHour) {
            this.drawPen.beginPath();
            var rad = Math.PI*2/12*(cHour-3);
            this.drawPen.rotate(rad);
            this.drawPen.strokeStyle = this.hourColor;
            this.drawPen.lineWidth = 8 * this.clockRadius / 200;
            this.drawPen.moveTo(0, 0);
            this.drawPen.lineTo(this.clockRadius * 0.6, 0);
            this.drawPen.stroke();
        },
        //画分针
        drawMinute: function (cMinute) {
            this.drawPen.beginPath();
            var rad = Math.PI*2/60*(cMinute);
            this.drawPen.rotate(rad);
            this.drawPen.strokeStyle = this.minuteColor;
            this.drawPen.lineWidth = 5 * this.clockRadius / 200;
            this.drawPen.moveTo(0, 0);
            this.drawPen.lineTo(0, -this.clockRadius * 0.68);
            this.drawPen.stroke();
        },
        //画秒针
        drawSecond: function (cSecond) {
            this.drawPen.beginPath();
            var rad = Math.PI*2/60*(cSecond);
            this.drawPen.rotate(rad);
            this.drawPen.strokeStyle = this.secondColor;
            this.drawPen.lineWidth = 2 * this.clockRadius / 200;
            this.drawPen.lineCap = "round";
            this.drawPen.moveTo(0, 0);
            this.drawPen.lineTo(0, this.clockRadius * 0.76);
            this.drawPen.stroke();
        },
        //绘制文字
        drawText: function () {
            var that = this;
            var text = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
            var cor = {   // 定义每一点的坐标
                x: 0,
                y: 0
            };
            text.forEach(function (current, index) {   // 遍历text数组画文字
                var angle = Math.PI * 2 / 12 * index;  // 计算每一个的角度
                cor = {
                    x: Math.cos(angle) * (that.clockRadius - 25 * that.clockRadius / 200),
                    y: Math.sin(angle) * (that.clockRadius - 25 * that.clockRadius / 200)
                };
                that.drawPen.beginPath();
                that.drawPen.fillStyle = that.textColor;
                that.drawPen.font = `${16 * that.clockRadius / 200 + 4}px Microsoft Yahei`;
                that.drawPen.textAlign = "center";
                that.drawPen.textBaseline = "middle";
                that.drawPen.fillText(current, cor.x, cor.y);
            });
        },
        //绘制时刻
        drawTime: function () {
            var cor = {
                x: 0,
                y: 0
            };
            //绘制时刻
            for (var i = 0; i < 60; i++) {    //画出每一个点
                var angle = Math.PI * 2 / 60 * i;   //每一个小圆点的弧度
                cor = {
                    x: Math.cos(angle) * (this.clockRadius - 10 * this.clockRadius / 200),
                    y: Math.sin(angle) * (this.clockRadius - 10 * this.clockRadius / 200)
                };
                this.drawPen.beginPath();
                if (i % 5 === 0) {  // 3,6,9,12时刻
                    this.drawPen.fillStyle = "#000";
                    this.drawPen.arc(cor.x, cor.y, 7 * this.clockRadius / 200, 0, Math.PI * 2);
                } else {    // 其他时刻
                    this.drawPen.fillStyle = this.timeColor;
                    this.drawPen.arc(cor.x, cor.y, 4 * this.clockRadius / 200, 0, Math.PI * 2);
                }
                this.drawPen.fill();
            }
        },
        // 渲染时钟,动起来
        render: function(){
            var that = this;
            setInterval(function(){
                var now = new Date();
                var cHour = now.getHours();
                var cMinute = now.getMinutes();
                var cSecond = now.getSeconds();
                that.drawPen.clearRect(-that.cvsWidth/2,-that.cvsHeight/2,that.cvsWidth,that.cvsHeight);
                that.drawPen.save();    // 保存 translate到中心点的状态
                that.drawCenter();
                that.drawClock();
                that.drawHour(cHour);
                that.drawPen.restore();
                that.drawPen.save();
                that.drawMinute(cMinute);
                that.drawPen.restore();
                that.drawPen.save();
                that.drawSecond(cSecond);
                that.drawPen.restore();
                that.drawText();
                that.drawTime();
            },1000);
        },
        error: function () {
            throw "Please enter the true parem!";
        }
    };

    w.Clock = Clock;
})(window);
