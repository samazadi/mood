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
  FlatList,
} from 'react-native'

export default class Mood extends React.Component {
  constructor(props) {
    super(props)
    this.currentUserId = firebase.auth().currentUser.uid
    this.friendsRef = firebase.database().ref('users/' + this.currentUserId + '/friends')
    this.state = {
      friendKeyData: []
    }
  }

  componentDidMount = () => {
    //this.getUserData()

    // const friendsRef = firebase.database().ref('users/' + currentUserId + '/friends')
    // const friendArray = []
    // friendsRef.on('child_added', (snapshot) => {
    //   firebase.database().ref('users/' + snapshot.key).on('value', (child) => {
    //     friendArray.push({
    //       username: child.val().username,
    //       mood: child.val().mood
    //     })
    //     console.log(friendArray)
    //   })
    // })

    this.getFriends(this.friendsRef)

  }

  getFriends = (friendsRef) => { 
    friendsRef.on('value', (snapshot) => {

      var friendKeyData = []
      snapshot.forEach((child) => {
        friendKeyData.push({
          key: child.key
        })
      })

      this.setState({
        friendKeyData: friendKeyData
      })

    })
  }

  componentDidUpdate = () => {
    const friendKeys = this.state.friendKeyData

    // const filteredFriendsArray = friendKeys.filter((user) => {
    //   user.key !== 
    // })

    console.log(friendKeys)

    friendDetails = []
    friendKeys.forEach((child) => {
      firebase.database().ref('users/' + child.key).on('value', (snapshot) => {
        friendDetails.push({
          username: snapshot.val().username,
          mood: snapshot.val().mood,
          profilePic: snapshot.val().profilePic,
          key: snapshot.key
        })
        console.log('1: ' + friendDetails)
      })
      console.log('2: ' + friendDetails)
    })
    console.log('3: ' + friendDetails)
  }

  // componentDidUpdate = () => {
  //   console.log(this.state.friendData)
  // }

  // getUserData = async () => {
  //   console.log('i started')
  //   const userDataResult = await this.fetchUserData()
  //   console.log('userdata result: ' + userDataResult)
  // }

  // fetchUserData = () => {
  //   console.log('now i started')
  //   const friendsRef = firebase.database().ref('users/' + currentUserId + '/friends')
  //   friendsRef.on('child_added', (snapshot) => {
  //     firebase.database().ref('users/' + snapshot.key).on('value', (child) => {
  //       console.log('child val here: ' + child.val())
  //       this.setState({
  //         friendData: child.val()
  //       })
  //       console.log(this.state.friendData)
  //     })
  //   })
  //   console.log('im about to leave')
  // }

  renderItem = ({item}) => (
    <TouchableHighlight
      underlayColor='#f8f8f8' 
      key={item.key}
      onPress={() => {
        console.log('hit')
      }}>
      <View style={{flexDirection:'row', padding:15}} >
        <Image 
          source={{uri: item.profilePic}}
          style={styles.profilePic}
        />
        <View style={{justifyContent:'center', marginLeft:15}}>
          <Text style={styles.listText}>{item.username}</Text>
          <Text>{item.mood}</Text>
        </View>
      </View>
    </TouchableHighlight>
  )

  keyExtractor = (item, index) => item.id

  render = () => {
    return(
      <FlatList
        data={this.state.friendData}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        key={this.props.item}
      />
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
  },
})
