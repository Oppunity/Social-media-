import React , {Component} from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';

class Rating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenWidth: Dimensions.get("window").width,
           
            Default_Rating: 0,
      //To set the default Star Selected
      Max_Rating: 5,
      //To set the max number of Stars
      ratingImages: [
        "https://cdn.clipart.email/d3b24debd13850a4b3a7d3e05c5fb3c7_fire-png-clipart-martrhpngmartcom-fire-fire-emoji-transparentjpg-_1899-1899.jpeg",
        "http://ih2.redbubble.net/image.34476280.0296/fc,220x200,black.u1.jpg"
      ], 
      selectedIndex: 0
         };
    //Filled Star. You can also give the path from local
    this.Star = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
    //Empty Star. You can also give the path from local
    this.Star_With_Border = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
    }
    
    UpdateRating(key) {
        this.setState({ Default_Rating: key });
        //Keeping the Rating Selected in state
      }

      Load_New_Image=()=>{
        if ((this.state.Default_Rating == 0) && (this.state.selectedIndex != 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex + 1 
            }));      
         }
         if ((this.state.Default_Rating == 0) && (this.state.selectedIndex == 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex
            }));      
         }
         if ((this.state.Default_Rating == 1) && (this.state.selectedIndex != 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex + 1 
            }));      
         }
         if ((this.state.Default_Rating == 1) && (this.state.selectedIndex == 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex
            }));      
         }
         if ((this.state.Default_Rating == 2) && (this.state.selectedIndex != 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex + 1 
            }));      
         }
         if ((this.state.Default_Rating == 2) && (this.state.selectedIndex == 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex  
            }));      
         }
         if ((this.state.Default_Rating == 3) && (this.state.selectedIndex != 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex + 1 
            }));      
         }
         if ((this.state.Default_Rating == 3) && (this.state.selectedIndex == 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex  
            }));      
         }
         if ((this.state.Default_Rating == 4) && (this.state.selectedIndex != 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex  
            }));      
         }
         if ((this.state.Default_Rating == 4) && (this.state.selectedIndex == 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex - 1 
            }));      
         }
         if ((this.state.Default_Rating == 5) && (this.state.selectedIndex != 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex  
            }));      
         }
         if ((this.state.Default_Rating == 5) && (this.state.selectedIndex == 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex - 1 
            }));      
         }


        }
render(){
        const{ selectedIndex, ratingImages} = this.state
        let React_Native_Rating_Bar = [];
        //Array to hold the filled or empty Stars
        for (var i = 1; i <= this.state.Max_Rating; i++) {
          React_Native_Rating_Bar.push(
            <TouchableOpacity
              activeOpacity={0.5}
              key={i}
              onPress={this.UpdateRating.bind(this, i)}>
              <Image
                style={styles.StarImage}
                source={
                  i <= this.state.Default_Rating
                    ? { uri: this.Star }
                    : { uri: this.Star_With_Border }
                }
              />
            </TouchableOpacity>
          );
        }

        return(          
            <View style = {{flex:1, width: 100 + "%", backgroundColor:'black'}}> 
                    
                <View style = {styles.userBar}> 
                     <View style={styles.MainContainer}>
        <Text style={{color: 'white', flex: 1}}> {this.props.item} </Text>
        <Text style={{color: 'white', flex: 1, fontSize: 30, marginBottom: 470, marginRight: 250}}> {this.state.Default_Rating} </Text>
    
                            {/*View to hold our Stars*/}
                            <View style={styles.childView}>{React_Native_Rating_Bar}</View>
                            
                            <View style={{flex: 1, color: 'whites', width: '100%', height: "10%"}}> 
                            <Image source={{ uri: ratingImages[selectedIndex]}} style={{height: '150%', width: '8%', marginLeft: 360, marginTop: -35}} /> 
                            </View>
                            <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.button}
                            onPress={this.Load_New_Image}>
                            {/*Clicking on button will show the rating as an alert*/}
                            <Text>Rate</Text>
                            </TouchableOpacity>
                </View>            
                </View>
                <View style = {styles.iconBar}>
                </View>
                </View>
           
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
      },
      childView: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: -500,
        marginLeft: 10
      },
      button: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: -60,
        marginLeft: 225,
        padding: 10,
        backgroundColor: 'white',
      },
      StarImage: {
        width: 25,
        height: 25,
        resizeMode: 'cover',
      },
    iconBar: {
        height: 40,
        width: 100 + "%",
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderColor: "gray"
    },
    userBar: {
        width: 100 + "%",
        height: 80,
        backgroundColor: 'black',
        flexDirection: "row",
        justifyContent: "center",
        borderColor: "gray",  
    }, 
});


export default Rating;