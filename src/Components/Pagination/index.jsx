import {useEffect, useRef, useState } from 'react'

import './pagination.css'

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

    const addToRefs = (element) => {
        if(element && !numberButtonsRef.current.includes(element)) {
            numberButtonsRef.current.push(element)
        }
    }

    const highlightButton = (pageNumber) => {
        const indexPageNumber = pageNumber -1
        numberButtonsRef.current[indexPageNumber].classList.add('highlighted')
        numberButtonsRef.current[indexPageNumber].classList.remove('page-button')
    }

    const disHighlightButton = (pageNumber) => {
        const indexPageNumber = pageNumber -1
        numberButtonsRef.current[indexPageNumber].classList.add('page-button')
        numberButtonsRef.current[indexPageNumber].classList.remove('highlighted')
    }

    const onPageButton = (e, number) => {
        selectPageNumber(number)
    }

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

    //the useEffect manages the buttons pages highlights
    
    useEffect(() => {

        // if buttons refs are available, dishighlight previous button and highlight current button 
        if (numberButtonsRef.current.length > 0) {
            disHighlightButton(localPageNumber)
            highlightButton(pageNumber)
        }
    
        if(localPageNumber > 0 ) {
            setLocalPageNumber(pageNumber)
        }

        //activate or deactivate previous and next button according to the page button selected
        pageNumber > 1? previousButtonRef.current.disabled = false: previousButtonRef.current.disabled = true
        pageNumber < totalPages?  nextButtonRef.current.disabled = false: nextButtonRef.current.disabled = true
        
        //purges the pages buttons ref. tipicaly usefull when the total of pages changes. The ref table tends to keep dead refs
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