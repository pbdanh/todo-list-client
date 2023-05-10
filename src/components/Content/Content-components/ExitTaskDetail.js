import CloseIcon from '@mui/icons-material/Close';

import { inactiveCurrentTask } from '../../../slice/currentTaskSlice';

import './ExitTaskDetails.css';

import { useDispatch } from 'react-redux';

export default function ExitTaskDetail() {

    const dispatch = useDispatch();
    return(
        
            <button className='btn-close' onClick={() => {
            dispatch(inactiveCurrentTask());
        }}>
            <CloseIcon />
        </button>
        
        
    )
}