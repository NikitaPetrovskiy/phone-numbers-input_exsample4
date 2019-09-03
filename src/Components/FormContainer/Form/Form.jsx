import React  from 'react';

export const Form = (props) => {
    return (
        <form className={props.clss}>
            {props.children}
        </form>
    )
}