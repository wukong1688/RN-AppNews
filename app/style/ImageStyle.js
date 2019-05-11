/**
 * 图片主页样式
 */
import {StyleSheet} from 'react-native';

//屏幕信息
var dimensions = require('Dimensions');
//获取屏幕的宽度和高度
var {width, height} = dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: -4,
    },
    lineStyle: {
        height: 1,
        backgroundColor: '#FF0000',
    },
    textStyle: {
        flex: 1,
        fontSize: 16,
        marginTop: 20,
        textAlign: 'center',
    },
    text: {
        marginTop: 20
    },
    subTitle: {
        marginTop: 10,
        color: '#666666',
        fontSize: 12,
        flex: 1
    },
    imgStyle: {
        width: width * 0.3,
        height: 80
    }
});

module.exports = styles;