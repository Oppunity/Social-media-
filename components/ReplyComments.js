import React , { Component } from 'react';
import { View, Text, Modal,KeyboardAvoidingView ,StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, ImageBackground, YellowBox} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { TextInput } from 'react-native-gesture-handler';
import AddComment from '../components/AddComment'
//import BlogCommentwithReply from '../components/BlogCommentwithReply'
import BlogFeed from '../components/BlogFeed'


class BlogComments extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            liked: false, 
            disliked: false,
            screenWidth: Dimensions.get("window").width,
            likes:0,
            dislikes:0,
            comments: 0,
            text: '',
            modalVisible: false,
            commentReply: '',
            iconColour: styles.likeIcon.color,
            buttonText: 'Show replies', 
            replyModalVisible: false, 
            showMoreModalVisible: false, 
            commentReplies: 0,
            replyShowMoreModalVisible: false
            
           
         };
        }

     
        toggleModal(visible) {
            this.setState({ modalVisible: visible });
         }

    
         toggleReplyModal(visible) {
            this.setState({ replyModalVisible: visible });
         }

       
         toggleShowMoreModal(visible) {
            this.setState({ showMoreModalVisible: visible });
         }

       
         toggleReplyShowMoreModal(visible) {
            this.setState({ replyShowMoreModalVisible: visible });
         }

    
        updateLikes = () => {

            if(!this.state.liked) { 
            this.setState((prevState, props) => {
                return {
                    likes: prevState.likes + 1,
                    liked: true, 
                    iconColour: 'cyan'

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
      
            if(!this.state.commentDisliked) { 
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
       
     <View style ={styles.commentBox}>
     <View style ={styles.commentBox2}>
     <View style = {styles.topCommentBox}>
     
     <View style={{borderColor:'transparent',borderWidth:1,top:45}}>
    <TouchableOpacity onPress = {() => {this.toggleShowMoreModal(false)}}>           
    <Icon style = {{marginLeft: 20,color: "white",top: 0, left:-3}} name = "angle-left" size={35} />
    </TouchableOpacity>
    </View>

     </View>

     <View style = {styles.usernameBox}>
     <Text style = {styles.username}>
    anonymous
     </Text>
     </View>

    <View style = {styles.timeBox}>
    <Text style = {styles.time}>
        5h ago
    </Text>
    </View>

    <View style = {styles.textBox}>
    <Text numberOfLines={2}
    style = {styles.comment}>
        Fuck these professors, they some bitch ass niggas
        Fuck these professors, they some bitch ass niggas
        Fuck these professors, they some bitch ass niggas
        Fuck these professors, they some bitch ass niggas
       
    </Text>
    </View>
    </View>
   

    <TouchableOpacity onPress = {this.updateLikes}>              
    <Icon style = {styles.likeIcon} name = "thumbs-o-up" size={20} />
    </TouchableOpacity>
    <Text style = {styles.likeText}> {this.state.likes}  </Text>



    <TouchableOpacity onPress = {this.updateDislikes}>
    <Icon style = {styles.dislikeIcon} name = "thumbs-o-down" size={20} />
    </TouchableOpacity>

    <Modal 
    style={{backgroundColor:'black'}}
            visible = {this.state.showMoreModalVisible}
           animationType="slide">
 <KeyboardAvoidingView style={styles.replyContainer}>

<View style={{borderColor:'transparent',borderWidth:1,top:45}}>
<TouchableOpacity onPress = {() => {this.toggleShowMoreModal(false)}}>           
<Icon style = {{marginLeft: 20,color: "white",top: 0, left:-3}} name = "angle-left" size={35} />
</TouchableOpacity>
</View>

    <TouchableOpacity>

    </TouchableOpacity>
<View style={styles.replyBox}>
<Text style = {{color: 'gray', left: 8, top: 12, fontWeight: 'bold'}}>
    anonymous
     </Text>
     <Text style = {{color: 'gray', top: -5,left:350 , fontWeight: 'bold'}}>
        5h ago
    </Text>
    <Text 
    style = {{color: 'white', left: 7, height:'80%',
    top:20, borderColor:'transparent',borderWidth:1, width:400}}>
        Fuck these professors, they some bitch ass niggas
        Fuck these professors, they some bitch ass niggas
        Fuck these professors, they some bitch ass niggas
        Fuck these professors, they some bitch ass niggas
       
    </Text>
</View>
</KeyboardAvoidingView>
    </Modal>
    


<TouchableOpacity onPress = {() => {this.toggleShowMoreModal(true)}}>
    <Text style={{color:'gray',top:-85, left:2}}>Show more</Text>
</TouchableOpacity>


<TouchableOpacity onPress = {this.updateDislikes}>
    <Text style = {styles.dislikesText}> {this.state.dislikes}  </Text>
 </TouchableOpacity>


    <View style = {styles.bottomCommentBox}>
    </View>
    </View>

       )
    }}

export default BlogComments; 

const styles = StyleSheet.create({
    likeIcon:{
        marginLeft: 20,
        top: -4,
        color:'gray'
    },
    dislikeIcon:{
        marginLeft: 20,
        color: "gray",
        top: -43, left: 75
    },
    shareIcon:{
        marginLeft: 20,
        color: "gray",
        top: -123, left: 293
    },
    placeholder:{
        marginLeft: 20,
        color: "white",
        top: 5, left: -17
    },
    commentBox:{
        borderColor: 'transparent',
        borderWidth: 1, 
        height: 125, 
        width: 395, left: 10, 
        right: 10, top: 10,
        
    },
    commentBox2: {
        borderWidth:1, borderColor:'transparent',
        height: -1000, width: 2000, left:0,
        
    },
    topCommentBox: {
        borderColor: "gray", left: -50,
        right:-50, borderWidth: 0.5, height: 0, 
        width: 900, top: 105
    },
    usernameBox: {
        borderColor: 'transparent', height: 20, width: 175, borderWidth: 1
    },
    username: {
        color: 'gray', left: 1, top: -2, fontWeight: 'bold'
    },
    timeBox: {
        borderWidth:1, borderColor: 'red', right: 10,
         height: 20, width: 55, alignSelf: 'flex-end', top:0
    },
    time:{
    color: 'gray', top: 40, fontWeight: 'bold'
    },
    textBox:{
        borderColor: 'transparent', borderWidth:1, 
        width: 393, height: 40, top: -15
    },
    comment: {
        color: 'white', left: 1, top: -7
    },
    randomBox:{
        borderColor: 'transparent', 
        borderWidth: 1, height: 20, 
        width: 100, left: 10, top: -5,
        zIndex:102
    },
    likeText:{
        color: 'gray', top: -24, left: 40
    },
    dislikesText:{
        color: 'gray', top: -78, left: 115
    },
    replyText: {
        color: 'gray', top: -105, left: 335
    },
    bottomCommentBox:{
        borderWidth: 0.5, borderColor: 'gray',
        top: -176, height: 0, width: 900, left: -50
    },
    replyContainer:{
        borderColor:'transparent',
        borderWidth:1,
        height:'100%',
        backgroundColor:'black',
        zIndex:101
    },
    replyBox:{
        top: 30,
        height:'100%',
        width:100+'%',borderColor:'transparent',borderWidth:1,
        zIndex:100
     
        

    }






});