import React, {Component} from 'react';

import styles from '../../style/NewsStyle';
import NewsTab from './NewsTab';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';

/**
 * 新闻主页
 */
class News extends Component {

    render() {

        return (
            <ScrollableTabView
                tabBarPosition='top'
                initialPage={0} //默认为第一页
                locked={false} //表示手指是否能拖动视图，默认为false（表示可以拖动）。设为true的话，我们只能点击Tab来切换视图。
                renderTabBar={() => <ScrollableTabBar/>}
                tabBarBackgroundColor='#fff'
                tabBarActiveTextColor='#2c2c2c'
                tabBarInactiveTextColor='#666'
            >

                <NewsTab navigation={this.props.navigation} style={styles.textStyle} tabLabel='头条'/>
                <NewsTab navigation={this.props.navigation} style={styles.textStyle} tabLabel='大数据'/>
                <NewsTab navigation={this.props.navigation} style={styles.textStyle} tabLabel='科技'/>
                <NewsTab navigation={this.props.navigation} style={styles.textStyle} tabLabel='互联网'/>
                <NewsTab navigation={this.props.navigation} style={styles.textStyle} tabLabel='人工智能'/>

            </ScrollableTabView>
        )
    }

}

module.exports = News;
