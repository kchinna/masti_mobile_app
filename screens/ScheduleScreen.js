import { StyleSheet, Text, ScrollView, View, StatusBar, RefreshControl, Image } from 'react-native'
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
                    // let url2 = "https://sheets.googleapis.com/v4/spreadsheets/117UsKsev9eAnEWmQUKNdExtzc9Q0_zQ7XVO6EVmfQtY/values/Sheet1?valueRenderOption=FORMATTED_VALUE&key=AIzaSyDMalvDBVjc-wzIZ59cQGhKhEbgUMO6r2w";
                    let url2 = "https://sheets.googleapis.com/v4/spreadsheets/1MqEhuJUKs8IU2iBatGANvPpOxclu90USlsOyDrd-nSE/values/Team Schedules?valueRenderOption=FORMATTED_VALUE&key=AIzaSyDMalvDBVjc-wzIZ59cQGhKhEbgUMO6r2w";
                    try {
                        axios.get(url2).then(res => {
                            if (res.data) {
                                let data = get_only_team_data(res.data.values, team);
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
            if (data[i].length == 1 && data[i][0].toLowerCase().includes(team.toLowerCase())) {
                let j = i + 1;
                while (data[j].length != 1) {
                    if (data[j].length == 2) {
                        ret.push(data[j]);
                    }
                    j += 1;
                }
                i = data.length; // end loop
            }
        }
        return ret.splice(1);
    }

    return (
        <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        style={styles.container}
      >
        {events.map((files, index) => (
          <Card key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{!files[1] ? "Not Provided" : files[1]}</Text>
              {/* <Ionicons name="md-person" size={50} color="#fff" /> */}
            </View>
            <Card.Content style={styles.cardContent}>
              {/* <Text style={styles.cardSubTitle}>Message:</Text> */}
              <Text style={styles.cardText}>
                {!files[0] ? "Not Given" : files[0]}
              </Text>
              
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
    },
    card: {
      marginHorizontal: 10,
      marginVertical: 5,
      borderRadius: 10,
      elevation: 5,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      shadowOffset: { width: 0, height: 2 },
    },
    cardHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      backgroundColor: colors.red,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    cardTitle: {
      flex: 1,
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    cardContent: {
      padding: 10,
    },
    cardSubTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    cardText: {
      fontSize: 14,
      marginVertical: 5,
    },
    cardImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      alignSelf: 'flex-end',
      margin: 10,
    },
  });
  
  export default ScheduleScreen;