import {ChangeEvent, FC, useState} from 'react';


export const Example_4 = () => {

    return (
        <div>
            <div>Lags when change value</div>
            <Input/>
            <SlowComponent/>
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

const SlowComponent = () => {
    console.log('SlowComponent re-render...');

    let now = performance.now();

    while (performance.now() - now < 1000) {
        // Artificial delay -- do nothing for 100ms
    }

    return <p>I am a very slow component tree.</p>;
};

