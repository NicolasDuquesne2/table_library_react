//@ts-no-check
import './selectmenu.css'


/**
 * 
 * @module SelectMenu
 */


/**
 * Renders a list of select menu options
 * @returns {React.ReactComponentElement}
 */
function SelectMenu({params}) {

    const optionKind = params.keyPart
    const datas = params.datas
    const typeOfDatas = params.typeOfDatas
    const dataAttribute = params.dataAttr
    

    switch(typeOfDatas) {
        case 'array':
            return (
                datas.map((data, index) => { return <option key={`${optionKind}${index}`}>{data}</option>})
            )
        case 'object':
            return (
                datas.map((data, index) => { return <option key={`${optionKind}${index}`}>{data[dataAttribute]}</option>})
            )
        default:
                   
    }
}

export default SelectMenu