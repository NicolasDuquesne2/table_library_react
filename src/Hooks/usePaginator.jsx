import { useState } from "react"

export const usePaginator = (totalRows, rowsPerPage, pageNumber, slicedData) => {
    const [paginatorParams] = useState({})
    
    const getTotalPages = () => {
        return Math.ceil(totalRows/rowsPerPage)
    }

    const getSlicedDataParams = () => {
        const indexOfLastRow = pageNumber * rowsPerPage
        const indexOfFirstRow = indexOfLastRow - rowsPerPage
        const firstRowNumber = indexOfFirstRow + 1
        const lastRowNumber = firstRowNumber + slicedData.length -1
        return {firstRowNumber, lastRowNumber}
    }

    paginatorParams.totalPages = getTotalPages()
    paginatorParams.slicedDataParams = getSlicedDataParams()
    paginatorParams.pageNumber = pageNumber
    paginatorParams.totalRows = totalRows

    return [paginatorParams]
}