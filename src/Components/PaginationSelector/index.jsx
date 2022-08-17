import SelectMenu from "../SelectMenu";
import './paginator.css'

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