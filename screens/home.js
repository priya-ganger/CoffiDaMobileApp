import React, { Component } from "react";
import { View, Button, Text, StyleSheet, navigation, ActivityIndicator, ToastAndroid, FlatList, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Location from '../components/location';


class Home extends Component {

  constructor(props)
  {
      super(props);

      this.state = {
          isLoading: true,
          locationData: [],
         // token: ''
  };
}

  componentDidMount() {
     this._unsubscribe = this.props.navigation.addListener('focus', () => {
       this.checkUserIsLoggedIn();
      this.getLocationData();
    //this.props.navigation.addListener('focus', () => {
    });
  }
  
  UNSAFE_componentWillMount() {
    this._unsubscribe
   }

   checkUserIsLoggedIn = async () => {
    const value = AsyncStorage.getItem('session_token');
    if(value !== null){
        this.setState({token:value});
        
    }
    else{
        this.props.navigation.navigate("Login");
    }
  }

  getLocationData = async () => {
    const value = await AsyncStorage.getItem('session_token');
    console.log("Trying to get data")
    return fetch('http://10.0.2.2:3333/api/1.0.0/find',{
      'headers': {
        'X-Authorization': value
      }
    })
    .then((response) => {
    if(response.status === 200){
        return response.json()
    }
    else if(response.status === 401){
      this.props.navigation.navigate("Login");
      throw 'Unauthorised';
    }
    else{
      throw 'something went wrong';
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
  const item = this.state.locationData;

        // return(
        //     <View><Text>All Locations</Text>
          
          {/* <Button
            title="Go to Profile Screen"
            onPress={() => navigation.navigate("Profile")}
          />  */}
          
          {/* <Location />   */}


            if(this.state.isLoading){
                return(
                <View>
                <ActivityIndicator/>
                </View>
            );
            }else{
            return (
                <View>
                
                <FlatList
                data={this.state.locationData}
                renderItem={({item}) => (
                    <View>
                        {/* <Text>Location ID:{item.location_id}</Text> */}
                        <Text> Name:  {item.location_name}</Text>
                        <Text> Town: {item.location_town}</Text>
                        {/* <Text>Location Latitude: {item.latitude}</Text>
                        <Text>Location Longitude:  {item.longitude}</Text> */}
                        {/* <Text>Location Photo   {item.photo_path}</Text> */}
                         {/* {this.state.displayImg ? ( 
                          */}
                          <Image 
                           source={{uri: item.photo_path}}
                          //source={{uri: 'https://tr-images.condecdn.net/image/vOkb7Jmdv2L/crop/1020/f/1kaffeine-london-mar19-pr.jpg'}}
                          style={{width: 400, height: 400}}
                          onError={this.errorLoadingImg}
                          />
              
                        {/* //   ) : (
                        //    <View></View>
                        //  )} */}
                        <Text> Average Overall Rating: {item.avg_overall_rating}</Text>
                        <Text> Price Rating: {item.avg_price_rating}</Text>
                        <Text> Quality Rating: {item.avg_quality_rating}</Text>
                        <Text> Cleanliness Rating: {item.avg_clenliness_rating}</Text>
                        <Text>  </Text>
                        <Text>Location Reviews:</Text>

                         {item.location_reviews.map((review, key)=> (
                             
                            <Text>
                              
                              <Text key = {review.review_id}>
                                Review ID: {review.review_id}
                                Overall rating: {review.overall_rating}
                                Price Rating: {review.price_rating}
                                Quality Rating: {review.quality_rating}
                                Cleanliness Rating: {review.clenliness_rating}
                                Review body: {review.review_body}
                                Likes: {review.likes}

                               Testing: {item.location_id} {review.review_id}

                                <Button 
                                  title="Delete Review"
                                  onPress={() => this.deleteReview(item.location_id, review.review_id)}
                                  
                                 ></Button>


                            </Text>
                            
                           </Text>
                        ))}  
                        
                      <Button
                        title="Click here to favourite"
                        onPress={() => this.favouriteLocation(item)}
                        />
                    </View>
                )}
                keyExtractor={(item,index) => item.location_id.toString()}
               
                />


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
});

export default Home;