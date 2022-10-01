import cssInput from '../styles/input.module.css'

export default function InputPrincipal(props) {
    return (<>

        <div class="mb-3">
            <label for="exampleFormControlInput1" class={`form-label ${cssInput.inputTitulo}`}>{props?.titulo}</label>
            <input type="text" class={`form-control ${cssInput?.inputPrincipal}`} id="exampleFormControlInput1" placeholder={props?.children} />
        </div>

    </>)
}