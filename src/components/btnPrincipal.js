import cssBtn from '../styles/btn.module.css'

export default function BtnPrincipal(props) {
    return (<>
        <button type={props?.type} class={cssBtn?.container}>
            <p class={cssBtn?.texto}>{props?.children}</p>
        </button>
    </>)
}