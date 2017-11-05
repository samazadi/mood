import React from 'react';
import { 
    StyleSheet, 
    View,
    TouchableHighlight,
    Text, 
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default class AddFriendButton extends React.Component {
    render() {
        return (
            <TouchableHighlight 
                style={styles.button}
                onPress={()=>console.log('hi')}
                underlayColor={'#1b557a'}
            >
                <View style={styles.buttonContainer}>
                    <Ionicons name='ios-person-add' size={20} color='white'/>
                    <Text style={styles.buttonText}>
                        Send Friend Request
                    </Text>
                </View>
            </TouchableHighlight>
        );
    };
}

const styles = StyleSheet.create({
    button: {
        height: 40,
        width: 200,
        backgroundColor: '#2980b9',
        borderRadius: 10,
        marginTop: 25,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        marginLeft: 15,
    },
})