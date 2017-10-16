import React from 'react'
import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput, 
} from 'react-native';

export default class Mood extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>mood page here</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
