import * as React from 'react';
import cssCard from '../styles/card.module.css'

export default function CardQuiz(props) {

    let [aberto, setAberto] = React.useState(false);

    return (<>

        <div>
            <div class={`${cssCard.cardImagens} flex flex-col gap-2.5 justify-start items-center w-full p-2.5 rounded-[0.87rem] backdrop-blur-[13.8427734375px]`}>
                <p class="block w-full text-[1.04rem] text-zinc-300 ">{props.titulo}</p>
                <p class="block w-full text-[0.87rem] text-zinc-300 ">{props.descricao}</p>
                {
                    (props.img) && (
                        <div class="flex flex-row justify-center items-center overflow-hidden w-full h-[12.50rem] rounded-[0.87rem]">
                            <img class="block" src={props.img} />
                        </div>
                    )
                }
                {props?.children}
                <p class="block w-full text-[0.87rem] text-zinc-300 mt-2 ">
                    {(props.acertou === true) && (`Você acertou parabéns você ganhou 10 pts!`)}
                    {(props.acertou === false) && (`Poxa que pena não foi dessa vez mais, você perdeu 3 pts!`)}
                </p>
            </div>
        </div>

    </>)
}