import {ActivityIndicator, Text, View} from "react-native";
import styles from "../style/NewsStyle";
import React from "react";

/**
 * HTTP工具函数
 * @type {{}}
 */

let HttpRequest = {
    /**
     * 请求头信息
     * @returns {{"User-Agent": string, "Accept-Language": string, "Accept-Encoding": string, Referer: string, Connection: string, "Cache-Control": string, Accept: string, "Content-Type": string}}
     */
    getHeaders: () => {
        return {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:65.0) Gecko/20100101 Firefox/65.0',
            'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
            'Accept-Encoding': 'gzip, deflate',
            'Referer': 'www.baidu.com',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
    },


    /**
     * 加载等待页
     */
    renderLoadingView: () => {
        return (
            <View style={[styles.container, {flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}]}>
                <ActivityIndicator
                    animating={true}
                    color='blue'
                    size="small"
                />
            </View>
        );
    },


    /**
     * 加载失败view
     */
    renderErrorView: (error) => {
        return (
            <View style={[styles.container, {flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}]}>
                <Text>
                    加载失败
                </Text>
            </View>
        );
    },

};

module.exports = HttpRequest;