import { useEffect, useState } from "react"


const opt = {
    active: true
}

const useGet = (api, options = opt) => {
    const [state, setState] = useState({});
    const onSubmit = async () => {
        if (state.loading) return;
        setState({ loading: true });
        try {
            const res = await fetch(api);
            const data = await res.json();
            if (res.ok) setState({ data });
            else setState({ err: { message: data.message || res.statusText } })
        }
        catch (err) {
            setState({ err })
        }
    }
    useEffect(() => {
        if (options.active) onSubmit()
    }, [options.active, api])
    return { ...state, onSubmit, setState };
}

export default useGet;