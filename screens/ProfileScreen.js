import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios';

// NEED: generate qr code for json data
// NEED: logout option
const ProfileScreen = ({ route }) => {
    const [email, setEmail] = useState(route.params.email);
    const [userData, setUserData] = useState({});
    useEffect(() => {
        let url = "http://192.168.87.50:3001/participant/" + email;
        try {
            axios.get(url).then(res => {
                if (res.data) {
                    setUserData(res.data.item);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }, [])
    return (
        <View>
            <Text>{userData.name}</Text>
            <Text>{userData.team}</Text>
            <Text>{userData.hotel}</Text>
            <Text>{userData.stamp}</Text>
            <Text>{userData.diet}</Text>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})