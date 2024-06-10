import { SortOrder } from "mongoose";
import { IPagination } from "../interfaces/paginationOption";

type IOptionsResult = {
    page: number;
    limit: number;
    skip: number;
    sortBy: string;
    sortOrder: SortOrder;
}
const calculate = (options: IPagination): IOptionsResult => {
    const page = Number(options.page || 1)
    const limit = Number(options.limit || 5)
    const skip = (page - 1) * limit

    const sortBy = options.sortBy || "createdAt"
    const sortOrder = options.sortOrder || "desc"

    return { page, limit, skip, sortBy, sortOrder }
}
export const PaginationHelper = {
    calculate
}