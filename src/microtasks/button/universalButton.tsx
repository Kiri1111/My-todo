import React from 'react';

type PropsType = {
    callBackButton: () => void
    title: string
}
const UniversalButton = (props: PropsType) => {
    const onClickHandler = () => {
        props.callBackButton()
    }
    return (
        <div>
            <button onClick={onClickHandler}>{props.title}</button>
        </div>
    );
};

export default UniversalButton;