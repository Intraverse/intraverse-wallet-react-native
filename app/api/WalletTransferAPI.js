import ApiCaller from './api-caller'
import URL from './url'

export const getWalletTransfer = (id) => {
  return ApiCaller.get(`${URL.Synchroniciti.transferApiURL()}/${id}`, {})
}
