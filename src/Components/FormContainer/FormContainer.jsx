import React, {Component} from 'react';
import {Form} from './Form';

export class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '+',
            phoneCods: ['29', '44', '25', '33'],
            isCodeCountryErr: false,
            isCodeOperErr: false,
            maxLenght: 13,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    returnPhoneCode(code) {
        for (let i = 0; i < this.state.phoneCods.length; i++) {
            if (code.slice(4, 6) === this.state.phoneCods[i]) return true}
    }
    checkCountryCode(countryCode) {
        (countryCode && countryCode !== '+375') ?
            this.setState(({state}) => ({isCodeCountryErr: true}))
            : this.setState(({state}) => ({codeCountry: countryCode, isCodeCountryErr: false}));
    }
    checkOperatorCode(operCode) {
        (operCode.length >= 6 && !this.returnPhoneCode(operCode)) ?
            this.setState(({state}) => ({isCodeOperErr: true}))
            : this.setState(({state}) => ({isCodeOperErr: false}))
    }
    handleChange(event) {
        const targetVal = event.target.value;
        const countryCode = targetVal.length >= 4 && targetVal.slice(0, 4);
        this.setState(({state}) => ({value: targetVal}));
        this.checkCountryCode(countryCode);
        this.checkOperatorCode(targetVal);
    }
    handleClick(event) { event.preventDefault(); }

    render() {
        return (
            <div className="form-popup">
                <Form clss="form-container">
                    <h2>Введите номер телефона</h2>
                    {this.state.isCodeCountryErr && <h3>Введите правильный код страны</h3>}
                    {this.state.isCodeOperErr && <h3>Оператор с таким кодом отсутствует</h3>}
                    <input type='text' value={this.state.value} placeholder="+375291234567"
                           onChange={this.handleChange} maxLength={this.state.maxLenght} />
                    <button type="submit" className="btn" onClick={this.handleClick}>Отправить</button>
                </Form>
            </div>
        )
    }
}