import Link from 'next/link'
import cssCard from '../styles/card.module.css'

export default function CardPrincipal(props) {
    return (<>
        <Link href={props?.link}>
            <a target={props?.target}>
                <div class={`${cssCard.cardPrincipal} flex flex-row gap-11 justify-start items-center w-[21.88rem] p-[1.56rem] rounded-[0.87rem] backdrop-blur-[13.8427734375px]`}>
                    <div class={`flex flex-col gap-[0.31rem] justify-center items-start w-full`}>
                        <p class="block w-full text-[1.04rem] text-white ">{props?.titulo}</p>
                        <p class="block w-full text-[0.87rem] text-white ">{props?.descricao}</p>
                    </div>
                    {
                        (props?.img) && (<>
                            <div class="flex flex-col justify-center items-center">
                                <div>
                                    <img class="block" src={props?.img} />
                                </div>
                            </div>
                        </>)
                    }

                </div>
            </a>
        </Link>
    </>)
}