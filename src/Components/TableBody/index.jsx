
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