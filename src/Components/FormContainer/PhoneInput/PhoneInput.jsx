import React from 'react';

export const PhoneInput = (props) => {
    return (
        <input type={props.type} value={props.value} placeholder={props.holder}
               onChange={props.onChange} maxLength={props.length} />
    )
}