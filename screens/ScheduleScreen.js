
import axios from 'axios';
import React, {Component} from 'react';
import {ScrollView, View, Text, Image} from 'react-native';
import {Calendar} from 'react-native-general-calendars';

import style from '../styling/calstyle.js';
import EventComponent from '../styling/eventstyle.js';


const ScheduleScreen = ({ route,  task, icon, theme, stamp}) => {
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

        <ScrollView style={[style.greyBg, style.commonPadding]}>
        {events.map((files, index) => (
            <><View style={style.calendarScreen}>
                <View>
                    <Text style={style.calendarTitle}>Kalender</Text>
                    <Calendar
                        // Calendar type (gregorian, jalaali). Default = gregorian
                        type={'gregorian'}
                        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                        monthFormat={'MMM YYYY'}
                        // Hide day names. Default = false
                        hideDayNames={true}
                        // Replace default arrows with custom ones (direction can be 'left' or 'right')
                        renderArrow={(direction) => {
                            // this piece of code might be shrunked down to something like this:
                            // return <Image source={require(`../img/${direction}.png`)} />;
                            // but 'require' function refuses to accept such param as an input :-(
                            if (direction === 'left') {
                                return <Image source={require('../elements/image-removebg-preview.png')} />;
                            }

                            return <Image source={require('../elements/image-removebg-preview-2.png')} />;
                        } }
                        // hardcoded, in real app might be fetched from some remote API
                        markedDates={{
                            '2018-03-22': { selected: true, selectedColor: '#8AC44C' },
                            '2018-03-24': { marked: true, dotColor: '#8AC44C' },
                            '2018-03-26': { marked: true, dotColor: '#8AC44C' },
                            '2018-03-29': { marked: true, dotColor: '#8AC44C' }
                        }} />
                </View>
            </View><View style={style.eventList}>
                    <Text style={style.eventListTitle}>MINE AFTALER</Text>
                    <EventComponent {...eventData} />
                </View></>
            
        ))} 
    </ScrollView>
);


}

export default ScheduleScreen

const styles = StyleSheet.create({})



