import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styles from '../../style/DetailStyle';


/**
 * 通用视频
 */
class VideoCommon extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>VideoCommon</Text>

            </View>
        );
    }
}

module.exports = VideoCommon;
