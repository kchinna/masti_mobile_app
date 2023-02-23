import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios';

const ScheduleScreen = ({ route }) => {
    const [email, setEmail] = useState(route.params.email);
    const [events, setEvents] = useState([{}]);
    useEffect(() => {
        let url = "https://masti-dynamodb-apis-pearl.vercel.app/participant/" + email;
        try {
            axios.get(url).then(res => {
                if (res.data) {
                    url = "https://masti-dynamodb-apis-pearl.vercel.app/schedule/" + res.data.item.team;
                    try {
                        axios.get(url).then(res => {
                            if (res.data) {
                                setEvents(res.data.teamData);
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
    }, [])
    return (
        <View>
            {events.map((data, index) => {
                return (
                    <View key={index}>
                        <Text>{data.event}</Text>
                        <Text>{data.timestamp}</Text>
                        <Text>--------------</Text>
                    </View>
                );
            })}
        </View>
    )
}

export default ScheduleScreen

const styles = StyleSheet.create({})