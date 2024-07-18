import { useState } from "react";

const useArray: <T>(data: Array<T>) => { state: T[], addElement: (element: T) => void } = (data) => {

    const [state, setState] = useState(data)

    const addElement = (element: any) => {
        setState([...state, element])
    }

    return { state, addElement };
}

export default useArray;