// React imports
import { useState } from "react";

export default function useCustomForm(defaultData = {}, onSubmit){
    const [formData, setFormData] = useState(defaultData);

    function handleOnSubmit(e){
        e.preventDefault();
        onSubmit(formData);
    }

    function handleOnChange(e){
        e.persist();
        setFormData({...formData, [e.target.name]: e.target.value });
    }

    function handleReset(){
        setFormData(defaultData);
    }

    return [formData, handleOnSubmit, handleOnChange, handleReset];
}