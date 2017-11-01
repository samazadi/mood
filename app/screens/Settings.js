import React from 'react'
import firebase from 'firebase'
import UserSearchButton from '../components/UserSearchButton'

import { ImagePicker } from 'expo'

import { 
  StyleSheet, 
  Text, 
  View, 
  Image, 
  TextInput,
  TouchableHighlight, 
} from 'react-native'

export default class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      username: '',
      mood: '',
      email: '',
      profilePic: 'https://firebasestorage.googleapis.com/v0/b/mood-d5b8c.appspot.com/o/default_images%2Fplaceholder_user.png?alt=media&token=27c3d186-2104-4f82-b0c6-520f1d22f079',
      //password: '',
      //newPassword: '',
    }
  }

  componentDidMount() {
    //firebase.auth().signOut();
    const { username, mood, email, profilePic } = this.state

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const firebaseRef = firebase.database().ref('users/' + user.uid)
        
        firebaseRef.once('value')
          .then((snapshot) => {
            const snap = snapshot.val();
            this.setState({
              username: snap.username,
              mood: snap.mood,
              email: user.email,
              profilePic: snap.profilePic,
            })
          })
      }
    })
  }

  updateUser = (key, value) => {
    const user = firebase.auth().currentUser

    if (key === 'email') {
      user.updateEmail(value).then(() => {
        console.log('Email updated successfully')
      }).catch((error) => {
        console.log('Error while updating email: ' + error)
      })
    } else if (key === 'newPassword') {
      user.updatePassword(value).then(() => {
        console.log('Passowrd updated successfully')
      }).catch((error) => {
        console.log('Error while updating password')
      })
    } else if (key === 'password') {
      const credentials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        value
      )
      user.reauthenticateWithCredential(credentials).then(() => {
        console.log('Re-auth successful')
      }).catch((error) => {
        console.log('Error completing re-auth: ' + error)
      })
    } else {
      firebase.database().ref('users/' + user.uid)
        .update({[key]: value})
    }
  }

  onProfilePicPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4,3]
    })
    if (!result.cancelled) {
      this.setState({ profilePic: result.uri })

      const user = firebase.auth().currentUser
      const firebaseRef = firebase.database().ref('users/' + user.uid)
      firebaseRef.update({
        profilePic: result.uri,
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profilePicContainer}>
          <Image 
              style={styles.profilePic}
              source={{ uri: this.state.profilePic }}
              />  
          <Text 
            style={{marginTop: 10,}}
            onPress={this.onProfilePicPress}
            >Change Profile Photo</Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.formLabel}>Username</Text>
          <TextInput 
            style={styles.formInput}
            onChangeText={username => {
              this.setState({username})
              this.updateUser('username', username)
            }}
            value={this.state.username}
            placeholder={'Username'}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.formLabel}>Mood</Text>
          <TextInput 
            style={styles.formInput}
            onChangeText={mood => {
              this.setState({mood})
              this.updateUser('mood', mood)
            }}
            value={this.state.mood}
            placeholder={'Mood'}
          />
        </View>
        <Text style={styles.pageDivider}>Private Information</Text>
        <View style={styles.formContainer}>
          <Text style={styles.formLabel}>Current Password</Text>
          <TextInput 
            style={styles.formInput}
            onEndEditing={password => {
              //this.setState({password})
              this.updateUser('password', password.nativeEvent.text)
            }}
            //value={this.state.password}
            placeholder={'Current password'}
            autoCorrect={false}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.formLabel}>New Password</Text>
          <TextInput 
            style={styles.formInput}
            onEndEditing={newPassword => {
              //this.setState({newPassword})
              this.updateUser('newPassword', newPassword.nativeEvent.text)
            }}
            //value={this.state.newPassword}
            placeholder={'New password'}
            autoCorrect={false}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.formLabel}>Email</Text>
          <TextInput 
            style={styles.formInput}
            onChangeText={email => {
              this.setState({email})
            }}
            onEndEditing={email => {
              this.updateUser('email', email.nativeEvent.text)
            }}
            value={this.state.email}
            placeholder={'Email'}
            autoCorrect={false}
          />
        </View>
        <Text style={styles.pageDivider}>Add Friends</Text>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <UserSearchButton onPress={() => this.props.navigation.navigate('Search')} />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flexDirection: 'row',
    padding: 15,
  },
  formInput: {
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    width: 240,
  },
  formLabel: {
    width: 85,
  },
  profilePicContainer: {
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePic: {
    height: 100,
    borderRadius: 50,
    width: 100
  },
  pageDivider: {
    borderTopColor: '#bbb',
    borderTopWidth: StyleSheet.hairlineWidth,
    fontWeight: 'bold',
    padding: 15,
  },
  userSearchButton: {
    flex:1,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#bbb',
    borderBottomWidth: 1,
    borderBottomColor: '#bbb',
    paddingTop: 6,
    paddingBottom: 5,
  }
})