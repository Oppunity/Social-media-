import React , {Component} from 'react';
import { Button, View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'


class Following extends Component {
      constructor(props) {
        super(props);
        this.state = {
            following: true, 
            buttonMessage:'Following',
           
            backgroundColor: 'black',
            borderColor: 'gray',
            
           
            
         };
    }

  updateFollow = () => {

      if(this.state.following) { 
      this.setState((prevState, props) => {
          return {
                
                backgroundColor: 'dodgerblue',
                borderColor: 'dodgerblue',
                
                following: false,
                buttonMessage: 'Follow',
                    
          };
      });
  
  } else {

      this.setState((prevState,props) => {
          return { 
                
                backgroundColor: 'black',
                borderColor: 'gray',
                
                following: true,
                buttonMessage: 'Following',
                  
      };
  });

  } 
}


     
    render(){
        
        return(          
 
            <View style = {{flex:1, width: 100 + "%", backgroundColor:'black'}}> 
                    
                <View style = {styles.followerContainer}> 
                       
                   
                        <TouchableOpacity >  

                        <Image style = {styles.followerPic} 
                        source = {{uri: "https://www.thefamouspeople.com/profiles/images/jhen-aiko-5.jpg"}}/>

                        </TouchableOpacity>

                        
                     <View style = {styles.followerBar}> 

                        <TouchableOpacity>
                             <Text style = {styles.followerName}>j_nayynayy  </Text>
                        </TouchableOpacity>

                        
                    </View>

                                          

                        <View style = {styles.buttonContainer}>

                        <TouchableOpacity
                         style={{

                                backgroundColor:this.state.backgroundColor,
                                padding:this.state.padding, 
                                borderColor:this.state.borderColor,
                                
                                padding: 5,
                                width: 140,
                                justifyContent: 'center',
                                borderRadius: 5,
                                borderWidth: 1,
                                 
                                }}
                                onPress={this.updateFollow}
                        >
                        
                         <Text style = {{color: 'white', fontWeight: '500', textAlign: 'center',}}> {this.state.buttonMessage} </Text>
                         
                         </TouchableOpacity>
                        </View>

                  
                                           
                </View>

 
                </View>
           
        );
    }
}

const styles = StyleSheet.create({

    buttonContainer: {
        height: 50,
        width: 150,
        position: "absolute",
        top: 10,
        left: 200,
       
        
    },
    

     followerBar: {
        height: 30,
        width: 280,
        flexDirection: 'row',
        alignItems: 'flex-start',
        top:10,
        
        
    },

    
    followerName: {
        marginLeft: 10,
        color: 'white',
        fontSize: 15,
        fontWeight: '400',
        
    },

    
    followerPic: {
        height: 60,
        width: 60,
        borderRadius: 35,
        borderColor: 'white',
        borderWidth: 1,
        top: 10
        
        
       
    },


    followerContainer: {
        width: 100 + "%",
        height: 80,
        backgroundColor: 'black',
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
       
        
    },
    
  button: {
    padding:5,
    backgroundColor: 'black',
    borderColor: 'gray',
    borderRadius: 1,
    borderWidth: 1,
    alignItems: 'center'
    
    
  }
});


export default Following;