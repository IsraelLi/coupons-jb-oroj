export interface couponModel {
    id: string | undefined,
    companyId: string,
    categoryId: string,
    title: string,
    description: string,
    startDate: Date,
    endDate: Date,
    amount: number,
    price: number
}