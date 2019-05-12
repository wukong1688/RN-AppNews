import React, {Component} from 'react';
import {FlatList, ActivityIndicator, Image, RefreshControl, Text, TouchableHighlight, View} from 'react-native';
import Dimensions from 'Dimensions';

import styles from '../../style/ImageStyle';
import ArrUtil from '../../util/ArrUtil';
import HttpRequest from '../../common/HttpRequest';

const baseUrl = 'https://raw.githubusercontent.com/wukong1688/RN-AppNews/master/apk/data/image_list_';

const screenWidth = Dimensions.get('window').width;

let pageNo = 0;//当前第几页
let totalPage = 2;//总的页数

/**
 * 新闻主页
 */
class ImagePage extends Component {
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
            data: {},

            //网络请求状态
            error: false,
            errorInfo: "",

            showFoot: 0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
        }
    }

    componentDidMount() {
        this.fetchData(baseUrl + '0.json', 0); //默认从0页数据开始读
    }

    fetchData(url, pageNo, type) {
        const opts = {
            method: 'GET',
            headers: HttpRequest.getHeaders(),
        };

        fetch(url, opts)
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                let foot = 0;
                if (pageNo >= totalPage) {
                    foot = 1;//listView底部显示没有更多数据了
                }

                if(type === 1){  //刷新,以前的数据全部清掉

                }else{  //加载，数据追加到后面

                }

                this.setState({
                    isFirstLoading: false, //首次加载完毕
                    isDownRefreshing: false,

                    isUpLoading: false,
                    showFoot: foot,

                    // result: response.result,
                    data: ArrUtil.shuffle(response.results),
                });
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
        this.props.navigation.navigate('ImageDetail', {
            title: item.desc,
            url: item.url,
        })
    }

    //FlatList的key
    _keyExtractor = (item, index) => index.toString();

    //子item渲染
    _renderItem = ({item, index}) => {
        let w = screenWidth * 0.5 - 7;
        let h = screenWidth * 0.65 - 7;
        let style = styles.itemPadding;

        return (

            <TouchableHighlight
                key={item._id}
                style={style}
                underlayColor={'rgba(255,255,255,0.5)'}
                onPress={this.itemClick.bind(this, item, index)}
            >
                <Image
                    defaultSource={require('../../res/image_icon.png')}
                    source={{uri: item.url}} style={{height: h, width: w}}
                    resizeMethod="resize"
                />
            </TouchableHighlight>

        )
    };

    //列表分割线
    _itemDivide = () => {
        return (
            <View style={{height: 1}}/>
        )
    };

    _renderFooter() {
        if (this.state.showFoot === 1) {
            return (
                <View style={{width: screenWidth, height: 30, alignItems: 'center', justifyContent: 'flex-start'}}>
                    <Text style={{color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5,}}>
                        没有更多数据了
                    </Text>
                </View>
            );
        } else if (this.state.showFoot === 2) {
            return (
                <View style={{width: screenWidth, height: 30, alignItems: 'center', justifyContent: 'flex-start'}}>
                    <ActivityIndicator/>
                    <Text>正在加载...</Text>
                </View>
            );
        } else if (this.state.showFoot === 0) {
            return (
                <View style={{width: screenWidth, height: 30, alignItems: 'center', justifyContent: 'flex-start'}}>
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
                data={this.state.data}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                ItemSeparatorComponent={this._itemDivide}

                // 方法1）
                // numColumns ={2} // 一行2个

                // 方法2）
                contentContainerStyle={styles.listViewStyle}

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

module.exports = ImagePage;
