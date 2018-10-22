import { observable, action } from 'mobx'
import API from '../../../api'

export default class SendWalletConfirmStore {
  @observable isProcessing = false
  @observable sendURL = null
  @observable step = 0

  @action processSend() {
    if (this.isProcessing) return

    this.isProcessing = true
    API.createWalletTransfer().then((res) => {
      this.sendURL = `https://synchroniciti.app.link/bbT9EXtw6Q?snd=${res.data.TransferId}`
      this.isProcessing = false
      this.step = 1
    }, () => {
      this.isProcessing = false
      this.step = 0
    })
  }
}
