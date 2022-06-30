export default interface IProductFilters {
    name?: string | null | undefined,
    min?: string | null | undefined,
    max?: string | null | undefined,
    available?: boolean | null | undefined,
    notAvailable?: boolean | null | undefined
}