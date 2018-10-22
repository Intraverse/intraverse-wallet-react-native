import { observable, action, computed } from 'mobx'
import { BigNumber } from 'bignumber.js'
export default class SendWalletConfirmStore {
  @observable isRefresh = false
}
