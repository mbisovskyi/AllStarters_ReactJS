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
        switch (e.target.type) {
            case "checkbox":
                setFormData({...formData, [e.target.name]: e.target.checked });
                break;
            default:
                setFormData({...formData, [e.target.name]: e.target.value });
                break;
        }
    }

    function handleReset(){
        setFormData(defaultData);
    }

    return [formData, handleOnSubmit, handleOnChange, handleReset];
}