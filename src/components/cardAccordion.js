import * as React from 'react';
import cssCard from '../styles/card.module.css'

export default function CardAccordion(props) {

    let [aberto, setAberto] = React.useState(false);

    return (<>
        <div class={`${cssCard.cardSecundario} flex flex-col gap-11 justify-start items-center w-[21.88rem] p-2.5 rounded-[0.87rem] backdrop-blur-[13.8427734375px]`}>
            <div class="flex flex-row gap-[0.31rem] justify-center items-start w-full">
                <p class="block w-full text-[1.04rem] text-white ">{props.titulo}</p>
                <button onClick={() => { setAberto(!aberto) }}>
                    {
                        (aberto === true) ? (
                            <i class="fa-solid fa-angle-up fa-1x text-white"></i>
                        ) : (
                            <i class="fa-solid fa-angle-down fa-1x text-white"></i>
                            )
                    }
                </button>
            </div>
            {
                (aberto === true) && (
                    <div>
                        <p class="block w-full text-[0.87rem] text-white ">{props.conteudo}</p>
                    </div>
                )
            }
        </div>
    </>)
}