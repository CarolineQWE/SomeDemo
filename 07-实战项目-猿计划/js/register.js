// background-color: rgba(29,176,184,0);
// 获取元素
const tip = $.getEle('#tip'),
      form = $.getEle('#form-one'),
      phoneInp = $.getEle('#userphone'),
      nameInp = $.getEle('#username'),
      pwdInp = $.getEle('#userpwd'),
      confirmInp = $.getEle('#confirmpwd'),
      codeInp = $.getEle('#generalcode'),
      getCode = $.getEle('#phonecode'),
      submitBtn = $.getEle('#submitbtn');
      sameFocus = $.getEle('.samefocus');

// 提示框显示
const showTip = function (){
        $.css( tip, {'transform': 'translateY(-5px)','background-color': 'rgba(29,176,184,1)'} );
};

// 提示框隐藏
const hideTip = function (){
        setTimeout( () => {
             $.css( tip, {'transform':'translateY(-30px)', 'background-color':'rgba(255,255,255,0)'} ); 
        }, 1000 );
};

// 页面加载完成,第一个输入框获取焦点
phoneInp.focus();
$.text( tip, '欢迎来到猿计划,请注册~~~' );
showTip();
hideTip();

// 输入框获得焦点
for ( let i = 0, every; every = sameFocus[ i++ ]; ){
        $.addEvent( every, 'focus', function (){
                this.select();
        } );
}

// 输入框失去焦点判断
const sameBlur = function ( ele=null, type='', emptyText='', elseText='' ){
        $.addEvent( ele, 'blur', function (){
                if ( strategies.isEmpty( this.value ) ){
                      $.text( tip, emptyText );
                      showTip();
                      hideTip();  
                }else if ( !strategies[ type ]( this.value ) ){
                        $.text( tip, elseText );
                        showTip();
                        hideTip();
                }
        } );
};

// 验证手机框
sameBlur( phoneInp, 'isPhone', '手机号不能为空!', '手机号格式不正确!' );

// 验证昵称框
sameBlur( nameInp, 'isName', '用户名不能为空!', '用户名不符合规则' );

// 验证密码框
sameBlur( pwdInp, 'isPwd', '密码不能为空!', '密码不合法!' );

// 验证确认密码
$.addEvent( confirmInp, 'blur', function (){
        if ( strategies.isEmpty( this.value ) ){
                $.text( tip, '密码不能为空!' );
                showTip();
                hideTip();
        }else if ( this.value !== pwdInp.value ){
                $.text( tip, '两次密码不一致!' );
                showTip();
                hideTip();
        }

} );

// 获取验证码  
$.addEvent( getCode, 'click', function (){
        
} );

// 表单延时提交
const submit = function (){
        setTimeout( () => {
                form.submit();
        }, 1000 );
};

// 点击提交按钮,统一验证
$.addEvent( submitBtn, 'click', function (){
        $.ajax( {
                type: 'POST',
                url: 'http://yjhapi.agxx.club/iweb/regist/index',
                data: {
                        mobile: 13011072992,
                        pwd: 123456,
                        sms_code: 123456
                },
                success ( value ){
                        // 统一验证, 接口不完善, 此部分逻辑不完整
                        if ( Object.is( phoneInp.value, '13011072992' ) ){
                                // 存入缓存
                                localStorage.setItem( 'userPhone',phoneInp.value );
                                localStorage.setItem( 'userPwd', pwdInp.value );
                                $.text( tip, '注册成功,正在跳转...' );
                                showTip();
                                hideTip();
                                submit();
                        }else if ( !strategies.isEmpty( phoneInp.value ) && !Object.is( phoneInp.value, '13011072992' ) ){
                                $.text( tip, '手机号已被注册!' );
                                showTip();
                                hideTip();
                        }
                },
                error ( msg ){
                        console.log( msg );
                },
        } );
} );