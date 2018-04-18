/*
    Create By Yanggege
    工具类
**/
( ( w ) => {
    const Tools = {
        // 获取DOM
        getEle ( ele ){
            const [ regId, regClass, regTag ]
                = [ /^#.+$/, /^\..+$/, /^[a-z]{1,6}$/ ];
            ele = this.trim( ele ).toLowerCase();
            if ( regId.test( ele ) ){
                ele = ele.replace( /#/, '' );
                return document.getElementById( ele );
            }else if ( regClass.test( ele ) ){
                ele = ele.replace( /\./, '' );
                return document.getElementsByClassName( ele );
            }else if ( regTag.test( ele ) ){
                return document.getElementsByName( ele );
            }
        },
        // trim()
        trim ( str ){
            if ( !str ){
                return false;
            }
            return  str.trim ?
                    str.trim() :
                    str.replace( /(^\s)|(\s$)/, '' );
        },
        // addEvent
        addEvent ( target, type, handler ) {
            if ( window.addEventListener ){
                return target.addEventListener( type, handler );
            }else if ( window.attachEvent ){
                return target.attachEvent( `on${type}`, function (){
                    handler.call( this, window.event );
                } );
            }else {
                return target[`on${type}`] = handler;
            }
        },
        // ajax
        ajax ( option ){
            /*
                type: GET/POST
                url
                data
                success
                error
                complete
            **/
            const promise = new Promise( ( resolve, reject ) => {
                const xhr = new XMLHttpRequest();
                if ( option.type.toLowerCase() === 'get' ){
                    if ( option.data ){
                        option.url += '?';
                        for ( let k in option.data ){
                            option.url += `${k}=${option[data][k]}&`
                        }
                        option.url = option.url.replace( /&$/, '' );
                        xhr.open( 'GET', option.url );
                    }else {
                        xhr.open( 'GET', option.url );
                    }
                    
                }
                else if ( option.type.toLowerCase() === 'post' ){
                    xhr.open( 'POST', option.url );
                    xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
                }
                xhr.onreadystatechange = () => {
                    if ( xhr.readyState === 4 ){
                        if ( xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 ){
                            resolve( JSON.parse( this.trim( xhr.responseText ) ) );
                        }

                        reject( 'fail' );
                    }
                };
                if ( option.type.toLowerCase() === 'get' ){
                    xhr.send( null );
                }
                else if ( option.type.toLowerCase() === 'post' ){
                    if ( option.data ){
                        let str = '';
                        let data = option.data;
                        for ( let k in data ){
                            str += `${k}=${data[k]}&`;
                        }
                        str = str.replace( /&$/, '' );
                        xhr.send( str );
                    }
                    else {
                        xhr.send( null );
                    }
                }
            } );
            promise.then( ( data ) => {
                option.success && option.success( data );
            } ).catch( ( error ) => {
                option.error && option.error( error );
            } ).finally( () => {
                option.finally && option.finally();
            } );
        },
        // html
        html ( ele, value ){
            if ( !value ){
                return ele.innerHTML;
            }
            ele.innerHTML = value;
        },
        // text
        text ( ele, value ){
            if ( !value ){
                return ele.innerText;
            }
            ele.innerText = value;
        },
        // input --- val
        val ( ele, value ){
            if ( !value ){
                return ele.value;
            }
            ele.value = value;
        },
        css ( ele, value ){
            for ( let k in value ){
                ele.style.cssText += `${k}: ${value[k]};`;
            }
        },
        // isString
        isString ( ele ){
            return typeof ele === 'string';
        },
    };
    w.$ = Tools;
} )( window );