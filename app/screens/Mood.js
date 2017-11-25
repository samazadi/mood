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

import { SearchBar } from 'react-native-elements'

export default class Mood extends React.Component {
  constructor(props) {
    super(props)
    this.currentUserId = firebase.auth().currentUser.uid
    this.friendsRef = firebase.database().ref('users/' + this.currentUserId + '/friends')
    this.state = {
      friendData: []
    }
  }

  componentDidMount = () => {
    this.getFriends(this.friendsRef)
  }

  getFriends = (friendsRef) => { 
    friendsRef.on('value', (snapshot) => {

      const friendData = []
      snapshot.forEach((child) => {
        friendData.push({
          username: child.val().username,
          mood: child.val().mood,
          profilePic: child.val().profilePic,
          key: child.key
        })
      })

      this.setState({
        friendData: friendData
      })

    })
  }

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

  renderSeparator = () => {
    return (
      <View 
        style={{
          height: 1,
          //width: '100%',
          backgroundColor: '#CED0CE',
          //marginLeft: '14%'
        }}
      />
    )
  }

  renderHeader = () => {
    return <SearchBar placeholder='Type here...' lightTheme round />
  }

  render = () => {
    return(
      <FlatList
        data={this.state.friendData}
        renderItem={this.renderItem}
        keyExtractor={item => item.key}
        ListHeaderComponent={this.renderHeader}
        ItemSeparatorComponent={this.renderSeparator}
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
