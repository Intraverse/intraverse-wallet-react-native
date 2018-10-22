import { StackNavigator } from 'react-navigation'
import SendTransactionScreen from '../modules/SendTransaction/screen/SendTransactionScreen'
import AddressInputScreen from '../modules/SendTransaction/screen/AddressInputScreen'
import ScanQRCodeScreen from '../modules/ScanQRCode'
import ConfirmScreen from '../modules/SendTransaction/screen/ConfirmScreen'
import AppStyle from '../commons/AppStyle'
import RecipientTypeScreen from '../modules/SendTransaction/screen/RecipientTypeScreen'

const CreateSendTransactionStack = StackNavigator(
  {
    SendTransactionScreen1: {
      screen: SendTransactionScreen,
      navigationOptions: {
        header: null
      }
    },
    AddressInputScreen: {
      screen: AddressInputScreen,
      navigationOptions: {
        header: null
      }
    },
    ScanQRCodeScreen: {
      screen: ScanQRCodeScreen,
      navigationOptions: {
        header: null
      }
    },
    ConfirmScreen: {
      screen: ConfirmScreen,
      navigationOptions: {
        header: null
      }
    },
    RecipientTypeScreen: {
      screen: RecipientTypeScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: 'SendTransactionScreen1',
    cardStyle: { backgroundColor: AppStyle.backgroundColor }
  }
)

export default CreateSendTransactionStack
