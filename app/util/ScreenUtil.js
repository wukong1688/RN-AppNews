/**
 * 屏幕工具
 */

//屏幕信息
var dimensions = require('Dimensions');

let ScreenUtil = {
    /**
     * 屏幕宽度
     * @returns {*}
     */
    screenWidth:() => {
        return dimensions.get('window').width;
    },

    /**
     * 屏幕高度
     * @returns {*}
     */
    screeHeight:() => {
        return dimensions.get('window').height;
    },
};

module.exports = ScreenUtil;