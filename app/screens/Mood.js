import React from 'react'
import FriendListItem from '../components/FriendListItem'
import { 
  StyleSheet, 
  Text, 
  View,
  ListView, 
} from 'react-native';

export default class Mood extends React.Component {
  render() { 
    return (
      <View style={{flex:1}}>
        <FriendListItem/>
      </View>
    )
  }
}


