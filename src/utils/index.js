const utils = {};


utils.cookieParser = val => {
        let temp = document.cookie.split('; ').find(row => row.startsWith(val+'='))
        if(temp){
            return temp.split('=')[1];
        }
        return false;
}

utils.canIsue = (obj, name) => {
    return obj[name];
} 

export { utils as utils };
