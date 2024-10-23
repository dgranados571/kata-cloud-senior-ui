import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { faSignOut, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from './modal/modal'
import { IGenericResponse, IGestorTareas, ITareas } from '../modelos/IProps'
import { ServicesClient } from '../services/servicesClient'

const GestorTareas: React.FC<IGestorTareas> = () => {

    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false)
    const [propsModal, setPropsModal] = useState({})
    const [tipoModal, setTipoModal] = useState('')

    const [titulo, setTitulo] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [tareas, setTareas] = useState<ITareas[]>([])

    const [tituloError, setTituloError] = useState(false)
    const [descripcionError, setDescripcionError] = useState(false)

    const [cargando, setCargando] = useState(false)

    const [modoEdita, setModoEdita] = useState(false)
    const [tareaEdita, setTareaEdita] = useState<ITareas>({
        id: 0,
        titulo: '',
        descripcion: '',
        estado: ''
    })

    const [modoElimina, setModoElimina] = useState(false)
    const [tareaElimina, setTareaElimina] = useState<ITareas>({
        id: 0,
        titulo: '',
        descripcion: '',
        estado: ''
    })

    useEffect(() => {
        const usuarioSession = sessionStorage.getItem('usuarioApp');
        if (!!usuarioSession) {
            consultarTareasService()
        } else {
            setPropsModal({
                titulo: 'Sesion finalizada',
                descripcion: `Es nescesario volver a iniciar sesión`
            })
            setTipoModal('MODAL_CONTROL_1')
            setModalOpen(true)
        }
    }, [])

    const consultarTareasService = async () => {
        setCargando(true)
        const servicesClient = new ServicesClient();
        try {
            const response: IGenericResponse = await servicesClient.requestGet(2);
            if (response.estado) {
                setTareas(response.objeto)
            } else {
                console.error('No es posible hacer la consulta, contacte al administrador')
            }
            setCargando(false)
        } catch (error) {
            console.error('Error --> ', error)
            setCargando(false)
        }
    }

    const cargarTareaAction = () => {
        let formValidado: string[] = [];
        setTituloError(false)
        if (titulo.length === 0) {
            formValidado.push('Titulo');
            setTituloError(true)
        }
        setDescripcionError(false)
        if (descripcion.length === 0) {
            formValidado.push('Descripcion');
            setDescripcionError(true)
        }
        if (formValidado.length === 0) {
            if (modoEdita) {
                actualizaTareaService()
            } else {
                cargarTareaService()
            }
        } else {
            formValidado.splice(0, formValidado.length)
        }
    }

    const eliminaTareaService = async () => {
        const servicesClient = new ServicesClient();
        try {
            const response: IGenericResponse = await servicesClient.requestDelete(4, tareaElimina.id);            
            if (response.estado) {
                limpiaForm();
                consultarTareasService()
            } else {
                console.error('No es posible hacer la consulta, contacte al administrador')
            }
        } catch (error) {
            console.error('Error --> ', error)
        }
    }

    const actualizaTareaService = async () => {
        const servicesClient = new ServicesClient();
        const body: ITareas = {
            id: 0,
            titulo,
            descripcion,
            estado: ''
        }
        try {
            const response: IGenericResponse = await servicesClient.requestPut(3, tareaEdita.id, body);
            console.log(response)
            if (response.estado) {
                cancelaActualizaTareaAction()
                limpiaForm();
                consultarTareasService()
            } else {
                console.error('No es posible hacer la consulta, contacte al administrador')
            }
        } catch (error) {
            console.error('Error --> ', error)
        }
    }

    const cargarTareaService = async () => {
        const body: ITareas = {
            id: 0,
            titulo,
            descripcion,
            estado: ''
        }
        const servicesClient = new ServicesClient();
        try {
            const response: IGenericResponse = await servicesClient.requestPost(body, 1);
            if (response.estado) {
                limpiaForm();
                consultarTareasService()
            } else {
                console.error('No es posible hacer la consulta, contacte al administrador')
            }
        } catch (error) {
            console.error('Error --> ', error)
        }
    }

    const actualizaTareaAction = (tarea: ITareas) => {
        setTareaEdita(tarea)
        setModoEdita(true)
        setTitulo(tarea.titulo)
        setDescripcion(tarea.descripcion)
    }

    const cancelaActualizaTareaAction = () => {
        setTareaEdita({
            id: 0,
            titulo: '',
            descripcion: '',
            estado: ''
        })
        setModoEdita(false)
        setTitulo('')
        setDescripcion('')
    }

    const eliminaTareaAction = (tarea: ITareas) => {
        setModoElimina(true)
        setTareaElimina(tarea)
        propsModalEliminaTarea()
    }

    const modalSi = () => {
        setModalOpen(false)
        if (modoElimina) {
            eliminaTareaService()
        } else {
            cerrarSesion()
        }
    }

    const modalNo = () => {
        setModalOpen(false)
        setTareaElimina({
            id: 0,
            titulo: '',
            descripcion: '',
            estado: ''
        })
        setModoElimina(false)
    }

    const limpiaForm = () => {
        setTitulo('')
        setDescripcion('')
    }

    const cerrarSesion = () => {
        sessionStorage.clear();
        navigate('/login');
    }

    const propsModalEliminaTarea = () => {
        setPropsModal({
            titulo: 'Eliminar tarea',
            descripcion: `Seguro desea eliminar la tarea indicada?`
        })
        setTipoModal('MODAL_CONTROL_2')
        setModalOpen(true)
    }

    return (
        <>
            <div className='container'>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-4"></div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                        <div className="div-titulo-container">
                            <h4 className='m-0'>Gestor de Tareas BDB</h4>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                        <div className='div-item-menu' onClick={() => cerrarSesion()}>
                            <FontAwesomeIcon icon={faSignOut} className='icon-menu-lateral' />
                            <p className='m-0'>Cerrar sesión </p>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-5">
                        <div className="div-form-login-contaier-padre">
                            <div className="div-form-login-contaier">
                                <div className="">
                                    <div className='div-form'>
                                        <p className='p-label-form-login'> Titulo: </p>
                                        <input type="text" name='contrasenia' value={titulo} onChange={(e) => setTitulo(e.target.value)} className='form-control' placeholder='' autoComplete='off' />
                                    </div>
                                </div>
                                {
                                    tituloError ?
                                        <p className='p-aling-right'>Campo es requerido</p>
                                        :
                                        <br />
                                }
                                <div className="">
                                    <div className='div-form'>
                                        <p className='p-label-form-login'> Descripción: </p>
                                        <textarea className='form-control' value={descripcion} onChange={(e) => setDescripcion(e.target.value)} autoComplete='off' />
                                    </div>
                                </div>
                                {
                                    descripcionError ?
                                        <p className='p-aling-right'>Campo es requerido</p>
                                        :
                                        <br />
                                }
                                {
                                    modoEdita ?
                                        <div className='d-flex justify-content-around mt-3'>
                                            <div className="div-buttom">
                                                <button type="button" className="btn btn-primary" onClick={() => cargarTareaAction()}>Actualizar</button>
                                            </div>
                                            <div className="div-buttom">
                                                <button type="button" className="btn btn-secondary" onClick={() => cancelaActualizaTareaAction()}>Cancelar</button>
                                            </div>
                                        </div>
                                        :
                                        <div className="div-buttom">
                                            <button type="button" className="btn btn-primary" onClick={() => cargarTareaAction()}>Cargar</button>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-7">
                        <h5 className='mb-3'>Tareas BDB</h5>
                        <div className="row">
                            {
                                cargando ?
                                    <>Cargando ...</>
                                    :
                                    <>
                                        {
                                            tareas.length > 0 ?
                                                <>
                                                    {
                                                        tareas.map((tarea, key) => {
                                                            return (
                                                                <div key={key} className="col-12 col-sm-12 col-md-12 col-lg-6">
                                                                    <div className='div-tarea-container'>
                                                                        <p className='p-label-form'>{tarea.titulo} </p>
                                                                        <div className='d-flex justify-content-end'>
                                                                            <button type="button" onClick={() => actualizaTareaAction(tarea)} className="btn btn-link custom-btn">
                                                                                <FontAwesomeIcon icon={faPenToSquare} className='icon-menu-lateral custom-btn' />
                                                                            </button>
                                                                            <button type="button" className="btn btn-link">
                                                                                <FontAwesomeIcon icon={faTrash} onClick={() => eliminaTareaAction(tarea)} className='icon-menu-lateral custom-btn' />
                                                                            </button>
                                                                        </div>

                                                                    </div>
                                                                    <p>{tarea.descripcion} </p>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </>
                                                :
                                                <p>No hay registros aun.</p>
                                        }
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {
                modalOpen ?
                    <Modal tipoModal={tipoModal} modalSi={modalSi} modalNo={modalNo} propsModal={propsModal} />
                    :
                    <></>
            }
        </>
    )
}

export default GestorTareas