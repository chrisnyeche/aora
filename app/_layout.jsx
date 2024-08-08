import { View } from 'react-native'
import { Slot } from 'expo-router'

const RootLayout = () => {
  return (
    <View>
      <Slot>RootLayout</Slot>
    </View>
  )
}

export default RootLayout
