export default interface IProductFilters {
    productName?: string | null | undefined,
    price_gte?: string | null | undefined,
    price_lte?: string | null | undefined,
    available?: boolean | null | undefined,
    notAvailable?: boolean | null | undefined
}