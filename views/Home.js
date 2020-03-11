import React, {Component} from 'react'
import {StyleSheet, Text, View, ScrollView, AsyncStorage} from 'react-native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from '../helpers/ResponsiveHelper.js'
import Header from './components/Header.js'
import Content from './components/Content.js'

export default class Home extends Component {

    render() {
        return(
            <View style = {styles.container}>
                <Header/>
                <ScrollView>
                <Content/>
                <Content/>
                <Content/>
                <Content/>
                <Content/>
                <Content/>
                <Content/>
                <Content/>
                <Content/>
                <Content/>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headerContainer: {

    }
})