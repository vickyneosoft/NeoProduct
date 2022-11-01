import React, { useMemo, useEffect, useCallback, useState } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import BoldText from '../../components/BoldText'

import ErrorComponent from '../../components/ErrorComponent'
import LazyLoader from '../../components/LazyLoader'
import RegularText from '../../components/RegularText'
import colors from '../../constants/colors'
import { useGetProductDetailsByIdQuery } from '../../services/products'
import { width } from '../../utils/miscUtils'

const ProductDetailsScreen = (props: any) => {
    const { navigation, route } = props
    const { params } = route
    const { prodId } = params

    const { data, isError, error, isLoading } = useGetProductDetailsByIdQuery({
        product_id: prodId
    })

    useEffect(() => {
        console.log('data : ', data)
    }, [data])

    const productImg = useMemo(() => ({ uri: data?.data?.product_images?.[0]?.image }), [data])

    console.log('productImg : ', productImg)

    if (error || isError) {
        return <ErrorComponent />
    }

    if (isLoading) {
        return <LazyLoader />
    }

    return (
        <View style={styles.container}>
            {/* <AppLoader isVisible={isLoading} /> */}
            <Image
                source={productImg}
                style={styles.productImg}
                resizeMode="contain"
            />
            <BoldText>{data?.data?.name}</BoldText>
            <RegularText>{data?.data?.producer}</RegularText>
            <BoldText>{`Rs. ${data?.data?.cost}`}</BoldText>
            <BoldText>{`Rating ${data?.data?.rating}`}</BoldText>
            <RegularText>{data?.data?.description}</RegularText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    productImg: {
        width,
        height: 150,
        marginVertical: 10
    }
})

export default ProductDetailsScreen
