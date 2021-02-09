import React, { Component } from "react";
import { View, Button, Text, StyleSheet, navigation, ActivityIndicator, ToastAndroid, FlatList } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Location from '../components/location';


class Home extends Component {

  constructor(props)
  {
      super(props);

      this.state = {
          isLoading: true,
          locationData: []
  };
}

  componentDidMount() {
    // this.unsubscribe = this.props.navigation.addListener('focus', () => {

    this.props.navigation.addListener('focus', () => {
    });
  }
  
  // componentWillMount() {
  //   this.unsubscribe();
  // }

render(){
  const navigation = this.props.navigation;
  const item = this.state.locationData;

        return(
            <View><Text>This is the home screen</Text>
          
          <Button
            title="Go to Profile Screen"
            onPress={() => navigation.navigate("Profile")}
          /> 
          
          <Location/>  
          </View>
       
        )
     }
 }

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default Home;