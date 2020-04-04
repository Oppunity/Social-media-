import * as ImagePicker from 'expo-image-picker';
import React, { Component} from 'react';
import { Switch, View, TextInput, StyleSheet, Image, TouchableOpacity, Button, Text} from 'react-native';
import Amplify, { Storage, Auth,API, graphqlOperation } from 'aws-amplify';
//import ActionButton from 'react-native-circular-action-menu';
//import { configureAmplify, SetS3Config } from '../../service.js';
import { Kaede } from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/Ionicons';
//import ImagePicker from 'react-native-image-picker';
//import ImagePicker from 'react-native-image-crop-picker';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries'
import { Header } from 'react-native/Libraries/NewAppScreen';




class BlogUploadPage extends Component {
  static navigationOptions = {
    header: null
}


  constructor(props){
    super(props);

    this.handleChoosePhoto = this.handleChoosePhoto.bind(this);

    this.state = {
      EventName: '', Time: '', Location: '', currentEvent: [],  EventD: '',
    height: 0, photo: '',identityid:'', user: '',captioni:'',blogtitlei:'',anonymous:''
    }
  }
  
  static navigationOptions = {
  
  } 

  async componentDidMount(){
    var credentials = await Auth.currentCredentials()
        var identityIds = credentials._identityId
        this.setState({identityid:identityIds})
  }
  
  handleChoosePhoto = async () => {
   
    let image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    }).then(image => {
      this.setState({ photo: image.uri })
     console.log(image);
      Auth.currentCredentials().then(data => console.log(data)).catch(err => console.log(err));
  
    });

  }


  uploadToStorage = async () => {
    try{
      //var ProductData = await API.graphql(graphqlOperation(queries.listProductInfos, { filter: { SKU: { eq: data[i][3] } } } ))
      //if(ProductData.data.listProductInfos.items.length>0){
          //var cproductrowid = ProductData.data.listProductInfos.items[0].id
          //await API.graphql(graphqlOperation(mutations.deleteProductInfo, {input: {id:cproductrowid} }))
          await API.graphql(graphqlOperation(mutations.createBlogEvent, {input: {BlogName:this.state.blogtitlei, CaptilizeBlogName:this.state.blogtitlei.toUpperCase(), BlogTime:'NA',BlogCaption:this.state.captioni,identityId:this.state.identityid, anonymous: this.state.anonymous,Photo:'NA'} }))
      //} else {
        //  await API.graphql(graphqlOperation(mutations.createProductInfo, {input: {identityId:this.state.identityid,SKUDept:data[i][0],SKUClass:data[i][1],SKUFineLine:data[i][2],SKU:data[i][3],SKUDescription:data[i][4]} }))
      //}
    } catch (err) {
        console.log(err)
    }
    
  }

  onChange = (key, value) => {
    this.setState({ [key]: value })
  }

  toggleSwitch = () => {
    this.setState({ anonymous: !this.state.anonymous });
    };
  
    render() {
      let { photo } = this.state

      return (
        <View style={{flex: 1, backgroundColor: 'black'}}>  
          
           <Text style={{color: 'white', fontSize: 20, textAlign: 'center', marginTop: 150, marginBottom: 10 }}>
          Do you want to make an anonymous post? 
          </Text>
           <View style={{marginLeft: 175}}>
          <Switch
          value={this.state.anonymous}
         onValueChange={this.toggleSwitch}
         changeValueImmediately={true}
         renderInsideCircle={() =>  <Text style={{ color: 'red', fontWeight: 'bold'}}> Yes</Text> }
         activeText={'Yes'}
         inActiveText={'Off'}
         backgroundActive={'green'}
         backgroundInactive={'red'}
         circleActiveColor={'green'}
         circleInActiveColor={'red'}
         renderActiveText={false}
         renderInActiveText={false}
                         />
          </View>
          <View> 
          <Kaede
          style={{marginTop: 20}}
          label={'Blog Title'}
          inputPadding={16}  
          onChangeText={blogtitle => {
            this.setState({ blogtitlei:blogtitle })}
          }
          />
    
        <TextInput
        multiline={true}
        onChangeText={eventname => {
          this.setState({ captioni:eventname })}
        }
        onContentSizeChange={(event) => {
            this.setState({ height: event.nativeEvent.contentSize.height })
        }}
        placeholder='Blog Description...'
        placeholderTextColor='white'
        style={[styles.default, {height: Math.max(150, this.state.height)}]}
        value={this.state.EventDetails}
      />
                  
                      </View>    
          
              <TouchableOpacity
                  onPress = {this.uploadToStorage}
                   style={{backgroundColor:'black',   padding: 7, width: 120, height: 40, justifyContent: 'center', borderRadius: 10, borderWidth: 1, borderColor: 'white', top: 30, left: 130 }}
                           >
          
                           <Text style = {{color: 'white', fontWeight: '300', textAlign: 'center', fontSize: 14}}> Upload Blog </Text>
                </TouchableOpacity> 
          
         
        </View>
      ) 
    }
  
 
}

  const styles = StyleSheet.create({
    default: {
                   width: 350,
                    height: 150,
                    backgroundColor: '#a9a9a9',
                    marginLeft: 30,
                    padding: 8,
                    color: 'white',
                    borderRadius: 14,
                    marginTop: 30
    },
    actionButtonIcon: {
      fontSize: 30,
      height: 30, 
    },  
    actionButton: {
      marginTop:15,
        paddingTop:45,
        paddingBottom:15,
        marginLeft:30,
        marginRight:30,
    },
  
    

  });
export default BlogUploadPage; 