import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, FlatList, ToastAndroid, Alert, TextInput, Button, ScrollView} from 'react-native';
import GetFavourites from '../components/getFavourites';

class Favourites extends Component{

    render(){
        
        const navigation = this.props.navigation;

        return(
            <View>
              <Text>This is a list of your favourite locations</Text>
              <GetFavourites/>
              <Button title="Go back"
                onPress={() => navigation.goBack()} />  
            </View>
        )
    }
}
export default Favourites;