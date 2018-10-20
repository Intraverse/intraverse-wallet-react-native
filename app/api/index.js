import * as wallet from './wallet'
import * as etherJSONRPC from './ether-json-rpc'
import * as NotificationAPI from './NotificationAPI'
import * as WalletTransferAPI from './WalletTransferAPI'

export default {
  ...wallet,
  etherJSONRPC: { ...etherJSONRPC },
  ...NotificationAPI,
  ...WalletTransferAPI
}
