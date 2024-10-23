
export const UtilUrl = () => {

  const urlEntornoLocal = 'http://localhost:8080';
  
  const url: { [key: number]: { urlEntornoLocal: string; pathLambda: string; } } = {
    1: {
      urlEntornoLocal,
      pathLambda: '/tasks/registraTarea'
    },
    2: {
      urlEntornoLocal,
      pathLambda: '/tasks/listarTareas'
    },
    3: {
      urlEntornoLocal,
      pathLambda: '/tasks/actualizarTarea'
    },
    4: {
      urlEntornoLocal,
      pathLambda: '/tasks/eliminarTarea'
    }
  }

  return {
    url
  }

}

