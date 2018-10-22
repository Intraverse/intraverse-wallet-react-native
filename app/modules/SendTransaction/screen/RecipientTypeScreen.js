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
const contentWallet = 'Send a wallet to a person by txt or email.'
const contentAddress = 'Scan or enter a wallet address to send to.'

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
                    style={{ marginTop: marginTop + 20 }}
                    headerItem={{
                        title: constant.RECIPIENT_TYPE,
                        icon: null,
                        button: images.closeButton
                    }}
                    action={this.goBack}
                />
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <SmallCard
                        style={{ height: 174 }}
                        title="Person"
                        subtitle={contentWallet}
                        imageCard={images.iconPrivateKey}
                        onPress={this.gotoSendWallet}
                        imageBackgroundStyle={{ height: 174 }}
                        titleTextStyle={{ color: AppStyle.mainColor }}
                        subtitleTextStyle={{
                            color: AppStyle.secondaryTextColor, marginTop: 10
                        }}
                    />

                    <SmallCard
                        style={{ marginTop: 20, marginBottom: 20, height: 174 }}
                        title="Address"
                        subtitle={contentAddress}
                        imageCard={images.iconAddress}
                        onPress={this.gotoPublicAddress}
                        titleTextStyle={{ color: AppStyle.mainTextColor }}
                        subtitleTextStyle={{
                            color: AppStyle.secondaryTextColor, marginTop: 10
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
