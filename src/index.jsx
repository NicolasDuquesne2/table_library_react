import React from "react"
import {createRoot} from 'react-dom/client'
import Table from './Components/Table'
import { dataMoke, columns} from './params/dataMoke'


const root = createRoot(document.getElementById('root'));

root.render(
    <Table payload={{datas: dataMoke, columns}} />
)
