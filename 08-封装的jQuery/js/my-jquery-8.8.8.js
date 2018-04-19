(function (w) {

    // 工厂函数,创建jQuery实例对象
    function jQuery(selector) {

        return new jQuery.fn.init(selector);

    }

    // jQuery原型
    jQuery.fn = jQuery.prototype = {

        // jQuery原型上的核心方法  (实例方法)
        // constructor: jQuery
        // jquery: version (版本号)
        // selector 所有实例默认的选择器,代表实例是一个jQuery类型的对象
        // length: 代表所有实例的默认长度都是0
        // toArray: 把实例转化为数组
        // get 获取指定下标的元素,获取到的是原生DOM
        // each: 遍历实例,把遍历到的数据分别传给回调函数
        // map: 遍历实例,把遍历到的数据分别传给回调函数使用,然后把回调的返回值手机起来组成一个数组返回
        // slice: 截取实例的部分元素, 构成一个新的jQuery实例返回
        // first: 获取实例中的第一个元素,是jQuery类型的实例对象
        // last: 获取实例中的最后一个元素,是jQuery类型的实例对象
        // eq: 获取指定下标的元素,但是获取到的是jQuery类型的实例对象
        // push: 给实例添加新元素
        // sort: 对实例中的元素进行排序
        // splice: 按照指定下标指定数量删除元素,也可以替换删除的元素

        constructor: jQuery,

        jquery: "8.8.8",

        length: 0,

        selector: "",

        toArray() {

            return [].slice.call(this, 0, this.length);
            // return [].slice.call( this );

        },

        get(num) {

            num = Math.floor(num);

            // num为空
            if (num === undefined) {

                // 调用toArray()
                return this.toArray();

            }

            else if (num >= 0 && num < this.length) {

                return this[num];

            }

            else if (num < 0 && num > -this.length + 1) {

                return this[this.length + num];

            }


        },

        each(callback) {

            var arr = this.toArray(),
                i = 0,
                len = this.length;

            // for( ; i < len; i++ ) {

            //     if( callback.call( arr[ i ], i, arr[ i ] ) ) {

            //         break;

            //     }

            // }

            return jQuery.each(arr, callback);

        },

        map(callback) {

            var arr = this.toArray(),
                i = 0,
                len = this.length;

            // for ( ; i < len; i++) {

            //     if (callback.call( arr[i], arr[ i ], i )) {

            //         // 和each唯一的区别
            //         continue;

            //     }

            // }

            // 借用 静态方法
            return jQuery.map(arr, callback);

        },

        slice() {

            // 参数个数不确定,使用arguments对象
            var nodes = Array.prototype.slice.apply(this, arguments);

            // 返回新实例
            return jQuery(nodes);

        },

        first() {

            // 将获取到的 DOM 存到数组中, 方便包装成jQuery对象
            var save = [];

            save.push(this[0]);

            // 是jQuery对象
            return jQuery(save);

        },

        eq(num) {

            // 如果传入小数
            num = Math.floor(num);

            if (num >= 0 && num < this.length) {

                // 将dom对象包装成数组形式
                let saveDom = Array.of(this[num]);

                return jQuery(saveDom);

            }

            else if (num < 0 && num > -this.length + 1) {

                return jQuery(this[num + this.length]);

            }

        },

        last() {

            var save = [];

            save.push(this[this.length - 1]);

            return jQuery(save);

        },

    };

    // 给jQuery添加静态方法,或者给jQuery的原型添加实例方法,谁调用给谁添加
    jQuery.extend = jQuery.fn.extend = function ( ...args ){

        if ( args.length === 1 ){

            const obj = args[ 0 ];

            for ( let k in obj ){

                this[ k ] = obj[ k ];

            }

        }

        else if ( args.length >= 2 ){

            for ( let i = 0, every; every = args[ i++ ]; ){

                if ( i === 1 ){

                    continue;

                }

                Object.assign( args[ 1 ], every );

            }

        }

    }

    // 给jQuery添加静态方法
    jQuery.extend({

        error ( msg ){

            return new Error( msg );

        },

        isHtmlPart(selector) {

            // 验证是否HTML片段
            var regHtmlPart = /^<(.*)>.*<\/1>$|^<(.*)>$/;

            if (!selector) {
                return false;
            }
            else if (regHtmlPart.test(selector)) {
                return true;
            }

            return false;

        },

        _isHtmlPart(selector) {

            var regHtmlPart = /^<(.*)>.*<\/1>$|<.*>/;

            return (!!selector) && (regHtmlPart.test(selector));

        },

        isWhichSelector(selector) {

            var regId = /^#(\w+)$/,
                regClass = /^\.(\w+)$/,
                regTag = /^[a-z]{1,7}$/;

            if (regId.test(selector)) {

                selector = selector.replace(/#/, "");

                return document.getElementById(selector);

            }

            else if (regClass.test(selector)) {

                selector = selector.replace(/\./, "");

                return document.getElementsByClassName(selector);

            }

            else if (regTag.test(selector)) {

                return document.getElementsByTagName(selector);

            }
        },

        trim(selector) {

            if (!selector) {

                return false;

            }
            else if (selector.trim) {

                return selector.trim();

            }
            else {

                return selector.replace(/^\s|\s$/, "");

            }

        },

        isFunction(selector) {

            if (!selector) {

                return false;

            }
            else if (typeof selector === "function") {

                return true;

            }

        },

        isObject(selector) {

            // 排除null干扰
            if (typeof selector === null) {

                return false;

            }
            else if (Object.prototype.toString.call(selector) === "[object Object]") {

                return true;

            }

        },

        _isFunction(selector) {

            return (!!selector) && (typeof selector === "function");

        },

        addEvent(type, target, hander) {

            // 优先使用DOM2级事件
            if (window.addEventListener) {

                return (function () {

                    return target.addEventListener(type, hander);

                })();

            }

            // 兼容IE8
            else if (window.attachEvent) {

                return (function (target, type, hander) {

                    return target.attachEvent("on" + type, function () {

                        // 将hander的this指向target
                        hander.call(target, window.event);

                    });

                })();

            }

            // 其他情况
            else {

                return (function (target, type, hander) {

                    return target["on" + type] = hander;

                })();

            }

        },

        removeEvent(type, target, handler) {

            if (window.removeEventListener) {

                return (() => {

                    return target.removeEventListener(type, handler);

                })();

            }

            else if (window.detachEvent) {

                return (() => {

                    return target.detachEvent(`on${type}`, handler);

                })();

            }

            return (() => {

                return target.on[type] = null;

            })();

        },

        ready(selector) {

            // 如果此时DOM已经全部加载完毕
            // document.readyState 支持全部浏览器
            if (document.readyState === "interactive") {

                selector();

            }

            // 如果DOM没有加载完毕,手动监听document
            else if (document.addEventListener) {

                document.addEventListener("DOMContentLoaded", selector);

            }

            // 兼容IE8
            else {

                // IE8 用onreadystatechange代替DOMContentLoaded事件
                document.attachEvent("onreadystatechange", function () {

                    if (document.readyState === "complete") {

                        selector();

                    }

                });

            }

        },

        isWindow(selector) {

            return selector.window === selector;

        },

        isArray(selector) {

            return ({}).toString.call(selector) === "[object Array]";

        },

        _isArray(selector) {

            return selector.isArray();

        },

        isLikeArray(selector) {

            // 如果length属性存在
            if ("length" in selector) {

                // 如果length属性为0
                if (selector.length === 0) {

                    return true;

                }

                // 如果length不为0,且length-1存在于selector属性中
                else if (selector.length !== 0 && selector.length - 1 in selector) {

                    return true;

                }

            }

        },

        each(obj, callback) {

            // 如果obj为 对象,但是不为null
            if (this.isObject(obj)) {

                for (var k in obj) {

                    if (callback.call(obj[k], k, obj[k]) === false) {

                        break;

                    }

                }

            }

            // 如果obj为 数组或伪数组
            else if (this.isArray(obj) || this.isLikeArray(obj)) {

                var i = 0,
                    len = obj.length;

                for (; i < len; i++) {

                    if (callback.call(obj[i], i, obj[i])) {

                        break;

                    }

                }

            }

        },

        map(obj, callback) {

            // 保存遍历到的数据,返回
            var result = [],
                i = 0,
                len = obj.length;

            if (this.isObject(obj)) {

                for (var k in obj) {

                    callback.call(obj[k], obj[k], k)

                    result.push(obj[k]);

                }

            }

            else if (this.isArray(obj) || this.isLikeArray(obj)) {

                for (; i < len; i++) {

                    callback.call(obj[i], obj[i], i);

                    result.push(obj[i]);

                }

            }

            return result;

        },

        isEmptyStr( selector ) {

            // 判断是否是空字符串,是则返回true
            return (Object.is(typeof selector, "null") || Object.is(typeof selector, "undefined") || Object.is(typeof selector, 0) || Object.is(typeof selector, "NaN"));

        },

        isString( selector ) {

            return Object.is(typeof selector, "string");

        },

        isDom( obj = {} ) {

            // 判断是否 DOM对象
            try {

                // 如果是数组或伪数组
                // if ( jQuery.isArray( obj ) || jQuery.isLikeArray( obj ) ){

                //     return ( obj[ 0 ] instanceof NodeList || obj[ 0 ] instanceof HTMLElement ) && Object.is( obj[ 0 ].nodeType, 1 ) && Object.is( obj[ 0 ].nodeValue, null );

                // }

                // 如果是其他
                return (obj instanceof NodeList || obj instanceof HTMLElement) && Object.is(obj.nodeType, 1) && Object.is(obj.nodeValue, null) && !Object.is(jQuery.isLikeArray(obj), 'false');

            } catch (e) {

                return false;

            }

        },

        isNumber( obj ) {

            return Object.is(typeof obj, 'number');

        },
        
        ajax ( option = {} ){

            /* method: get(GET) | post(POST)
            url: 地址
            data: 发送请求时传递的数据
            success: 请求成功执行回调
            error: 请求失败执行回调
            complete: 无论成功失败,执行回调 */
           
            const [ method, url, data, success, error, complete ] = [ jQuery.trim( option.method ), jQuery.trim( option.url ), option.data, option.success, option.error, option.complete ];

            const promise = new Promise( ( resolve, reject ) => {

                const xhr = new XMLHttpRequest();

                // 如果是get请求
                if ( Object.is( method.toLowerCase(), 'get' ) ){

                    // 如果有传data
                    if ( data && jQuery.isObject( data ) ){

                        url = `${url}?`;

                        let count = 0;

                        for ( let k in data ){

                            count ++;

                            if ( count === 1 ){

                                continue;

                            }

                            url += `${data[ k ]}&`;

                        }

                    }

                    xhr.open( method, url );

                }
                
                // 如果是post请求
                else if ( Object.is( method.toLowerCase(), 'post' ) ){

                    xhr.open( method, url );

                    xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );

                }

                xhr.onreadystatechange = () => {

                    if ( xhr.readyState === 4 ){

                        if ( ( xhr.status >= 200 && xhr.status < 300 ) || xhr.status === 304 ){

                            resolve( JSON.parse( this.trim( xhr.responseText ) ) );

                        }

                        reject( '请求失败~~' );

                    }

                };

                if ( Object.is( method.toLowerCase(), 'get' ) ){

                    xhr.send();

                }

                else if ( Object.is( method.toLowerCase(), 'post' ) ){

                    let str = ``;

                    if ( data && jQuery.isObject( data ) ){

                        for ( let k in data ){

                            str += `${k}=${data[ k ]}&`;

                        }

                        str = str.replace( /&$/, '' );

                    }

                    xhr.send( str );

                }

            } );

            promise.then( ( msg ) => {

                success && success( msg );

            } ).catch( ( err ) => {

                error && error( err );

            } ).finally( () => {

                complete && complete();

            } );

        },

        walker( current, target ) {

            /*
                {
                    current => 遍历起点
                    target => 遍历目标
                }
            **/

            if ( jQuery.isDom( current ) && jQuery.isString( target ) ){

                target = jQuery.trim( target ).toLowerCase();

                const [ saveNode, treewalker ] = [ [], document.createTreeWalker( current, NodeFilter.SHOW_ELEMENT, ( node ) => {

                    return node.localName === target ? 
                            NodeFilter.FILTER_ACCEPT :
                            NodeFilter.FILTER_SKIP;

                }, false ) ];

                let next = treewalker.nextNode(); 

                let cur = treewalker.currentNode;

                while( next !== null ) {

                    saveNode.push( next );

                    next = treewalker.nextNode();

                }

                return saveNode;

            }

            return jQuery( null );

        },

        isEqualNode( node1, node2 ) {

            // 判断两个DOM节点是否完全相同
            return node1.isEqualNode( node2 );

        }

    });

    // 给jQuery原型添加实例方法
    jQuery.fn.extend({

        html(content) {

            // 如果传入的content为undefined, null, NaN, 0
            if (jQuery.isEmptyStr(content)) {

                // 如果实例是伪数组
                if (jQuery.isLikeArray(this)) {

                    // 返回实例的第一个元素的innerHTML
                    return this[0].innerHTML;

                }

                // 如果是其他
                else {

                    return this.innerHTML;

                }

            }

            // 如果传入的content 为字符串
            else if (jQuery.isString(content)) {

                // 如果实例是伪数组
                if (jQuery.isLikeArray(this)) {

                    // 遍历实例的每一个元素,将每一个元素的innerHTML改为content
                    for (let i = 0, len = this.length; i < len; i++) {

                        this[i].innerHTML = content;

                    }

                }

                // 如果是 其他
                else {

                    this.innerHTML = content;

                }

                return this;

            }

        },

        text(content) {

            // 如果传入undefined,null,NaN,0
            if (jQuery.isEmptyStr(content)) {

                // 如果实例对象是伪数组
                if (jQuery.isLikeArray(this)) {

                    // 拼接字符串
                    let str = '';

                    // 遍历实例对象,将每个实例对象的innerText拼接成字符串,返回
                    for (let i = 0, len = this.length; i < len; i++) {

                        str += this[i].innerText;

                    }

                    return str;

                }

                // 如果是其他
                // 直接返回其innerText
                else {

                    return this.innerText;

                }

            }

            // 如果传入字符串
            else if (jQuery.isString(content)) {

                // 如果实例对象是伪数组
                if (jQuery.isLikeArray(this)) {

                    // 遍历每一项,将每一项的innerText改为content,返回此实例对象
                    for (let i = 0, len = this.length; i < len; i++) {

                        this[i].innerText = content;

                    }

                }

                // 如果是其他
                else {

                    // 直接设置其innerText为content,并返回此实例对象
                    this.innerText = content;

                }

                return this;

            }

        },

        remove(...args) {

            // 如果没有传参数
            if (Object.is(args.length, 0)) {

                // 如果实例是伪数组
                if (jQuery.isLikeArray(this)) {

                    // 遍历实例,删除此实例的每一项,然后返回删除的实例
                    for (let i = 0, len = this.length; i < len; i++) {

                        let every = this[i];

                        every.parentNode.removeChild(every);

                    }

                }

                // 如果是其他
                else {

                    this.parentNode.removeChild(this);

                }

                return this;

            }

            // 如果用户手贱输入参数
            return this;

        },

        empty(...args) {

            // 如果没有传参数
            if (Object.is(args.length, 0)) {

                // 如果实例是伪数组
                if (jQuery.isLikeArray(this)) {

                    // 遍历实例每一项,将其innerHTML设置为空
                    for (let i = 0, len = this.length; i < len; i++) {

                        let every = this[i];

                        every.innerHTML = '';

                    }

                }

                // 如果是其他
                else {

                    this.innerHTML = '';

                }

                return this;

            }

            return this;

        },

        appendTo(target = {}) {

            // 如果没传参数
            if (!target) {

                // 返回空jQuery实例
                return jQuery(null);


            }

            // 如果传了字符串
            else if (jQuery.isString(target)) {

                // 去除字符串的首尾空格
                target = jQuery.trim(target);

                // 如果是选择器
                try {

                    // 将获取到的DOM节点数组 转化成jQuery对象
                    const items = jQuery(jQuery.isWhichSelector(target));

                    // 遍历this,
                    for (let i = 0, thisLen = this.length; i < thisLen; i++) {

                        // 遍历items
                        for (let j = 0, itemsLen = items.length; j < itemsLen; j++) {

                            // 克隆this的每一项
                            let clone = this[i].cloneNode(true);

                            // 将clone后的值添加给 每一个items元素
                            items[j].appendChild(clone);

                        }

                    }

                    // 返回新创建的jQuery实例,便于链式编程
                    return this;

                } catch (e) {

                    return jQuery(null);

                }

            }

            // 如果是 DOM对象( 节点数组 或 单个节点对象 )
            else if (jQuery.isDom(target)) {

                try {

                    // 如果是节点数组
                    if (jQuery.isLikeArray(target)) {

                        const list = jQuery(target);

                        // 遍历实例对象
                        for (let i = 0, outerLen = this.length; i < outerLen; i++) {

                            // 遍历被追加的对象,目标对象
                            for (let j = 0, innerLen = list.length; j < innerLen; j++) {

                                let clone = this[i].cloneNode(true);

                                list[j].appendChild(clone);

                            }

                        }

                    }

                    // 如果是单个节点对象
                    else {

                        // 遍历实例对象,将每个实例对象分别添加到 target身上
                        for (let i = 0, len = this.length; i < len; i++) {

                            target.appendChild(this[i]);

                        }

                    }

                    return this;

                } catch (e) {

                    return jQuery(null);

                }

            }

            // 其他情况, 
            return this;

            // jQuery会将穿进去的 jQuery对象伪数组的每一项拆分成新jQuery实例对象

        },

        prependTo(target) {

            /*
                1. 字符串(选择器)
                2. DOM对象
                3. jQuery对象
            **/
            if (!target) {

                return jQuery(null);

            }

            // target => string
            else if (jQuery.isString(target)) {

                // 获取DOM并包装为jQuery对象(伪数组)
                target = jQuery(target);

                // 遍历this
                for (let outerLen = this.length, i = outerLen - 1; i >= 0; i--) {

                    // 遍历target
                    for (let j = 0, innerLen = target.length; j < innerLen; j++) {

                        let clone = this[i].cloneNode(true);

                        target[j].insertBefore(clone, target[j].firstChild);

                    }

                }

            }

            // target => DOM
            else if (jQuery.isDom(target)) {

                try {
                    // 如果是单个 DOM 元素
                    if (!jQuery.isLikeArray(target)) {

                        // 直接遍历 this,将this的每一项clone然后添加到 target身上
                        for (let i = this.length - 1; i >= 0; i--) {

                            target.insertBefore(this[i], target.firstChild);

                        }

                    }

                    // 如果是节点伪数组, 直接遍历,将this每一项添加到target的每一项的最前面
                    for (let outerLen = this.length - 1, i = outerLen; i >= 0; i--) {

                        for (let j = 0, innerLen = target.length; j < innerLen; j++) {

                            let clone = this[i].cloneNode(true);

                            target[j].insertBefore(clone, target[j].firstChild);

                        }

                    }

                } catch (e) {

                    return jQuery(null);

                }

            }

            // target => jQuery对象
            // jQuery工厂将 此伪数组 重新转化为 jQuery对象

            return this;

        },

        append(content) {

            /*
                1. 字符串( html片段 )
                2. DOM
                3. jQuery对象
            **/
            try {

                if (!content) {

                    return jQuery(null);

                }


                // content => 字符串
                else if (jQuery.isString(content)) {

                    content = jQuery.trim(content);

                    // content => html片段
                    if (jQuery.isHtmlPart(content)) {

                        // 将content转化成jQuery实例对象
                        content = jQuery(content);

                        // 将content的每一项添加到this身上
                        for (let outerLen = this.length - 1, i = outerLen; i >= 0; i--) {

                            for (let j = 0, innerLen = content.length; j < innerLen; j++) {

                                let clone = content[j].cloneNode(true);

                                console.log(clone);

                            }

                        }

                    }

                    // content => 其他
                    // 遍历this,给this的每一项添加content
                    else {

                        for (let i = 0, len = this.length; i < len; i++) {

                            this[i].innerHTML += content;

                        }

                    }

                }

                // 如果是单个DOM
                else if (jQuery.isDom(content)) {

                    // 遍历this,将content 克隆 并添加到this的每一项身上
                    for (let i = 0, outerLen = this.length; i < outerLen; i++) {

                        let clone = content.cloneNode(true);

                        this[i].appendChild(clone);

                    }

                }

                // 如果如jQuery对象 或者 DOM数组
                else {

                    // 遍历this和content
                    for (let i = 0, outerLen = this.length; i < outerLen; i++) {

                        for (let j = 0, innerLen = content.length; j < innerLen; j++) {

                            let clone = content[j].cloneNode(true);

                            this[i].appendChild(clone);

                        }

                    }

                }

                return this;

            } catch (e) {

                return jQuery(null);

            }

        },

        prepend(content) {

            try {

                if (!content) {

                    return jQuery(null);

                }

                // content => 字符串
                else if (jQuery.isString(content)) {

                    content = jQuery.trim(content);

                    // 如果是 HTML片段
                    if (jQuery.isHtmlPart(content)) {

                        content = jQuery(content);

                        for (let i = 0, outerLen = this.length; i < outerLen; i++) {

                            for (let innerLen = content.length, j = innerLen - 1; j >= 0; j--) {

                                let clone = content[j].cloneNode(true);

                                this[i].insertBefore(clone, this[i].firstChild);

                            }

                        }

                    }

                    // content => 其他

                    // 定义临时的容器,存放当前字符串
                    let tempDiv = document.createElement('div');

                    tempDiv.innerHTML = content;

                    content = tempDiv.firstChild;

                    for (let i = 0, len = this.length; i < len; i++) {

                        content = content.cloneNode(true);

                        this[i].insertBefore(content, this[i].firstChild);

                    }

                }

                // content => 单个DOM对象
                else if (jQuery.isDom(content)) {

                    for (let i = 0, len = this.length; i < len; i++) {

                        let clone = content.cloneNode(true);

                        this[i].insertBefore(clone, this[i].firstChild);

                    }

                }

                // DOM数组, jQuery对象
                for (let i = 0, outerLen = this.length; i < outerLen; i++) {

                    for (let innerLen = content.length, j = innerLen - 1; j >= 0; j--) {

                        let clone = content[j].cloneNode(true);

                        this[i].insertBefore(clone, this[i].firstChild);

                    }

                }

                return this;

            } catch (e) {

                return jQuery(null);

            }

        },

        hasClass(text) {

            /*
                this中有至少一个具有此类名,return true
            **/

            text = jQuery.trim(text);

            if (!text) {

                return false;

            }

            // 遍历实例
            for (let i = 0, len = this.length; i < len; i++) {

                if (this[i].classList.contains(text)) {

                    return true;

                }

            }

            return false;

        },

        addClass(name) {

            if (!name) {

                return false;

            }

            name = jQuery.trim(name);

            for (let i = 0, len = this.length; i < len; i++) {

                this[i].classList.add(name);

            }

            return this;

        },

        removeClass(name) {

            if (!name) {

                return false;

            }

            name = jQuery.trim(name);

            for (let i = 0, len = this.length; i < len; i++) {

                this[i].classList.remove(name);

                // 如果此时的某一项的class为空,则删除此项的class属性
                if (Object.is(this[i].classList.value, '')) {

                    this[i].removeAttribute('class');

                }

            }

            return this;

        },

        toggleClass(name) {

            // 有则删, 无则加

            if (!name) {

                return false;

            }

            name = jQuery.trim(name);

            for (let i = 0, len = this.length; i < len; i++) {

                jQuery(this[i].outerHTML).hasClass(name) ? this[i].classList.remove(name) : this[i].classList.add(name);

            }

            return this;

        },

        attr(...rests) {

            /*
                object: 设置属性, string: 获取属性
                one param => {
                    1. Object(json)
                    2. 字符串
                        true => 遍历, 获取属性值
                        false => return undefined
                    3. 其他
                        return undefined
                }
                two param => {
                    1. both of them => string => 设置属性 => return this
                    2. 其他 => 
                }
            **/

            // one param
            if (Object.is(rests.length, 1)) {

                let obj = rests[0];

                // Object
                if (jQuery.isObject(obj)) {

                    for (let outerLen = this.length - 1, i = outerLen; i >= 0; i--) {

                        for (let k in obj) {

                            this[i].setAttribute(k, obj[k]);

                        }

                    }

                    return this;

                }

                // string 
                else if (jQuery.isString(obj)) {

                    // 保存每一个实例的对应属性
                    let attrMap = new Map();

                    for (let outerLen = this.length - 1, i = outerLen; i >= 0; i--) {

                        attrMap.set(this[i], this[i].getAttribute(obj));

                    }

                    return attrMap.entries();

                }

            }

            // two param
            else if (Object.is(rests.length, 2)) {

                const [pOne, pTwo] = [rests[0], rests[1]];

                if (jQuery.isString(pOne) && jQuery.isString(pTwo)) {

                    for (let len = this.length, i = len - 1; i >= 0; i--) {

                        this[i].setAttribute(pOne, pTwo);

                    }

                    return this;

                }

            }

        },

        prop(...args) {

            if (args.length === 1) {

                const param = args[0];

                if (jQuery.isString(param)) {

                    let valueMap = new Map();

                    for (let len = this.length, i = len - 1; i >= 0; i--) {

                        valueMap.set(this[i], this[i][param]);

                    }

                    return valueMap.entries();

                }

                else if (jQuery.isObject(param)) {

                    for (let outerLen = this.length, i = outerLen - 1; i >= 0; i--) {

                        for (let k in param) {

                            this[i][k] = param[k];

                        }

                    }

                    return this;

                }

            }

            else if (args.length === 2) {

                const [pOne, pTwo] = [args[0], args[1]];

                if (jQuery.isString(pOne) && jQuery.isString(pTwo)) {

                    for (let i = 0, len = this.length; i < len; i++) {

                        this[i][pOne] = pTwo;

                    }

                    return this;

                }

            }

        },

        val(...args) {

            /*
                1. no param => {
                    if (this.length) => 1
                    if ( this.length ) => > 1
                2. one param => {
                    2.1 => object
                    2.2 => string or number
                } 
                }
            **/

            if (Object.is(args.length, 0)) {

                if (this.length === 1) {

                    return this.get(0).value;

                } else if (this.length > 1) {

                    const valueMap = new Map();

                    for (let len = this.length, i = len - 1; i >= 0; i--) {

                        valueMap.set(this[i], this.get(i).value);

                    }

                    return valueMap.entries();

                }

            }

            else if (Object.is(args.length, 1)) {

                const param = args[0];

                if (jQuery.isString(param) || jQuery.isNumber(param)) {

                    for (let i = 0, len = this.length; i < len; i++) {

                        this.get(i).value = param;

                    }

                }

                return this;

            }

        },

        css(...args) {

            const valueMap = new Map();

            /*
                1. no param => {
                    1.1: (this-> 1)
                    1.2: (this-> >1)
                }
                2. one param => {
                    2.1: string
                        1.1.1: length -> 1
                        1.1.2: length -> >1 
                    2.2: {...}
                }
                3. two param => {
                    3.1: string
                }
            **/

            // no param
            if (Object.is(args.length, 0)) {

                if (Object.is(this.length, 1)) {

                    return this.get(0).style;

                }

                else if (this.length > 1) {

                    for (let i = 0, len = this.length; i < len; i++) {

                        valueMap.set(this[i], this[i].style);

                    }

                    return valueMap.entries();

                }

            }

            // one param
            else if (Object.is(args.length, 1)) {

                const param = args[0];

                if (jQuery.isString(param)) {

                    if (this.length === 1) {

                        try {

                            return window.getComputedStyle(this.get(0), null)[param];

                        } catch (e) {

                            throw 'Please enter the true attribute~~~';

                        }

                    }

                    else if (this.length > 1) {

                        for (let i = 0, len = this.length; i < len; i++) {

                            valueMap.set(this[i], window.getComputedStyle(this.get(i), null)[param]);

                        }

                        return valueMap.entries();

                    }

                }

                else if (jQuery.isObject(param)) {

                    for (let len = this.length, i = len - 1; i >= 0; i--) {

                        for (let k in param) {

                            this[i].style.cssText += `${k}:${param[k]};`;

                        }

                    }

                    return this;

                }

            }

            // two param
            else if (Object.is(args.length, 2)) {

                const [pOne, pTwo] = [args[0], args[1]];

                if (jQuery.isString(pOne) && jQuery.isString(pTwo)) {

                    for (let len = this.length, i = len - 1; i >= 0; i--) {

                        this[i].style[pOne] = pTwo;

                    }

                }

                return this;

            }

        },

        on(...args) {

            /*
                no param => return this
                one param => return this
                two param => { 
                    1. type {
                        1. 单个
                        2. 多个type
                    } + handler => 事件绑定
                    2. 其他 => return this
                }
                three param => {
                    type, target(委托), handler
                }
            **/

            // 检测是否单个事件
            const [regOneEvent] = [/^[a-z]+\s+[a-z]+$/];

            // no param || one param
            if (Object.is(args.length, 0) || Object.is(args.length, 1)) {

                return this;

            }

            // two param
            else if (Object.is(args.length, 2)) {

                const [type, handler] = [jQuery.trim(args[0]), args[1]];

                try {

                    if (jQuery.isString(type) && jQuery.isFunction(handler)) {

                        // 如果是多个事件
                        if (regOneEvent.test(type)) {

                            const saveEvent = type.split(' ');

                            for (let k of saveEvent) {

                                for (let i = 0, every; every = this[i++];) {

                                    jQuery.addEvent(k, every, handler);

                                }

                            }

                        }

                        // 如果是单个事件
                        for (let i = 0, every; every = this[i++];) {

                            jQuery.addEvent(type, every, handler);

                        }

                        return this;

                    }

                } catch (e) {

                    throw 'Please enter the true target !!!';

                }

            }

            // three param
            else if (Object.is(args.length, 3)) {

                try {

                    const [type, child, handler, selector] = [jQuery.trim(args[0]), jQuery.trim(args[1]), args[2], jQuery.isWhichSelector(jQuery.trim(args[1]))];

                    if (jQuery.isString(type) && jQuery.isString(child) && jQuery.isFunction(handler)) {

                        // 如果为 多个event
                        if (regOneEvent.test(type)) {

                            const saveEvent = type.split(' ');

                            // 如果selector 为 类数组
                            if (jQuery.isLikeArray(selector)) {

                                // 判断 selector[0]的父节点是不是 this[ 0 ]
                                const [parent, thisName] = [selector[0].parentNode.localName || selector[0].parentElement.localName, this.get(0).localName];

                                // true
                                if (Object.is(parent, thisName)) {

                                    // 事件委托
                                    for (let k of saveEvent) {

                                        for (let i = 0, every; every = this[i++];) {

                                            $.addEvent(k, every, function (e) {

                                                e = event || window.event;

                                                (Object.is(e.target.localName, selector[0].localName)) && (handler());

                                            });

                                        }

                                    }

                                }

                            }

                            // 如果selector 为单个DOM
                            else {

                                if (selector.parentElement.localName === this[0].localName) {

                                    for (let k of saveEvent) {

                                        for (let i = 0, every; every = this[i++];) {

                                            $.addEvent(k, every, function (e) {

                                                (e.target.localName === selector.localName) && (handler());

                                            });

                                        }

                                    }

                                }

                            }

                        }

                        // 如果为单个event
                        else {

                            // 如果selector 为 类数组
                            if (jQuery.isLikeArray(selector)) {

                                // 判断 selector[0]的父节点是不是 this[ 0 ]
                                const [parent, thisName] = [selector[0].parentNode.localName || selector[0].parentElement.localName, this.get(0).localName];

                                // true
                                if (Object.is(parent, thisName)) {

                                    // 事件委托
                                    for (let i = 0, every; every = this[i++];) {

                                        $.addEvent(type, every, function (e) {

                                            (Object.is(e.target.localName, selector[0].localName)) && (handler());

                                        });

                                    }

                                }

                            }

                            // 如果selector 为单个DOM
                            else {

                                if (selector.parentElement.localName === this[0].localName) {

                                    for (let i = 0, every; every = this[i++];) {

                                        $.addEvent(type, every, function (e) {

                                            (e.target.localName === selector.localName) && (handler());

                                        });

                                    }

                                }

                            }

                        }

                        return this;

                    }

                    return this;

                } catch (e) {

                    throw 'Please enter the true target ~~~';

                }

            }

        },

        off(...args) {

            /*
                no param || one param => return this;

                two param => {

                    type {
                        1. 单个event
                        2. 多个event
                    } + handler

                    return this;

                }

                >=three param => {

                    type {
                        1. 单个event
                        2. 多个event
                    } + target + handler

                }
            **/

            const [regOneEvent] = [/^[a-z]+\s+[a-z]+$/];

            // one param
            if (Object.is(args.length, 0) || Object.is(args.length, 1)) {

                return this;

            }

            // two param
            else if (Object.is(args.length, 2)) {

                const [type, handler] = [args[0], args[1]];

                // 如果参数符合要求
                if (jQuery.isString(type) && jQuery.isFunction(handler)) {

                    // 如果type为多个
                    if (regOneEvent.test(type)) {

                        const saveEvent = type.split(' ');

                        for (let i = 0, every; every = this[i++];) {

                            for (let k of saveEvent) {

                                $.removeEvent(k, every, handler);

                            }

                        }

                    }

                    // 如果type为一个
                    else {

                        for (let i = 0, every; every = this[i++];) {

                            $.removeEvent(type, every, handler);

                        }

                    }

                }

            }

            // three param
            /* else if (Object.is(args.length, 3)) {

                const [type, target, handler] = [args[0], args[1], args[2]];

                // 如果 参数符合条件
                if (jQuery.isString(type) && jQuery.isString(target) && jQuery.isFunction(handler)) {

                    const selector = jQuery.isWhichSelector(target);

                    // 如果selector[ 0 ]是 this[ 0 ]的子元素
                    const [selParNode] = [selector[0].parentNode.localName || selector[0].parentElement.localName];

                    if (selParNode === this[0].localName) {

                        // type为多个
                        if (regOneEvent.test(type)) {

                            const saveEvent = type.split(' ');

                            const save = [];

                            for (let i = 0, outer; outer = this[i++];) {

                                for (let k of saveEvent) {

                                    jQuery.removeEvent( k, outer, function (e){

                                        save.push( e );

                                    } );

                                }

                            }

                            return save;

                        }

                    }

                }

            } */

            return this;

        },

        find ( ele ){

            /*
                寻找指定父元素下面的 指定后代元素
            **/
            if ( !ele ){

                return jQuery( null );

            }

            // 如果是字符串
            else if ( jQuery.isString( ele ) ){

                let save = [];

                ele = jQuery.trim( ele ).toLowerCase();

                // 遍历this
                for ( let i = 0, every; every = this[ i++ ]; ){

                    save = save.concat( jQuery.walker( every, ele ) );

                }

                return jQuery( save );

            }

            return jQuery( null );

        },

        children( ...args ) {

            /*
                no param => 返回所有子代元素
                one param => 返回指定子代元素
            **/
            let save = [];

            // no param
            if ( Object.is( args.length, 0 ) ){

                for ( let i = 0, every; every = this[ i++ ]; ){

                    save = save.concat( ...every.children );

                }

                return jQuery( save );

            }

            // one param
            else if ( Object.is( args.length, 1 ) && jQuery.isString( args[ 0 ] ) ){

                const param = jQuery.trim( args[ 0 ] ).toLowerCase();

                for ( let i = 0, every; every = this[ i++ ]; ){

                    const child = every.children;

                    save = save.concat( ...child );

                }

                // 过滤掉子元素不是指定元素的
                save = save.filter( ( value, index ) => {

                    return Object.is( value.localName, param );

                } );

                return jQuery( save );

            }

            return this;

        },

        parent() {
            
            let save = [];

            for ( let i = 0, every; every = this[ i++ ]; ){

                save.push( every.parentElement || every.parentNode );
            }
            
            // save去重
            save = [ ...new Set( save ) ];

            return jQuery( save );

        },

        siblings( ...args ){

            /*
                no param => 返回this的所有兄弟节点,不包括自己
                one param => 返回指定兄弟节点,不包括自己
            **/
           
            // no param
            if ( Object.is( args.length, 0 ) ){

                const element = this.get( 0 );

                let child = [ ...element.parentElement.children || element.parentNode.childNodes ];

                child = child.filter( ( value, index ) => {

                    return !jQuery.isEqualNode( value, element );

                } );

                return jQuery( child );

            }

            // one param 
            else if ( Object.is( args.length, 1 ) ){

                let [ param, child ] = [ args[ 0 ], [ ...this.get( 0 ).parentElement.children ] ];

                if ( jQuery.isString( param ) ){

                    param = jQuery.trim( param ).toLowerCase();

                    child = child.filter( ( value, index ) => {

                        return Object.is( value.localName, param );

                    } );

                }

                return jQuery( child );

            }

        },

        prev (){

            /*
                前一个兄弟节点
            **/
            let saveNode = [];

            for ( let i = 0, every; every = this[ i++ ]; ){

                saveNode.push( every.previousElementSibling || every.previousSibling );

            }

            return jQuery( saveNode );

        },

        prevAll() {

            // 获取指定元素 之前的所有兄弟节点,不包括自己
            const element = this.get( 0 );

            let child = [ ...element.parentElement.children || element.parentNode.childNodes ];

            let index = child.indexOf( element );

            child = child.slice( 0, index );

            return jQuery( child );

        },

        next( ele ) {

            // 返回下一个兄弟节点
            let saveNode = [];

            for ( let i = 0, every; every = this[ i++ ]; ){

                ( ( every.nextElementSibling || every.nextSbiling ) !== null ) && ( saveNode.push( every.nextElementSibling || every.nextSibling ) );

            }

            return jQuery( saveNode );

        },

        nextAll( ele ) {
            
            // 获取指定元素之后的所有节点
            const element = this.get( 0 );

            let child = [ ...element.parentElement.children || element.parentNode.chlidNodes ];

            let index = child.indexOf( element );

            child = child.splice( index + 1 );

            return jQuery( child );

        },

    });

    // jQuery真正的构造函数
    var init = jQuery.fn.init = function (selector) {

        // 如果传入空的参数
        if (!selector) {

            this.length = 0;

            return this;

        }

        // 如果传入DOM对象
        else if (jQuery.isDom(selector)) {

            // 临时数组保存 该DOM对象
            const temp = Array.of(selector);

            return jQuery(temp);

        }

        // 如果传入字符串
        else if (typeof selector === "string") {

            selector = jQuery.trim(selector);

            // 如果是HTML片段
            if (jQuery._isHtmlPart(selector)) {

                // 创建一个临时的容器
                var tempDiv = document.createElement("div");

                tempDiv.innerHTML = selector;

                var child = tempDiv.children;

                [].push.apply(this, child);

                return this;

            }

            // 如果是选择器
            else {

                try {

                    const result = jQuery.isWhichSelector(selector);

                    // 返回新实例对象
                    [].push.apply(this, result);

                    return this;

                } catch (e) {

                    // 返回空实例
                    this.length = 0;

                    return this;
                }

            }

        }

        // // 如果传入函数
        else if (jQuery.isFunction(selector)) {

            jQuery.ready(selector);

        }

        // 如果传入数组或伪数组( 自定义对象 )
        else if (jQuery.isArray(selector) || jQuery.isLikeArray(selector)) {

            // 先排除window
            if (!jQuery.isWindow(selector)) {

                // 将数组或伪数组的每一项分别添加到实例的每一项上
                // IE8 不兼容apply方法,传入自定义参数对象
                // 将此对象转化为数组,再进行传参

                [].push.apply(this, [].slice.call(selector, [0], [selector.length]));

                return this;

            }

            // 其他情况,直接返回空实例,添加length属性,设置其值为0
            else {

                this[0] = selector;

                this.length = 1;

                return this;

            }

        }



    }

    // 插件机制
    init.prototype = jQuery.prototype;

    w.$ = w.jQuery = jQuery;

})(window);