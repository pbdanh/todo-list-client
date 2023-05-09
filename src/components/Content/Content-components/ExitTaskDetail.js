import CloseIcon from '@mui/icons-material/Close';

import { inactiveCurrentTask } from '../../../slice/currentTaskSlice';

import { useDispatch } from 'react-redux';

export default function ExitTaskDetail() {

    const dispatch = useDispatch();


    return(
        <button onClick={() => {
            dispatch(inactiveCurrentTask());
        }}>
            <CloseIcon />
        </button>
    )
}