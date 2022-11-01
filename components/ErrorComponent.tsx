import React from 'react'
import { View, StyleSheet } from 'react-native'
import constants from '../constants'
import BoldText from './BoldText'

function ErrorComponent() {
    return (
        <View style={styles.container}>
            <BoldText>{constants.SOMETHING_WENT_WRONG}</BoldText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default React.memo(ErrorComponent)