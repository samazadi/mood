import React from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput, 
} from 'react-native';

export default class Settings extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>settings page here</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
