import http from "node:http"

import {Transform} from 'node:stream'

class InverseNumber extends Transform{
    _transform(chunk,encoding,callback){
       const transformed = (Number(chunk.toString()) * -1)
        callback(null, Buffer.from(String(transformed)) )
        
    }

}
//res writebleStream
//req ReadbleStream

const server = http.createServer (async (req,res)=>{
    const buffers = []

    for await (const chunk of req){
        buffers.push(chunk)
    }


    const fullStreamContent = Buffer.concat(buffers).toString('utf8')
    console.log(fullStreamContent)

    return res.end(fullStreamContent)
   

})

server.listen(3334)