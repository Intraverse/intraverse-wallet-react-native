import Reactotron from 'reactotron-react-native'

if (__DEV__) {
  Reactotron
    .configure() // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .connect() // let's connect!
}
