import React from 'react'
import firebase from 'firebase'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { 
  Text,
  View,
} from 'react-native'

export default class Mood extends React.Component {
  constructor(props) {
    super(props)
    this.currentUserId = firebase.auth().currentUser.uid
    this.requestsRef = firebase.database().ref('users/' + this.currentUserId + '/requests')
    this.state = {
      requestsPending: false,
    }
  }

  componentDidMount = () => {
    this.requestsRef.on('value', (snapshot) => {
      if (snapshot.val() != null) {
        this.setState({
          requestsPending: true,
        })
      } else {
        this.setState({
          requestsPending: false,
        })
      }
    })
  }

  renderIconOrNot = () => {
    if (this.state.requestsPending) {
      return (
        <MaterialCommunityIcons 
          name='alert-circle' 
          size={18} 
          color={'red'} 
          style={{bottom: -5, left: 10, position: 'absolute'}}
        />
      )
    } else {
      return (
        null
      )
    }
  }

  render = () => {
    return (
      <View>
        {this.renderIconOrNot()}
      </View>
    )
  }
}
