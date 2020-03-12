import React, {Component} from 'react'
import {StyleSheet, Text, View, FlatList} from 'react-native'
import Content from './Content.js'

export default class ContentList extends Component {
    render() {
        return(
            <FlatList
                    data = {this.props.data}
                    renderItem = {({item}) => (
                        <Content
                            filename = {item.videoTitle}
                            username = {item.username}
                            timeUploaded = {item.videoDate}
                            thumbnailSource = {item.videoScreenShotUrl}
                            onContentPress = {() => this.props.onContentPress(item)}
                        />
                    )}
                />
        )
    }
}