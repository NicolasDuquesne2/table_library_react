import { useState } from "react"

/**
 * 
 * @module usePaginator
 */

/**
 * This hook returns parms usefull for the pagination component
 *  
 * @return {Object} paginatorParams
 * @param {number} totalRows total rows of the datas
 * @param {number} rowsPerPage rows per page given by the pagination selector
 * @param {number} pageNumber page number selected
 * @param {Object} slicedData sliced data
 * 
 */
export const usePaginator = (totalRows, rowsPerPage, pageNumber, slicedData) => {
    const [paginatorParams] = useState({})
    
    /**
     * Returns total pages, usefull for set number of buttons
     * @returns {number} 
     */
    const getTotalPages = () => {
        return Math.ceil(totalRows/rowsPerPage)
    }

    /**
     * Returns the first row number and last row number for the view counter. to avoid having arrays indexes
     * @returns {Object} 
     */
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