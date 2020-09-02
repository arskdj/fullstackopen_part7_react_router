import { useState } from 'react'

const useField = (name) => {

    const [value, setValue] = useState('')
    const onChange = (event) => {
        setValue(event.target.value) 
    }
    const reset = () => { setValue('') }

    return {
        field : {
            name,
            value,
            onChange,
        },
        reset
    } 
}

export  {
    useField
}
