import React from 'react'
import SelectMenu from "../SelectMenu";
import './paginator.css'

/**
 * 
 * @module PaginationSelector
 */

/**
 * @callback selectRowsPerPage
 * selectRowsPerPage resets the page number to 1 and sets rows per page. 
 * Changing rows per pages displays the first page of the new slice rule 
 * @param {number} rows
 */


/**
 * Renders the list of rows per pages options & manages selections interactions
 * @callback selectRowsPerPage
 * @param {selectRowsPerPage} callback 
 * @returns {React.ReactComponentElement}
 */
function PaginationSelector({selectRowsPerPage}) {

    const pagesNumbers = ["10", "25", "50", "100"]

    return (
        <div className="paginator-wrapper">
            <p className="paginator-text">Show</p>
            <select className="paginator-selector" name="pagination" id="pagination" onChange={(e) => selectRowsPerPage(Number(e.target.options[e.target.selectedIndex].text))}>
                <SelectMenu params={{keyPart: 'option-pag-', datas: pagesNumbers, typeOfDatas: 'array'}}/>
            </select>
            <p className="paginator-text">entries</p>
        </div>
    )
}

export default PaginationSelector