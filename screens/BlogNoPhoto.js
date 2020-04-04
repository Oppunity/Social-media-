import React , { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, ImageBackground} from 'react-native';
import  Icon  from 'react-native-vector-icons/FontAwesome'
import { withNavigation } from 'react-navigation'
import BlogClickNoPhoto from './BlogClickNoPhoto';
import BlogScreen from './BlogScreen'
import { ThemeProvider } from 'react-native-country-picker-modal/lib/CountryTheme';
import Amplify, { Storage, Auth,API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries'
class BlogNoPhoto extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            liked: false, 
            disliked: false,
            screenWidth: Dimensions.get("window").width,
            likes:0,
            dislikes:0,
            comments: 0,
            identityid:' ',
            likeColor:'gray',
            dislikeColor: 'gray',
            likesText:0,
            dislikesText:0
           
         };
    }

    async componentDidMount(){
        var credentials = await Auth.currentCredentials()
            var identityIds = credentials._identityId
            this.setState({identityid:identityIds})
      }



      uploadToStorage = async () => {
        try{
              await API.graphql(graphqlOperation(mutations.createBlogLikes, {input: {blogid:'NA', likes:this.state.likes, BlogTime:'NA',identityId:this.state.identityid, anonymous:'NA'} }))
          
        } catch (err) {
            console.log(err)
        }
        
      }


     updateLikes = () => {

        if(this.state.liked) { 
            this.setState((prevState, props) => {
                return {
                  likes: 0,
                  liked: false,
                  likeColor: 'gray',
                  likesText: prevState.likesText - 1
                };
            });
        
        } else if(this.state.disliked) {
      
            this.setState((prevState,props) => {
                return { 
                    likes: 1,
                    disliked: false,
                    dislikeColor: 'gray',
                    liked: true,
                    likeColor: 'cyan',
                    dislikesText: prevState.dislikesText - 1,
                    likesText: prevState.likesText + 1
            };
        });
      
      } else {
      
          this.setState((prevState,props) => {
              return { 
                    likes: 1,
                    liked: true,
                    likeColor: 'cyan',
                    likesText: prevState.likesText + 1,
          };
      });

  } 
}


  updateDislikes = () => {

      if(this.state.disliked) { 
      this.setState((prevState, props) => {
          return {
            likes: 0,
            disliked: false,
            dislikeColor: 'gray',
            dislikesText: prevState.dislikesText - 1
          };
      });
  
  } else if(this.state.liked) {

      this.setState((prevState,props) => {
          return { 
              likes: -1,
              disliked: true,
              dislikeColor: 'red',
              liked: false,
              likeColor: 'gray',
              dislikesText: prevState.dislikesText + 1,
              likesText: prevState.likesText - 1
      };
  });

} else {

    this.setState((prevState,props) => {
        return { 
            likes: -1,
              disliked: true,
              dislikeColor: 'red',
              dislikesText: prevState.dislikesText + 1,
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


                    
                        <View style = {styles.nameContainer}>
                        
                        <Text style = {styles.blogTitle}> {blogTitle} </Text>
                
                        </View>
                   

                        <TouchableOpacity style={{top:40, height: 135,borderColor:'transparent',borderWidth:1}} 
                        onPress = {() => this.props.navigation.navigate('BlogClickNoPhoto')}>
                        <View style={{ borderWidth:1,borderColor:'transparent', 
                        height:105,width:400, top:25, left:14}}>
                          
                        <Text numberOfLines={6}
                        style={{color:'white'}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
                        anim id est laborum.
                        </Text>
                        
                        </View>
                     </TouchableOpacity>
                        

                        </View>

               <View style = {{ height: 220, width: 100+'%', top: 80, marginBottom: 10, borderColor: 'transparent', borderWidth:1}}> 
              
                </View>

                </View>

              

            

              <View style = {styles.iconBar}>
                  

                    

                   <TouchableOpacity onPress = {this.uploadToStorage}
                   onPressIn = {this.updateLikes}>
                        
                    <Icon style = {{marginLeft: 20,
                     color: this.state.likeColor,
                     top: 23,
                     left: 12}} name = "thumbs-o-up" size={20} />

                    </TouchableOpacity>

                   
                    <Text style = {{color: 'gray', top:24, left:14}}> {this.state.likesText}  </Text>
                  



                    
                    

                    <TouchableOpacity onPress = {this.uploadToStorage}
                    onPressIn = {this.updateDislikes}>

                    <Icon style = {{marginLeft: 100,
                    color: this.state.dislikeColor,
                    top: 22,
                    left: -50}} name = "thumbs-o-down" size={20} />

                    </TouchableOpacity>

                    

                    <Text style = {{color: 'gray', left: -48, top: 24}}> {this.state.dislikesText}  </Text>
                   
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
export default withNavigation(BlogNoPhoto); 

const styles = StyleSheet.create({


    activity:
    {   
        color: 'white',
        fontSize: 14,
        fontWeight:'300'
    },

 
     blogContainer: {
        width: 100 + "%",
        height: 175,
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
        left: 10,
        borderColor:'transparent',
        borderWidth:1
        
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
            color: 'gray',
            top: 22,
            left: -50
    },



     iconBar: {
        height: 50,
        width: 100 + "%",
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderBottomWidth: 1,
        borderColor: "gray",
        top:0
        
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
        color: 'gray',
        top: 23,
        left: 12
    },


    nameContainer: {
        position: 'absolute',
        top: 40,
        height: 25,
        width: 300,
        flexDirection:'row',
        borderColor:'transparent',
        borderWidth:1
        
    },


   
    textContainer:{
      
        position: 'absolute',
        height: 95 + '%',
        width: 100 + '%',
        marginTop: 5,
        borderWidth:1,
        borderColor:'transparent'
        
              
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
