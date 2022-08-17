import { useState } from "react"

export const useTableData = (data, rowsPerPage, pageNumber) => {
    const [oiginalData] = useState(data)
    const [tableData , setTableData] = useState(data)

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

    const sliceTableData = () => {

      const indexOfLastRow = pageNumber * rowsPerPage
      const indexOfFirstRow = indexOfLastRow - rowsPerPage
      
      return [...tableData.slice(indexOfFirstRow, indexOfLastRow)]
    }

    const getTableLength = () => {
      return tableData.length
    }

    return [tableData, filter, sorting, sliceTableData, getTableLength]
} 