import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    commonPadding: {padding: 24},
    greyBg: {backgroundColor: '#EFF3F6'},
    calendarScreen: {
        flex: 1
    },
    calendarTitle: {
        backgroundColor: 'white',
        fontSize: 30,
        color: '#8AC44C',
        padding: 17
    },
    eventList: {
        marginBottom: 18
    },
    event: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 15
    },
    eventListTitle: {
        marginTop: 20,
        marginBottom: 15,
        color: 'black'
    },
    eventTimeWr: {
        borderRightWidth: 2,
        borderRightColor: '#8AC44C',
    },
    eventText: {
        paddingLeft: 8,
        flex: 1,
        justifyContent: 'center'
    },
    eventTime: {
        color: '#333333',
        fontSize: 22,
        paddingRight: 8
    },
    eventTitle: {
        fontSize: 20,
        color: 'black'
    },
    eventDescription: {
        fontSize: 14,
    }
});

export default style;