import React, { Component } from "react";
import { View, Button, Alert, Text, StyleSheet, navigation, ActivityIndicator, ToastAndroid, FlatList, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

class GetReviews extends Component {

  constructor(props)
  {
      super(props);
      this.state = {
        isLoading: true,
        locationData: [],
        location_id: ''
  };
}

  componentDidMount() {
    // this._unsubscribe = this.props.navigation.addListener('focus', () => {
     
       const { locData } = this.props.route.params
       console.log("This is the params data" +locData.location_id);

       if(this.props.route.params){
         this.setState({location_id: this.props.route.params.locData.location_id})
       }

          this.getLocationData();
  }
  
  UNSAFE_componentWillMount() {
    //this._unsubscribe
   }

  getLocationData = async () => {
    const value = await AsyncStorage.getItem('session_token');
    console.log("Trying to get data")
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/'+this.state.location_id,{
      'headers': {
        'X-Authorization': value
      }
    })
    .then((response) => {
    if(response.status === 200){
        return response.json()
    }
    else if(response.status === 404){
        Alert.alert("locationid: " + this.state.location_id)
      throw 'Not Found';
    }
    else if(response.status === 401){
        throw 'Unauthorised';
      }
    else{
      throw 'Server Error';
    }
  })
    .then((responseJson) => {
     console.log(responseJson);
      this.setState({
        isLoading: false,
        locationData: responseJson
      })
    })
    .catch((error) => {
      console.log(error);
      ToastAndroid.show(error, ToastAndroid.SHORT);
    });
}

render(){
    const navigation = this.props.navigation;
   // const {locData} = this.props.route.params
    if(this.state.isLoading){
        return(
        <View>
            <Text>Hello</Text>
        <ActivityIndicator/>
        </View>
    );
    }else{
    return (
    <View>
   <Text>Hello</Text>
   {/* <Text>Dataa is {locData}</Text> */}
                <FlatList
                  data={this.state.locationData.location_reviews}
                  renderItem={({item}) => (
                      <View>
                <Text>Location Name: {this.state.locationData.location_name}</Text>
                <Text>  Review ID: {item.review_id}</Text>
                <Text> Overall rating: {item.overall_rating}  </Text>
                <Text> Price Rating: {item.price_rating} </Text>
                <Text>  Quality Rating: {item.quality_rating} </Text>
                <Text>  Cleanliness Rating: {item.clenliness_rating} </Text>
                <Text>  Review body: {item.review_body}</Text>
                <Text>  Likes: {item.likes} </Text>
                      </View>
                  )}
                  keyExtractor={(item) => item.review_id.toString()}
                  />
   </View>
   );
   }
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
  
  export default GetReviews;