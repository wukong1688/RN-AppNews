import React, {Component} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View,} from 'react-native';

import styles from "../../style/ImageStyle";

import constant from "../common/Constant";
import icon_right from '../res/icon_right.png';
import ic_menu_star from '../res/ic_menu_star.png';

class Image extends Component {

    render() {
        return (
            <View style={styles.container}>

                <ScrollView>
                    <TouchableOpacity activeOpacity={0.8} style={styles.rowArea} onPress={() => {
                        this.props.navigation.navigate('DiscoverFriendZone', {title: constant.stringFriend})
                    }}>
                        <Image source={ic_menu_star} style={styles.leftIcon}/>
                        <Text style={styles.title}>朋友圈</Text>
                        <Image source={icon_right} style={styles.rightIcon}/>
                    </TouchableOpacity>

                </ScrollView>
            </View>
        );
    }
}


module.exports = Image;