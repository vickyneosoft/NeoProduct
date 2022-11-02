import React, { useMemo } from 'react'
import { View, Image, Pressable, StyleSheet, ImageURISource } from 'react-native'

// Constants
import colors from '../constants/colors'

// Components
import BoldText from './BoldText'
import RegularText from './RegularText'

// Types
import { Product } from '../types'
import ToggleButton from './ToggleButton'

type ProductItemProps = {
    isFavorite: boolean
    item: Product<string>
    onPress: () => void
    onToggleFav: () => void
}

function ProductItem(props: ProductItemProps) {
    const { isFavorite, item, onPress, onToggleFav } = props

    const productImg = useMemo((): ImageURISource | undefined => {
        return { uri: item.product_images }
    }, [item])

    return (
        <Pressable onPress={onPress} style={styles.itemContainer}>
            <Image
                source={productImg}
                style={styles.itemImg}
                resizeMode="contain"
            />
            <View style={styles.textAndFavBtnContainer}>
                <View style={styles.textContainer}>
                    <BoldText>{item.name}</BoldText>
                    <RegularText>{item.producer}</RegularText>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <BoldText style={styles.itemPrice}>
                            {`Rs. ${item.cost}`}
                        </BoldText>
                        <ToggleButton
                            isActive={isFavorite}
                            onToggle={onToggleFav}
                        />
                    </View>
                </View>
            </View >
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
    textAndFavBtnContainer: {
        flex: 1,
        flexDirection: 'row',
        // alignItems: 'center',
        // justifyContent: 'space-between',
        paddingRight: 10
    },
    textContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    itemPrice: {
        color: colors.red
    }
})

function propsAreEqual(
    prevProps: Readonly<ProductItemProps>, nextProps: Readonly<ProductItemProps>
) {
    return prevProps.item.id === nextProps.item.id && prevProps.isFavorite === nextProps.isFavorite
}

export default React.memo(ProductItem, propsAreEqual)