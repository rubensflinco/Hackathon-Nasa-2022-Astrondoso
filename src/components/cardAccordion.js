import * as React from 'react';
import replaceAll from '../functions/replaceAll';
import cssCard from '../styles/card.module.css'

export default function CardAccordion(props) {

    let [aberto, setAberto] = React.useState(false);

    return (<>
        <div className={`${cssCard.cardSecundario} flex flex-col gap-[1rem] justify-start items-center w-[21.88rem] p-2.5 rounded-[0.87rem] backdrop-blur-[13.8427734375px]`}>
            <button onClick={() => { setAberto(!aberto) }} className="flex w-100">
                <div className="flex flex-row gap-[0.31rem] justify-center items-start w-full">
                    <p className="block w-full text-[1.04rem] text-white ">{props.titulo}</p>
                    <div>
                        {
                            (aberto === true) ? (
                                <i className="fa-solid fa-angle-up fa-1x text-white"></i>
                            ) : (
                                <i className="fa-solid fa-angle-down fa-1x text-white"></i>
                            )
                        }
                    </div>
                </div>
            </button>
            {
                (aberto === true) && (
                    <div>
                        <p dangerouslySetInnerHTML={{ __html: replaceAll(props?.conteudo, "\n", "</br>") }} className="block w-full text-[0.87rem] text-white" />
                    </div>
                )
            }
        </div>
    </>)
}