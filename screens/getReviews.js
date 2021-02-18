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

  likeReview = async (location_id, review_id) => {
  const token = await AsyncStorage.getItem('session_token');
  return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+location_id+"/review/"+review_id+"/like", {
    method: 'post',
    headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
    },
})

.then((response) => {
    if(response.status === 200){
      Alert.alert("Review liked! Id: " + location_id + "Review ID" + review_id+ " Token: " + token );
       this.getLocationData();
    }
    else if(response.status === 400){
        throw 'Bad Request';
    }
    else if(response.status === 401){
      throw 'Unauthorised';
    }
    else if(response.status === 403){
      throw 'Forbidden';
    }
    else if(response.status === 404){
      throw 'Not Found';
    }
    else if(response.status === 500){
      throw 'Server Error';
    }
    else{
        throw 'Something went wrong';
    }
})
.then(async (responseJson) => {
    console.log(responseJson);

})
.catch((error) => {
    console.log(error);
    ToastAndroid.show(error, ToastAndroid.SHORT);
})
}

  unlikeReview = async (location_id, review_id) => {
  const token = await AsyncStorage.getItem('session_token');
  return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+location_id+"/review/"+review_id+"/like", {
    method: 'delete',
    headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
    },
})

.then((response) => {
    if(response.status === 200){
      Alert.alert("Review unliked! Id: " + location_id + "Review ID" + review_id+ " Token: " + token );
       this.getLocationData();
    }
    else if(response.status === 400){
        throw 'Bad Request';
    }
    else if(response.status === 401){
      throw 'Unauthorised';
    }
    else if(response.status === 403){
      throw 'Forbidden';
    }
    else if(response.status === 404){
      throw 'Not Found';
    }
    else if(response.status === 500){
      throw 'Server Error';
    }
    else{
        throw 'Something went wrong';
    }
})
.then(async (responseJson) => {
    console.log(responseJson);

})
.catch((error) => {
    console.log(error);
    ToastAndroid.show(error, ToastAndroid.SHORT);
})
}
  deleteReview = async (location_id, review_id) => {
  const token = await AsyncStorage.getItem('session_token');
  return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+location_id+"/review/"+review_id, {
    method: 'delete',
    headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token
    },
    body: JSON.stringify(this.state)
    
})

.then((response) => {
    if(response.status === 200){
      Alert.alert("Review Deleted! Id: " + location_id + " Token: " + token + "Review ID" + review_id);
       
       //need to refresh data
       this.getLocationData();
    }
    else if(response.status === 400){
        throw 'Bad Request';
    }
    else if(response.status === 401){
      throw 'Unauthorised';
    }
    else if(response.status === 403){
      throw 'Forbidden';
    }
    else if(response.status === 404){
      Alert.alert("TEST: " + location_id + " Token: " + token + "Review ID" + review_id);
      throw 'Not Found';
    }
    else if(response.status === 500){
      throw 'Server Error';
    }
    else{
        throw 'Something went wrong';
    }
})
.then(async (responseJson) => {
    console.log(responseJson);

})
.catch((error) => {
    console.log(error);
    ToastAndroid.show(error, ToastAndroid.SHORT);
})
}


  render(){
    const navigation = this.props.navigation;
   // const {locData} = this.props.route.params
    if(this.state.isLoading){
        return(
        <View>
        <ActivityIndicator/>
        </View>
    );
    }else{
    return (
    <View>
   <Text>Reviews</Text>
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
                <Button 
                  title="Like Review"
                  onPress={() => this.likeReview(this.state.locationData.location_id, item.review_id)}
                ></Button>
                  <Button 
                  title="Unlike Review"
                  onPress={() => this.unlikeReview(this.state.locationData.location_id, item.review_id)}
                  ></Button>
                    <Button 
                  title="Delete Review"
                  onPress={() => this.deleteReview(this.state.locationData.location_id, item.review_id)}
                  ></Button>

                <Button
                title="Add a review"
                onPress={() => this.props.navigation.navigate('AddReview', { locData: item, location_id: this.state.locationData.location_id})}
                />    

                <Button 
                  title="Update this Review"
                  onPress={() => this.props.navigation.navigate('UpdateReview', { locData: item, location_id: this.state.locationData.location_id})}
                  ></Button>

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