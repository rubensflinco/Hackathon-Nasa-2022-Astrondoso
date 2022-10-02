import Link from 'next/link'
import replaceAll from '../functions/replaceAll'
import cssCard from '../styles/card.module.css'

export default function CardImagens(props) {
    return (<>
            <div class={`${cssCard.cardImagens} flex flex-col gap-2.5 justify-start items-center w-[21.88rem] p-2.5 rounded-[0.87rem] backdrop-blur-[13.8427734375px] mb-5`}>
                <p class="block w-full text-[1.04rem] text-zinc-300 ">{props.titulo}</p>
                <p dangerouslySetInnerHTML={{ __html: replaceAll(props?.descricao, "\n", "</br>") }} class="block w-full text-[0.87rem] text-zinc-300 " />
                <div class={cssCard?.limitImg}>
                    <img src={props.img} />
                </div>
            </div>
    </>)
}