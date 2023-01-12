import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'


// MARKED ISSUE: does not live update announcements
const HomeScreen = ({ route }) => {
    const [email, setEmail] = useState(route.params.email);
    const [announcements, setAnnouncements] = useState([{}]);
    useEffect(() => {
        let url = "http://192.168.87.50:3001/announcement/";
        try {
            axios.get(url).then(res => {
                if (res.data) {
                    setAnnouncements(res.data.sortedData);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }, [])
    return (
        <View>
            {announcements.map(data => {
                return (
                    <View key={data.uuid}>
                        <Text>{data.message}</Text>
                        <Text>{data.timestamp}</Text>
                        <Text>--------------</Text>
                    </View>
                );
            })}
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})