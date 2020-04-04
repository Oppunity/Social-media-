import React, { Component } from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import normalize from 'react-native-normalize';



class UserInterestPage extends Component {
 render()  
 { 
    return (
        <View style={{flex: 1, backgroundColor: 'red'}}>

    <TouchableOpacity
      style={styles.SubmitButtonSignUp}
      activeOpacity = { .5 }
      onPress={() => this.props.navigation.navigate('OrgRecommendation') }
      >
    <Text style={styles.TextStyle}> InterestPage </Text>
    </TouchableOpacity> 



        </View>


    )


 }
}

const styles = StyleSheet.create( 
    {
        SubmitButtonSignUp: {
            height: normalize(100),
            width: normalize(100),
            borderRadius: normalize(50),
            marginLeft: normalize(225),
            marginBottom: normalize(100),
            borderWidth: normalize(2.5),
            paddingTop: normalize(40),
            borderColor: '#fff',
            backgroundColor:'#0043cf',    
        },
        TextStyle: {
            color:'white',
            textAlign:'center',
        },
      
    }
)


export default UserInterestPage; 