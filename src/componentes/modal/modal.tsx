import React from 'react'
import './modal.css'
import { IModalProps } from '../../modelos/IProps'


const Modal: React.FC<IModalProps> = ({ tipoModal, modalSi, modalNo, propsModal }) => {

    const validateTipoModal = () => {
        switch (tipoModal) {         
            case 'MODAL_CONTROL_1':
                return (
                    <>
                        <div className='div-modal-active'>
                            <div className='div-content-element-padre'>
                                <div className='div-content-element'>
                                    <div className='div-size-content'>
                                        <h4>{propsModal.titulo} </h4>
                                        <p className='mt-2'>{propsModal.descripcion} </p>
                                        <div className='d-flex justify-content-around mt-3'>
                                            <button className='btn btn-primary bottom-custom' onClick={() => modalSi()} >Aceptar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            case 'MODAL_CONTROL_2':
                return (
                    <>
                        <div className='div-modal-active'>
                            <div className='div-content-element-padre'>
                                <div className='div-content-element'>
                                    <div className='div-size-content'>
                                        <h4>{propsModal.titulo} </h4>
                                        <p className='mt-2'>{propsModal.descripcion} </p>
                                        <div className='d-flex justify-content-around mt-3'>
                                        <button className='btn btn-primary bottom-custom' onClick={() => modalSi()} >Aceptar</button>
                                            <button className='btn btn-secondary bottom-custom-secondary' onClick={() => modalNo()}>Cancelar</button>                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            default:
                break;
        }
    }

    return (
        <>
            {
                validateTipoModal()
            }
        </>
    )
}

export default Modal