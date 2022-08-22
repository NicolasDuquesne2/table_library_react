import './filter.css'

/**
 * 
 * @module Filter
 */

/**
 * handleFilter resets the page number to 1 and filter datas with search bar content
 * Searching displays the first page of the search result 
 * @callback handleFilter
 * @param {number} number
 */


/**
 * The filter displays the search bar and manages the inputs interactions
 * @param {handleFilter} callback
 * @returns {React.ReactComponentElement}
 */
function Filter({handleFilter}) {

    /**
    * handleOnChange fires on search bar changings
    * gets the search bar text and launches the handleFilter function
    * @param {Object} e
    */
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