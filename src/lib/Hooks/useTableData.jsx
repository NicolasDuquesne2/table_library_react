import React, { useState } from "react"


/**
 * 
 * @module useTableData
 */

/**
 * This hook returns parms usefull for the pagination component
 *  
 * @return {Object} tableData
 * @param {number} data row datas before manipulations
 * @param {number} rowsPerPage rows per page given by the pagination selector
 * @param {number} pageNumber page number selected
 * 
 */
export const useTableData = (data, rowsPerPage, pageNumber) => {
    const [oiginalData] = useState(data)
    const [tableData , setTableData] = useState(data)

    /**
     * this function filters the datas according to string received
     * setTableData with a new datas set
     * @param {string} filter 
     */
    const filter = (filter) => {
        
        let filtered = null
        const keys = Object.keys(tableData[0])

        if (filter !== "") {
            filtered = [...oiginalData].filter(element => keys.some((key) => element[key].toLowerCase().includes(filter.toLowerCase())))
        } else {
            filtered = oiginalData
        }

        setTableData(filtered)
      }

    /**
     * this function sorts the datas according to field and an order get
     * setTableData with a new sorted datas set
     * @param {string} sortField the field wich sorts datas 
     * @param {string} sortOrder the order is ascending or descending
     */
    const sorting = (sortField, sortOrder) => {
      if (sortField) {
        const sorted = [...tableData].sort((a, b) => {
          if (a[sortField] === null) return 1
          if (b[sortField] === null) return -1
          if (a[sortField] === null && b[sortField] === null) return 0
          return (
            a[sortField].toString().localeCompare(b[sortField].toString(), "en", {
              numeric: true,
            }) * (sortOrder === "asc" ? 1 : -1)
          )
        })
        setTableData(sorted)
      }
    }

    /**
     * this function slices the datas according to a min index and max index, depending on page number and rows per page
     * @return {Array}
     */
    const sliceTableData = () => {

      const indexOfLastRow = pageNumber * rowsPerPage
      const indexOfFirstRow = indexOfLastRow - rowsPerPage
      
      return [...tableData.slice(indexOfFirstRow, indexOfLastRow)]
    }

    /**
     * this function returns the current datas length
     * @return {number}
     */
    const getTableLength = () => {
      return tableData.length
    }

    return [tableData, filter, sorting, sliceTableData, getTableLength]
} 