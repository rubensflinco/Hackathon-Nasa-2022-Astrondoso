import Link from 'next/link'
import cssBtn from '../styles/btn.module.css'

export default function LinkPrincipal(props) {
    return (<>
        <Link href={props?.link}>
            <a className={`${cssBtn?.container} ${props?.className}`}>
                <p className={cssBtn?.texto}>{props?.children}</p>
            </a>
        </Link>
    </>)
}