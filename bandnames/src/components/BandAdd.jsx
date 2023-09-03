import React, { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";

export const BandAdd = () => {
  const {socket} = useContext(SocketContext);
  const [value, setValue] = useState("");
    const onSubmit = (e) => {
        e.preventDefault();
        if (value.trim().length > 0) {
            socket.emit('create-band', value.trim())
            setValue("");
        }
    }
    return (
        <>
            <h3>Add band</h3>

            <form onSubmit={onSubmit}>
                <input
                    className="form-control"
                    placeholder="New band name"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </form>
        </>
    )
}