import React, {Component} from 'react';
import {TextInput, View} from 'react-native';

import Toast from 'react-native-root-toast';

import ScreenUtil from '../../util/ScreenUtil';
import RnButton from '../../common/RnButton';

const screenWidth = ScreenUtil.screenWidth();

/**
 * 登录
 */
export default class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.textStyle}
                    placeholder={'请输入用户名'}
                    onChangeText={(text) => this.setState({username: text})}
                    padding={0}
                    clearButtonMode={'while-editing'}
                    autoFocus={true}
                    value={this.state.text}
                />
                <TextInput
                    secureTextEntry={true}
                    style={styles.textStyle}
                    placeholder={'请输入密码'}
                    onChangeText={(text) => this.setState({password: text})}
                    padding={0}
                    clearButtonMode={'while-editing'}
                    value={this.state.text}
                />
                <RnButton name={"登录"} onPress={() => {
                    this.send()
                }}/>
            </View>
        );
    }

    send() {
        if (this.isNull(this.state.username)) {
            Toast.show('请输入用户名')
        } else if (this.isNull(this.state.password)) {
            Toast.show('请输入密码')
        } else {

        }
    }

    isNull(str) {
        if (str === "") return true;
        let r = "^[ ]+$";
        let re = new RegExp(r);
        return re.test(str);
    }

}


const styles = {
    container: {
        flex: 1,
    },
    textStyle: {
        marginTop: 20,
        marginStart: 20,
        marginEnd: 20,
        height: 40,
        width: screenWidth - 40,
        borderBottomWidth: 1,
    },
    btnStyle: {
        height: 40,
        margin: 20,
        flex: 1
    },
    loginButton: {
        alignSelf: 'center',
        width: screenWidth - 40,
        height: 40,
        marginTop: 12,
    }
};

module.exports = LoginPage;