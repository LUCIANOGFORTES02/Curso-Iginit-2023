import http from 'node:http'
import {json} from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js'




const server = http.createServer(async (req,res)=>{
    const {method,url} = req

    await json(req,res)
    //Usado para encontrar o primeiro elemento do array
    const route = routes.find(route =>{//Testando se a regex bate com a url recebida
        return route.method === method && route.path.test(url)
    })

    if(route){
        //Retorna o dados encontrados na rota
        const routeParams = req.url.match(route.path)
        //Groups permite nomear gurpos de captura em expressões regulares. Torna mais fácil referenciar esses grupos após uma correspondência.

        const {query, ...params}= routeParams.groups
        req.params =params
        req.query = query ? extractQueryParams(query) : {}
        
        return route.handler(req,res)
    }
    

    return res.writeHead(404).end()

})

server.listen(3333)