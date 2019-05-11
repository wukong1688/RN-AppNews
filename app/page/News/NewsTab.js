import React, {Component} from 'react';
import {FlatList, Image, RefreshControl, Text, TouchableOpacity, View} from 'react-native';
import Dimensions from 'Dimensions';

import styles from '../../style/NewsStyle';
import ArrUtil from '../../util/ArrUtil';

const baseUrl = 'https://raw.githubusercontent.com/wukong1688/RN-AppJoke/master/data/list_';

const screenWidth = Dimensions.get('window').width;

/**
 * 新闻主页
 */
class NewsTab extends Component {
    constructor(props) {
        super(props);
        //在这里定义json返回的key
        this.state = {
            //控制分类展示
            isShow: false,
            //分类
            newsType: 0,
            //下拉刷新
            refreshing: false,
            //data数据
            resultJson: null,
            error_code: '',
            reason: '',
            result: {
                data: ''
            },
        }
    }

    componentDidMount() {
        this.getRequest(baseUrl + '0.json'); //默认从0数据开始读
    }

    getRequest(url) {
        // alert(url);
        // console.log(url);
        const opts = {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:65.0) Gecko/20100101 Firefox/65.0',
                'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
                'Accept-Encoding': 'gzip, deflate',
                'Referer': 'www.baidu.com',
                'Connection': 'keep-alive',
                'Cache-Control': 'no-cache',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };

        fetch(url, opts)
            .then((res) => {
                this.setState({refreshing: false});
                return res.json();
            })
            .then((response) => {
                var error_code = response.error_code;
                if (error_code != 0) {
                    alert(response.reason);
                } else {
                    this.setState({
                        result: response.result,
                        data: ArrUtil.shuffle(response.result.data),
                    });
                }
            })
            .catch((error) => {
                alert(error);
                // console.error(error);
            })
            .done();
    }

    //下拉刷新
    _onRefresh(type) {
        type = type < 3 ? type : 1;
        this.setState({refreshing: true});
        this.getRequest(baseUrl + type + '.json');
    }

    //列表点击事件
    itemClick(item, index) {
        // alert('新闻标题：' + item.author_name + '\n时间：' + item.date + '\n' + item.url);
        this.props.navigation.navigate('NewsDetail', {
            title: item.title,
            url: item.url,
        })
    }

    //FlatList的key
    _keyExtractor = (item, index) => index.toString();

    //子item渲染
    _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={this.itemClick.bind(this, item, index)}>
                <View style={{backgroundColor: '#ffffff', padding: 10, flexDirection: 'row'}}>
                    <Image source={{uri: item.thumbnail_pic_s}} style={styles.imgStyle}/>
                    <View style={{flex: 1, flexDirection: 'column'}}>

                        <Text style={{
                            paddingRight: 10,
                            marginLeft: 10,
                            width: screenWidth * 0.65,
                            height: 80 * 0.7
                        }}>{item.title}</Text>

                        <View style={{flexDirection: 'row', paddingLeft: 10, paddingRight: 10}}>
                            <Text style={styles.subTitle}>{item.author_name}</Text>
                            <Text style={styles.subTitle}> {item.date}</Text>
                        </View>
                    </View>

                </View>

            </TouchableOpacity>
        )
    };

    //列表分割线
    _itemDivide = () => {
        return (
            <View style={{height: 10}}/>
        )
    };

    // _onLoadRefresh() {
    //     return <Text>数据加载中...</Text>;
    // }


    render() {

        return (

                <FlatList
                data={this.state.result.data}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                ItemSeparatorComponent={this._itemDivide}
                // onRefresh={this._onLoadRefresh}
                refreshControl={
                <RefreshControl
                refreshing={this.state.refreshing}
                // onRefresh={this._onRefresh.bind(this, this.state.newsType)}
                onRefresh={this._onRefresh.bind(this, 2)}
                />
                }
                />

        )

    }



}

module.exports = NewsTab;
