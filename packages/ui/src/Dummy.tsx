import React from "react";

interface DummyProps {
    children: React.ReactNode;
    onClick: ()=>void;
}

export function Dummy({children, onClick}: DummyProps){
    return <button onClick={onClick}>
    <small>UIUIUI</small>
        {
            children
        }
    </button>
}