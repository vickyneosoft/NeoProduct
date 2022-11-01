import React, { memo } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import colors from '../constants/colors'

function ListFooter() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={"large"} color={colors.black} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

function arePropsEqual() {
    return true
}

export default memo(ListFooter, arePropsEqual)