import React from 'react';
import Microtasks from "./microtasks/microtasks";
import s2 from './App.module.css'
import {High} from "./todolist/High";
import {Request} from "./WirstServer/Request";

const App = () => {

    return (
        <div className={s2.app}>
            {/*<Microtasks/>*/}
            {/*< High/>*/}
            <Request/>
        </div>
    );
};

export default App;