import React from 'react';
import Wrap from '../../../hoc/Wrap';
import styles from './FormControl.module.css';

const FormControl = (props: any) => {

    let formControl = null;
    const touched = props.touched;
    const errorMessage = props.errorMessage;

    switch (props.formControlType) {
        case ('select'):
            formControl = (
                <Wrap>
                    <select className={styles['form-control']} id={props.id} name={props.name} onChange={props.changed} placeholder={props.placeholder}>
                        <option value={props.placeholder} key="placeholder" hidden>{props.placeholder}</option>
                        {props.options.map((option: { value: string }) => {
                            return (<option
                                value={option.value.toLowerCase()}
                                key={option.value.toLowerCase()}>
                                {option.value.toUpperCase()}
                            </option>)
                        })}
                    </select>
                    {errorMessage && touched ? <span className={styles['error-mess']}>{errorMessage}</span> : <span className={styles["span-placeholder"]}>ss</span>}
                </Wrap>
            )
            break;
}

return (
    <div className={styles['form-group']}>
        <label className={styles['form-label']} htmlFor={props.id}>{props.labelName}</label>
        {formControl}
    </div>
)
}

export default FormControl;