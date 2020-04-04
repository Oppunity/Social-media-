import React , { Component } from 'react';
import { View, setModalOpen, Button, TouchableHighlight, Modal, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BlogCommentFeed } from './index'
import AddComment from '../components/AddComment';

class BlogClickPhoto extends React.Component{
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
           
         };
    }

    toggleModal(visible) {
        this.setState({ modalVisible: visible });
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

        
        return(
                  <View style = {styles.background}> 

                  
            
           
                <View style = {styles.blogContainer}> 
                
               
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
               
                <Modal visible = {this.state.modalVisible}
                    animationType="slide">
                <View style={{height: 100+ '%',backgroundColor:'black', borderColor:'transparent', borderWidth:1}}>
            

                <View style= {{borderWidth: 1, borderColor: 'transparent', height:60, width:50, top:0}}>
            
                <TouchableOpacity onPress = {() => {this.toggleModal(false)}}>
                        
                    <Icon style = {{marginLeft: 20,color: "white",top: 44, left:-3}} name = "angle-left" size={35} />
                    
                    </TouchableOpacity>

                    </View>
                    <Icon style ={{top:34, left:6, color:'cyan'}} name = "user-secret" size={20}/> 
                    
                    <Text style ={{fontSize: 13,color: 'gray',top:17,left: 31}}>ANONYMOUS</Text>
                    
                    <View style={{top:-10, height:0, width:100+'%', borderWidth:0.5, borderColor:'gray'}}></View> 
                    <Text style ={{fontSize:11,color:'gray',top: 1, left:341}}>
                     5 hours ago
                      </Text>
                      <Text style = {{color: 'white',fontSize: 20,fontWeight:'700',textAlign: 'center',alignItems: 'center',
                        alignContent: 'center',justifyContent: 'center',top:11, left:-2}} >Gayest Professors at USD </Text> 
                <View style={{borderWidth:0.5, borderColor:'gray', height:0, width: 100+'%', top: 389}}>
                </View>
                <Image
                style = {{width: 100 + '%', height: 40+'%', top: 30 }}
                 source = {{uri: 'https://physics.osu.edu/sites/physics.osu.edu/files/Steigman%20and%20Pres%20Gee.JPG'}}>  
                </Image> 
                 </View> 
            
                 <View style={{height:340, width:95+"%", borderColor:"transparent",borderWidth:1, top:-357, marginLeft:10}}>
                 <ScrollView style={{height:100+'%', borderWidth:1, borderColor:'transparent'}}>
                <Text style={{color:'white', textAlign:'auto', letterSpacing:0.5}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
                anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
                anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
                anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
                anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
                anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure 
                dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
                anim id est laborum.
                </Text>
                </ScrollView>
                </View>   
            
                 </Modal>
                
                </View>

          
                 
                

                        <View style = {styles.nameContainer}>
                       
                        </View>

                        </View>

               <View style = {{ height: 220, width: 100+'%', top: 60, marginBottom: 10,borderColor: 'transparent',
            borderWidth:0.5
            }}> 

            <TouchableOpacity onPress = {() => {this.toggleModal(true)}}>
            <Image
              style = {{width: 100 + '%', height: 105 + '%'}}
              source = {{uri: 'https://physics.osu.edu/sites/physics.osu.edu/files/Steigman%20and%20Pres%20Gee.JPG'}}> 
            
            </Image> 
            </TouchableOpacity>

               <TouchableOpacity>  
              </TouchableOpacity>

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
export default BlogClickPhoto; 

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
        height: 300,
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
        top:-20
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
            top:-12,
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
            top: -11
        },
        icon:{
            backgroundColor: 'black',
            height:20,
            width: 20,
            position:'absolute',
            left: 5,
            top:0,
            textAlign: 'center',
            alignItems: 'center',
            alignContent: 'center'
        },
        usericon:{
            color:'cyan',
            position:'absolute',
            left:2,
            top: -15

        }
    
});