
import cookie from 'js-cookie'

//set in cookie
export const setCookie = (key, value) =>{
    if(window !== 'undefined'){
        cookie.set(key,value,{
            expires: 30
        })
    }
}



//reomve from cookie
export const removeCookie = (key) =>{
    if(window !== 'undefined'){
        cookie.remove(key,{
            expires: 30
        })
    }
}


// get from cookie such as stored token
//will be useful when we need to make a request to server with token
export const getCookie = (key) =>{
    if(window !== 'undefined'){
        return cookie.get(key)
    }
}



//set in localstorage
export const setLocalStorage = (key, value) =>{
    if(window !== 'undefined'){
        localStorage.setItem(key, JSON.stringify(value))
    }
}

//remove from localstorage
export const removeLocalStorage = (key) =>{
    if(window !== 'undefined'){
        localStorage.removeItem(key)
    }
}


//authenticate user by passing data to cookie and localstorage during signin
export const authenticate = (response, next)=>{
    // console.log('auth and response', response)
    const token = response.data.token
    // console.log(token,'token@@@@@@@@@@@@@@@@@@@')
    setCookie('token', response.data.token)
    setLocalStorage('user', response.data.user)
    next();
}


//access user info from locastorge
export const isAuth = () =>{
    if(window !== 'undefined'){
        const cookieChecked = getCookie('token')
        if(cookieChecked){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'))
            }else{
                return false;
            }
        }
    }
};


export const signout = () =>{
    removeCookie('token')
    removeLocalStorage('user')
    removeLocalStorage('bag')
    // next();
    
}