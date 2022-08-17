import { useState, useRef, useEffect } from 'react'
import { useTableData } from '../../Hooks/useTableData'
import { usePaginator } from '../../Hooks/usePaginator'
import TableHeader from '../TableHeader'
import TableBody from '../TableBody'
import Pagination from '../Pagination'
import Filter from '../Filter'
import PaginationSelector from '../PaginationSelector'
import './table.css'

/**
 * The tab component is a central componenent witch must display the tab with its children 
 * component and provide an interface between data manipulations and its children 
 * 
 * ## Usage
 * 
 * ```jsx
 * <Tabs>
 *  <Tab>Contenu<Tab>
 * <Tabs>
 * ```
 * 
 */



function Table({payload}) {
    const [pageNumber, setPageNumber] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [tableData, filter, sorting, sliceTableData, getTableLength] = useTableData(payload.datas, rowsPerPage, pageNumber)
    const silcedtableData = sliceTableData()
    const [paginatorParams] = usePaginator(getTableLength(), rowsPerPage, pageNumber, silcedtableData)
    let tableBody = null

    //get current table lines
    if (tableData.length > 0) {
        tableBody = <TableBody columns={payload.columns} datas={silcedtableData} />
    }


    const selectPageNumber = (num) => {
        setPageNumber(num)
    }

    const selectRowsPerPage = (rows) => {
        setPageNumber(1)
        setRowsPerPage(rows)
    }

    const handleFilter = (data) => {
        setPageNumber(1)
        filter(data)
    }

    const handleSorting = (sortField, sortOrder) => {
        sorting(sortField, sortOrder)
    }

    return (
            <div className='table-frame'>
                <div className='table-frame-header'>
                    <PaginationSelector selectRowsPerPage={selectRowsPerPage} />
                    <Filter handleFilter={handleFilter} />
                </div>
                <table className='table' >
                    <TableHeader columns={payload.columns} handleSorting={handleSorting}/>
                    {tableBody}
                </table>
                <Pagination
                    paginatorParams={paginatorParams}
                    selectPageNumber={selectPageNumber}
                />
            </div>
    )
}

export default Table