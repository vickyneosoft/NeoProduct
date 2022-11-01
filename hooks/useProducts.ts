import { useState, useEffect, useCallback, useMemo } from 'react'
import constants from '../constants'
import { useGetProductsQuery } from '../services/products'
import { Product } from '../types'

function useProducts() {
    const [data, setData] = useState<Product<string>[]>([])
    const [endReached, setEndReached] = useState<boolean>(true)
    const [page, setPage] = useState(1)

    const productsConfig = useMemo(() => ({
        product_category_id: 1,
        limit: constants.productsLimit,
        page,
    }), [page])

    // Using a query hook automatically fetches data and returns query values
    const { data: apiData, error, isLoading, isFetching } = useGetProductsQuery(productsConfig)

    useEffect(function () {
        if (apiData && apiData?.data && Array.isArray(apiData.data)) {
            console.log('len : ', apiData.data.length)
            if (apiData.data.length < constants.productsLimit) {
                setEndReached(true)
            } else {
                setEndReached(false)
            }
            setData(prevState => [...prevState, ...<[]>apiData.data])
        }
    }, [apiData])

    const onEndReachedHandler = useCallback(() => {
        if (endReached) {
            return
        }
        setPage(prevState => prevState + 1)
    }, [endReached])

    const refresh = useCallback(() => {
        setData([])
        setPage(1)
    }, [])

    return {
        data,
        error,
        endReached,
        isFetching,
        isLoading,
        endReached,
        refresh,
        onEndReachedHandler
    }
}

export default useProducts