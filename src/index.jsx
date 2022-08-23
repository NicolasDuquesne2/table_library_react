import React from "react"
import {createRoot} from 'react-dom/client'
import { dataMoke, columns } from "./params/dataMoke";
import Table from './lib/Components/Table'


const root = createRoot(document.getElementById('root'));

root.render(
    <Table payload={{datas: dataMoke, columns:columns}} />
)
