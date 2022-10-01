import Link from 'next/link'
import cssCard from '../styles/card.module.css'

export default function CardSecundario(props) {
    return (<>
        <div class={`${cssCard.cardSecundario} flex flex-row gap-11 justify-start items-center w-[21.88rem] p-2.5 rounded-[0.87rem] backdrop-blur-[13.8427734375px]`}>
            <div class="flex flex-col gap-[0.31rem] justify-center items-start w-full">
                <p class="block w-full text-[1.04rem] text-white ">{props.titulo}</p>
                <p class="block w-full text-[0.87rem] text-white ">{props.descricao}</p>
            </div>
        </div>


    </>)
}