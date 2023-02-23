import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AnnouncementScreen = ({ route }) => {
    const [email, setEmail] = useState(route.params.email);
    const [announcements, setAnnouncements] = useState([{}]);
    useEffect(() => {
        let url = "https://masti-dynamodb-apis-pearl.vercel.app/announcement/";
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
            {announcements.map((data, index) => {
                return (
                    <View key={index}>
                        <Text>{data.message}</Text>
                        <Text>{data.timestamp}</Text>
                        <Text>--------------</Text>
                    </View>
                );
            })}
        </View>
    )
}

export default AnnouncementScreen

const styles = StyleSheet.create({})