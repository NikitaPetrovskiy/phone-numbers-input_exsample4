import React, {Component} from 'react';
import {PhoneInput} from "./PhoneInput";
const PHONE_MAX_LENGHT = 13;
const PHONE_CODS = ['29', '44', '25', '33']

export class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isCodeCountryErr: false,
            isCodeOperErr: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    returnPhoneCode(code) {
        for (let i = 0; i < PHONE_CODS.length; i++) {
            if (code === PHONE_CODS[i]){ return true }
        }
    }
    checkCountryCode(countryCode) {
        return countryCode && countryCode !== '+375';
    }
    checkOperatorCode(operCode) {
       if (operCode && !this.returnPhoneCode(operCode)) {
           this.setState(({state}) => ({isCodeOperErr: true}))
       } else {
           this.setState(({state}) => ({isCodeOperErr: false}))
       }
    }
    handleChange(event) {
        const {value} = event.target;
        const countryCode = value.length >= 4 && value.slice(0, 4);
        const operCode = value.length >= 6 && value.slice(4, 6);
        const isCodeCountryErr = this.checkCountryCode(countryCode);
        this.checkOperatorCode(operCode);
        this.setState({value, isCodeCountryErr});
    }

    handleClick(event) { event.preventDefault(); }

    render() {
        const isChangeInput = this.handleChange;
        return (
            <div className="form-popup">
                <form className="form-container">
                    <h2>Введите номер телефона</h2>
                    {this.state.isCodeCountryErr && <h3>Введите правильный код страны</h3>}
                    {this.state.isCodeOperErr && <h3>Оператор с таким кодом отсутствует</h3>}
                    <PhoneInput type='text' value={this.state.value} holder="+375449379992"
                           onChange={isChangeInput} length={PHONE_MAX_LENGHT} />
                    <button type="submit" className="btn" onClick={this.handleClick}>Отправить</button>
                </form>
            </div>
        )
    }
}