import React from 'react'
import { 
  StyleSheet, 
  Text, 
  View,
  ListView, 
} from 'react-native';

export default class FriendListItem extends React.Component {
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.state = {
      dataSource: ds.cloneWithRows([
        'item 1',
        'item 2',
        'item 3',
        'item 4'
      ])
    }
  }

  render() { 
    return (
      <ListView
        dataSource = { this.state.dataSource }
        renderRow = { (rowData) => 
          <Text>{ rowData }</Text>
        }
      />
    )
  }
}


