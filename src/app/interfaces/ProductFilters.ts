export default interface IProductFilters {
    'productName_like'?: string | null | undefined,
    price_gte?: string | null | undefined,
    price_lte?: string | null | undefined,
    available?: boolean | null | undefined,
    notAvailable?: boolean | null | undefined
}