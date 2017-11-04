import React from 'react'
import firebase from 'firebase'

import { 
  StyleSheet, 
  Text, 
  View,
  TouchableHighlight,
  ListView,
  Image,
} from 'react-native'

export default class SearchResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  componentWillReceiveProps(nextProps) {
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
        onPress={() => console.log('hit')}>
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

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        enableEmptySections
      />
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
})

