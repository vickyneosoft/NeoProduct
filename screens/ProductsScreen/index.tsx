import React, { useCallback } from 'react'
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native'

// Components
import AppLoader from '../../components/AppLoader'
import ErrorComponent from '../../components/ErrorComponent'
import ListFooter from '../../components/ListFooter'
import ListItemSeparator from '../../components/ListItemSeparator'
import ProductItem from '../../components/ProductItem'
import constants from '../../constants'

// Constants
import colors from '../../constants/colors'
import { useAppSelector } from '../../hooks'
import useProducts from '../../hooks/useProducts'

// Services
import { useGetProductsQuery } from '../../services/products'

// Types
import { FlatListItemProp, Product } from '../../types'

// Misc
import { keyExtractHandler } from '../../utils/miscUtils'

const ProductsScreen = (props: any) => {
    const { navigation } = props

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

    const renderProductsHandler = React.useCallback((listItemObj: FlatListItemProp<Product<string>>) => {
        try {
            const { item } = listItemObj
            return (
                <ProductItem
                    item={item}
                    onPress={showProductDetailsHandler.bind(null, item.id)}
                />
            )
        } catch (err: any) {
            console.log('[ProductsScreen - renderProductsHandler] Error : ', err.message)
            return null
        }
    }, [showProductDetailsHandler])

    if (error) {
        console.log('error : ', error)
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
