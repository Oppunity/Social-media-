import React , {Component} from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'


class EventProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false, 
            disliked: false,
            screenWidth: Dimensions.get("window").width,
            likes:0,
            dislikes:0,
            comments: 0
           
         };
    }

  updateLikes = () => {

      if(!this.state.liked) { 
      this.setState((prevState, props) => {
          return {
              likes: prevState.likes + 1,
              liked: true,             
          };
      });
  
  } else {

      this.setState((prevState,props) => {
          return { 
              likes: prevState.likes - 1,
              liked: false,
              iconColour: "white"
              
      };
  });

  } 
}


  updateDislikes = () => {

      if(!this.state.disliked) { 
      this.setState((prevState, props) => {
          return {
              dislikes: prevState.likes + 1,
              disliked: true,
              iconColour:"red"
          };
      });
  
  } else {

      this.setState((prevState,props) => {
          return { 
              dislikes: prevState.dislikes - 1,
              disliked: false,
              iconColour:"white"
      };
  });

  } 
}

      

    render(){
        
        const imageHeight = Math.floor(this.state.screenWidth * 1.1);
        const imageSelection = 
            this.props.item % 2 == 0  
             ? "https://www.nsbe.org/getattachment/28832cde-2300-42ed-8121-e41f9f9d7c2d/nsbe46-save-the-date.aspx"
             : "https://image.slidesharecdn.com/nsbegeneralbody1-20-16-160121134003/95/usf-nsbe-gbm-1202016-1-638.jpg?cb=1453383709";
    
        return(          
 
            <View style = {{flex:1, width: 100 + "%", backgroundColor:'black'}}> 
                    
                <View style = {styles.userBar}> 
                       
                   
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('OrgProfile') }>  
                        <Image style = {styles.organizationPic} 
                        source = {{uri: 'https://facebook.github.io/react/logo-og.png'}}/>
                        </TouchableOpacity>

                        
                        <View style = {styles.organizationBar}> 

                        <TouchableOpacity>
                        <Text style = {styles.organizationName}>NSBE  </Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                        <Text style = {styles.organizationHandle}>@NSBE  </Text>
                        </TouchableOpacity>

                        <Text style = {styles.activity}> · 45 minutes ago </Text>
                        </View>

                        <View style = {styles.eventDescription}>
                        <TouchableOpacity>
                        <Text style = {{marginLeft: 2.5, fontWeight: '200', color: "white", fontSize: 15,  position: "absolute", top: 0}}>
                        NSBE Networking Event in UC 103 @ 12:30 pm
                        </Text>
                        </TouchableOpacity>
                        </View>

                                           
                </View>

                <View style = {styles.iconBar}>
                  

                    

                   <TouchableOpacity onPress = {this.updateLikes}>
                        
                    <Icon style = {styles.likeIcon} name = "thumbs-o-up" size={20} />

                    </TouchableOpacity>

                   
                    <Text style = {{color: 'gray'}}> {this.state.likes}  </Text>
                
                    <TouchableOpacity onPress = {this.updateDislikes}>

                    <Icon style = {styles.dislikeIcon} name = "thumbs-o-down" size={20} />

                    </TouchableOpacity>
     

                    <Text style = {{color: 'gray'}}> {this.state.dislikes}  </Text>

                                    
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CommentGroup') }>
                   
                    <Icon style = {styles.commentIcon} name = "comment-o" size={20} />

                    </TouchableOpacity>

                    <TouchableOpacity>

                    <Text style = {{color: 'gray'}}> {this.state.comments}  </Text>

                    </TouchableOpacity>


                        <Text style = {styles.rating}> Rating: 8.5 </Text>

                       <Image style = {styles.ratingIcon} 
                        source = {{uri: 'https://cdn.clipart.email/d3b24debd13850a4b3a7d3e05c5fb3c7_fire-png-clipart-martrhpngmartcom-fire-fire-emoji-transparentjpg-_1899-1899.jpeg'}}/>

                </View>


                </View>
           
        );
    }
}

const styles = StyleSheet.create({
   

    activity: {
        color: "gray",
        fontSize: 13
    },

    commentBar: {
        width: 100 + "%",
        height: 50,
        borderColor: 'rgb(233,233,233)',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        
    },

    commentIcon: {
       marginLeft: 50,
       color: "gray"
    },


    dislikeIcon:{
        marginLeft: 50,
        color:"gray"
    },


    eventName: {
        marginLeft: 10,
        color: 'white',
        fontSize: 18,
        fontWeight:'300'
    },

    eventDescription: {
        height: 40,
        width: 280,
        position: "absolute",
        bottom: 15,
        right: 12,
        
    },
    

    headerText: {
        color: 'white',
        fontSize: 20,
        textAlign: "center",
        marginTop: 10
    },


    iconBar: {
        height: 40,
        width: 100 + "%",
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderColor: "gray"
        
    },

    likeIcon:{
        marginLeft: 15,
        color: "gray"
    },

     organizationBar: {
        height: 30,
        width: 280,
        flexDirection: 'row',
        alignItems: 'flex-start',
        top:10,
        paddingLeft: 10
        
    },

    
    organizationName: {
        marginLeft: 10,
        color: 'white',
        fontSize: 20,
        fontWeight: '500',
        
    },

    organizationHandle: {
       
        color: 'gray',
        fontSize: 16,
               
    },

    organizationPic: {
        height: 70,
        width: 70,
        borderRadius: 35,
        borderColor: 'white',
        borderWidth: 1,
        top: 10
        
        
       
    },


    rating: {
        position: "absolute",
        right: 40,
        color: "gray",
        fontSize: 14

    },
    
    ratingIcon: {
        position: "absolute",
        right: 10,
        height: 30,
        width: 30,
    },
   
     tempNav: {
        width: 100 + "%",
        height: 56,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#101011',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },

   
    userBar: {
        width: 100 + "%",
        height: 90,
        backgroundColor: 'black',
        flexDirection: "row",
      
        justifyContent: "center",
        borderColor: "gray",
       
        
    },

  
});


export default EventProfile;