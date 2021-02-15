import {useEffect, useRef, useState} from 'react';

export const useFormFields = ({
    initialValues,
    onSubmit,
    validate
}) => {
    const [values, setValues] = useState(initialValues || {});
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const formRendered = useRef(true);

    useEffect(() => {
        if (formRendered.current) {
            setValues(initialValues);
            setErrors({});
            setTouched({});
        }
        formRendered.current = false;
    }, [initialValues]);

    const handleChange = (event) => {
        const {target} = event;
        const {
            name,
            value
        } = target;
        setErrors({
            ...errors,
            [name]: null
        });
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleBlur = (event) => {
        const {target} = event;
        const {
            name,
            value
        } = target;
        setTouched({
            ...touched,
            [name]: true
        });
        const error = validate[name](value);
        setErrors({...errors, ...(error && {[name]: error})});
    };

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        setErrors({...errors});
        onSubmit({
            values,
            errors
        });
    };

    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit
    };
};
