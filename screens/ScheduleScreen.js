import { StyleSheet, Text, ScrollView, View, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import colors from '../styling/color.js'
import AnnouncementScreen from './AnnouncementScreen.js';

const ScheduleScreen = ({ route,  task, icon, theme, stamp}) => {
    const [email, setEmail] = useState(route.params.email);
    const [events, setEvents] = useState([]);
    // let events = [];
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
        let url = "https://sheets.googleapis.com/v4/spreadsheets/1JamcQYLqAkSdbzQSgksModEUcae3dov-1QGK250Yln0/values/sheet1?valueRenderOption=FORMATTED_VALUE&key=AIzaSyDMalvDBVjc-wzIZ59cQGhKhEbgUMO6r2w";        try {
            axios.get(url).then(res => {
                if (res.data) {
                    setEvents(res.data.values.slice(1))
                    // events = res.data.values.slice(1);
                    // populate_user_data()
                    // get_only_team_data()
                }
            })
        } catch (error) {
            console.log(error);
        }
    }, []) 
    // [] is dependency array, if changed will cal useEffect againg???

    function populate_user_data() {
        let url = "https://masti-dynamodb-apis-pearl.vercel.app/participant/" + email;
        try {
            axios.get(url).then(res => {
                if (res.data) {
                    console.log(events)
                    setTeam(res.data.item.team);
                }
            })
        } catch (error) {
            console.log(error);
        }

        console.log(events);
        for (let i = 0; i < events.length; i++) {
            console.log(events[i][3].toLowerCase().replace(/ /g, "") === team.toLowerCase().replace(/ /g, ""))
            if (events[i].length === 4 && events[i][3].toLowerCase().replace(/ /g, "") === team.toLowerCase().replace(/ /g, "")) {
                ret.push(events[i]);
            }
        }
        // setEvents(ret);
        events = ret;
    }

    function get_only_team_data() {
        ret = [];
        // let i = 0;
        // while (i < events.length && events[i][0].toLowerCase() != team.toLowerCase()) {
        //     i++;
        // }
        // i++;
        // while ()
    }

    return (
        <ScrollView>
            {events.map((files, index) => (
            <Card key={index} style={styles.container}>
                <Card.Title
                title={!files[1] ? "Not Provided" : files[1]}
                left={() => <Ionicons name="md-person" size={50} color="#fff" />}
                />
                <Card.Content style={styles.content}>
                <Text style={styles.title}>Team Name:</Text>
                <Text style={styles.paragraph}>
                    {!files[0] ? "Not Given" : files[0]}
                </Text>
                </Card.Content>
                <Card.Content style={styles.content}>
                <Text style={styles.title}>Message:</Text>
                <Text style={styles.paragraph}>
                    {!files[2] ? "Not Provided" : files[2]}
                </Text>
                </Card.Content>
                <Card.Content style={styles.content}>
                <Text style={styles.title}>Time:</Text>
                <Text style={styles.paragraph}>
                    {!files[4] ? "Not Provided" : files[3]}
                </Text>
                </Card.Content>
                <Card.Content style={styles.content}>
                <Text style={styles.title}>Venue:</Text>
                <Text style={styles.paragraph}>
                    {!files[3] ? "Not Provided" : files[4]}
                </Text>
                </Card.Content>
            </Card>
            ))}
        </ScrollView>
    );
}

export default ScheduleScreen

const styles = StyleSheet.create({})