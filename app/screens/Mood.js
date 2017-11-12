import React from 'react'
import firebase from 'firebase'

import { 
  StyleSheet, 
  Text,
  View,
  ListView,
  Image
} from 'react-native'

export default class Mood extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }
  }

  componentDidMount = () => {
    
  }

  renderRow = (rowData) => {
    return (
      <TouchableHighlight
        underlayColor='#f8f8f8' 
      >
        <View style={{flexDirection:'row', padding:15}} >
          {/* <Image 
            source={{uri: rowData.profilePic}}
            style={styles.profilePic}
          /> */}
          <View style={{justifyContent:'center', marginLeft:15}}>
            <Text style={{fontSize:18}}>test</Text>
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
      <View style={styles.container}>
        <View>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            renderSeparator={this.renderSeparator}
            enableEmptySections
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
