import { useEffect, useState } from "react";

function useDebounce(value , delay=500) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(()=>{
        const id = setTimeout(()=>{
            console.log('new Timeout');
            setDebouncedValue(value);
        }, delay)

        return ()=>{
            console.log('clearing Timeout');
            clearTimeout(id)
        }
    },[value, delay])

  return debouncedValue
}

export default useDebounce