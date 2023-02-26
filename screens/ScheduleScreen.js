import { StyleSheet, Text, ScrollView, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios';

const ScheduleScreen = ({ route }) => {
    const [email, setEmail] = useState(route.params.email);
    const [events, setEvents] = useState([{}]);
    // const [userData, setUserData] = useState({});
    const [team, setTeam] = useState("");

    // useEffect(() => {
    //     let url = "https://masti-dynamodb-apis-pearl.vercel.app/participant/" + email;
    //     try {
    //         axios.get(url).then(res => {
    //             if (res.data) {
    //                 url = "https://masti-dynamodb-apis-pearl.vercel.app/schedule/" + res.data.item.team;
    //                 try {
    //                     axios.get(url).then(res => {
    //                         if (res.data) {
    //                             setEvents(res.data.teamData);
    //                             populate_user_data();
    //                         }
    //                     })
    //                 } catch (error) {
    //                     console.log(error);
    //                 }
    //             }
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [])

    // After this block the events variable will be a 2D Array
    // The inner arrays will be of length 2
    // The 0th index is the event name and the 1st index is the time (as a string)
    // Also if needed, the team name of the user is in the variable team
    // 
    // Currently all the data comes from 1 sheet, but we want to...
    // Have a sheet for each team
    // OR
    // Place all data in 1 sheet, but have a team column and parse only the
    // rows with the team name in it
    useEffect(() => {
        let url = "https://sheets.googleapis.com/v4/spreadsheets/1JamcQYLqAkSdbzQSgksModEUcae3dov-1QGK250Yln0/values/sheet1?valueRenderOption=FORMATTED_VALUE&key=AIzaSyDMalvDBVjc-wzIZ59cQGhKhEbgUMO6r2w";
        try {
            axios.get(url).then(res => {
                if (res.data) {
                    setEvents(res.data.values.slice(1));
                    populate_user_data();
                }
            })
        } catch (error) {
            console.log(error);
        }
    }, [])

    function populate_user_data() {
        let url = "https://masti-dynamodb-apis-pearl.vercel.app/participant/" + email;
        try {
            axios.get(url).then(res => {
                if (res.data) {
                    setTeam(res.data.item.team);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ScrollView>
            {events.map((data, index) => {
                return (
                    <View key={index}>
                        <Text>{data[0]}</Text>
                        <Text>{data[1]}</Text>
                        <Text>{data[2]}</Text>
                        <Text>{data[3]}</Text>
                        <Text>--------------</Text>
                    </View>
                );
            })}
        </ScrollView>
    )
}

export default ScheduleScreen

const styles = StyleSheet.create({})