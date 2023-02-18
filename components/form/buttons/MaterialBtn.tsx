import CircleProgress from "../../animations/progress/circular_progress"

export interface IMaterialBtnProps extends React.ComponentPropsWithoutRef<"button"> {
    label : string,
    onClickFun : Function, 
    isBlock  :boolean, 
    isSecondary:boolean, 
    isPrimary:boolean, 
    isLoading:boolean
}

const MaterialBtn: React.FC<IMaterialBtnProps> = ({ label, onClickFun, isBlock, isSecondary, isPrimary, isLoading, ...buttonProps }) => {
    return (
        <button
        type="button"
        onClick={()=>{onClickFun();}}
        className={`button  ${ isBlock  ? "blockBtn" : "flexBtn" } ${ isPrimary ? "materialPrimaryBtn" : "" } ${ isSecondary ? "materialSecondaryBtn" : "" } txtCenter`}
        >
        {isLoading && (<CircleProgress />)}
        <span className="ml-sm">{label}</span>
    </button>
    )
}

export default MaterialBtn