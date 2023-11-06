//teste regex
// /users/:id
// () entre parênteses é um subgrupo

export function buildRoutePath(path){

    const routeParametersRegex =/:([a-zA-Z]+)/g
    const pathWithParams = path.replaceAll(routeParametersRegex,'([a-z0-9\-_]+)')


    const pathRegex = new RegExp(`^${pathWithParams}`)
}