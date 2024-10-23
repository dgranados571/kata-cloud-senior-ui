export interface IGenericResponse {
    estado: boolean,
    mensaje: string,
    objeto: any
}

export interface ILoginProps {}

export interface IGestorTareas {}

export interface IModalProps {
    modalSi: Function,
    modalNo: Function,
    tipoModal: string;
    propsModal: any
}

export interface ITareas {
    id: number,
    titulo: string,
    descripcion: string
    estado: string
}