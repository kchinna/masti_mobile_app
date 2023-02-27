import React from 'react';
import {View, Text} from 'react-native';
import style from './calstyle.js';

// a presentational component to render a single item of event
export default EventComponent = ({startTime, endTime, title, description}) => {
    return (
        <View style={style.event}>
            <View style={style.eventTimeWr}>
                <Text style={style.eventTime}>{startTime}</Text>
                <Text style={style.eventTime}>{endTime}</Text>
            </View>
            <View style={style.eventText}>
                <Text style={style.eventTitle}>{title}</Text>
                <Text style={style.eventDescription}>{description}</Text>
            </View>
        </View>
    );
}