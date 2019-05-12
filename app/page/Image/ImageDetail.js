import React, {Component} from 'react';
import {StatusBar, View, Image} from 'react-native';

import constant from '../../common/Constant';
import ScreenUtil from '../../util/ScreenUtil';
import styles from '../../style/DetailStyle';

const screenWidth = ScreenUtil.screenWidth();

/**
 * 主页详情
 */
class ImageDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 400,
        }
    }

    componentWillMount(): void {
        Image.getSize(this.props.url, (width, height) => {
            this.setState({
                height: height / width * screenWidth,
            });
        })
    }

    static navigationOptions = ({navigation, screenProps}) => ({
        // url: navigation.state.params.url,
        headerTitle: navigation.state.params.title,
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
        let url = this.props.navigation.state.params.url;
        return (
            <View style={[styles.container,{'justifyContent': 'center'}]}>
                <StatusBar
                    backgroundColor={constant.primaryColor}
                    barStyle={'light-content'}/>
                <Image
                defaultSource={require('../../res/image_icon.png')}
                source={{uri: url}}
                resizeMethod="resize"
                style={{width: screenWidth, height: this.state.height}}
                />
            </View>
        );
    }
}

module.exports = ImageDetail;
