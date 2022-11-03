import { useState, useEffect, useCallback, useMemo } from 'react'

// Constants
import constants from '../constants'

// Types
import { Product } from '../types'

// Services
import { useGetProductsQuery } from '../services/products'

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
    const { data: apiData, error, isLoading } = useGetProductsQuery(productsConfig)

    const [isFetching, setFetching] = useState(false)

    useEffect(function () {
        try {
            if (apiData && apiData?.data && Array.isArray(apiData.data)) {
                if (apiData.data.length < constants.productsLimit) {
                    setEndReached(true)
                } else {
                    setEndReached(false)
                }
                setData(prevState => [...prevState, ...<[]>apiData.data])
            }
            setFetching(false)
        } catch (err: any) {
            setFetching(false)
        }
    }, [apiData])

    useEffect(() => {
        if (error) {
            setFetching(false)
        }
    }, [error])

    const onEndReachedHandler = useCallback(() => {
        if (endReached || isFetching || isLoading) {
            return
        }
        setPage(prevState => prevState + 1)
    }, [endReached, isFetching, isLoading])

    const refresh = useCallback(() => {
        setFetching(true)
        setData([])
        setPage(1)
    }, [])

    return {
        data,
        error,
        isFetching,
        isLoading,
        endReached,
        refresh,
        onEndReachedHandler
    }
}

export default useProducts