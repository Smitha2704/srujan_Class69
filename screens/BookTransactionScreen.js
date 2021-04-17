import React from 'react';
import { Text, View, TouchableOpacity,StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions' ;
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class TransactionScreen extends React.Component {
  constructor(){
    super();
    this.state={
      hasCameraPermissions: null,
      scanned:false,
      scannedData:'',
      buttonState:'normal'
    }
  }

  getCameraPermissions=async()=>{
    const {status} = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({

      // status === granted is true when user has camera permissions
      // status !== granted is true when user has camera permissions

      hasCameraPermissions: status==='granted',
      buttonState:'clicked',
      scanned:false
    })

  }
  handleBarcodeScanned=(type,data)=>{
     this.setState({
       scanned:true,
       scannedData:data,
       buttonState:'normal'
     })
  }
    render() {
      const hasCameraPermissions= this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState=this.state.buttonState;

      if(buttonState==='clicked' && hasCameraPermissions){
        return(
          <BarCodeScanner
           onBarCodeScanned={scanned? undefined:this.handleBarcodeScanned}
           style={StyleSheet.absoluteFillObject}/>
        )
      }
      else if(buttonState==='normal'){
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.displayText}>{
              hasCameraPermissions=== true? this.state.scannedData:"Request Camera Permissions"
            }
            </Text>
            <TouchableOpacity
              onPress = {this.getCameraPermissions}
              style={styles.scanButton}>
              <Text>Scan QR Code</Text>
            </TouchableOpacity>
          </View>
        );
      }
    }
  }

  const styles=StyleSheet.create({
    scanButton:{
      backgroundColor:"green",
      padding:10,
      marin:10
    },
    displayText:{
      textDecorationLine:"underline",
      textSize:20
    }
  })