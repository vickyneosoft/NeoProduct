import React from 'react'
import { View, StyleSheet } from 'react-native'
import colors from '../constants/colors'

function ListItemSeparator() {
    return <View style={styles.line} />
}

const styles = StyleSheet.create({
    line: {
        marginLeft: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.black
    }
})

export default React.memo(ListItemSeparator)
