import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

// NEED: Pull to refresh
const AnnouncementScreen = ({ route }) => {
    const [email, setEmail] = useState(route.params.email);
    const [announcements, setAnnouncements] = useState([{}]);
    // useEffect(() => {
    //     let url = "https://masti-dynamodb-apis-pearl.vercel.app/announcement/";
    //     try {
    //         axios.get(url).then(res => {
    //             if (res.data) {
    //                 setAnnouncements(res.data.sortedData);
    //             }
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [])

    // After this block the announcements variable will be a 2D Array
    // The inner arrays will be of length 2
    // The 0th index is the announcement title and the 1st index is the message
    useEffect(() => {
        let url = "https://sheets.googleapis.com/v4/spreadsheets/1VaQZdInV3uLYQhvVV55X1Vtmckrif7ckELqnN9GTPd4/values/sheet1?valueRenderOption=FORMATTED_VALUE&key=AIzaSyDMalvDBVjc-wzIZ59cQGhKhEbgUMO6r2w";
        try {
            axios.get(url).then(res => {
                if (res.data) {
                    setAnnouncements(res.data.values.slice(1));
                }
            })
        } catch (error) {
            console.log(error);
        }
    }, [])

    // Replace the inner <View> with styling for a block
    return (
        <View>
            {announcements.map((data, index) => {
                return (
                    <View key={index}>
                        <Text>{data[0]}</Text>
                        <Text>{data[1]}</Text>
                        <Text>--------------</Text>
                    </View>
                );
            })}
        </View>
    )
}

export default AnnouncementScreen

const styles = StyleSheet.create({})