import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native'
import { observer } from 'mobx-react/native'
import NavigationHeader from '../../../components/elements/NavigationHeader'
import SmallCard from '../../../components/elements/SmallCard'
import LayoutUtils from '../../../commons/LayoutUtils'
import constant from '../../../commons/constant'
import images from '../../../commons/images'
import AppStyle from '../../../commons/AppStyle'
import NavStore from '../../../AppStores/NavStore'

const marginTop = LayoutUtils.getExtraTop()
const contentWallet = 'Send a wallet by sharing a link in text, email or other'
const contentAddress = 'Scan or enter a wallet address to send to'

const { width } = Dimensions.get('window')

@observer
export default class RecipientTypeScreen extends Component {
    goBack = () => {
        NavStore.goBack()
    }

    gotoSendWallet = () => {
        NavStore.pushToScreen('SendWalletConfirmScreen')
    }

    gotoPublicAddress = () => {
        NavStore.pushToScreen('AddressInputScreen')
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationHeader
                    style={{ marginTop: marginTop + 20, width }}
                    headerItem={{
                        title: constant.RECIPIENT_TYPE,
                        icon: null,
                        button: images.backButton
                    }}
                    action={this.goBack}
                />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <SmallCard
                        style={{ marginBottom: 40, height: 174 }}
                        title="Link"
                        subtitle={contentWallet}
                        imageCard={images.iconPrivateKey}
                        onPress={this.gotoSendWallet}
                        imageBackgroundStyle={{ height: 174 }}
                        titleTextStyle={{ color: AppStyle.mainColor }}
                        subtitleTextStyle={{
                            color: AppStyle.secondaryTextColor,
                            marginTop: 10,
                            fontSize: 18
                        }}
                    />

                    <SmallCard
                        style={{ marginBottom: 20, height: 174 }}
                        title="Ethereum Address"
                        subtitle={contentAddress}
                        imageCard={images.iconAddress}
                        onPress={this.gotoPublicAddress}
                        titleTextStyle={{ color: AppStyle.mainTextColor }}
                        subtitleTextStyle={{
                            color: AppStyle.secondaryTextColor,
                            marginTop: 10,
                            fontSize: 18
                        }}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
