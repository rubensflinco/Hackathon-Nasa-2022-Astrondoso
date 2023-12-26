import Link from 'next/link'
import cssBtn from '../styles/btn.module.css'

export default function LinkSecundario(props) {
    return (<>
        <Link href={props?.link}>
            <a className={`${cssBtn?.btnRespostaNeutro} text-center flex flex-row gap-11  items-center w-full p-2.5 rounded-[0.87rem] backdrop-blur-[13.8427734375px]`}>
                <p className={`block w-full text-[0.87rem] text-white `}>{props?.children}</p>
            </a>
        </Link>
    </>)
}