import React, { useMemo } from 'react'
import { View, Image, Pressable, StyleSheet } from 'react-native'
import images from '../assets/images'

type ToggleButtonProps = {
    isActive: boolean
    onToggle: () => void
}

function ToggleButton(props: ToggleButtonProps) {
    const { isActive, onToggle } = props

    const img = useMemo(() => isActive ? images.ic_fav_filled : images.ic_fav_unfilled, [isActive])

    return (
        <Pressable
            style={styles.container}
            onPress={onToggle}
        >
            <Image
                source={img}
                style={styles.img}
                resizeMode="contain"
            />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'pink'
    },
    img: {
        height: 34,
        width: 34
    }
})

export default ToggleButton
