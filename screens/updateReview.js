import { NavigationContainer } from '@react-navigation/native';
import React, { Component } from 'react';
import { Alert, Text, View, Button, ToastAndroid, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

class UpdateReview extends Component{

  constructor(props){
    super(props);

    this.state = {
      overall_rating: '',
      price_rating: '',
      quality_rating: '',
      clenliness_rating: '',
      review_body: '',
      location_id: '',
      review_id: '',
      locData: [],
      //isLoading: true
    }
}

componentDidMount() {
    // this._unsubscribe = this.props.navigation.addListener('focus', () => {
     
       const { location_id } = this.props.route.params
       const { locData } = this.props.route.params
       console.log("This is the params data" +location_id);

       if(this.props.route.params){
         this.setState({location_id: this.props.route.params.location_id})
       }

       console.log("This is the params data" +locData.review_id);

       if(this.props.route.params){
        this.setState({review_id: this.props.route.params.locData.review_id})

        if(this.props.route.params){
            this.setState({locData: this.props.route.params.locData})
          }
      }
  }
  
  UNSAFE_componentWillMount() {
    //this._unsubscribe
   }

updateReview = async () => {

    let sendReviewData = {};
  
    if(this.state.overall_rating != ''){
      sendReviewData['overall_rating'] = this.state.overall_rating;
    }
  
    if(this.state.price_rating != ''){
      sendReviewData['price_rating'] = this.state.price_rating;
    }
  
    if(this.state.quality_rating != ''){
      sendReviewData['quality_rating'] = this.state.quality_rating;
    }
  
    if(this.state.clenliness_rating != ''){
      sendReviewData['clenliness_rating'] = this.state.clenliness_rating;
    }
  
    if(this.state.review_body != ''){
      sendReviewData['review_body'] = this.state.review_body;
    }
  
    console.log(sendReviewData);
  
    const value = await AsyncStorage.getItem('session_token');
    return fetch("http://10.0.2.2:3333/api/1.0.0/location/"+this.state.location_id+"/review/"+this.state.review_id, {
      method: 'patch',
      headers: {
          'Content-Type': 'application/json',
          'X-Authorization': value
      },
      body: JSON.stringify(sendReviewData)
  })
  
  .then((response) => {
      if(response.status === 200){
         Alert.alert("Review info updated" + "locationID: " + this.state.location_id +"reviewID: "+ this.state.review_id);
         return response.json();
      }
      else if(response.status === 400){
        Alert.alert("Testing" + "locationID: " + this.state.location_id +"reviewID: "+ this.state.review_id);
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
      this.setState({
        isLoading: false,
        userData: responseJson
      })
  
  })
  .catch((error) => {
      console.log(error);
      ToastAndroid.show(error, ToastAndroid.SHORT);
  })
  }

  render(){
        
    const navigation = this.props.navigation;
    if(this.state.isLoading){
        return(
        <View>
        <ActivityIndicator/>
        </View>
    );
    }else{
    return(
        <View style={{flex:1}}>

          <Text>Update a review</Text>
          <Button title="Go back"
            onPress={() => navigation.goBack()} />  
              
              <TextInput
            placeholder="Enter your overall_rating"
            onChangeText={(overall_rating)=>this.setState({overall_rating})}
            value={this.state.overall_rating}
         />

         <TextInput
            placeholder="Enter your price_rating"
            onChangeText={(price_rating)=>this.setState({price_rating})}
            value={this.state.price_rating}
           
          />
        
        <TextInput 
            placeholder="Enter your quality_rating"
            onChangeText={(quality_rating)=>this.setState({quality_rating})}
            value={this.state.quality_rating}
         />

         <TextInput 
            placeholder="Enter your clenliness_rating"
            onChangeText={(clenliness_rating) => this.setState({clenliness_rating})}
            value={this.state.clenliness_rating}
         />

          <TextInput 
            placeholder="Enter your review_body"
            onChangeText={(review_body) => this.setState({review_body})}
            value={this.state.review_body}
         /> 

             <Button 
            title="Update review"
            onPress={() => this.updateReview()}
            ></Button>

                  

        </View>
    )
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

cameraPreview: {
flex: 1,
justifyContent: 'flex-end',
alignItems: "center",
},

});

export default UpdateReview;