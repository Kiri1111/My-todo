import React, {Fragment} from 'react';
import Microtasks from "./microtasks/microtasks";
import s2 from './App.module.css'
import {High} from "./todolist/High";
import {Request} from "./WirstServer/Request";
import {Example_4, SlowComponent} from "./Optimization/SlowComponent";

const App = () => {

    return (
        <div className={s2.app}>
            {/*<Microtasks/>*/}
            {/*< High/>*/}
            <Request/>
            <Fragment>
                <Example_4>
                    <SlowComponent/>
                </Example_4>
            </Fragment>
        </div>
    );
};

export default App;