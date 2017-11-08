import React from 'react'
import firebase from 'firebase'
import Modal from 'react-native-modal'
import AddFriendButton from './AddFriendButton'

import { 
  StyleSheet, 
  Text, 
  View,
  TouchableHighlight,
  ListView,
  Image,
  Button,
} from 'react-native'

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      userData: {},
      //friendRequestPending: false,
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  componentWillReceiveProps = (nextProps) => {
    this.searchUsernames(nextProps.searchInput)
  }

  getMatchingUsers = (searchQuery) => {
    const usersRef = firebase.database().ref('users')
    return usersRef.orderByChild('username').equalTo(searchQuery).once('value')
  }

  searchUsernames = async (searchQuery) => {
    const searchResultsArray = []
    const matchingUserNames = await this.getMatchingUsers(searchQuery)
    matchingUserNames.forEach((snapshot) => {
      searchResultsArray.push({
        username: snapshot.val().username,
        profilePic: snapshot.val().profilePic,
        key: snapshot.key
      })
    })
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(searchResultsArray),
    })
  }

  renderRow = (rowData) => {
    return (
      <TouchableHighlight
        underlayColor='#f8f8f8' 
        onPress={() => {
          this.setState({userData: rowData})
          this.updateRequestPendingText(rowData)
        }}>
        <View style={{flexDirection:'row', padding:15}} >
          <Image 
            source={{uri: rowData.profilePic}}
            style={styles.profilePic}
          />
          <View style={{justifyContent:'center', marginLeft:15}}>
            <Text style={{fontSize:18}}>{rowData.username}</Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  onAddFriendPress = () => {
    this.setState({
      friendRequestPending: true,
    })
    const { key } = this.state.userData
    const currentUserId = firebase.auth().currentUser.uid 
    const requestsRoot = firebase.database().ref('users/' + key + '/requests/' + currentUserId)

    requestsRoot.once('value').then((snap) => {
      requestsRoot.set({
        requestPending: true,
      })
    })
  }

  updateRequestPendingText = (data) => {
    const key = data.key
    const currentUserId = firebase.auth().currentUser.uid 
    const requestsRoot = firebase.database().ref('users/' + key + '/requests/' + currentUserId)

    requestsRoot.once('value').then((snap) => {
      if(snap.exists()) {
        this.setState({
          friendRequestPending: true,
        })
      } else {
        this.setState({
          friendRequestPending: false,
        })
      }
    })
    this.setState({modalVisible: true,})
  }

  renderSeparator = (sectionID, rowID) => {
    return (
      <View key={rowID} style={{height:1, backgroundColor:'#ddd'}} />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            renderSeparator={this.renderSeparator}
            enableEmptySections
          />
        </View>
        <View style={styles.modalContainer}>
          <Modal 
            isVisible={this.state.modalVisible}
            onBackdropPress={() => this.setState({modalVisible:false})}
          >
            <View style={styles.modalContent}>
              <Image 
                source={{uri: this.state.userData.profilePic}}
                style={styles.modalProfilePic}
              />
              <Text style={styles.modalText}>{this.state.userData.username}</Text>
              <AddFriendButton 
                onPress={this.onAddFriendPress} 
                disabled={false} 
                friendRequestPending={this.state.friendRequestPending}
              />
            </View>
          </Modal>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profilePic: {
    height: 60,
    borderRadius: 30,
    width: 60
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  modalProfilePic: {
    height: 120,
    borderRadius: 60,
    width: 120,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 20,
  }
})

