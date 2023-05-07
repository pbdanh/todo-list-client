import { inc, dec } from "../../slice/counterSlice"

//dispatch

import { useDispatch } from "react-redux"


export default function Button() {

    const dispatch = useDispatch();
    // const incFunc = inc;

    return(
        <div>
            <button onClick={() => {
                dispatch(inc());
            }}
            >
                inc
            </button>
        </div>
    )
}