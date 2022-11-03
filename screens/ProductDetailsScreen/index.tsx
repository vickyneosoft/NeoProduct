import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'

// Components
import BoldText from '../../components/BoldText'
import LazyLoader from '../../components/LazyLoader'
import RegularText from '../../components/RegularText'
import ToggleButton from '../../components/ToggleButton'
import ErrorComponent from '../../components/ErrorComponent'

// Components
import colors from '../../constants/colors'

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks'
import { toggleFav } from '../../store/slices/productSlice'

// Services
import { useGetProductDetailsByIdQuery } from '../../services/products'

// Misc
import { height, width } from '../../utils/miscUtils'
import FlatListSlider from '../../components/FlatListSlider'

const ProductDetailsScreen = (props: any) => {
    const { route } = props
    const { params } = route
    const { prodId } = params

    const dispatch = useAppDispatch()

    const { favProductIds } = useAppSelector((state) => state.products)

    const { data, isError, error, isLoading } = useGetProductDetailsByIdQuery({
        product_id: prodId
    })

    const toggleFavHandler = useCallback((productId: number) => {
        dispatch(toggleFav(productId))
    }, [dispatch])

    if (error || isError) {
        return <ErrorComponent />
    }

    if (isLoading || !data?.data) {
        return <LazyLoader />
    }

    return (
        <View style={styles.container}>
            <FlatListSlider
                data={data?.data?.product_images}
                imageKey={'image'}
                local={false}
                width={width}
                loop={false}
                indicator
            />
            <View style={styles.descriptionContainer}>
                <View style={styles.basicDetailsContainer}>
                    <View>
                        <BoldText>{data?.data?.name}</BoldText>
                        <RegularText>{data?.data?.producer}</RegularText>
                    </View>
                    <ToggleButton
                        isActive={favProductIds[data?.data?.id]}
                        onToggle={toggleFavHandler.bind(null, data?.data?.id)}
                    />
                </View>
                <View style={styles.costDataContainer}>
                    <BoldText style={styles.costText}>
                        {`Rs. ${data?.data?.cost}`}
                    </BoldText>
                    <BoldText style={styles.costText}>
                        {`Rating ${data?.data?.rating}`}
                    </BoldText>
                </View>
                <RegularText>{data?.data?.description}</RegularText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    descriptionContainer: {
        marginHorizontal: 10,
        marginTop: 10
    },
    basicDetailsContainer: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    costDataContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    costText: {
        flex: 1,
        color: colors.red
    },
    productImg: {
        width,
        height: height * 0.35
    }
})

export default ProductDetailsScreen
