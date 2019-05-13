import React from 'react';
import {Image} from 'react-native';
import {createAppContainer, createMaterialTopTabNavigator, createStackNavigator} from 'react-navigation';

//展示的页面
import News from './page/News/NewsPage';
import ArticlePage from './page/Article/ArticlePage';
import ArticleDetail from './page/Article/ArticleDetail';
import ImagePage from './page/Image/ImagePage';
import Mine from './page/Mine/Mine';
import MineSetting from './page/Mine/MineSetting';
import LoginPage from './page/Mine/LoginPage';
import AboutUs from './page/AboutUs';
import NewsDetail from './page/News/NewsDetail';
import ImageDetail from './page/Image/ImageDetail';

import styles from './style/AppStyle';

//Tab
const Tab = createMaterialTopTabNavigator({
    News: {
        screen: News,//当前选项卡加载的页面
        navigationOptions: {
            tabBarLabel: '新闻',
            tabBarIcon: ({tintColor, focused}) => (
                <Image
                    source={focused ? require('./res/main_tab_home_icon_pressed.png') : require('./res/main_tab_home_icon.png')}
                    style={[{height: 18, width: 18}]}
                />
            ),
        },
    },
    ArticlePage: {
        screen: ArticlePage,
        navigationOptions: {
            tabBarLabel: '资讯',
            tabBarIcon: ({tintColor, focused}) => (
                <Image
                    source={focused ? require('./res/main_tab_video_icon_pressed.png') : require('./res/main_tab_video_icon.png')}
                    style={[{height: 18, width: 18}]}
                />
            ),
        },
    },
    ImagePage: {
        screen: ImagePage,
        navigationOptions: {
            tabBarLabel: '图片',
            tabBarIcon: ({tintColor, focused}) => (
                <Image
                    source={focused ? require('./res/main_tab_image_icon_pressed.png') : require('./res/main_tab_image_icon.png')}
                    style={[{height: 18, width: 18}]}/>
            ),
        }
    },
    Mine: {
        screen: Mine,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor, focused}) => (
                <Image
                    source={focused ? require('./res/main_tab_user_icon_pressed.png') : require('./res/main_tab_user_icon.png')}
                    style={[{height: 18, width: 18}]}/>
            ),
        }
    },
}, {
    //initialRouteName: 'Mine',
    swipeEnabled: true, //是否可滑动切换
    animationEnabled: true,
    backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
    tabBarPosition: "bottom",
    tabBarOptions: {
        activeTintColor: '#45C018',
        inactiveTintColor: '#111111',
        showIcon: true, // 是否显示图标, 默认为false
        showLabel: true, // 是否显示label
        labelStyle: styles.labelStyle,//文字的样式
        iconStyle: styles.iconStyle,//图标的样式
        style: {
            backgroundColor: '#fff',
            borderTopWidth: 0.1,
            borderTopColor: 'grey',
            padding: 1,
        },
        indicatorStyle: {
            height: 0, // 不显示indicator
        },
    },

});

/*
 * 初始化StackNavigator
 */
const AppNavigator = createStackNavigator({
    Tab: {
        screen: Tab,
        navigationOptions: {
            header: () => null,
        }
    },
    MineSetting: {
        screen: MineSetting
    },
    AboutUs: {
        screen: AboutUs
    },
    NewsDetail: {
        screen: NewsDetail
    },
    ArticleDetail: {
        screen: ArticleDetail
    },
    ImageDetail: {
        screen: ImageDetail
    },
    LoginPage: {
        screen: LoginPage
    },
});

export default createAppContainer(AppNavigator);

