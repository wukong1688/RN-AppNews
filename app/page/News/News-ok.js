import React, {Component} from 'react';
import {Text, View} from 'react-native';

import styles from '../../style/NewsStyle';
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';

// const newsUrl = 'https://blog-static.cnblogs.com/files/wukong1688/list.js';
// const newsUrl = 'http://v.juhe.cn/toutiao/index?type=top&key=3dc86b09a2ee2477a5baa80ee70fcdf5';
// const newsUrl = 'https://facebook.github.io/react-native/movies.json';
const appKey = "055412fc5fee23e4";
const baseUrl = 'http://api.jisuapi.com/news/get?channel=';


const news = ['类型', '头条', '财经', '体育', '娱乐', '军事', '教育', '科技'];

/**
 * 新闻主页
 */
class News extends Component {
    constructor(props) {
        super(props);
        //在这里定义json返回的key
        this.state = {
            //控制分类展示
            isShow: false,
            //分类
            newsType: '头条',
            //下拉刷新
            refreshing: false,
            //data数据
            resultJson: null,
            error_code: '',
            reason: '',
            result: {
                data: ''
            }
        }
    }

    componentDidMount() {
        this.getRequest(baseUrl + '头条&start=0&num=10&appkey=' + appKey, this.state.newsType)
    }

    getRequest(url, type) {
        /*网络请求的配置*/
        // header.append('Authorization', appCode)
        const opts = {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:65.0) Gecko/20100101 Firefox/65.0',
                'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
                'Accept-Encoding': 'gzip, deflate',
                'Referer': 'v.juhe.cn',
                'Connection': 'keep-alive',
                'Cache-Control': 'no-cache',

                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };

        fetch(url, opts)
            .then((res) => (res.json()))
            .then((response) => {
                // var data = responseJson.result.data[0].title;
                var msg = response.msg;
                var status = response.status;
                if (status != 0) {
                    alert(response.msg);
                }else{
                    this.setState({
                        result: response.result,
                        data: response.result.data,
                    });
                    console.log(data);
                }
            })
            .catch((error) => {
                alert(error);
                console.error(error);
            })
            .done();

        //
        // fetch(url + '?type=' + type + '&key=3dc86b09a2ee2477a5baa80ee70fcdf5', opts)
        //     .then((response) => {
        //         this.setState({refreshing: false});
        //         console.log("aa" + response.json());
        //         return response.json()
        //     })
        //     .then((responseJson) => {
        //         // this.setState({
        //         //     resultJson: responseJson,
        //         //     error_code: responseJson.error_code,
        //         //     reason: responseJson.reason,
        //         //     result: responseJson.result,
        //         //     data: responseJson.result.data,
        //         //     // name:responseJson.result.data.name,
        //         //     // date:responseJson.result.data.date,
        //         //     // title:responseJson.result.data.title,
        //         //
        //         // })
        //         console.log("a:" + responseJson.error_code);
        //         console.log("b:" + responseJson.result);
        //         console.log("c:" + responseJson.results);
        //         alert(responseJson.error_code);
        //         // alert(this.state.reason);
        //     })
        //     .catch((error) => {
        //         alert(error)
        //     })
    }


    render() {
        return (
            <ScrollableTabView
                tabBarPosition='top' //位于屏幕的位置，top顶部  bottom底部  overlayTop顶部，悬浮在内容视图之上 overlayBottom底部，悬浮在内容视图之上
                // locked={false} //表示手指是否能拖动视图，默认为false（表示可以拖动）
                // scrollWithoutAnimation={true}   //视图切换是否有动画
                // style={styles.container}
                // renderTabBar={() => <ScrollableTabBar />} //DefaultTabBar：Tab会平分在水平方向的空间。ScrollableTabBar：Tab可以超过屏幕范围，滚动可以显示
                // onChangeTab={(obj) => {
                //     console.log('index:' + obj.i);
                // }}
                // tabBarUnderlineStyle={styles.lineStyle}
                // tabBarActiveTextColor='#FF0000'

                initialPage={0}
                renderTabBar={() => <ScrollableTabBar/>}
                tabBarUnderlineStyle={{}}
                // onChangeTab={(obj) => {
                //     this._onRefresh(news[obj.i])
                // }}
            >

                <Text style={styles.textStyle} tabLabel='头条'/>
                <Text style={styles.textStyle} tabLabel='财经'/>
                <Text style={styles.textStyle} tabLabel='娱乐'/>
                <Text style={styles.textStyle} tabLabel='军事'/>
                <Text style={styles.textStyle} tabLabel='教育'/>
                <Text style={styles.textStyle} tabLabel='科技'/>

            </ScrollableTabView>
        );
    }
}

module.exports = News;
