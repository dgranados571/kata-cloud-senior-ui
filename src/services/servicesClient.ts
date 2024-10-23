import { UtilUrl } from './utilUrl';
import axiosInstance from '../axiosConfig';

export class ServicesClient {

    requestGet(indexUrl: number): Promise<any> {
        const { url } = UtilUrl();
        console.log('URL component GET --> ', url[indexUrl].pathLambda)
        const urlRq = `${url[indexUrl].urlEntornoLocal}${url[indexUrl].pathLambda}`;
        return new Promise((resolve, reject) => {
            axiosInstance.get(urlRq)
                .then((response: any) => {
                    resolve(response.data)
                }).catch((error: any) => {
                    reject(error)
                })
        })
    }

    requestPost(body: any, indexUrl: number): Promise<any> {
        const { url } = UtilUrl();
        console.log('URL component POST --> ', url[indexUrl].pathLambda)
        console.log('Body request --> ', body)
        const urlRq = `${url[indexUrl].urlEntornoLocal}${url[indexUrl].pathLambda}`;
        console.log('URL request --> ', urlRq)
        return new Promise((resolve, reject) => {
            axiosInstance.post(urlRq, body)
                .then((response: any) => {
                    resolve(response.data)
                }).catch((error: any) => {
                    reject(error)
                })
        })
    }

    requestPut(indexUrl: number, idTarea: number, body: any): Promise<any> {
        const { url } = UtilUrl();
        console.log('URL component PUT --> ', url[indexUrl].pathLambda)
        const urlRq = `${url[indexUrl].urlEntornoLocal}${url[indexUrl].pathLambda}/${idTarea}`;
        return new Promise((resolve, reject) => {
            axiosInstance.put(urlRq, body)
                .then((response: any) => {
                    resolve(response.data)
                }).catch((error: any) => {
                    reject(error)
                })
        })
    }

    requestDelete(indexUrl: number, idTarea: number): Promise<any> {
        const { url } = UtilUrl();
        console.log('URL component PUT --> ', url[indexUrl].pathLambda)
        const urlRq = `${url[indexUrl].urlEntornoLocal}${url[indexUrl].pathLambda}/${idTarea}`;
        return new Promise((resolve, reject) => {
            axiosInstance.delete(urlRq)
                .then((response: any) => {
                    resolve(response.data)
                }).catch((error: any) => {
                    reject(error)
                })
        })
    }

}