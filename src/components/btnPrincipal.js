import cssBtn from '../styles/btn.module.css'

export default function BtnPrincipal(props) {
    return (<>
        <button type={props?.type} className={cssBtn?.container}>
            <p className={cssBtn?.texto}>{props?.children}</p>
        </button>
    </>)
}