import React from 'react'
import SearchResults from '../components/SearchResults'

import { Ionicons } from '@expo/vector-icons'
import { SearchBar } from 'react-native-elements'

import { 
  StyleSheet, 
  Text, 
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native'

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchInput: '',
    }
  }
  
  render() { 
    return (
      <View style={styles.container}>
        {/* <View style={styles.formContainer}>
          <Ionicons style={styles.searchIcon} name='ios-search-outline' size={20} color='grey'/>
          <TextInput 
            style={styles.formInput}
            onChangeText={searchInput => {
              this.setState({searchInput})
            }}
            placeholder={'Search'}
          />
        </View> */}
        <SearchBar 
          onChangeText={searchInput => {
            this.setState({searchInput})
          }}
          placeholder='Search...' 
          lightTheme 
          round 
        />
        <View style={styles.searchResultsContainer}>
          <SearchResults searchInput={this.state.searchInput}/>
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  formInput: {
    flex: 1,
    paddingTop: 18,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 0,
  },
  searchIcon: {
    paddingTop: 17,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 15,
  },
  searchResultsContainer: {
    flex: 14,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    padding: 15,
  },
  spinnerContainer: {
    alignContent: 'center', 
    justifyContent: 'center', 
    flex: 1
  },
  errorMessage: {
    color: 'red',
    //textAlign: 'center',
    marginTop: 10,
  }
})

