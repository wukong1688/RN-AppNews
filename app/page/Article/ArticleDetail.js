import React, {Component} from 'react';
import {StatusBar, View, Text} from 'react-native';
import HTMLView from 'react-native-htmlview';

import constant from '../../common/Constant';
import styles from '../../style/DetailStyle';


/**
 * 资讯详情
 */
class ArticleDetail extends Component {

    static navigationOptions = ({navigation, screenProps}) => ({
        url: navigation.state.params.url,
        headerTitle: '',
        gestureResponseDistance: {horizontal: 300},
        headerBackTitle: null,
        //导航栏的样式
        headerStyle: {backgroundColor: constant.primaryColor},
        //导航栏文字的样式
        headerTitleStyle: styles.headerTitleStyle,
        headerTintColor: 'white',
        //设置顶部导航栏右边的视图  和 解决当有返回箭头时，文字不居中
        headerRight: (<View/>),
    });

    render() {
        let title = this.props.navigation.state.params.title;
        let content = this.props.navigation.state.params.content;
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={constant.primaryColor}
                    barStyle={'light-content'}/>
                <Text style={styles.contentTitle}>{title}</Text>
                <HTMLView style={styles.contentHtml}
                    value={content}
                    onLinkPress={(url) => console.log('clicked link: ', url)}
                />
            </View>
        );
    }
}

module.exports = ArticleDetail;
