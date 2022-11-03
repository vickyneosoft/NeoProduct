export interface Product<ImageType> {
    id: number
    product_category_id: number
    name: string
    producer: string
    description: string
    cost: number
    rating: number
    view_count: number
    product_images: ImageType
    created: number
    modified: number
    responseStatus: "success"
}

export interface ProductImage {
    id: number
    product_id: number
    image: number
    created: number
    modified: number
}

export interface ErrorPayload {
    message: string
    status: number
    user_msg: string
    responseStatus: "failure"
}

export interface ListResponse<T> {
    data: T[] | ErrorPayload,
    status: number
}

export interface ApiResponse<T> {
    data: T | ErrorPayload,
    status: number
}

export interface FlatListItemProp<T> {
    item: T,
    index: number,
    separators: {
        highlight: () => void
        unhighlight: () => void
        updateProps: (select: "leading" | "trailing", newProps: any) => void
    }
}
