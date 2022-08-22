import React from "react"
import {createRoot} from 'react-dom/client'
import Table from './lib/Components/Table'


const root = createRoot(document.getElementById('root'));

root.render(
    <Table payload={{datas: null, columns:null}} />
)
