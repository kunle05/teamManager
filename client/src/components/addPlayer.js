import axios from "axios";
import { navigate } from "@reach/router"
import React, { useState } from "react";
// import axios from "axios";

const AddPlayer = () => {

    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [error, setError] = useState("");
    const [btnEnable, setBtnEnable] = useState(false);

    const validateName = e => {
        if(e.target.value.length >= 2) {
            setName(e.target.value)
            if(error) setError("") 
            if(!btnEnable) setBtnEnable(true)
        } else {
            setError("Name must be at least 2 characters long");
            if(btnEnable) setBtnEnable(false)
        }
    }

    const submitHandler = async e => {
        e.preventDefault();
        if(name === "" || name.length < 2) {
            setError("Name must be at least 2 characters long");
        } else {
            await axios.post("http://localhost:8200/newPlayer", {name, position});
            navigate("list")
        }
    }

    return (
        <div className="container col-9 p-4">
            <form onSubmit= {submitHandler}>
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label font-weight-bold">Player Name:</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" onChange={ validateName } />
                    </div>
                </div>
                { error && <div className="form-group row mb-0">
                    <label className="col-sm-3 mb-0" style={{marginTop: "-5px"}}>&nbsp;</label>
                    <span className="col-sm-6 text-center text-danger" style={{marginTop: "-10px"}}>{error}</span>
                </div> }
                <div className="form-group row">
                    <label className="col-sm-3 col-form-label font-weight-bold">Preferred Position:</label>
                    <div className="col-sm-6 =">
                        <input type="text" className="form-control" onChange={e => setPosition(e.target.value)} />
                    </div>
                </div>
                <div className="form-group">
                    { btnEnable ? <button className="btn btn-success btn-default col-md-3 offset-6 my-2" type="submit">ADD PLAYER</button>
                    : <button className="btn btn-success btn-default col-md-3 offset-6 my-2" type="button" disabled>ADD PLAYER</button> }
                </div>
            </form>
        </div>
    )
}

export default AddPlayer