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
} from 'react-native'

export default class FriendRequests extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userData: {},
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      showSpinner: true,
    }
  }

  componentDidMount = () => {
    const currentUserId = firebase.auth().currentUser.uid
    const requestsRef = firebase.database().ref('users/' + currentUserId + '/requests')
    requestsRef.on('value', (snapshot) => {
      const friendRequestArray = []
      snapshot.forEach((child) => {
        friendRequestArray.push({
          username: child.val().requestFrom,
          profilePic: child.val().profilePic,
          key: child.key
        })
      })
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(friendRequestArray),
        showSpinner: false,
      })
    })   
  }

  renderRow = (rowData) => {
    return (
      <TouchableHighlight
        underlayColor='#f8f8f8' 
        onPress={() => {
          this.setState({userData: rowData})
          console.log('rowData is: ' + rowData)
          console.log('rowData.username is: ' + rowData.username)
          console.log('userData is: ' + this.state.userData)
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
    flex: 1
  },
})
