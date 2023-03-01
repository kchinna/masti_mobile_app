import { StyleSheet, Text, ScrollView, View, StatusBar, RefreshControl } from 'react-native'
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
    const [refreshing, setRefreshing] = React.useState(false);
    const [ref, setRef] = React.useState(0);

    useEffect(() => {
        let url = "https://masti-dynamodb-apis-pearl.vercel.app/participant/" + email;
        try {
            axios.get(url).then(res => {
                if (res.data) {
                    let team = res.data.item.team;
                    // console.log(res.data)
                    let url2 = "https://sheets.googleapis.com/v4/spreadsheets/1JamcQYLqAkSdbzQSgksModEUcae3dov-1QGK250Yln0/values/sheet1?valueRenderOption=FORMATTED_VALUE&key=AIzaSyDMalvDBVjc-wzIZ59cQGhKhEbgUMO6r2w";
                    try {
                        axios.get(url2).then(res => {
                            if (res.data) {
                                let data = get_only_team_data(res.data.values.splice(1), team);
                                setEvents(data);
                            }
                        })
                    } catch (error) {
                        console.log(error);
                    }
                }
            })
        } catch (error) {
            console.log(error);
        }
    }, [ref]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setRef(ref + 1);
        setRefreshing(false);
      }, [ref]);

    function get_only_team_data(data, team) {
        let ret = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].length === 4 && data[i][3].toLowerCase().replace(/ /g, "") === team.toLowerCase().replace(/ /g, "")) {
                ret.push(data[i]);
            }
        }
        return ret;
    }

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
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