export default {
  EtherScan: {
    apiURL: (network) => {
      return (network === 'mainnet')
        ? `https://api.etherscan.io/api`
        : `https://api-${network}.etherscan.io/api`
    },
    webURL: (network) => {
      return (network === 'mainnet')
        ? `https://etherscan.io`
        : `https://${network}.etherscan.io`
    }
  },
  CryptoCompare: {
    apiURL: () => `https://min-api.cryptocompare.com`
  },
  EthGasStation: {
    apiURL: () => `https://ethgasstation.info`
  },
  Skylab: {
    apiURL: () => `http://wallet.skylab.vn`,
    privacyURL: () => `https://synchroniciti.com/privacy/`,
    termsURL: () => `https://synchroniciti.com/terms/`
  },
  OpenSea: {
    apiURL: () => `https://opensea-api.herokuapp.com`
  },
  EthExplorer: {
    apiURL: (account) => `http://api.ethplorer.io/getAddressInfo/${account}/`
  },
  Synchroniciti: {
    coinsURL: () => 'https://s3-ap-southeast-2.amazonaws.com/synchroniciti-wallet/coins/coins.json',
    transferApiURL: () => 'https://m3l3dpce02.execute-api.ap-southeast-2.amazonaws.com/prod/transfers'
  }
}