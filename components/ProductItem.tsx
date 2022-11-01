import React from 'react'
import { View, Image, Pressable, StyleSheet, ImageURISource } from 'react-native'

// Constants
import colors from '../constants/colors'

// Components
import BoldText from './BoldText'
import RegularText from './RegularText'

// Types
import { Product } from '../types'

type ProductItemProps = {
    item: Product<string>
    onPress: () => any
}

function ProductItem(props: ProductItemProps) {
    const { item, onPress } = props

    const productImg = React.useMemo((): ImageURISource | undefined => {
        return { uri: item.product_images }
    }, [item])

    return (
        <Pressable onPress={onPress} style={styles.itemContainer}>
            <Image
                source={productImg}
                style={styles.itemImg}
                resizeMode="contain"
            />
            <View style={styles.contentContainer}>
                <BoldText>{item.name}</BoldText>
                <RegularText>{item.producer}</RegularText>
                <BoldText style={styles.itemPrice}>
                    {`Rs. ${item.cost}`}
                </BoldText>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemImg: {
        height: 70,
        width: 60,
        marginHorizontal: 10,
        marginTop: 10
    },
    contentContainer: {
        justifyContent: 'flex-start'
    },
    itemPrice: {
        color: colors.red
    }
})

function propsAreEqual(
    prevProps: Readonly<ProductItemProps>, nextProps: Readonly<ProductItemProps>
) {
    return prevProps.item.id === nextProps.item.id
}

export default React.memo(ProductItem, propsAreEqual)