import cssInput from '../styles/input.module.css'

export default function InputPrincipal(props) {
    return (<>

        <div className="mb-3">
            <label for="exampleFormControlInput1" className={`form-label ${cssInput.inputTitulo}`}>{props?.titulo}</label>
            <input type={props?.type || `text`} className={`form-control ${cssInput?.inputPrincipal}`} id={props?.name} name={props?.name} placeholder={props?.children} />
        </div>

    </>)
}