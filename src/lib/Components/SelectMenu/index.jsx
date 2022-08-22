//@ts-no-check
import './selectmenu.css'


/**
 * 
 * @module SelectMenu
 */


/**
 * Renders a list of select menu options from an array or an object
 * @param {Object} params contains keyPart, datas, typOfDatas, dataAttr
 * @returns {React.ReactComponentElement}
 */
function SelectMenu({params}) {

    /***
     * optionKind is prefix for options keys
     * @type {String}
     * @alias module:SelectMenu.optionKind
     */
    const optionKind = params.keyPart
    /***
     * datas contains all list values for the select menu
     * @type {Array|Object}
     * @alias module:SelectMenu.datas
     */
    const datas = params.datas
    /***
     * typeOfDatas indicates the nature of the value container. an array or an object
     * @type {string}
     * @alias module:SelectMenu.typeOfDatas
     */
    const typeOfDatas = params.typeOfDatas
    /***
     * dataAttribute is an optional argument involved by objects. Indicates wich objecte attribute containes the value
     * @type {string}
     * @alias module:SelectMenu.dataAttribute
     */
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