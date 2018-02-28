/*
    config...
        parem: ele--> 要追加的元素
        parem: row--> 行数
        parem: column--> 列数
        parem: rowWidth--> 行宽
        parem: rowHeight--> 行高
        parem: rowColor--> 行颜色
*/
(function(w){
    function Table(config){
        this.ele = null;
        this.row = null;
        this.column = null;
        this.rowWidth = null;
        this.rowHeight = null;
        this.rowColor = null;
        if(!config){
            throw "Please enter the configuration item!";
        }else{
            this.init(config);
        }
    }
    Table.prototype = {
        init: function(config){
            //获取被追加的元素
            this.ele = document.getElementById(config.ele);
            this.row = config.row || 10;
            this.column = config.column || 5;
            this.rowWidth = config.rowWidth || 600;
            this.rowHeight = config.rowHeight || 50;
            this.rowColor = config.rowColor || "#5ed5d1";
            //创建表格
            this.setTable();
        },
        setTable: function(){
            for(let i=0; i<this.row; i++){
                //创建行节点
                var newRow = document.createElement("div");
                //将创建好的行节点追加到指定元素
                this.ele.appendChild(newRow);
                //给所有的row添加t-row类
                newRow.classList.add("t-row");
                if(i%2==0){
                    //添加类
                    newRow.classList.add("active");
                }
                for(var j=0; j<this.column; j++){
                    //创建列节点
                    var newColumn = document.createElement("div");
                    //追加到row上面
                    newRow.appendChild(newColumn);
                    //给所有的column添加t-column类
                    newColumn.classList.add("t-column");
                    //给所有的column加上可输入属性
                    newColumn.setAttribute("contenteditable","true");
                    newColumn.setAttribute("size","5");
                }
            }
            //设置样式
            this.setStyle();
        },
        setStyle: function(){
            //获取页面上的style标签
            var getStyle = document.querySelector("style");
            //判断style标签是否存在
            if(!getStyle){
                //没有则创建此节点
                getStyle = document.createElement("style");
                //获取head节点
                var getHead = document.querySelector("head");
                //追加到head节点上面
                getHead.appendChild(getStyle);
            }
            //修改样式
            getStyle.innerText += "#"+this.ele.id+"{background-color:aqua;width:"+this.rowWidth+"px;margin:0 auto;}";
            getStyle.innerText += "#"+this.ele.id+" .t-row{width:"+this.rowWidth+"px;height:"+this.rowHeight+"px;color:#fff;line-height:"+this.rowHeight+"px;text-align:center;}";
            getStyle.innerText += "#"+this.ele.id+" .active{background-color:"+this.rowColor+";}";
            getStyle.innerText += "#"+this.ele.id+" .t-row .t-column{float:left;width:"+(this.rowWidth/this.column-1)+"px;height:100%;border-left:1px solid #000;-webkit-transition:all .2s linear;transition:all .2s linear;overflow:hidden;}";
            getStyle.innerText += "#"+this.ele.id+" .t-row .t-column:hover{background-color:#ff6e97;}";
            getStyle.innerText += "#"+this.ele.id+" .t-row .t-column:nth-of-type(1){border:none;}";
        }
    };

    w.Table = Table;
})(window);