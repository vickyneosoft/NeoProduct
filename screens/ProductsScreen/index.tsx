import React, { useCallback, useMemo } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'

// Components
import AppLoader from '../../components/AppLoader'
import ErrorComponent from '../../components/ErrorComponent'
import ListFooter from '../../components/ListFooter'
import ListItemSeparator from '../../components/ListItemSeparator'
import ProductItem from '../../components/ProductItem'

// Constants
import colors from '../../constants/colors'
import { useAppDispatch, useAppSelector } from '../../hooks'
import useProducts from '../../hooks/useProducts'
import { toggleFav } from '../../store/slices/productSlice'

// Types
import { FlatListItemProp, Product } from '../../types'

// Misc
import { keyExtractHandler } from '../../utils/miscUtils'

const ProductsScreen = (props: any) => {
    const { navigation } = props
    const { products } = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    const productsJSON = useMemo(() => products.favProductIds, [products])

    const {
        data,
        isLoading,
        isFetching,
        refresh,
        error,
        endReached,
        onEndReachedHandler
    } = useProducts()

    const showProductDetailsHandler = useCallback(
        (prodId: number) => {
            navigation.navigate('productDetails', {
                prodId
            })
        },
        [navigation],
    )

    const toggleFavProductHandler = useCallback((productId: number) => {
        dispatch(toggleFav(productId))
    }, [dispatch])

    const isFavoriteProduct = useCallback((productId: number) => {
        return productsJSON[productId]
    }, [productsJSON])

    const renderProductsHandler = useCallback((listItemObj: FlatListItemProp<Product<string>>) => {
        try {
            const { item } = listItemObj
            const isFav = isFavoriteProduct(item.id)
            return (
                <ProductItem
                    isFavorite={isFav}
                    item={item}
                    onPress={showProductDetailsHandler.bind(null, item.id)}
                    onToggleFav={toggleFavProductHandler.bind(null, item.id)}
                />
            )
        } catch (err: any) {
            console.log('[ProductsScreen - renderProductsHandler] Error : ', err.message)
            return null
        }
    }, [isFavoriteProduct, showProductDetailsHandler, toggleFavProductHandler])

    if (error) {
        return (
            <ErrorComponent />
        )
    }

    return (
        <View style={styles.container}>
            <AppLoader isVisible={isLoading} />
            <FlatList
                data={data}
                renderItem={renderProductsHandler}
                keyExtractor={keyExtractHandler}
                refreshing={isFetching}
                onRefresh={refresh}
                ListEmptyComponent={null}
                ItemSeparatorComponent={ListItemSeparator}
                ListFooterComponent={
                    endReached ? null : <ListFooter />
                }
                onEndReachedThreshold={0.01}
                onEndReached={onEndReachedHandler}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    }
})

export default ProductsScreen
