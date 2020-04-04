import React , { Component } from 'react';
import { View, Animated, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import  {BlogCommentFeed}  from './index';
import {AddComment} from './index';

class BlogClickNoPhoto extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            liked: false, 
            disliked: false,
            screenWidth: Dimensions.get("window").width,
            likes:0,
            dislikes:0,
            comments: 0,
            modalVisible: false,
            descriptionHeight: 270,
            animationValue : new Animated.Value(130),
            viewState : true,
            text: 'Show more',
            blogHeight: 190
           
         };
    }

    toggleAnimation=()=>{
 
        if(this.state.viewState == true){
        Animated.timing(this.state.animationValue, {
          toValue : 230, 
          duration: 1
        }).start(()=>{
          this.setState({viewState : false, text:'Show less', blogHeight:300})
        });
        }
        else{
          Animated.timing(this.state.animationValue, {
            toValue : 130,
            duration: 1
          }).start(this.setState({viewState: true, text:'Show more', blogHeight:200})
          );
        }
      }


    toggleModal(visible) {
        this.setState({ modalVisible: visible });
     }

     _showMorePress = () => {
        this.setState({ descriptionHeight: 500 });
      };

     _renderTruncatedFooter = (_showMorePress) => {
        return (
          <Text style={{color: 'gray', marginTop: 5}} onPress={_showMorePress}>
            Read more
          </Text>
        );
      }
    
      _renderRevealedFooter = (handlePress) => {
        return (
          <Text style={{color: 'gray', marginTop: 5}} onPress={handlePress}>
            Show less
          </Text>
        )
      }
    
      _handleTextReady = () => {
        // ...
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

        const animatedStyle = {
            height : this.state.animationValue
          }

          const animatedHeight = {
              height: this.state.blogHeight
          }

        return(
                  <View style = {styles.background}> 

                  
            
           
                <View style = {styles.blogContainer, animatedHeight}> 
                
               
                 <View style = {styles.textContainer}> 
                
                 <View style ={styles.icon}>
                 <Icon style ={styles.usericon} name = "user-secret" size={20}/>  
                </View>
                
                 <View style = {styles.usernameview}>
                
                 <Text style ={styles.username}>
                ANONYMOUS
                 </Text>
                
                </View> 

                <View style={styles.timeview}>
                <Text style ={styles.time}>
                5 hours ago
                </Text>
                
                </View>

                <View style = {styles.titleContainer}> 
                <Text style = {styles.title} >Best Professors at USD </Text> 
                   
                </View>

                    
                
                <View style={{borderColor:'transparent', borderWidth: 1, height: 0, width: 425 ,
                top: 247, left:0  }}>
               
                
                
                </View>

          
                 
                

                        <View style = {styles.nameContainer}>
                       
                        </View>

                        </View>

               <View style = {{ height: 220, width: 100+'%', top: 60, marginBottom: 10,borderColor: 'transparent',
            borderWidth:0.5
            }}> 

            <TouchableOpacity onPress = {() => {this.toggleModal(true)}}>
            
            </TouchableOpacity>

                
                   <Animated.View style={[styles.description, animatedStyle]}>
                      
                       
                   <Text style={{color:'white'}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
                        anim id est laborum.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                        dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                        
                    </Text>
                    <TouchableOpacity onPress = {this.toggleAnimation}>
                    <Text style={{color:'gray'}}>{this.state.text}
                          </Text> 
                    </TouchableOpacity>
                    </Animated.View>
              

                </View>

                </View>

              

           
              <View style = {styles.iconBar}>
                  

                    

                   <TouchableOpacity onPress = {this.updateLikes}>
                        
                    <Icon style = {styles.likeIcon} name = "thumbs-o-up" size={20} />
                    

                    </TouchableOpacity>

                   
                    <Text style = {{color: 'gray',top:24,left:14}}> {this.state.likes}  </Text>
                  



                    
                    

                    <TouchableOpacity onPress = {this.updateDislikes}>

                    <Icon style = {styles.dislikeIcon} name = "thumbs-o-down" size={20} />

                    </TouchableOpacity>

                    

                    <Text style = {{color: 'gray',left:-48,top:24}}> {this.state.dislikes}  </Text>
                   
                    <Icon style = {styles.commentIcon} name = "comment-o" size={20} />
       
                    <TouchableOpacity onPress = {this.updateLikes}>
                        
                    <TouchableOpacity>
                    <Icon style ={{top:23,left:8,color:'gray'}}name = "share-square-o" size={20}/>
                    </TouchableOpacity>
                    </TouchableOpacity>
                    <Text style = {{top:24,left:13,color: 'gray'}}> 
                     Share
                     </Text>
                    
                    <Text style = {{color: 'gray', top: 24, left: -110}}> {this.state.comments} </Text>    
                   

            </View>
            <View>
               <AddComment/>
            </View>
            <View style = {{top:29, position: 'relative'}}>
            <BlogCommentFeed/>
            </View>

    


        </View>
    )
}

}
export default BlogClickNoPhoto;

const styles = StyleSheet.create({


    activity:
    {   
        color: 'white',
        fontSize: 14,
        fontWeight:'300',
        
    },
    background:{
        flex:1, width: 100 + "%", backgroundColor:'black'
    },
     blogContainer: {
        width: 100 + "%",
        height: 200,
        backgroundColor: 'black',
        flexDirection: "row",
        borderBottomWidth: 0.4,
        borderColor: 'transparent',
        top: 17,
        },
        blogTitle:
    {
        color: 'white',
        fontSize: 16,
        fontWeight:'bold',
        left: 10,
    },
    commentIcon: {
       marginLeft: 100,
       color: "gray",
       top: 22,
       left: -55
    },
     date:{
      position: 'absolute',
        left: 75,
        top: 70,
        color: 'white',
        fontSize: 14,
        fontWeight:'200',
    },
         dislikeIcon:{
        marginLeft: 100,
        color:"gray",
        top: 22,
        left:-50
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
        color: "gray",
        top: 23,
        left:12
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
        height: 95 ,
        width: '100%' ,
        marginTop: 5,
        backgroundColor: 'black',
        justifyContent:'center',
        flex: 1,
        textAlign: 'center',
        alignItems: 'center',
        alignContent: 'center',       
    },
    title: {
        
        color: 'white',
        fontSize: 20,
        fontWeight:'700',
        textAlign: 'center',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        top:-10
        //position: 'absolute',
        //right: 0,
    },

     titleContainer: {
        position: 'absolute',
        top: 20,
        height: 50,
        width: 250,
        flexDirection:'row',
        left: 80,
        backgroundColor: 'black',
        justifyContent:'center',
        flex: 1,
        textAlign: 'center',
        alignItems: 'center',
        alignContent: 'center',
        },
        username: {
            fontSize: 13,
            color: 'gray',
            top:2,
            left: -3
        },
        usernameview:{
    
            backgroundColor: 'black',
            height: 20,
            width:100,
            position: 'absolute',
            top:0,
            left:28,
            textAlign: 'center',
            alignItems: 'center',
            alignContent: 'center'
        },
        timeview:{
            backgroundColor: 'black',
            height:30,
            width:80,
            position:'absolute',
            top: 0,
            right: 0,
            textAlign: 'center',
            alignItems: 'center',
            alignContent: 'center'
        },
        time:{
            fontSize:11,
            color:'gray',
            top: 3
        },
        icon:{
            backgroundColor: 'black',
            height:20,
            width: 20,
            position:'absolute',
            left: 5,
            top:15,
            textAlign: 'center',
            alignItems: 'center',
            alignContent: 'center'
        },
        usericon:{
            color:'cyan',
            position:'absolute',
            left:2,
            top: -15

        },
        description:{
            borderColor:'transparent', top:0,
            borderWidth:1,width:390,height:140, 
            left:14
        }
    
});