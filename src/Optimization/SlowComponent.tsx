import {ChangeEvent, FC, useState} from 'react';
import {Simulate} from "react-dom/test-utils";
import change = Simulate.change;

type PropsExampleType = {
    children: JSX.Element
}
export const Example_4 = (props: PropsExampleType) => {

    return (
        <div>
            <div>Lags when change value</div>
            <Input/>
            {/*<SlowComponent/>*/}
            {props.children}
        </div>
    );
};


type InputPropsType = {}
const Input: FC<InputPropsType> = ({}) => {
    const [value, setValue] = useState('');

    const onChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.currentTarget.value);

    return (
        <input type="text" value={value} onChange={onChange}/>
    )

}

export const SlowComponent = () => {
    console.log('SlowComponent re-render...');

    let now = performance.now();

    while (performance.now() - now < 1000) {
        // Artificial delay -- do nothing for 100ms
    }

    return <p>I am a very slow component tree.</p>;
};

