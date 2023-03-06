const width = Dimensions.get('window').width / 2 - 30;
import { useNavigation } from '@react-navigation/core'
import { View, SafeAreaView, Text, StyleSheet, FlatList, Image, Dimensions, } from 'react-native'
import {ScrollView, TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import React, { useState, useEffect } from 'react'
import COLORS from '../styling/color.js';
import teams from '../styling/teams.js';
import axios from 'axios'

// MARKED ISSUE: does not live update announcements
const HomeScreen = ({ route }) => {
    const [email, setEmail] = useState(route.params.email);
    const [announcements, setAnnouncements] = useState([{}]);

    const navigation = useNavigation();

    useEffect(() => {
        let url = "http://192.168.87.50:3001/announcement/";
        try {
            axios.get(url).then(res => {
                if (res.data) {
                    setAnnouncements(res.data.sortedData);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }, [])

    const [catergoryIndex, setCategoryIndex] = React.useState(0);

    const categories = ['Teams'];

  const CategoryList = () => {
    return (
      <View style={style.categoryContainer}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setCategoryIndex(index)}>
            <Text
              style={[
                style.categoryText,
                catergoryIndex === index && style.categoryTextSelected,
              ]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };


    const Card = ({team}) => {
      return (
        <TouchableOpacity
          activeOpacity={1.0}
          /*onPress={() => navigation.navigate('ScheduleScreen')}*/
        >
          <View style={style.card}>
            <View style={{alignItems: 'flex-end'}}>
            </View>
            <View
              style={{
                height: 100,
                alignItems: 'center',
                backgroundColor: COLORS.white,
              }}>
              <Image
                source={team.img}
                style={{flex: 1, resizeMode: 'contain'}}
              />
            </View>
  
            <Text style={{fontWeight: 'bold', fontSize: 17, marginTop: 10}}>
              {team.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 5,
              }}>
              <Text style={{fontSize: 19, fontWeight: 'bold'}}>
                {team.price}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <ScrollView
        style={{flex: 1, paddingHorizontal: 20, backgroundColor: COLORS.white}}>
        <View style={style.header}>
          <View>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>Welcome to</Text>
            <Text style={{fontSize: 38, color: COLORS.pink, fontWeight: 'bold', paddingBottom: 20 }}>
              Raas Vegas
            </Text>
          </View>
        </View>
        <FlatList
          columnWrapperStyle={{justifyContent: 'space-between'}}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: 10,
            paddingBottom: 50,
          }}
          numColumns={2}
          data={teams}
          renderItem={({item}) => {
            return <Card team={item} />;
          }}
        />
      </ScrollView>
    );
  };
  
  const style = StyleSheet.create({
    yContainer: {
      flexDirection: 'row',
      marginTop: 30,
      marginBottom: 20,
      justifyContent: 'space-between',
    },
    categoryText: {fontSize: 16, color: 'grey', fontWeight: 'bold'},
    categoryTextSelected: {
      color: COLORS.green,
      paddingBottom: 5,
      borderBottomWidth: 2,
      borderColor: COLORS.green,
    },
    card: {
      height: 185,
      backgroundColor: COLORS.light,
      width,
      marginHorizontal: 2,
      borderRadius: 10,
      marginBottom: 20,
      padding: 15,
      borderWidth: 3,
      borderColor: COLORS.red
    },
    header: {
      marginTop: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    searchContainer: {
      height: 50,
      backgroundColor: COLORS.light,
      borderRadius: 10,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    input: {
      fontSize: 18,
      fontWeight: 'bold',
      flex: 1,
      color: COLORS.dark,
    },
    sortBtn: {
      marginLeft: 10,
      height: 50,
      width: 50,
      borderRadius: 10,
      backgroundColor: COLORS.green,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  export default HomeScreen;