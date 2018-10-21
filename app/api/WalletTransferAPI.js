import ApiCaller from './api-caller'
import URL from './url'

export const getWalletTransfer = (id) => {
  return ApiCaller.get(`${URL.Synchroniciti.transferApiURL()}/${id}`, {})
}

export const putWalletTransferReceiver = (id, address) => {
  const data = {
    "ToAddress": address
  }
  return ApiCaller.put(`${URL.Synchroniciti.transferApiURL()}/${id}/rec`, data, true)
}
