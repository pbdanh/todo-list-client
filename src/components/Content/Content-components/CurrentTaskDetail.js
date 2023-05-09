import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import React from "react";
import axios from "axios";


export default function CurrenTaskDetail() {

    const dispatch = useDispatch();

    const currentTask = useSelector((state) => state.currentTask);
    return (<div>


        <input
            type="text"
            value={currentTask.note}>
            

        </input>
    </div>)
}