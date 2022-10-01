import Link from 'next/link'
import cssBtn from '../styles/btn.module.css'

export default function BtnPrincipal(props) {
    return (<>
        <Link href={props?.link}>
            <a class={cssBtn?.container}>
                <p class={cssBtn?.texto}>{props?.children}</p>
            </a>
        </Link>
    </>)
}