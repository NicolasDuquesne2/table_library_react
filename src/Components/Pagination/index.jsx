import {useEffect, useRef, useState } from 'react'
import './pagination.css'


/**
 * 
 * @module Pagination
 */

/**
 * selectPageNumber sets the page number for displaying datas by slice
 * @callback selectPageNumber
 * @param {number} number
 */


/**
 * Renders the Table bottom part : navigation buttons and view counter
 * Is responseble for selecting pages selections
 * @param {selectPageNumber} callback
 * @param {Object} paginatorParams contains totalPages, pageNumber, slicedDataParams, totalRows variables 
 * @returns {React.ReactComponentElement}
 */
function Pagination({paginatorParams, selectPageNumber}) {

    const nextButtonRef = useRef(null)
    const previousButtonRef = useRef(null)
    const {totalPages, pageNumber, slicedDataParams, totalRows} = paginatorParams
    const pageNumbersArr = []
    const numberButtonsRef = useRef([])
    const [localPageNumber, setLocalPageNumber] = useState(1)

    
    for(let i = 1; i <= totalPages; i++) {
        pageNumbersArr.push(i)
    }

    /**
     * addToRefs feed the numberButtonsRef object, containing buttons references
     * @param {Object} element button object 
     * 
     */
    const addToRefs = (element) => {
        if(element && !numberButtonsRef.current.includes(element)) {
            numberButtonsRef.current.push(element)
        }
    }

    /**
     * highlightButton applay a select style for a selected button
     * @param {number} pageNumber page number selected 
     * 
     */
    const highlightButton = (pageNumber) => {
        const indexPageNumber = pageNumber -1
        numberButtonsRef.current[indexPageNumber].classList.add('highlighted')
        numberButtonsRef.current[indexPageNumber].classList.remove('page-button')
    }

    /**
     * highlightButton remove the select style on a button
     * typicaly for unselected buttons
     * @param {number} pageNumber page number selected 
     * 
     */
    const disHighlightButton = (pageNumber) => {
        const indexPageNumber = pageNumber -1
        numberButtonsRef.current[indexPageNumber].classList.add('page-button')
        numberButtonsRef.current[indexPageNumber].classList.remove('highlighted')
    }

     /**
     * onPageButton fires on a numbered button click. Launches the selectPageNumber callback
     * @param {number} number page number get by button value
     * 
     */
    const onPageButton = (e, number) => {
        selectPageNumber(number)
    }

    /**
     * onSideButton fires on previous or next button. Sets a new page number and launches the selectedPageNumber function
     * @param {Object} e event object
     * 
     */
    const onSideButton = (e) => {

        const sideButton = e.target

        switch(sideButton.id) {
            case 'previous':
                if(pageNumber > 1) {
                    selectPageNumber(pageNumber -1)
                }
                break
            case 'next':
                if(pageNumber < totalPages) {
                    selectPageNumber(pageNumber + 1)
                }
                break
            default:
        }
    }

    
    /**
    * the useEffect manages the buttons pages highlights
    * fires on pageNumber or totalPages changings
    * @param {number} pageNumber a page number
    * @param {number} totalPages a total pages
    */
    useEffect(() => {

        /**
        * If buttons refs are available, dishighlight previous button and highlight current button
        */
        if (numberButtonsRef.current.length > 0) {
            disHighlightButton(localPageNumber)
            highlightButton(pageNumber)
        }
    
        /**
        * Registers the page number in a local page number state
        * used to dishighlight an unselected button
        */
        if(localPageNumber > 0 ) {
            setLocalPageNumber(pageNumber)
        }

        /**
         * Activate or deactivate previous and next button according to the page button selected
         */
        pageNumber > 1? previousButtonRef.current.disabled = false: previousButtonRef.current.disabled = true
        pageNumber < totalPages?  nextButtonRef.current.disabled = false: nextButtonRef.current.disabled = true
        
        /**
         * Purges the pages buttons ref. tipicaly usefull when the total of pages changes. The ref table tends to keep dead refs
         */
        numberButtonsRef.current = []

    }, [pageNumber, totalPages])

    return(
        <div className='pagination-wrapper'>
            <p className='entries-info'>{`Showing ${slicedDataParams.firstRowNumber} to ${slicedDataParams.lastRowNumber} of ${totalRows} entries`}</p>
            <nav className="pagination-nav">
                <ul className="pagination" id="pagList">
                    <li>
                        <button className='sideButton' id="previous"  ref={previousButtonRef} onClick={(e) => onSideButton(e)}>Previous</button>
                    </li>
                    {pageNumbersArr.map((pnumber) => {
                        return(
                            <li key={`page-number${pnumber}`} >
                                <button
                                    ref={addToRefs} 
                                    onClick={(e) => onPageButton(e, pnumber)} 
                                    className="page-button"
                                    id={`button-${pnumber}`}>
                                    {pnumber}
                                </button>
                            </li>
                        )
                    })}
                    <li>
                        <button className='sideButton' id="next" ref={nextButtonRef} onClick={(e) => onSideButton(e)}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination