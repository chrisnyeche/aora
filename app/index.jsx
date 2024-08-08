import { StyleSheet, Text, View } from 'react-native'
import React from 'react'


const Index = () => {
  return (
    <View style={styles.container}>
      <Text>I love you so much</Text>
    </View>
  )
}


export default Index


const styles = StyleSheet.create({
    container:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'lightblue',
    }
})
