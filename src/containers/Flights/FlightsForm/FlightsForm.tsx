import React, { Component } from "react";
import styles from './FlightsForm.module.css';
import FormControl from '../../../components/UI/FormControl/FormControl';
import Button from '../../../components/UI/Button/Button';


interface IFormProps {
    airports: string[];
    passDataForm(formData: FormData): void;
}

interface ValidationRules {
    isValid: boolean;
    required: boolean;
    isDifferent: boolean;
    touched: boolean;
    errorMessage: string;
}

interface IFormState {
    [key: string]: object | boolean
}

interface FormData {
    [key: string]: string;
}


type FormControlName = "start" | "destination";


class FlightsForm extends Component<IFormProps, IFormState>{

    readonly state = {
        searchForm: {
            start: {
                type: 'select',
                options: this.getAirportOptions(),
                id: 'start',
                name: 'start',
                placeholder: 'Start airport',
                value: '',
                validation: {
                    isValid: false,
                    required: true,
                    isDifferent: true,
                    touched: false,
                    errorMessage: ""
                }
            },
            destination: {
                type: 'select',
                options: this.getAirportOptions(),
                id: 'destination',
                name: 'destination',
                placeholder: 'Destination airport',
                value: '',
                validation: {
                    isValid: false,
                    required: true,
                    isDifferent: true,
                    touched: false,
                    errorMessage: ""
                }
            }
        },
        formIsValid: false,
        loading: false
    }

    getAirportOptions(): Array<{ value: string }> {
        const options: Array<{ value: string }> = [];
        if (this.props.airports) {
            const airports = this.props.airports.slice();
            airports.map((airport: string) => options.push({ value: airport }));
        }
        return options;
    }

    formControlHandler(event: React.ChangeEvent<HTMLInputElement>, idFormControl: FormControlName): void {
        const updatedForm = { ...this.state.searchForm };
        const updatedElement = { ...updatedForm[idFormControl] };
        updatedElement.value = event.target.value;
        const [isValid, errMessage] = this.checkValidation(updatedElement);
        updatedElement.validation.touched = true;
        updatedElement.validation.isValid = isValid;
        updatedElement.validation.errorMessage = errMessage;
        updatedForm[idFormControl] = updatedElement;

        let formIsValid =  this.state.searchForm.start.validation.isValid && this.state.searchForm.destination.validation.isValid;

        this.setState({ searchForm: updatedForm, formIsValid: formIsValid });
    }

    flightsFormHandler(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        const formData = {
            start: this.state.searchForm.start.value.toUpperCase(),
            destination: this.state.searchForm.destination.value.toUpperCase()
        };
        this.sendData(formData);
    }

    sendData = (formData: FormData) => {
        this.props.passDataForm(formData);
    }

    checkValidation(formControl: { validation: ValidationRules, value: string, name: string }): [boolean, string] {
        let isValid = true;
        let errorMessage: string = "";
        if (formControl.validation.required) {
            isValid = formControl.value.trim() !== '' && isValid;
            if (!isValid) errorMessage = 'This field is required!';
        }
        if (formControl.validation.isDifferent) {
            if (this.state.searchForm.start.name === formControl.name) {
                isValid = formControl.value !== this.state.searchForm.destination.value && isValid;
            } else {
                isValid = formControl.value !== this.state.searchForm.start.value && isValid;
            }
            if (!isValid) errorMessage = 'The field should be different!';
        }
        return [isValid, errorMessage];
    }


    render(): JSX.Element {
        return (
            <section className={styles['flights-search-section']}>
                <form className={styles['form']} onSubmit={(event: React.FormEvent<HTMLFormElement>) => this.flightsFormHandler(event)}>
                    <FormControl
                        labelName="From"
                        changed={(event: React.ChangeEvent<HTMLInputElement>) => this.formControlHandler(event, (Object.keys(this.state.searchForm)[0]) as FormControlName)}
                        placeholder={this.state.searchForm.start.placeholder}
                        formControlType={this.state.searchForm.start.type}
                        options={this.state.searchForm.start.options}
                        id={this.state.searchForm.start.id}
                        name={this.state.searchForm.start.name}
                        errorMessage={this.state.searchForm.start.validation.errorMessage}
                        touched={this.state.searchForm.start.validation.touched}
                    />
                    <FormControl
                        labelName="To"
                        changed={(event: React.ChangeEvent<HTMLInputElement>) => this.formControlHandler(event, (Object.keys(this.state.searchForm)[1]) as FormControlName)}
                        placeholder={this.state.searchForm.destination.placeholder}
                        formControlType={this.state.searchForm.destination.type}
                        options={this.state.searchForm.destination.options}
                        id={this.state.searchForm.destination.id}
                        name={this.state.searchForm.destination.name}
                        errorMessage={this.state.searchForm.destination.validation.errorMessage}
                        touched={this.state.searchForm.destination.validation.touched}
                    />
                    <Button size="large" disabled={!this.state.formIsValid}>Search</Button>
                </form>
            </section>
        );
    }
}

export default FlightsForm;