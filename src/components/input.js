import cssInput from '../styles/input.module.css'

export default function InputPrincipal(props) {
    return (<>

        <div class="mb-3">
            <label for="exampleFormControlInput1" class={`form-label ${cssInput.inputTitulo}`}>{props?.titulo}</label>
            <input type={props?.type || `text`} class={`form-control ${cssInput?.inputPrincipal}`} id={props?.name} name={props?.name} placeholder={props?.children} />
        </div>

    </>)
}