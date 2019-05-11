/**
 * 网络请求工具类
 * @flow
 * url:请求地址
 * successCallback:成功回调
 * failCallback:失败回调
 */

let HttpUtil = {

    /**
     * Get請求，沒有參數傳null
     */
    fetchGet: (url, params, successCallback, failCallback) => {

         // 1.拼接參數
        url += "?key=0b931a6f4b5ccc3f8d870839d07ae7b2";

        if (params) {
            var paramsBody = Object.keys(params)
                .reduce((a, k) => {
                    a.push(k + "=" + encodeURIComponent(params[k]));
                    return a;
                }, [])
                .join('&');
            url += "&" + paramsBody;
        }
        console.info(url);
        fetch(url)
            .then((response) => response.json())
            .then((responseObj) => {successCallback(responseObj)})
            .catch((error) => failCallback(error));
    },

    /**
     * POST請求
     */
    fetchPost: (url, params, successCallback, failCallback) => {

        // 1.拼接參數
        var paramsBody = Object.keys(params)
            .reduce((a, k) => {
                a.push(k + "=" + encodeURIComponent(obj[k]));
                return a;
            }, [])
            .join('&');
        // 2.發送請求
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },

            body: paramsBody + "&key=0b931a6f4b5ccc3f8d870839d07ae7b2"

        })
            .then((response) => response.json())
            .then((responseObj) => successCallback(responseObj))
            .catch((error) => failCallback(error));
    }
}

export default HttpUtil; 
