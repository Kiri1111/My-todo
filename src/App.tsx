import React from 'react';
import Microtasks from "./microtasks/microtasks";
import s2 from './App.module.css'

const App = () => {

    return (
        <div className={s2.app}>
            <Microtasks/>


        </div>
    );
};

export default App;