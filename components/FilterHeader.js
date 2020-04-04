import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Button, Switch, Image } from 'react-native';
import { Container, Header, Body, CheckBox, Title, Card, CardItem, Left, Right, Content} from 'native-base'

import Modal from "react-native-modal";
//import ActionButton from 'react-native-circular-action-menu';
import Icon from 'react-native-vector-icons/Ionicons';

var radio_props = [
  {label: 'organizations', value: 0 },
  {label: 'users', value: 1 },
  {label:'both', value: 2}
];

class FilterHeader extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            //states for dynamic 'anonymous' button
      anonymous: false, 
      button1Message:'non-anonymous',
      button1BackgroundColor: 'cyan',
      button1TextColor: 'black',
      button1BorderColor: 'cyan',
      button1Image: [
         "https://cdn.shopify.com/s/files/1/1061/1924/products/Angel_Halo_Emoji_Icon_0ff75c27-5416-4ac6-bf1a-2a2d44b0a32b_large.png?v=1571606089",
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Smiling_Devil_Emoji_grande.png?v=1571606036"
        
      ], 
      button1SelectedIndex: 0,

        //states for dynamic 'local' button
        button2BackgroundColor: 'cyan',
        button2BorderColor: 'cyan',
        button2TextColor:'black',
        button2Message: 'local',
        global: false,
        button2Image: [
         "https://cdn.shopify.com/s/files/1/1061/1924/products/House_Emoji_With_Tree_large.png?v=1571606064",
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Emoji_Earth_Globe_Europe_Africa_large.png?v=1571606068"
                                ], 
        button2SelectedIndex: 0,
        
        isModalVisible: false, //hides modal when load app

        radioButton1Pressed: true,
        radioButton2Pressed: false,
        radioButton3Pressed: false,

        
         };
    }

    updateAnon = () => {
          if (this.state.button1SelectedIndex != 1) {
            this.setState(prevState => ({
                button1SelectedIndex: 1 
            }));      
         } else{
             this.setState(prevState => ({
                 button1SelectedIndex:0
             }))
         }

      if(!this.state.anonymous) { 
      this.setState((prevState, props) => {
          return {
                
	            button1BackgroundColor: 'black',
                button1BorderColor: 'gray',
                button1TextColor: 'white',
                
                anonymous: true,
                button1Message: 'anonymous',
                    
          };
      });
  
  } else {

      this.setState((prevState,props) => {
          return { 
              	
	            button1BackgroundColor: 'cyan',
                button1BorderColor: 'cyan',
                button1TextColor:'black',
                button1Message: 'non-anonymous',
                anonymous: false     
      };
  });
  } 
}

updateGlobal = () => {
          if (this.state.button2SelectedIndex != 1) {
            this.setState(prevState => ({
                button2SelectedIndex: 1 
            }));      
         } else{
             this.setState(prevState => ({
                 button2SelectedIndex:0
             }))
         }



      if(!this.state.global) { 
      this.setState((prevState, props) => {
          return {
                
	            button2BackgroundColor: 'black',
                button2BorderColor: 'gray',
                button2TextColor: 'white',
                
                global: true,
                button2Message: 'global',
                    
          };
      });
  
  } else {

      this.setState((prevState,props) => {
          return { 
              	
	            button2BackgroundColor: 'cyan',
                button2BorderColor: 'cyan',
                button2TextColor:'black',
                button2Message: 'local',
                global: false    
      };
  });

  } 
}




    toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

    onePressed = () =>{
        this.setState({radioButton1Pressed: true, radioButton2Pressed: false, radioButton3Pressed: false})
    }

    twoPressed = () =>{
        this.setState({radioButton2Pressed: true, radioButton1Pressed: false, radioButton3Pressed: false})
    }

     threePressed = () =>{
        this.setState({radioButton3Pressed: true, radioButton1Pressed: false, radioButton2Pressed: false})
    }

    render(){
      const { navigation } = this.props;
        return(
            <View style = {{borderBottomWidth: 0.2, borderColor: 'cyan', width: '100%', height: 90, flexDirection: 'row'}}> 
              
            <TouchableOpacity 
            onPress={this.toggleModal}
            style = {{left: '46.8%', bottom: 4, position: 'absolute'}}      
        >
    <Icon name={'ios-eye'}  color='white'  size={35}  />  

        </TouchableOpacity>

        <View style={{top: 10, marginLeft: 10}}>
    <TouchableOpacity style={{backgroundColor:this.state.button1BackgroundColor,  borderColor:this.state.button1BorderColor, padding: 5, width: 140, justifyContent: 'center', borderRadius: 5, borderWidth: 1, left: 5,}}
                            onPress={this.updateAnon}>
          
                           <Text style = {{color: this.state.button1TextColor, fontWeight: '500', textAlign: 'center'}}> {this.state.button1Message} </Text>

               </TouchableOpacity>
               <Image source={{ uri: this.state.button1Image[this.state.button1SelectedIndex]}} style={{height: 30, width: 30, left: 55 , marginTop: 10, backgroundColor: 'black'}} />
</View>



<View style={{top: 10, right: 10, position: 'absolute'}}>
    <TouchableOpacity style={{backgroundColor:this.state.button2BackgroundColor,  borderColor:this.state.button2BorderColor, padding: 5, width: 140, justifyContent: 'center', borderRadius: 5, borderWidth: 1, right: 5,}}
                            onPress={this.updateGlobal}>
          
                           <Text style = {{color: this.state.button2TextColor, fontWeight: '500', textAlign: 'center'}}> {this.state.button2Message} </Text>

               </TouchableOpacity>
               <Image source={{ uri: this.state.button2Image[this.state.button2SelectedIndex]}} style={{height: 30, width: 30, left: 55 , marginTop: 10, backgroundColor: 'black'}} />
</View>

      
             

             <Modal isVisible={this.state.isModalVisible}>
{/* what you see when you click on the eye icon */}

          <View style={{ backgroundColor: 'black', height: 230, width: 400, top: -40, left:-30}}>
            
                 <View style = {{top: 20, width: '100%', height: 240, left: 10, borderColor: 'white', backgroundColor: 'black'}}> 
                 <Content style = {{backgroundColor: 'black'}}> 

                 <CardItem header style = {{backgroundColor: 'black'}}>
                 <Text style = {{color: 'white'}}> Select mainfeed filter options</Text>
                 </CardItem>
                 <CardItem body style = {{backgroundColor: 'black'}}>
                 <CheckBox checked = {this.state.radioButton1Pressed}
                 onPress = {this.onePressed}
                 style = {{marginRight:20}}
                 />
                 <Text style = {{color: 'white'}} > See posts from users and organizations </Text>
                 </CardItem>
             
                <CardItem body style = {{backgroundColor: 'black'}}>
                 <CheckBox checked = {this.state.radioButton2Pressed}
                 onPress = {this.twoPressed}
                 style = {{marginRight:20}}
                 />
                 <Text style = {{color: 'white'}}> Only see posts from users </Text>
                 </CardItem>

                 <CardItem body style = {{backgroundColor: 'black'}}>
                 <CheckBox checked = {this.state.radioButton3Pressed}
                 onPress = {this.threePressed}
                 style = {{marginRight:20}}
                 />
                 <Text style = {{color: 'white'}}> Only see posts from organizations </Text>
                 </CardItem>

                <CardItem right
                 style = {{backgroundColor: 'black'}}>
                <Button style = {{ bottom: 10, left: -40 }} title="Save" onPress={this.toggleModal} />
                </CardItem>
           
            </Content> 
                     </View>
        </View>
              
        </Modal>
        </View>
      
            );
    }

}
const styles = StyleSheet.create(
    {
      actionButtonIcon: {
        fontSize: 30,
        height: 30, 
        
    
  
      //  color: 'white',
      },  
      actionButton: {
        marginTop:15,
          paddingTop:45,
          paddingBottom:15,
          marginLeft:30,
          marginRight:30,
      },
    
    }
      );


export default FilterHeader;