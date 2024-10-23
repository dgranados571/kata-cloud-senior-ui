import React, { useState } from 'react'
import { ILoginProps } from '../modelos/IProps'
import { useNavigate } from 'react-router-dom';

const Login: React.FC<ILoginProps> = () => {

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState('')
    const [contrasenia, setContrasenia] = useState('')

    const [usuarioClass, setUsuarioClass] = useState(false)
    const [contraseniaClass, setContraseniaClass] = useState(false)
    const [mensajeAction, setMensajeAction] = useState(false)

    const loginAction = () => {

        let formValidado: string[] = [];

        setUsuarioClass(false)
        if (usuario.length === 0) {
            formValidado.push('Usuario');
            setUsuarioClass(true)
        }

        setContraseniaClass(false)
        if (contrasenia.length === 0) {
            formValidado.push('Contrasenia');
            setContraseniaClass(true)
        }

        setMensajeAction(false)
        if (formValidado.length === 0) {
            if (usuario.toUpperCase() === 'ADMIN' && contrasenia === 'admin') {
                sessionStorage.setItem('usuarioApp', 'ADMIN_TOKEN')
                navigate('/gestor-tareas')
            } else {
                setMensajeAction(true)
            }
        } else {
            formValidado.splice(0, formValidado.length)
        }

    }

    return (
        <>
            <div className='container'>
                <div className="div-titulo-container">
                    <h4>Kata Desarrollador Cloud Senior BDB</h4>
                </div>
                <div className="row">
                    <div className="col-12 col-sm-1 col-md-2 col-lg-4"></div>
                    <div className="col-12 col-sm-10 col-md-8 col-lg-4">
                        <div className="div-form-login-contaier-padre">
                            <div className="div-form-login-contaier">
                                <div className="">
                                    <div className='div-form'>
                                        <p className='p-label-form-login'> Usuario: </p>
                                        <input type="text" name='contrasenia' value={usuario} onChange={(e) => setUsuario(e.target.value)} className='form-control' placeholder='' autoComplete='off' />
                                    </div>
                                </div>
                                {
                                    usuarioClass ?
                                        <p className='p-aling-right'>Campo es requerido</p>
                                        :
                                        <br />
                                }
                                <div className="">
                                    <div className='div-form'>
                                        <p className='p-label-form-login'> Contraseña: </p>
                                        <input type="password" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} className="form-control" />
                                    </div>
                                </div>
                                {
                                    contraseniaClass ?
                                        <p className='p-aling-right'>Campo es requerido</p>
                                        :
                                        <br />
                                }
                                <div className="div-buttom">
                                    <button type="button" className="btn btn-primary" onClick={() => loginAction()}>Ingresar</button>
                                </div>
                                {
                                    mensajeAction ?
                                        <p className='p-aling-center mt-3'>Usuario y/o contraseña incorrecto</p>
                                        :
                                        <br />
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-1 col-md-2 col-lg-4"></div>
                </div>
            </div>
        </>
    )
}

export default Login