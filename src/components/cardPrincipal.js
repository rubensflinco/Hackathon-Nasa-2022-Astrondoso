import Link from 'next/link'
import cssCard from '../styles/card.module.css'

export default function CardPrincipal(props) {
    return (<>
        <Link href={props?.link}>
            <a target={props?.target}>
                <div className={`${cssCard.cardPrincipal} flex flex-row gap-11 justify-start items-center w-[21.88rem] p-[1.56rem] rounded-[0.87rem] backdrop-blur-[13.8427734375px]`}>
                    <div className={`flex flex-col gap-[0.31rem] justify-center items-start w-full`}>
                        <p className="block w-full text-[1.04rem] text-white ">{props?.titulo}</p>
                        <p className="block w-full text-[0.87rem] text-white ">{props?.descricao}</p>
                    </div>
                    {
                        (props?.img) && (<>
                            <div className="flex flex-col justify-center items-center">
                                <div>
                                    <img className="block" src={props?.img} />
                                </div>
                            </div>
                        </>)
                    }

                </div>
            </a>
        </Link>
    </>)
}