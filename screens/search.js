import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

class Search extends Component{

    render(){
        
        const navigation = this.props.navigation;

        return(
            <View>
              <Text>This is the Search screen</Text>
              <Button title="Go back"
                onPress={() => navigation.goBack()} />  
            </View>
        )
    }
}
export default Search;