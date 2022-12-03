import React from 'react';
import Microtasks from "./microtasks/microtasks";
import s2 from './App.module.css'
import {High} from "./todolist/High";

const App = () => {

    return (
        <div className={s2.app}>
            {/*<Microtasks/>*/}
            < High/>

        </div>
    );
};

export default App;