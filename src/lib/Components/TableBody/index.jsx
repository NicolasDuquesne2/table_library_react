import React from 'react'
/**
 * 
 * @module TableBody
 */

/**
 * The TableBody builds the tab with headers params and datas 
 * 
 * pass a payload object {datas, columns}
 * 
 * @param {Array} props.datas datas contains each line for the table link to the columns by accessor name 
 * @param {Array} props.columns columns contains each Header params like label accessor & sortable option
 * @returns {React.ReactComponentElement}
 */
function TableBody({datas, columns}) {
    return(
        <tbody>
            {datas.map((data, index) => (
                <tr key={`tbody-tr-${index}`}>
                    {columns.map(({accessor}, index) => (
                        <td key={`tbody-td-${index}`}>{data[accessor]}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    )
}

export default TableBody