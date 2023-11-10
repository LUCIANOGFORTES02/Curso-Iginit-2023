//teste regex
// /users/:id
// () entre parênteses é um subgrupo

export function buildRoutePath(path){

    const routeParametersRegex =/:([a-zA-Z]+)/g
    const pathWithParams = path.replaceAll(routeParametersRegex,'(?<$1>[a-z0-9\-_]+)')


    const pathRegex = new RegExp(`^${pathWithParams}(?<query>?\\(.*))?$`)
    //Nomear grupos ?<id>

    return pathRegex
}