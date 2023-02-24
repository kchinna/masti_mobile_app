import React, { useEffect, useState } from "react";
import { StyleSheet, Text, ScrollView, ActivityIndicator } from "react-native";
import { Card } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
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
        <ScrollView>
            {announcements.map((files, index) => (
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

const styles = StyleSheet.create({
    container: {
      margin: 10,
      borderWidth: 4,
      borderRadius: 20,
      backgroundColor: "rgba(255,192,203, 100)",
      borderColor: "rgba(255,192,203, 100)",
    },
    content: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      marginBottom: 10,
      flexWrap: "wrap",
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      marginRight: 15,
    },
    paragraph: {
      fontSize: 18,
    },
  });

export default AnnouncementScreen

