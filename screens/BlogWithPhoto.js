import React , { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { withNavigation } from 'react-navigation'
import BlogClickPhoto from './BlogClickPhoto';
import BlogScreen from './BlogScreen'


class BlogWithPhoto extends React.Component{
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
        const { navigation } = this.props;

         activity = '· 5 hours ago';
         blogTitle = 'Best professors at USD ';
         interactions = '12,856 Interactions';

        return(
                  <View style = {{flex:1, width: 100 + "%", backgroundColor:'black'}}> 
           
           
            <View style = {styles.blogContainer}> 
                

               
               <View style = {styles.textContainer}> 
                


                    <View style = {styles.trendingContainer}> 
                    <Text style = {styles.trending} >Trending on campus </Text> 
                    <Text style = {styles.activity}> {activity} </Text>
                    </View>


                        <TouchableOpacity onPress = {() => this.props.navigation.navigate('BlogClickPhoto')}> 
                        <View style = {styles.nameContainer}>
                        
                        <Text style = {styles.blogTitle}> {blogTitle} </Text>
                  
                        </View>
                        </TouchableOpacity>

                        </View>

               <View style = {{ height: 220, width: 100+'%', top: 80, marginBottom: 10, borderColor: 'transparent', borderWidth:1}}> 
              
               <TouchableOpacity onPress = {() => this.props.navigation.navigate('BlogClickPhoto')}> 
              <Image
              style = {{width: 100 + '%', height: 100 + '%'}}
              source = {{uri: 'https://physics.osu.edu/sites/physics.osu.edu/files/Steigman%20and%20Pres%20Gee.JPG'}}> 
            
              
              </Image> 
             </TouchableOpacity>
                </View>

                </View>

              

            

              <View style = {styles.iconBar}>
                  

                    

                   <TouchableOpacity onPress = {this.updateLikes}>
                        
                    <Icon style = {styles.likeIcon} name = "thumbs-o-up" size={20} />

                    </TouchableOpacity>

                   
                    <Text style = {{color: 'gray', top:24, left:14}}> {this.state.likes}  </Text>
                  



                    
                    

                    <TouchableOpacity onPress = {this.updateDislikes}>

                    <Icon style = {styles.dislikeIcon} name = "thumbs-o-down" size={20} />

                    </TouchableOpacity>

                    

                    <Text style = {{color: 'gray', left: -48, top: 24}}> {this.state.dislikes}  </Text>
                   
                    <Icon style = {styles.commentIcon} name = "comment-o" size={20} />

                    <TouchableOpacity>
                    <TouchableOpacity>
                    <Icon style = {{top: 23, left: 8, color:'gray'}} name = "share-square-o" size={20} />
                    </TouchableOpacity>
                    </TouchableOpacity>

                    <Text style = {{top: 24, left:13, color:'gray'}}>
                        Share
                        </Text>


                    

                    <Text style = {{color: 'gray', top: 24, left: -110}}> {this.state.comments}  </Text>

                    

            </View>

        </View>
    )
}

}
export default withNavigation(BlogWithPhoto);

const styles = StyleSheet.create({


    activity:
    {   
        color: 'white',
        fontSize: 14,
        fontWeight:'300'
    },

 
     blogContainer: {
        width: 100 + "%",
        height: 300,
        top:15 ,
        backgroundColor: 'black',
        flexDirection: "row",
        borderBottomWidth: 0.4,
        borderColor: 'transparent',
        top: 17
        
        },

        blogTitle:
    {
        color: 'white',
        fontSize: 16,
        fontWeight:'bold',
        left: 10
        
    },



    commentIcon: {
        marginLeft: 100,
        color: "gray",
        top: 21,
        left: -55
    },

     date:{
      position: 'absolute',
        left: 75,
        top: 70,
        color: 'white',
        fontSize: 14,
        fontWeight:'200'  
    },
     

         dislikeIcon:{
            marginLeft: 100,
            color:"gray",
            top: 22,
            left: -50
    },



     iconBar: {
        height: 50,
        width: 100 + "%",
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderColor: "gray"
        
    },

    
    interactionContainer: {
        position: 'absolute',
        top: 75,
        height: 40,
        width: 350,
        left: 10,
        flexDirection:'row',
        
        },

        interactions: {
            fontSize: 16,
            color: 'cyan',
            fontWeight: 'bold',
            
        },

        
    likeIcon:{
        marginLeft: 20,
        color: "gray",
        top: 23,
        left: 12
    },


    nameContainer: {
        position: 'absolute',
        top: 40,
        height: 100,
        width: 300,
        flexDirection:'row',
        
    },


   
    textContainer:{
      
        position: 'absolute',
        height: 95 + '%',
        width: 100 + '%',
        marginTop: 5,
        
              
    },
     
    trending: {
        
        color: 'white',
        fontSize: 14,
        fontWeight:'300'
    },

     trendingContainer: {
        position: 'absolute',
        top: 20,
        height: 30,
        width: 250,
        flexDirection:'row',
        left: 10
        
        },

     
       

});

