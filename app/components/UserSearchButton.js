import React from 'react'
import firebase from 'firebase'

import { 
  StyleSheet, 
  Text, 
  View,
  TouchableHighlight, 
} from 'react-native';

import { Ionicons } from '@expo/vector-icons'
import { EvilIcons } from '@expo/vector-icons'

export default class UserSearchButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        onPress={this.props.onPress}
        style={styles.userSearchButton}
        underlayColor='#eee'
        >
        <View style={{flex:1, flexDirection: 'row'}}>
          <Ionicons name='ios-search-outline' size={20} color='grey'/>
          <Text style={{marginLeft:10, marginRight:140, paddingTop: 2}}>Search by username</Text>
          <EvilIcons name='chevron-right' size={30} color='grey'/>
        </View>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  userSearchButton: {
    flex:1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#bbb',
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
    paddingTop: 6,
    paddingBottom: 5,
  }
})