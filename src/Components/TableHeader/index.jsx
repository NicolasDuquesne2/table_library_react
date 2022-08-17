import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'
import "./tableheader.css"


/**
 * 
 * @module TableHeader
 */

/**
 * The TableHeader is responsable for displaying the table headers
 * manages sorting interactions
 * 
 * pass a payload object {datas, columns}
 * 
 * @param {Array} props.handleSorting handleSorting is the Table component function in order to sort datas
 * @param {Array} props.columns columns contains each Header params like label accessor & sortable option
 * @returns {React.ReactComponentElement}
 */
function TableHeader({columns, handleSorting}) {

    const [sortField, setSortField] = useState("")
    const [order, setOrder] = useState("asc")

    let icon = null


    /**
     * handleSortingChange fires on a header clicking
     * first switch the sorting order
     * then pass accessor and the order to the handleSorting function
     * @param {string} accessor 
     */
    const handleSortingChange = (accessor) => {
        const switchOrder = accessor === sortField && order === "asc" ? "desc": "asc"
        setSortField(accessor)
        setOrder(switchOrder)
        handleSorting(accessor, switchOrder)
    }

    return (
        <thead>
            <tr>
                {columns.map(({label, accessor, sortable}, index) => {
                    
                    if (sortable) {
                        if ( sortField === accessor && order === "asc") {
                            icon = <span className="arrow-black"> <FontAwesomeIcon icon= {faSortUp} /></span>
                        } else if (sortField === accessor && order === "desc") {
                            icon = <span className="arrow-black"><FontAwesomeIcon icon= {faSortDown} /></span>
                        } else {
                            icon = <span className="arrow-grey"><FontAwesomeIcon icon= {faSort} /></span>
                        }
                    } else {
                        icon = null
                    }

                    
                return (
                    <th key={`theader-th-${index}`} 
                        onClick={sortable ? () => handleSortingChange(accessor): null}>
                        {label} {icon}
                    </th>
                )

                    
            })}
            </tr>
        </thead>
    )

}

export default TableHeader