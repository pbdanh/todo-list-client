import { useSelector } from "react-redux"

import { useDispatch } from "react-redux"

import { setCurrentTaskGroup } from "../../../slice/currentTaskGroupSlice";

import "./CurrentTaskGroupName.css"
import { useEffect } from "react";

import React from "react";
import axios from "axios";

export default function CurrentTaskGroupName() {

    const currentTaskGroup = useSelector((state) => state.currentTaskGroup);
   
    const dispatch = useDispatch();

    function UpdateTaskGroupName() {
        const data = {
            id: currentTaskGroup.id,
            name: currentTaskGroup.name
        }

        axios.put("http://localhost:8080/api/taskGroup", data, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            }
           
        })
        .then((res) => {
            
        })
    }

    return(
        
        

        <div>
            <input 
            className="taskGroupName"
            type="text"
            value={currentTaskGroup.name}
            onChange={(e) => {
                    console.log("change");
                    let payload = {...currentTaskGroup};
                    payload.name = e.target.value;
                    payload.changeName = true;
                    
                    dispatch(setCurrentTaskGroup( payload));
                }
            }
            ></input>

            {/* <button onclick={UpdateTaskGroupName()}>
                update
            </button> */}

        </div>
    )
}