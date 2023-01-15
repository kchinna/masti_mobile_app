import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios';

const ScheduleScreen = ({ route }) => {
    const [email, setEmail] = useState(route.params.email);
    const [events, setEvents] = useState([{}]);
    useEffect(() => {
        let url = "http://192.168.87.50:3001/participant/" + email;
        try {
            axios.get(url).then(res => {
                if (res.data) {
                    url = "http://192.168.87.50:3001/schedule/" + res.data.item.team;
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