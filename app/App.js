import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Route from './Route';

/**
 * 入口
 */
export default class app extends Component {
    componentDidMount() {
        this.timer = setTimeout(
            () => {
                SplashScreen.hide(); // 启动页隐藏
            },
            2500
        );
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (
            <Route/>
        );
    }
}
