// 表单验证 ---- 公共类
(( w ) => {
    // 检验逻辑
    const strategies = {
        // 是否为空
        isEmpty ( value ){
            return Object.is( value, '' );
        },
        // 手机号
        isPhone ( value ){
            const reg = /(^1\d{10}$)|(^0\d{10})$/;
            return reg.test( value );
        },
        // 密码
        isPwd ( value ){
            const reg = /^\w{6,16}$/;
            return reg.test( value );
        },
        // 确认密码
        confirmPwd ( pwdValue, value ){
            return Object.is( pwdValue.value, value );
        },
        // 用户名
        isName ( value ){
            const reg = /^[\w\u4e00-\u9fa5+]{3,20}$/;
            return reg.test( value );
        },
    };
    w.strategies = strategies;
})(window);