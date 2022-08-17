import './filter.css'

function Filter({handleFilter}) {

    const handleOnChange = (e) => {
        const fieldValue = e.target.value
        handleFilter(fieldValue)
    }

    return (
        <form id="filter-form">
            <label htmlFor="filter-search">Search :</label>
            <input className="filter-input" type="search" id="filter-search" onChange={handleOnChange}/>
        </form>
    )  
}

export default Filter