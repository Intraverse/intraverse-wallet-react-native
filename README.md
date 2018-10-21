git s# Synchroniciti Wallet - Secure Ethereum Wallet & ERC20 Tokens

This is a fork of [golden wallet](https://github.com/goldennetwork/golden-wallet-react-native)

## Features

- [x] Create/Import Ethereum wallet
- [x] Check balances, transactions
- [x] Send/Receive ETH and ERC20 Token
- [x] ĐAPP web browser and list collectible items.

## Build Synchroniciti Wallet 
### Installation
Install `rn-nodeify` to be able to use Node.js libs.
	
	sudo npm i rn-nodeify -g

Install the dependencies in the local node_modules folder.

	npm install

### IOS
#### CocoaPods
> CocoaPods 1.3+ is required

Run from your terminal to install the library.
	
	cd ios
	pod install
	cd ../
	
Run Synchronciti Wallet on iOS
	
	react-native run-ios

To choose specific device

	react-native run-ios --simulator="iPhone XR"

### Android
Run Synchroniciti Wallet on Android

	react-native run-android

### Fixes to (Xcode 10) build issues

Fix glog issue:

	cd node_modules/react-native/third-party/glog-0.3.4/ && ../../scripts/ios-configure-glog.sh && cd ../../../..

Fix libfishhook issue:
https://github.com/facebook/react-native/issues/19569

	cp ios/build/Build/Products/Debug-iphonesimulator/libfishhook.a node_modules/react-native/Libraries/WebSocket/

libyoga issue when archiving:

	https://github.com/facebook/react-native/issues/20492

### Release
#### IOS

react-native run-ios --configuration Release

#### Android

Build release APK according to the [react-native documentation](https://facebook.github.io/react-native/docs/signed-apk-android):

Create a signing key and place copy in android/app directory:

	Default is synchroniciti-wallet-release-key.keystore

Update authentication details for the key store:

	mkdir ~/.gradle/gradle.properties
		ANDROID_STORE_PASSWORD=[password]
		ANDROID_KEY_PASSWORD=[password]

Create APK:

	cd android
	./gradlew assembleRelease

## Debugging

### Network

Reactotron is linked for development builds:

https://github.com/infinitered/reactotron/blob/master/docs/installing.md

## Testing

### Wallet Send 

Android:

	adb shell am start -a android.intent.action.VIEW -d "https://synchroniciti.app.link/bbT9EXtw6Q?snd=NndHc4_CJJ3MtB-ZkPFg9w"

iOS:

	xcrun simctl openurl booted "https://synchroniciti.app.link/bbT9EXtw6Q?snd=NndHc4_CJJ3MtB-ZkPFg9w"
	
### Release Build

It's a good idea to check the release build runs.

Android:

	react-native run-android --variant=release

iOS

	react-native run-ios --configuration=release