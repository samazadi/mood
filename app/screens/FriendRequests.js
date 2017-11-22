import React from 'react'
import firebase from 'firebase'

import { 
  StyleSheet, 
  Text,
  View,
  ListView,
  Image,
  TouchableHighlight,
  ActivityIndicator,
  Button,
} from 'react-native'

export default class FriendRequests extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: {},
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      showSpinner: true,
      currentUserId: firebase.auth().currentUser.uid,
    }
  }

  componentDidMount = () => {
    const requestsRef = firebase.database().ref('users/' + this.state.currentUserId + '/requests')
    requestsRef.on('value', (snapshot) => {
      const friendRequestArray = []
      snapshot.forEach((child) => {
        friendRequestArray.push({
          username: child.val().requestFromUsername,
          profilePic: child.val().requestFromProfilePic,
          mood: child.val().requestFromMood,
          key: child.key
        })
      })
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(friendRequestArray),
        showSpinner: false,
      })
    })
  }

  deleteFriendRequest = (friendUid, currentUid, rowData) => {
    const requestsRef = firebase.database().ref('users/' + currentUid + '/requests/' + friendUid)
    requestsRef.remove()
  }

  confirmFriendReequest = (friendUid, currentUid, rowData) => {
    const currentFriendsRef = firebase.database().ref('users/' + currentUid + '/friends/' + friendUid)
    const otherUserFriendsRef = firebase.database().ref('users/' + friendUid + '/friends/' + currentUid)

    currentFriendsRef.set({
      username: rowData.username,
      profilePic: rowData.profilePic,
      mood: rowData.mood
    })

    firebase.database().ref('users/' + currentUid).once('value').then((snapshot) => { 
      otherUserFriendsRef.set({
        username: snapshot.val().username,
        profilePic: snapshot.val().profilePic,
        mood: snapshot.val().mood
      })
    })

    this.deleteFriendRequest(friendUid, currentUid)
    this.deleteFriendRequest(currentUid, friendUid)
  }

  renderRow = (rowData) => {

    return (
      <TouchableHighlight
        underlayColor='#f8f8f8' 
        onPress={() => {
          this.setState({userData: rowData})
        }}>
        <View style={{flexDirection:'row', padding:15}} >
          <Image 
            source={{uri: rowData.profilePic}}
            style={styles.profilePic}
          />
          <View style={{justifyContent:'center', marginLeft:15}}>
            <Text style={styles.listText} numberOfLines={1} ellipsizeMode={'tail'}>{rowData.username}</Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Button 
              title='Confirm'
              onPress={() => {
                this.confirmFriendReequest(rowData.key, this.state.currentUserId, rowData)
              }}
            />
          </View>
          <View style={{justifyContent: 'center'}}>
            <Button
              title='Delete'
              onPress={() => {
                this.deleteFriendRequest(rowData.key, this.state.currentUserId, rowData)
              }}
            />
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  renderSeparator = (sectionID, rowID) => {
    return (
      <View key={rowID} style={{height:1, backgroundColor:'#ddd'}} />
    )
  }

  renderListOrSpinner = () => {
    if (this.state.showSpinner) {
      return (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator animating={true} size='large' />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            renderSeparator={this.renderSeparator}
            removeClippedSubviews={false}
            enableEmptySections
          />
        </View>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderListOrSpinner()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spinnerContainer: {
    alignContent: 'center', 
    justifyContent: 'center', 
    flex: 1,
  },
  profilePic: {
    height: 60,
    borderRadius: 30,
    width: 60,
  },
  listText: {
    fontSize: 18,
    width: 120
  },
})
