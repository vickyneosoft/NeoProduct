import { Dimensions } from 'react-native'

export const keyExtractHandler = (item: any, index: number) => index.toString()

export const { height, width } = Dimensions.get("window")
