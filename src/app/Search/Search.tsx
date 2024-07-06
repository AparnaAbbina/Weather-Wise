import React from 'react';
import './Search.css';

export default function Search(props) {
    return React.createElement(
        React.Fragment,
        null,
        React.createElement('input', {
            type: 'text',
            name: 'text',
            className: 'input',
            placeholder: 'Enter your city or Town',
            value: props.value,
            onChange: props.onChange,
            id: 'cityInput'
        })
    );
}
