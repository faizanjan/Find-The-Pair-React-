import {useEffect, useState} from 'react'

let Card = ({value})=>{

    let [isActive, setIsActive] = useState(true);
    useEffect(()=>{
        setTimeout(()=>{
            setIsActive(false);
        },2000)
    },[])

    return(
        <div className="card" id={value}>
            {isActive && <span className="card-value">{value}</span>}
        </div>
    )
}

export default Card;