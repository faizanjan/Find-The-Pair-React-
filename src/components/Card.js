import {useEffect} from 'react'

let Card = ({value})=>{
    return(
        <div className="card" id={value}>
            <span className="card-value">{value}</span>
        </div>
    )
}

export default Card;