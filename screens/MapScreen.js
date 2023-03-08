import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, {Marker} from 'react-native-maps';

const MapScreen = () => {
  const x_latitude = 38.9372498;
  const y_latitude = -76.9192696;
  return (
    <MapView
    initialRegion={{
        latitude: x_latitude,
        longitude: y_latitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
    }}
    style={{ width: '100%', height: '100%' }}
>
    {x_latitude && y_latitude && (
        <Marker
            coordinate={{ latitude: x_latitude, longitude: y_latitude }}
            title= "Hotel Location"
        />
    )}
</MapView>
  )
}

export default MapScreen

const styles = StyleSheet.create({})