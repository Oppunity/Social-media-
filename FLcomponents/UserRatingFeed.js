import React , {Component} from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ScrollView} from 'react-native';

class OrgRatingFeed extends Component{

  

    constructor(props) {
        super(props);
        this.state = {
            screenWidth: Dimensions.get("window").width,
           
            Default_Rating: 0,
            Default_Rating1: 0,
            Default_Rating2: 0,
            Default_Rating3: 0,
            Default_Rating4: 0,
            Default_Rating5: 0,
            Default_Rating6: 0,
            Default_Rating7: 0,
            SmashRating: 'Smash or Pass',
            HeatMeterRating: 'Heat Meter',
            LossenessRating: 'Looseness',
            ThicknessRating: 'Thickness',
            IntelligenceRating: 'Intelligence',
            SavagenessRating: 'Savageness',
            RatchetnessRating: 'Ratchetness',
            DiversityRating: 'DiversityRating',
      //To set the default Star Selected
      Max_Rating: 5,
      //To set the max number of Stars
      ratingImages: [
        "https://cdn.clipart.email/d3b24debd13850a4b3a7d3e05c5fb3c7_fire-png-clipart-martrhpngmartcom-fire-fire-emoji-transparentjpg-_1899-1899.jpeg",
        "http://ih2.redbubble.net/image.34476280.0296/fc,220x200,black.u1.jpg"
      ], 
      selectedIndex: 0,
      selectedIndex1: 0,
      selectedIndex2: 0,
      selectedIndex3: 0,
      selectedIndex4: 0,
      selectedIndex5: 0,
      selectedIndex6: 0,
      selectedIndex7: 0,
         };
    //Filled Star. You can also give the path from local
    this.Star = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
    //Empty Star. You can also give the path from local
    this.Star_With_Border = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
    }
    
    UpdateRating(key) {
      //console.log(key) 
      //console.log(this.state.selectedIndex) 
      //console.log(this.item)
      this.setState({ Default_Rating: key }, function (){
          if ((this.state.Default_Rating == 0) && (this.state.selectedIndex != 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex + 1 
            }));      
         }
         if ((this.state.Default_Rating == 0) && (this.state.selectedIndex == 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex
            }));      
         }
         if ((this.state.Default_Rating == 1) && (this.state.selectedIndex != 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex + 1 
            }));      
         }
         if ((this.state.Default_Rating == 1) && (this.state.selectedIndex == 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex
            }));      
         }
         if ((this.state.Default_Rating == 2) && (this.state.selectedIndex != 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex + 1 
            }));      
         }
         if ((this.state.Default_Rating == 2) && (this.state.selectedIndex == 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex  
            }));      
         }
         if ((this.state.Default_Rating == 3) && (this.state.selectedIndex != 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex + 1 
            }));      
         }
         if ((this.state.Default_Rating == 3) && (this.state.selectedIndex == 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex  
            }));      
         }
         if ((this.state.Default_Rating == 4) && (this.state.selectedIndex != 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex  
            }));      
         }
         if ((this.state.Default_Rating == 4) && (this.state.selectedIndex == 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex - 1 
            }));      
         }
         if ((this.state.Default_Rating == 5) && (this.state.selectedIndex != 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex  
            }));      
         }
         if ((this.state.Default_Rating == 5) && (this.state.selectedIndex == 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex - 1 
            }));      
         }
        });
        //Keeping the Rating Selected in state
        
      }
    
      UpdateRating1(key) {
        this.setState({ Default_Rating1: key }, function (){
            if ((this.state.Default_Rating1 == 0) && (this.state.selectedIndex1 != 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1 + 1 
              }));      
           }
           if ((this.state.Default_Rating1 == 0) && (this.state.selectedIndex1 == 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1
              }));      
           }
           if ((this.state.Default_Rating1 == 1) && (this.state.selectedIndex1 != 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1 + 1 
              }));      
           }
           if ((this.state.Default_Rating1 == 1) && (this.state.selectedIndex1 == 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1
              }));      
           }
           if ((this.state.Default_Rating1 == 2) && (this.state.selectedIndex1 != 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1 + 1 
              }));      
           }
           if ((this.state.Default_Rating1 == 2) && (this.state.selectedIndex1 == 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1  
              }));      
           }
           if ((this.state.Default_Rating1 == 3) && (this.state.selectedIndex1 != 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1 + 1 
              }));      
           }
           if ((this.state.Default_Rating1 == 3) && (this.state.selectedIndex1 == 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1 
              }));      
           }
           if ((this.state.Default_Rating1 == 4) && (this.state.selectedIndex1 != 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1  
              }));      
           }
           if ((this.state.Default_Rating1 == 4) && (this.state.selectedIndex1 == 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1 - 1 
              }));      
           }
           if ((this.state.Default_Rating1 == 5) && (this.state.selectedIndex1 != 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1  
              }));      
           }
           if ((this.state.Default_Rating1 == 5) && (this.state.selectedIndex1 == 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1 - 1 
              }));      
           }
          });
          //Keeping the Rating Selected in state
          
        }
    
        UpdateRating2(key) {
          //console.log(key) 
          //console.log(this.state.selectedIndex) 
          //console.log(this.item)
          this.setState({ Default_Rating2: key }, function (){
              if ((this.state.Default_Rating2 == 0) && (this.state.selectedIndex2 != 1)) {
                this.setState(prevState => ({
                    selectedIndex2: prevState.selectedIndex2 + 1 
                }));      
             }
             if ((this.state.Default_Rating2 == 0) && (this.state.selectedIndex2 == 1)) {
                this.setState(prevState => ({
                    selectedIndex2: prevState.selectedIndex2
                }));      
             }
             if ((this.state.Default_Rating2 == 1) && (this.state.selectedIndex2 != 1)) {
                this.setState(prevState => ({
                    selectedIndex2: prevState.selectedIndex2 + 1 
                }));      
             }
             if ((this.state.Default_Rating2 == 1) && (this.state.selectedIndex2 == 1)) {
                this.setState(prevState => ({
                    selectedIndex2: prevState.selectedIndex2
                }));      
             }
             if ((this.state.Default_Rating2 == 2) && (this.state.selectedIndex2 != 1)) {
                this.setState(prevState => ({
                    selectedIndex2: prevState.selectedIndex2 + 1 
                }));      
             }
             if ((this.state.Default_Rating2 == 2) && (this.state.selectedIndex2 == 1)) {
                this.setState(prevState => ({
                    selectedIndex2: prevState.selectedIndex2 
                }));      
             }
             if ((this.state.Default_Rating2 == 3) && (this.state.selectedIndex2 != 1)) {
                this.setState(prevState => ({
                    selectedIndex2: prevState.selectedIndex2 + 1 
                }));      
             }
             if ((this.state.Default_Rating2 == 3) && (this.state.selectedIndex2 == 1)) {
                this.setState(prevState => ({
                    selectedIndex2: prevState.selectedIndex2  
                }));      
             }
             if ((this.state.Default_Rating2 == 4) && (this.state.selectedIndex2 != 1)) {
                this.setState(prevState => ({
                    selectedIndex2: prevState.selectedIndex2  
                }));      
             }
             if ((this.state.Default_Rating2 == 4) && (this.state.selectedIndex2 == 1)) {
                this.setState(prevState => ({
                    selectedIndex2: prevState.selectedIndex2 - 1 
                }));      
             }
             if ((this.state.Default_Rating2 == 5) && (this.state.selectedIndex2 != 1)) {
                this.setState(prevState => ({
                    selectedIndex2: prevState.selectedIndex2 
                }));      
             }
             if ((this.state.Default_Rating2 == 5) && (this.state.selectedIndex2 == 1)) {
                this.setState(prevState => ({
                    selectedIndex2: prevState.selectedIndex2 - 1 
                }));      
             }
            });
            //Keeping the Rating Selected in state
            
          }
    
          UpdateRating3(key) {
            this.setState({ Default_Rating3: key }, function (){
                if ((this.state.Default_Rating3 == 0) && (this.state.selectedIndex3 != 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3 + 1 
                  }));      
               }
               if ((this.state.Default_Rating3 == 0) && (this.state.selectedIndex3 == 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3
                  }));      
               }
               if ((this.state.Default_Rating1 == 1) && (this.state.selectedIndex3 != 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3 + 1 
                  }));      
               }
               if ((this.state.Default_Rating3 == 1) && (this.state.selectedIndex3 == 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3
                  }));      
               }
               if ((this.state.Default_Rating3 == 2) && (this.state.selectedIndex3 != 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3 + 1 
                  }));      
               }
               if ((this.state.Default_Rating3 == 2) && (this.state.selectedIndex3 == 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3  
                  }));      
               }
               if ((this.state.Default_Rating3 == 3) && (this.state.selectedIndex3 != 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3 + 1 
                  }));      
               }
               if ((this.state.Default_Rating3 == 3) && (this.state.selectedIndex3 == 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3 
                  }));      
               }
               if ((this.state.Default_Rating3 == 4) && (this.state.selectedIndex3 != 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3  
                  }));      
               }
               if ((this.state.Default_Rating3 == 4) && (this.state.selectedIndex3 == 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3 - 1 
                  }));      
               }
               if ((this.state.Default_Rating3 == 5) && (this.state.selectedIndex3 != 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3  
                  }));      
               }
               if ((this.state.Default_Rating3 == 5) && (this.state.selectedIndex3 == 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3 - 1 
                  }));      
               }
              });
              //Keeping the Rating Selected in state
              
            }
    
            UpdateRating4(key) {
              this.setState({ Default_Rating4: key }, function (){
                  if ((this.state.Default_Rating4 == 0) && (this.state.selectedIndex4 != 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4 + 1 
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 0) && (this.state.selectedIndex4 == 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 1) && (this.state.selectedIndex4 != 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4 + 1 
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 1) && (this.state.selectedIndex4 == 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 2) && (this.state.selectedIndex4 != 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4 + 1 
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 2) && (this.state.selectedIndex4 == 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4  
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 3) && (this.state.selectedIndex4 != 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4 + 1 
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 3) && (this.state.selectedIndex4 == 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4 
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 4) && (this.state.selectedIndex4 != 1)) {
                    this.setState(prevState => ({
                        selectedIndex1: prevState.selectedIndex1  
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 4) && (this.state.selectedIndex4 == 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4 - 1 
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 5) && (this.state.selectedIndex4 != 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4  
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 5) && (this.state.selectedIndex4 == 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4 - 1 
                    }));      
                 }
                });
                //Keeping the Rating Selected in state
                
              }
    
              UpdateRating5(key) {
                this.setState({ Default_Rating5: key }, function (){
                    if ((this.state.Default_Rating5 == 0) && (this.state.selectedIndex5 != 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5 + 1 
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 0) && (this.state.selectedIndex5 == 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 1) && (this.state.selectedIndex5 != 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5 + 1 
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 1) && (this.state.selectedIndex5 == 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 2) && (this.state.selectedIndex5 != 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5 + 1 
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 2) && (this.state.selectedIndex5 == 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5  
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 3) && (this.state.selectedIndex5 != 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5 + 1 
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 3) && (this.state.selectedIndex5 == 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5 
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 4) && (this.state.selectedIndex5 != 1)) {
                      this.setState(prevState => ({
                          selectedIndex1: prevState.selectedIndex1  
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 4) && (this.state.selectedIndex5 == 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5 - 1 
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 5) && (this.state.selectedIndex5 != 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5  
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 5) && (this.state.selectedIndex5 == 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5 - 1 
                      }));      
                   }
                  });
                  //Keeping the Rating Selected in state
                  
                }
    
                UpdateRating6(key) {
                  this.setState({ Default_Rating6: key }, function (){
                      if ((this.state.Default_Rating6 == 0) && (this.state.selectedIndex6 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex5 + 1 
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 0) && (this.state.selectedIndex6 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex5
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 1) && (this.state.selectedIndex6 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6 + 1 
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 1) && (this.state.selectedIndex6 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 2) && (this.state.selectedIndex6 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6 + 1 
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 2) && (this.state.selectedIndex6 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6  
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 3) && (this.state.selectedIndex6 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6 + 1 
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 3) && (this.state.selectedIndex6 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6 
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 4) && (this.state.selectedIndex6 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6  
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 4) && (this.state.selectedIndex6 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6 - 1 
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 5) && (this.state.selectedIndex6 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6  
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 5) && (this.state.selectedIndex6 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6 - 1 
                        }));      
                     }
                    });
                    //Keeping the Rating Selected in state
                    
                  }
          
    
                UpdateRating7(key) {
                  this.setState({ Default_Rating7: key }, function (){
                      if ((this.state.Default_Rating7 == 0) && (this.state.selectedIndex7 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7 + 1 
                        }));      
                     }
                     if ((this.state.Default_Rating7 
                      == 0) && (this.state.selectedIndex7 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 1) && (this.state.selectedIndex7 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7 + 1 
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 1) && (this.state.selectedIndex7 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 2) && (this.state.selectedIndex7 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7 + 1 
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 2) && (this.state.selectedIndex6 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7  
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 3) && (this.state.selectedIndex7 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7 + 1 
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 3) && (this.state.selectedIndex7 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7 
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 4) && (this.state.selectedIndex7 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7  
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 4) && (this.state.selectedIndex7 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7 - 1 
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 5) && (this.state.selectedIndex7 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7  
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 5) && (this.state.selectedIndex7 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7 - 1 
                        }));      
                     }
                    });
                    //Keeping the Rating Selected in state
                    
                  }
    
      Load_New_Image=()=>{
        if ((this.state.Default_Rating == 0) && (this.state.selectedIndex != 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex + 1 
            }));      
         }
         if ((this.state.Default_Rating == 0) && (this.state.selectedIndex == 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex
            }));      
         }
         if ((this.state.Default_Rating == 1) && (this.state.selectedIndex != 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex + 1 
            }));      
         }
         if ((this.state.Default_Rating == 1) && (this.state.selectedIndex == 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex
            }));      
         }
         if ((this.state.Default_Rating == 2) && (this.state.selectedIndex != 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex + 1 
            }));      
         }
         if ((this.state.Default_Rating == 2) && (this.state.selectedIndex == 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex  
            }));      
         }
         if ((this.state.Default_Rating == 3) && (this.state.selectedIndex != 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex + 1 
            }));      
         }
         if ((this.state.Default_Rating == 3) && (this.state.selectedIndex == 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex  
            }));      
         }
         if ((this.state.Default_Rating == 4) && (this.state.selectedIndex != 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex  
            }));      
         }
         if ((this.state.Default_Rating == 4) && (this.state.selectedIndex == 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex - 1 
            }));      
         }
         if ((this.state.Default_Rating == 5) && (this.state.selectedIndex != 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex  
            }));      
         }
         if ((this.state.Default_Rating == 5) && (this.state.selectedIndex == 1)) {
            this.setState(prevState => ({
                selectedIndex: prevState.selectedIndex - 1 
            }));      
         }
        } 
    
        Load_New_Image1=()=>{
          if ((this.state.Default_Rating1 == 0) && (this.state.selectedIndex1 != 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1 + 1 
              }));      
           }
           if ((this.state.Default_Rating1 == 0) && (this.state.selectedIndex1 == 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1
              }));      
           }
           if ((this.state.Default_Rating1 == 1) && (this.state.selectedIndex1 != 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1 + 1 
              }));      
           }
           if ((this.state.Default_Rating1 == 1) && (this.state.selectedIndex1 == 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1
              }));      
           }
           if ((this.state.Default_Rating1 == 2) && (this.state.selectedIndex1 != 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1 + 1 
              }));      
           }
           if ((this.state.Default_Rating1 == 2) && (this.state.selectedIndex1 == 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1  
              }));      
           }
           if ((this.state.Default_Rating1 == 3) && (this.state.selectedIndex1 != 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1 + 1 
              }));      
           }
           if ((this.state.Default_Rating1 == 3) && (this.state.selectedIndex1 == 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1
              }));      
           }
           if ((this.state.Default_Rating1 == 4) && (this.state.selectedIndex1 != 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1  
              }));      
           }
           if ((this.state.Default_Rating1 == 4) && (this.state.selectedIndex1 == 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1 - 1 
              }));      
           }
           if ((this.state.Default_Rating1 == 5) && (this.state.selectedIndex1 != 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1  
              }));      
           }
           if ((this.state.Default_Rating1 == 5) && (this.state.selectedIndex1 == 1)) {
              this.setState(prevState => ({
                  selectedIndex1: prevState.selectedIndex1 - 1 
              }));      
           }
          } 
    
          Load_New_Image2=()=>{
            if ((this.state.Default_Rating2 == 0) && (this.state.selectedIndex2 != 1)) {
                this.setState(prevState => ({
                    selectedIndex2: prevState.selectedIndex2 + 1 
                }));      
             }
             if ((this.state.Default_Rating2 == 0) && (this.state.selectedIndex2 == 1)) {
                this.setState(prevState => ({
                    selectedIndex1: prevState.selectedIndex1
                }));      
             }
             if ((this.state.Default_Rating2 == 1) && (this.state.selectedIndex2 != 1)) {
                this.setState(prevState => ({
                    selectedIndex1: prevState.selectedIndex1 + 1 
                }));      
             }
             if ((this.state.Default_Rating2 == 1) && (this.state.selectedIndex2 == 1)) {
                this.setState(prevState => ({
                    selectedIndex1: prevState.selectedIndex1
                }));      
             }
             if ((this.state.Default_Rating2 == 2) && (this.state.selectedIndex2 != 1)) {
                this.setState(prevState => ({
                    selectedIndex1: prevState.selectedIndex1 + 1 
                }));      
             }
             if ((this.state.Default_Rating2 == 2) && (this.state.selectedIndex1 == 1)) {
                this.setState(prevState => ({
                    selectedIndex1: prevState.selectedIndex1  
                }));      
             }
             if ((this.state.Default_Rating2 == 3) && (this.state.selectedIndex2 != 1)) {
                this.setState(prevState => ({
                    selectedIndex1: prevState.selectedIndex1 + 1 
                }));      
             }
             if ((this.state.Default_Rating2 == 3) && (this.state.selectedIndex2 == 1)) {
                this.setState(prevState => ({
                    selectedIndex1: prevState.selectedIndex1
                }));      
             }
             if ((this.state.Default_Rating2 == 4) && (this.state.selectedIndex2 != 1)) {
                this.setState(prevState => ({
                    selectedIndex1: prevState.selectedIndex1  
                }));      
             }
             if ((this.state.Default_Rating2 == 4) && (this.state.selectedIndex2 == 1)) {
                this.setState(prevState => ({
                    selectedIndex1: prevState.selectedIndex1 - 1 
                }));      
             }
             if ((this.state.Default_Rating2 == 5) && (this.state.selectedIndex2 != 1)) {
                this.setState(prevState => ({
                    selectedIndex1: prevState.selectedIndex1  
                }));      
             }
             if ((this.state.Default_Rating2 == 5) && (this.state.selectedIndex2 == 1)) {
                this.setState(prevState => ({
                    selectedIndex1: prevState.selectedIndex1 - 1 
                }));      
             }
            } 
    
            Load_New_Image3=()=>{
              if ((this.state.Default_Rating3 == 0) && (this.state.selectedIndex3 != 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3 + 1 
                  }));      
               }
               if ((this.state.Default_Rating3 == 0) && (this.state.selectedIndex3 == 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3
                  }));      
               }
               if ((this.state.Default_Rating3 == 1) && (this.state.selectedIndex3 != 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3 + 1 
                  }));      
               }
               if ((this.state.Default_Rating3 == 1) && (this.state.selectedIndex3 == 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3
                  }));      
               }
               if ((this.state.Default_Rating3 == 2) && (this.state.selectedIndex3 != 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3 + 1 
                  }));      
               }
               if ((this.state.Default_Rating3 == 2) && (this.state.selectedIndex3 == 1)) {
                  this.setState(prevState => ({
                      selectedIndex3: prevState.selectedIndex3  
                  }));      
               }
               if ((this.state.Default_Rating3 == 3) && (this.state.selectedIndex3 != 1)) {
                  this.setState(prevState => ({
                      selectedIndex1: prevState.selectedIndex1 + 1 
                  }));      
               }
               if ((this.state.Default_Rating3 == 3) && (this.state.selectedIndex3 == 1)) {
                  this.setState(prevState => ({
                      selectedIndex1: prevState.selectedIndex1
                  }));      
               }
               if ((this.state.Default_Rating3 == 4) && (this.state.selectedIndex3 != 1)) {
                  this.setState(prevState => ({
                      selectedIndex1: prevState.selectedIndex1  
                  }));      
               }
               if ((this.state.Default_Rating3 == 4) && (this.state.selectedIndex3 == 1)) {
                  this.setState(prevState => ({
                      selectedIndex1: prevState.selectedIndex1 - 1 
                  }));      
               }
               if ((this.state.Default_Rating3 == 5) && (this.state.selectedIndex3 != 1)) {
                  this.setState(prevState => ({
                      selectedIndex1: prevState.selectedIndex1  
                  }));      
               }
               if ((this.state.Default_Rating3 == 5) && (this.state.selectedIndex3 == 1)) {
                  this.setState(prevState => ({
                      selectedIndex1: prevState.selectedIndex1 - 1 
                  }));      
               }
              } 
    
              Load_New_Image4=()=>{
                if ((this.state.Default_Rating4 == 0) && (this.state.selectedIndex4 != 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4 + 1 
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 0) && (this.state.selectedIndex4 == 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 1) && (this.state.selectedIndex4 != 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4 + 1 
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 1) && (this.state.selectedIndex4 == 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 2) && (this.state.selectedIndex4 != 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4 + 1 
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 2) && (this.state.selectedIndex4 == 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4  
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 3) && (this.state.selectedIndex4 != 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4 + 1 
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 3) && (this.state.selectedIndex4 == 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 4) && (this.state.selectedIndex4 != 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4  
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 4) && (this.state.selectedIndex4 == 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4 - 1 
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 5) && (this.state.selectedIndex4 != 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4  
                    }));      
                 }
                 if ((this.state.Default_Rating4 == 5) && (this.state.selectedIndex4 == 1)) {
                    this.setState(prevState => ({
                        selectedIndex4: prevState.selectedIndex4 - 1 
                    }));      
                 }
                } 
    
                Load_New_Image5=()=>{
                  if ((this.state.Default_Rating5 == 0) && (this.state.selectedIndex5 != 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5 + 1 
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 0) && (this.state.selectedIndex5 == 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 1) && (this.state.selectedIndex5 != 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5 + 1 
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 1) && (this.state.selectedIndex5 == 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 2) && (this.state.selectedIndex5 != 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5 + 1 
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 2) && (this.state.selectedIndex5 == 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5  
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 3) && (this.state.selectedIndex5 != 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5 + 1 
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 3) && (this.state.selectedIndex5 == 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 4) && (this.state.selectedIndex5 != 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5  
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 4) && (this.state.selectedIndex5 == 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5 - 1 
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 5) && (this.state.selectedIndex5 != 1)) {
                      this.setState(prevState => ({
                          selectedIndex1: prevState.selectedIndex1  
                      }));      
                   }
                   if ((this.state.Default_Rating5 == 5) && (this.state.selectedIndex5 == 1)) {
                      this.setState(prevState => ({
                          selectedIndex5: prevState.selectedIndex5 - 1 
                      }));      
                   }
                  } 
    
                  Load_New_Image6=()=>{
                    if ((this.state.Default_Rating6 == 0) && (this.state.selectedIndex6 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6 + 1 
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 0) && (this.state.selectedIndex6 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 1) && (this.state.selectedIndex6 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6 + 1 
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 1) && (this.state.selectedIndex6 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 2) && (this.state.selectedIndex6 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6 + 1 
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 2) && (this.state.selectedIndex6 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6  
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 3) && (this.state.selectedIndex6 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6 + 1 
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 3) && (this.state.selectedIndex6 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 4) && (this.state.selectedIndex6 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6  
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 4) && (this.state.selectedIndex6 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6 - 1 
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 5) && (this.state.selectedIndex6 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6  
                        }));      
                     }
                     if ((this.state.Default_Rating6 == 5) && (this.state.selectedIndex6 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex6: prevState.selectedIndex6 - 1 
                        }));      
                     }
                    } 
            
    
                  Load_New_Image7=()=>{
                    if ((this.state.Default_Rating7 == 0) && (this.state.selectedIndex7 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7 + 1 
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 0) && (this.state.selectedIndex7 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 1) && (this.state.selectedIndex7 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7 + 1 
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 1) && (this.state.selectedIndex7 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 2) && (this.state.selectedIndex7 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7 + 1 
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 2) && (this.state.selectedIndex7 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7  
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 3) && (this.state.selectedIndex7 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7 + 1 
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 3) && (this.state.selectedIndex7 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 4) && (this.state.selectedIndex7 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7  
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 4) && (this.state.selectedIndex7 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7 - 1 
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 5) && (this.state.selectedIndex7 != 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7  
                        }));      
                     }
                     if ((this.state.Default_Rating7 == 5) && (this.state.selectedIndex7 == 1)) {
                        this.setState(prevState => ({
                            selectedIndex7: prevState.selectedIndex7 - 1 
                        }));      
                     }
                    } 
            
          
          
        
      render() {
        const{ selectedIndex, ratingImages} = this.state
        let React_Native_Rating_Bar = [];
        //Array to hold the filled or empty Stars
        for (var i = 1; i <= this.state.Max_Rating; i++) {
          React_Native_Rating_Bar.push(
            <TouchableOpacity
              activeOpacity={0.5}
              key={i}
              onPress={this.UpdateRating.bind(this, i)}>
              <Image
                style={styles.StarImage}
                source={
                  i <= this.state.Default_Rating
                    ? { uri: this.Star }
                    : { uri: this.Star_With_Border }
                }
              />
            </TouchableOpacity>
          );
        }
    
        const{ selectedIndex1} = this.state
        let React_Native_Rating_Bar1 = [];
        //Array to hold the filled or empty Stars
        for (var i = 1; i <= this.state.Max_Rating; i++) {
          React_Native_Rating_Bar1.push(
            <TouchableOpacity
              activeOpacity={0.5}
              key={i}
              onPress={this.UpdateRating1.bind(this, i)}>
              <Image
                style={styles.StarImage}
                source={
                  i <= this.state.Default_Rating1
                    ? { uri: this.Star }
                    : { uri: this.Star_With_Border }
                }
              />
            </TouchableOpacity>
          );
        }
    
        const{ selectedIndex2} = this.state
        let React_Native_Rating_Bar2 = [];
        //Array to hold the filled or empty Stars
        for (var i = 1; i <= this.state.Max_Rating; i++) {
          React_Native_Rating_Bar2.push(
            <TouchableOpacity
              activeOpacity={0.5}
              key={i}
              onPress={this.UpdateRating2.bind(this, i)}>
              <Image
                style={styles.StarImage}
                source={
                  i <= this.state.Default_Rating2
                    ? { uri: this.Star }
                    : { uri: this.Star_With_Border }
                }
              />
            </TouchableOpacity>
          );
        }
    
        const{ selectedIndex3} = this.state
        let React_Native_Rating_Bar3 = [];
        //Array to hold the filled or empty Stars
        for (var i = 1; i <= this.state.Max_Rating; i++) {
          React_Native_Rating_Bar3.push(
            <TouchableOpacity
              activeOpacity={0.5}
              key={i}
              onPress={this.UpdateRating3.bind(this, i)}>
              <Image
                style={styles.StarImage}
                source={
                  i <= this.state.Default_Rating3
                    ? { uri: this.Star }
                    : { uri: this.Star_With_Border }
                }
              />
            </TouchableOpacity>
          );
        }
    
        const{ selectedIndex4} = this.state
        let React_Native_Rating_Bar4 = [];
        //Array to hold the filled or empty Stars
        for (var i = 1; i <= this.state.Max_Rating; i++) {
          React_Native_Rating_Bar4.push(
            <TouchableOpacity
              activeOpacity={0.5}
              key={i}
              onPress={this.UpdateRating4.bind(this, i)}>
              <Image
                style={styles.StarImage}
                source={
                  i <= this.state.Default_Rating4
                    ? { uri: this.Star }
                    : { uri: this.Star_With_Border }
                }
              />
            </TouchableOpacity>
          );
        }
    
        const{ selectedIndex5 } = this.state
        let React_Native_Rating_Bar5 = [];
        //Array to hold the filled or empty Stars
        for (var i = 1; i <= this.state.Max_Rating; i++) {
          React_Native_Rating_Bar5.push(
            <TouchableOpacity
              activeOpacity={0.5}
              key={i}
              onPress={this.UpdateRating5.bind(this, i)}>
              <Image
                style={styles.StarImage}
                source={
                  i <= this.state.Default_Rating5
                    ? { uri: this.Star }
                    : { uri: this.Star_With_Border }
                }
              />
            </TouchableOpacity>
          );
        }
     
        const{ selectedIndex6} = this.state
        let React_Native_Rating_Bar6 = [];
        //Array to hold the filled or empty Stars
        for (var i = 1; i <= this.state.Max_Rating; i++) {
          React_Native_Rating_Bar6.push(
            <TouchableOpacity
              activeOpacity={0.5}
              key={i}
              onPress={this.UpdateRating6.bind(this, i)}>
              <Image
                style={styles.StarImage}
                source={
                  i <= this.state.Default_Rating6
                    ? { uri: this.Star }
                    : { uri: this.Star_With_Border }
                }
              />
            </TouchableOpacity>
          );
        }
    
        const{ selectedIndex7 } = this.state
        let React_Native_Rating_Bar7 = [];
        //Array to hold the filled or empty Stars
        for (var i = 1; i <= this.state.Max_Rating; i++) {
          React_Native_Rating_Bar7.push(
            <TouchableOpacity
              activeOpacity={0.5}
              key={i}
              onPress={this.UpdateRating7.bind(this, i)}>
              <Image
                style={styles.StarImage}
                source={
                  i <= this.state.Default_Rating7
                    ? { uri: this.Star }
                    : { uri: this.Star_With_Border }
                }
              />
            </TouchableOpacity>
          );
        }
        return (
    <ScrollView style = {{flex:1, width: 100 + "%", backgroundColor:'black'}}> 
                        
    <View style = {styles.userBar}> 
         <View style={styles.MainContainer}>
    <Text style={{color: 'white', flex: 1}}> {this.state.SmashRating} </Text>
    <Text style={{color: 'white', flex: 1, fontSize: 30, marginBottom: 470, marginRight: 250}}> {this.state.Default_Rating} </Text>
    
                {/*View to hold our Stars*/}
                <View style={styles.childView}>{React_Native_Rating_Bar}</View>
                
                <View style={{flex: 1, color: 'white', width: '100%', height: "10%"}}> 
                <Image source={{ uri: ratingImages[selectedIndex]}} style={{height: '150%', width: '8%', marginLeft: 360, marginTop: -35}} /> 
                </View>
                <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={this.Load_New_Image}>
                {/*onPress={this.Load_New_Image}>
                {/*Clicking on button will show the rating as an alert
                <Text>Rate</Text>*/}
                </TouchableOpacity>
    </View>            
    </View>
    <View style = {styles.iconBar}>
    </View>
    
    
    
    <View style = {styles.userBar}> 
         <View style={styles.MainContainer}>
    <Text style={{color: 'white', flex: 1}}> {this.state.HeatMeterRating} </Text>
    <Text style={{color: 'white', flex: 1, fontSize: 30, marginBottom: 470, marginRight: 250}}> {this.state.Default_Rating1} </Text>
    
                {/*View to hold our Stars*/}
                <View style={styles.childView}>{React_Native_Rating_Bar1}</View>
                
                <View style={{flex: 1, color: 'white', width: '100%', height: "10%"}}> 
                <Image source={{ uri: ratingImages[selectedIndex1]}} style={{height: '150%', width: '8%', marginLeft: 360, marginTop: -35}} /> 
                </View>
                <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={this.Load_New_Image1}>
                {/*onPress={this.Load_New_Image}>
                {/*Clicking on button will show the rating as an alert
                <Text>Rate</Text>*/}
                </TouchableOpacity>
    </View>            
    </View>
    <View style = {styles.iconBar}>
    </View>
    
    
    <View style = {styles.userBar}> 
         <View style={styles.MainContainer}>
    <Text style={{color: 'white', flex: 1}}> {this.state.LossenessRating} </Text>
    <Text style={{color: 'white', flex: 1, fontSize: 30, marginBottom: 470, marginRight: 250}}> {this.state.Default_Rating2} </Text>
    
                {/*View to hold our Stars*/}
                <View style={styles.childView}>{React_Native_Rating_Bar2}</View>
                
                <View style={{flex: 1, color: 'white', width: '100%', height: "10%"}}> 
                <Image source={{ uri: ratingImages[selectedIndex2]}} style={{height: '150%', width: '8%', marginLeft: 360, marginTop: -35}} /> 
                </View>
                <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={this.Load_New_Image2}>
                {/*onPress={this.Load_New_Image}>
                {/*Clicking on button will show the rating as an alert
                <Text>Rate</Text>*/}
                </TouchableOpacity>
    </View>            
    </View>
    <View style = {styles.iconBar}>
    </View>
    
    <View style = {styles.userBar}> 
         <View style={styles.MainContainer}>
    <Text style={{color: 'white', flex: 1}}> {this.state.ThicknessRating} </Text>
    <Text style={{color: 'white', flex: 1, fontSize: 30, marginBottom: 470, marginRight: 250}}> {this.state.Default_Rating3} </Text>
    
                {/*View to hold our Stars*/}
                <View style={styles.childView}>{React_Native_Rating_Bar3}</View>
                
                <View style={{flex: 1, color: 'white', width: '100%', height: "10%"}}> 
                <Image source={{ uri: ratingImages[selectedIndex3]}} style={{height: '150%', width: '8%', marginLeft: 360, marginTop: -35}} /> 
                </View>
                <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={this.Load_New_Image3}>
                {/*onPress={this.Load_New_Image}>
                {/*Clicking on button will show the rating as an alert
                <Text>Rate</Text>*/}
                </TouchableOpacity>
    </View>            
    </View>
    <View style = {styles.iconBar}>
    </View>
    
    
    <View style = {styles.userBar}> 
         <View style={styles.MainContainer}>
    <Text style={{color: 'white', flex: 1}}> {this.state.IntelligenceRating} </Text>
    <Text style={{color: 'white', flex: 1, fontSize: 30, marginBottom: 470, marginRight: 250}}> {this.state.Default_Rating4} </Text>
    
                {/*View to hold our Stars*/}
                <View style={styles.childView}>{React_Native_Rating_Bar4}</View>
                
                <View style={{flex: 1, color: 'white', width: '100%', height: "10%"}}> 
                <Image source={{ uri: ratingImages[selectedIndex4]}} style={{height: '150%', width: '8%', marginLeft: 360, marginTop: -35}} /> 
                </View>
                <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={this.Load_New_Image4}>
                {/*onPress={this.Load_New_Image}>
                {/*Clicking on button will show the rating as an alert
                <Text>Rate</Text>*/}
                </TouchableOpacity>
    </View>            
    </View>
    <View style = {styles.iconBar}>
    </View>
    
    <View style = {styles.userBar}> 
         <View style={styles.MainContainer}>
    <Text style={{color: 'white', flex: 1}}> {this.state.SavagenessRating} </Text>
    <Text style={{color: 'white', flex: 1, fontSize: 30, marginBottom: 470, marginRight: 250}}> {this.state.Default_Rating5} </Text>
    
                {/*View to hold our Stars*/}
                <View style={styles.childView}>{React_Native_Rating_Bar5}</View>
                
                <View style={{flex: 1, color: 'white', width: '100%', height: "10%"}}> 
                <Image source={{ uri: ratingImages[selectedIndex5]}} style={{height: '150%', width: '8%', marginLeft: 360, marginTop: -35}} /> 
                </View>
                <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={this.Load_New_Image5}>
                {/*onPress={this.Load_New_Image}>
                {/*Clicking on button will show the rating as an alert
                <Text>Rate</Text>*/}
                </TouchableOpacity>
    </View>            
    </View>
    <View style = {styles.iconBar}>
    </View>
    
    <View style = {styles.userBar}> 
         <View style={styles.MainContainer}>
    <Text style={{color: 'white', flex: 1}}> {this.state.RatchetnessRating} </Text>
    <Text style={{color: 'white', flex: 1, fontSize: 30, marginBottom: 470, marginRight: 250}}> {this.state.Default_Rating6} </Text>
    
                {/*View to hold our Stars*/}
                <View style={styles.childView}>{React_Native_Rating_Bar6}</View>
                
                <View style={{flex: 1, color: 'white', width: '100%', height: "10%"}}> 
                <Image source={{ uri: ratingImages[selectedIndex6]}} style={{height: '150%', width: '8%', marginLeft: 360, marginTop: -35}} /> 
                </View>
                <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={this.Load_New_Image6}>
                {/*onPress={this.Load_New_Image}>
                {/*Clicking on button will show the rating as an alert
                <Text>Rate</Text>*/}
                </TouchableOpacity>
    </View>            
    </View>
    <View style = {styles.iconBar}>
    </View>
    
    <View style = {styles.userBar}> 
         <View style={styles.MainContainer}>
    <Text style={{color: 'white', flex: 1}}> {this.state.DiversityRating} </Text>
    <Text style={{color: 'white', flex: 1, fontSize: 30, marginBottom: 470, marginRight: 250}}> {this.state.Default_Rating7} </Text>
    
                {/*View to hold our Stars*/}
                <View style={styles.childView}>{React_Native_Rating_Bar7}</View>
                
                <View style={{flex: 1, color: 'white', width: '100%', height: "10%"}}> 
                <Image source={{ uri: ratingImages[selectedIndex7]}} style={{height: '150%', width: '8%', marginLeft: 360, marginTop: -35}} /> 
                </View>
                <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={this.Load_New_Image7}>
                {/*onPress={this.Load_New_Image}>
                {/*Clicking on button will show the rating as an alert
                <Text>Rate</Text>*/}
                </TouchableOpacity>
    </View>            
    </View>
    <View style = {styles.iconBar}>
    </View>
    
    
    </ScrollView>
    
        )
        }
    }
    
    const styles = StyleSheet.create({
      MainContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: Platform.OS === 'ios' ? 20 : 0,
        },
        childView: {
          justifyContent: 'center',
          flexDirection: 'row',
          marginTop: -500,
          marginLeft: 10
        },
        button: {
          justifyContent: 'center',
          flexDirection: 'row',
          marginTop: -60,
          marginLeft: 225,
          padding: 10,
          backgroundColor: 'rgba(0,0,0,0)',
        },
        StarImage: {
          width: 25,
          height: 25,
          resizeMode: 'cover',
        },
      iconBar: {
          height: 40,
          width: 100 + "%",
          flexDirection: 'row',
          alignItems: 'flex-start',
          borderBottomWidth: 1,
          borderColor: "gray"
      },
      userBar: {
          width: 100 + "%",
          height: 80,
          backgroundColor: 'black',
          flexDirection: "row",
          justifyContent: "center",
          borderColor: "gray",  
      }, 
    }); 
export default OrgRatingFeed;