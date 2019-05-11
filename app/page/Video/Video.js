import React from "react";
import {createMaterialTopTabNavigator} from "react-navigation";

import VideoCommon from "./VideoCommon";
import VideoSmall from "./VideoSmall";

import styles from "../../style/AppStyle";

export default createMaterialTopTabNavigator({
    VideoCommon: {
        screen: VideoCommon,//当前选项卡加载的页面
        navigationOptions: {
            tabBarLabel: '剪辑视频',
        },
    },
    VideoSmall: {
        screen: VideoSmall,
        navigationOptions: {
            tabBarLabel: '直播视频',
        },
    },
}, {
    swipeEnabled: true,
    lazy: true,
    animationEnabled: true,
    backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
    tabBarPosition: "top",
    tabBarOptions: {
        activeTintColor: '#45C018',
        inactiveTintColor: '#111111',
        showIcon: false, // 是否显示图标, 默认为false
        showLabel: true, // 是否显示label
        labelStyle: styles.secondLabelStyle,//文字的样式
        style: {
            backgroundColor: '#fff',
            borderTopWidth: 0.1,
            borderTopColor: 'grey',
        },
        indicatorStyle: {
            height: 1, // 不显示indicator
        },
        tabStyle: styles.tabStyle,
        scrollEnabled: false, //是否支持 选项卡滚动(如果很多Tab并且超过总长，就要设为true)
    },

});