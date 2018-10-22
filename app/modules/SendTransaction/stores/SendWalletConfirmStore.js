import { observable, action } from 'mobx'
import API from '../../../api'

export const STEP_FAILED = -1
export const STEP_CREATE = 0
export const STEP_SEND = 1

export default class SendWalletConfirmStore {

  @observable isProcessing = false
  @observable sendURL = null
  @observable step = STEP_CREATE

  @action processSend(token, amount) {
    if (this.isProcessing) return

    this.isProcessing = true
    API.createWalletTransfer(token, amount).then((res) => {
      if (res.status !== 201) {
        this.isProcessing = false
        this.step = STEP_FAILED
        return
      }
      this.sendURL = `https://synchroniciti.app.link/bbT9EXtw6Q?snd=${res.data.TransferId}`
      this.isProcessing = false
      this.step = STEP_SEND
    }, () => {
      this.isProcessing = false
      this.step = STEP_FAILED
    })
  }

}
