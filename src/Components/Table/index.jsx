import React, { useState } from 'react'
import { useTableData } from '../../Hooks/useTableData'
import { usePaginator } from '../../Hooks/usePaginator'
import TableHeader from '../TableHeader'
import TableBody from '../TableBody'
import Pagination from '../Pagination'
import Filter from '../Filter'
import PaginationSelector from '../PaginationSelector'
import './table.css'


/**
 * 
 * @module Table
 */

/**
 * The tab component is a central componenent witch must display the tab with its children 
 * component and provide an interface between data manipulations and its children 
 * 
 * pass a payload object {datas, columns}
 * 
 * @return {React.ReactComponentElement}
 * @param {Object} payload
 * 
 */
function Table({payload}) {
    const [pageNumber, setPageNumber] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [tableData, filter, sorting, sliceTableData, getTableLength] = useTableData(payload.datas, rowsPerPage, pageNumber)
    const silcedtableData = sliceTableData()
    const [paginatorParams] = usePaginator(getTableLength(), rowsPerPage, pageNumber, silcedtableData)
    let tableBody = null

    /**
     * If table datas array has data, then TableBody component is called with passing needed params
     * 
     */
    if (tableData.length > 0) {
        tableBody = <TableBody columns={payload.columns} datas={silcedtableData} />
    }


    /**
     * selectPageNumber sets the page number for displaying datas by slice
     * @param {number} num
     * 
     */
    const selectPageNumber = (num) => {
        setPageNumber(num)
    }
    
     /**
     * selectRowsPerPage resets the page number to 1 and sets rows per page. 
     * Changing rows per pages displays the first page of the new slice rule 
     * @param {number} rows
     * 
     */
    const selectRowsPerPage = (rows) => {
        setPageNumber(1)
        setRowsPerPage(rows)
    }

    /**
     * handleFilter resets the page number to 1 and filter datas with search bar content
     * Searching displays the first page of the search result 
     * @param {Array} data
     * 
     */
    const handleFilter = (data) => {
        setPageNumber(1)
        filter(data)
    }

    /**
     * handleSorting sorts the current datas (orginal or filtered) array with an order instruction
     * @param {string} sortField
     * @param {string} sortOrder
     * 
     */
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