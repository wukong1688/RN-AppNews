import React, {Component} from 'react';
import {FlatList, ActivityIndicator, Image, RefreshControl, Text, TouchableOpacity, View} from 'react-native';
import Dimensions from 'Dimensions';

import styles from '../../style/NewsStyle';
import ArrUtil from '../../util/ArrUtil';
import HttpRequest from '../../common/HttpRequest';

const baseUrl = 'https://raw.githubusercontent.com/wukong1688/RN-AppJoke/master/data/list_';

const screenWidth = Dimensions.get('window').width;

let pageNo = 0;//当前第几页
let totalPage = 2;//总的页数

/**
 * 新闻主页
 */
class NewsTab extends Component {
    constructor(props) {
        super(props);
        //在这里定义json返回的key
        this.state = {
            isFirstLoading: true,//首次加载标记
            isDownRefreshing: false, //下拉刷新标记
            isUpLoading: true,  //上拉加载标记

            //data数据
            resultJson: null,
            error_code: '',
            reason: '',
            result: {
                data: ''
            },

            //网络请求状态
            error: false,
            errorInfo: "",

            showFoot: 0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
        }
    }

    componentDidMount() {
        this.fetchData(baseUrl + '0.json', 0); //默认从0页数据开始读
    }

    fetchData(url, pageNo) {
        const opts = {
            method: 'GET',
            headers: HttpRequest.getHeaders(),
        };

        fetch(url, opts)
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                var error_code = response.error_code;
                if (error_code != 0) {
                    alert(response.reason);
                } else {
                    let foot = 0;
                    if (pageNo >= totalPage) {
                        foot = 1;//listView底部显示没有更多数据了
                    }

                    this.setState({
                        isFirstLoading: false, //首次加载完毕
                        isDownRefreshing: false,

                        isUpLoading: false,
                        showFoot: foot,

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
        this.setState({
            showFoot: 0,
            isDownRefreshing: true
        });
        this.fetchData(baseUrl + type + '.json', type);
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

    _renderFooter() {
        if (this.state.showFoot === 1) {
            return (
                <View style={{height: 30, alignItems: 'center', justifyContent: 'flex-start'}}>
                    <Text style={{color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5,}}>
                        没有更多数据了
                    </Text>
                </View>
            );
        } else if (this.state.showFoot === 2) {
            return (
                <View style={{height: 30, alignItems: 'center', justifyContent: 'flex-start'}}>
                    <ActivityIndicator/>
                    <Text>正在加载...</Text>
                </View>
            );
        } else if (this.state.showFoot === 0) {
            return (
                <View style={{height: 30, alignItems: 'center', justifyContent: 'flex-start'}}>
                    <Text></Text>
                </View>
            );
        }
    }

    _onEndReached() {
        //如果是正在加载中或没有更多数据了，则返回
        if (this.state.showFoot != 0) {
            return;
        }

        //如果当前页大于或等于总页数，那就是到最后一页了，返回
        if ((pageNo != 1) && (pageNo >= totalPage)) {
            return;
        } else {
            pageNo++;
        }
        //底部显示正在加载更多数据
        this.setState({showFoot: 2});
        //获取数据
        this.fetchData(baseUrl + pageNo + '.json', pageNo);
    }


    render() {
        //第一次加载等待的view
        if (this.state.isFirstLoading && !this.state.error) {
            return HttpRequest.renderLoadingView();
        } else if (this.state.error) {
            //请求失败view
            return HttpRequest.renderErrorView(this.state.error);
        }
        //加载数据
        return this.renderData();
    }

    renderData() {
        return (

            <FlatList
                data={this.state.result.data}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                ItemSeparatorComponent={this._itemDivide}

                //下拉刷新
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isDownRefreshing}
                        onRefresh={this._onRefresh.bind(this, 1)}
                    />
                }

                //上拉加载
                ListFooterComponent={this._renderFooter.bind(this)}
                onEndReached={this._onEndReached.bind(this)}
                onEndReachedThreshold={1}
            />

        );
    }


}

module.exports = NewsTab;
