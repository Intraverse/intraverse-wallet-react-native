import Reactotron, { asyncStorage } from 'reactotron-react-native'

if (__DEV__) {
  Reactotron
    .configure() // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .use(asyncStorage())
    .connect() // let's connect!

  // reach horribly into the bowels of react native
  const rejectionTracking = require("promise/setimmediate/rejection-tracking")

  // if we have it
  if (rejectionTracking && rejectionTracking.enable) {
    // register for rejection tracking
    rejectionTracking.enable({
      allRejections: true,
      onUnhandled: (id, error) => {
        console.error(error)
      },
      onHandled: () => { },
    })
  }
}