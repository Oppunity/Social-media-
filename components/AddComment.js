import React , { Component } from 'react';
import { View, KeyboardAvoidingView, Text, StyleSheet, Modal, Image, ScrollView, Dimensions, TouchableOpacity, ImageBackground, YellowBox} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { TextInput } from 'react-native-gesture-handler';
import BlogComments from '../screens/BlogComments';

class AddComment extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            modalVisible: false,
           
         };
        }

        toggleModal(visible) {
            this.setState({ modalVisible: visible });
         }
    
    render() {
        return(

        <View style = {{borderColor: 'transparent', borderWidth: 1, 
        height: 40, width: 395, bottom: -160, top:22}}>
        
        
       
        <View style={{borderColor: 'gray', top: 0,left: 18,
        borderWidth:1, height:35, width:375, borderRadius:150/2}}>
        
        <TextInput  
        placeholder= "Add a comment..."
        placeholderTextColor = "#777"
        style = {styles.placeholder} 
        onFocus= {() => {this.toggleModal(true)}}
          value={this.state.text}>
        </TextInput>

        <Modal style={{backgroundColor:'black'}}
            visible = {this.state.modalVisible}
           animationType="slide"
            >
        <KeyboardAvoidingView style={styles.replyContainer}>

        <View style={{borderColor:'transparent',borderWidth:1,top:45}}>
        <TouchableOpacity onPress = {() => {this.toggleModal(false)}}>           
        <Icon style = {{marginLeft: 20,color: "white",top: 0, left:-3}} name = "angle-left" size={35} />
        </TouchableOpacity>
        </View>

            <TouchableOpacity>
        <Text style={{color:'white', top: 17, left:350, fontWeight:'bold', fontSize:18}}>
                Post
            </Text>
            </TouchableOpacity>
        <View style={styles.replyBox}>
        <TextInput
                autoFocus='true'
                  placeholder = 'Your comment...'
                  placeholderTextColor = 'gray'
                  onBlur={eventname => this.setState({ commentText })}
                  style={{color:'white', fontSize: 16, width: 150, height: 50, top: 0, left: 15}}
                  />
        </View>
        </KeyboardAvoidingView>
         </Modal>

        </View>
        </View>

        );

     }   
    }



export default AddComment;    



const styles = StyleSheet.create({
    placeholder:{
        marginLeft: 31,
        color: "gray",
        top: 2, left: -15,
        height:29,
        width:350,
        fontWeight: 'bold',
        borderColor:'transparent',
        borderWidth:1
    },
    replyContainer:{
        borderColor:'transparent',
        borderWidth:1,
        height:'100%',
        backgroundColor:'black'
    },
    replyBox:{
        top: 30,
        height:'100%',
        width:100+'%',borderColor:'transparent',borderWidth:1
    }
});
