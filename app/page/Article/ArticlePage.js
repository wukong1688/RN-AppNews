import React, {Component} from 'react';

import styles from '../../style/NewsStyle';
import ArticleTab from './ArticleTab';
import ScrollableTabView, {ScrollableTabBar} from 'react-native-scrollable-tab-view';

/**
 * 资讯主页
 */
class ArticlePage extends Component {

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

                <ArticleTab navigation={this.props.navigation} style={styles.textStyle} tabLabel='国内资讯'/>
                <ArticleTab navigation={this.props.navigation} style={styles.textStyle} tabLabel='国外资讯'/>

            </ScrollableTabView>
        )
    }

}

module.exports = ArticlePage;
