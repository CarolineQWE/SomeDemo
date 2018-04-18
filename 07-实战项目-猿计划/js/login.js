/* $.ajax( {
    type: 'post',
    url: 'http://yjhapi.agxx.club/iweb/login/check',
    data: {
        mobile: 13011072992,
        pwd: 123456
    },
    success ( info ){
        console.log( info );
        console.log( info.data.token );
    },
    error ( err ){
        console.log( err );
    },
} ); */

// 获取对应元素
const   tip = $.getEle('#tip'),
        phoneInp = $.getEle('#phone'),
        phoneBox = $.getEle('.phonebox')[0],
        pwdInp = $.getEle('#userpwd');
        pwdBox = $.getEle('.pwdbox')[0];
        btn = $.getEle('#submitbtn');
        form = $.getEle('.form-one')[0];
        inputBox = $.getEle('.inpbox');

// ------------ SAME -------------
// 提示框隐藏
const tipHide = function (){
    setTimeout( function (){
        $.css( tip, {'background-color': 'rgba(0, 0, 0, 0)', 'transform': 'translateY(-20px)'} );
    }, 1000 );
};

// 提示框出现
const tipShow = function (){
    $.css( tip, {'background-color': 'rgba(94, 213, 209, 1)', 'transform': 'translateY(5px)'} );
};

// box-shadow 出现
const shadowShow = function ( ele ){
    $.css( ele, {'box-shadow': '0 0 1px 2px rgb(46,104,170)'} );
};

// box-shadow 隐藏
const shadowHide = function ( ele ){
    $.css( ele, {'box-shadow': 'none'} );
};
// ----------------------------------

// 先判断有没有本地缓存
if ( localStorage.getItem( 'userPhone' ) && localStorage.getItem( 'userPwd' ) ){
    phoneInp.value = localStorage.getItem( 'userPhone' );
    pwdInp.value = localStorage.getItem( 'userPwd' );
    // 设置输入框父盒子的样式
    $.css( phoneInp, {'background-color': '#fee388'} );
    $.css( pwdInp, {'background-color': '#fee388'} );

}else {
    $.text( tip, '欢迎回来,请登录~' );
    tipShow();
    tipHide();
    phoneInp.focus();
    shadowShow( phoneBox );
}

// 获取焦点, 改变输入框样式
$.addEvent( phoneInp, 'focus', function (){
    this.select();
    shadowShow( phoneBox );
} );

$.addEvent( pwdInp, 'focus', function (){
    this.select();
    shadowShow( pwdBox );
} );

// 失去焦点, 逻辑判断, 改变输入框样式
$.addEvent( phoneInp, 'blur', function (){
    shadowHide( phoneBox );
    if ( strategies.isEmpty(this.value) ){
        $.text( tip, '手机号不能为空!' );
        tipShow();
        tipHide();
    }else if ( !strategies.isPhone( this.value ) ){
        $.text( tip, '手机号格式不正确!' );
        tipShow();
        tipHide();
    }
} );

$.addEvent( pwdInp, 'blur', function (){
    shadowHide( pwdBox );
    if ( strategies.isEmpty( this.value ) ){
        $.text( tip, '密码不能为空!' );
        tipShow();
        tipHide();
    }else if ( !strategies.isPwd( this.value ) ){
        $.text( tip, '密码格式不正确!' );
        tipShow();
        tipHide();
    }
} );

const submit = function (){
    setTimeout( () => {
        form.submit();
    }, 1000 );
};

// 点击登录按钮, 统一验证, 发送ajax
$.addEvent( btn, 'click', function (){
    $.ajax( {
        type: 'post',
        url: 'http://yjhapi.agxx.club/iweb/login/check',
        data: {
            mobile: 13011072992,
            pwd: 123456
        },
        success ( value ){
            const data = value['data'];
            if ( Object.is( phoneInp.value, data['mobile'] ) &&
            Object.is( pwdInp.value, '123456') ){
                $.text( tip, '已通过,正在跳转...' );
                tipShow();
                submit();
            }else {
                // 用户名或者密码错误
                $.text( tip, '手机号或密码错误!' );
                tipShow();
                tipHide();
            }
        },
    } );
} );