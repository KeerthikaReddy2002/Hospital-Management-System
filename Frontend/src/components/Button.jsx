import React from "react";
import "../styles.css";
import { useNavigate } from 'react-router-dom';

function Button(props) {
    const navigate = useNavigate();
    const navigateTo = () => {
        navigate("/" + props.goto);
    };
    return (
        <div className="button">
            <button onClick={navigateTo} className="button">{props.text}</button>
        </div>
    );
}

export default Button;