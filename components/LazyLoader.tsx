import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import colors from '../constants/colors'

function LazyLoader() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.purple} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default LazyLoader
