import Link from 'next/link'
import cssCard from '../styles/card.module.css'

export default function CardImagens(props) {
    return (<>
    
    <div>
        <div class={`${cssCard.cardImagens} flex flex-col gap-2.5 justify-start items-center w-full p-2.5 rounded-[0.87rem] backdrop-blur-[13.8427734375px] pt-5`}>
            <p class="block w-full text-[1.04rem] text-zinc-300 ">{props.titulo}</p>
            <p class="block w-full text-[0.87rem] text-zinc-300 ">{props.descricao}</p>
            <div class="flex flex-row justify-center items-center overflow-hidden w-full h-[12.50rem] rounded-[0.87rem]">
                <img class="block" src={props.img} />
            </div>
        </div>
    </div>

    </>)
}