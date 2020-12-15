import { CSSProperties } from "react"

const Loader = ({style}: {style? : CSSProperties, className? : string})=>{
    return (
        <div className='loader' style={style}></div>
    )
}
export default Loader