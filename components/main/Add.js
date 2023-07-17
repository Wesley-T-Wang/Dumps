
import React, { useState, useEffect } from 'react'
import { Camera, CameraType } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker'

export default function Add() {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [image, setImage] = useState(null);
    const [camera, setCamera] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if(camera){
            const data = await camera.takePictureAsync(null);
            setImage(data.uri);
            console.log(image);
        }
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsMultipleSelection: true,
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          setImage(result.assets[0].uri);
        }
    }

    if (hasPermission === null) {
        return (
            <View>

            </View>
        );
    }
    if (hasPermission === false) {
        return (
            <Text>
                Permission not granted to access camera
            </Text>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.cameraContainer}>
                <Camera 
                ref={ref => setCamera(ref)} style={styles.fixedRatio} type={type}/>
            </View>
            <Button
                title='Flip Image'
                onPress={() => {
                    setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
                }}>
            </Button>
            <Button title='Take Picture' onPress={()=> takePicture()}/>
            <Button title='Select Images' onPress={()=> pickImage()}/>

            {image && <Image source={{uri: image}} style={{flex: 0.5}}/>}
        </View>
    );
}


const styles = StyleSheet.create({
    cameraContainer:{
        flex:1,
        flexDirection: 'row'
    },
    fixedRatio:{
        flex:1,
    }
})
