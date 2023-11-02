process.stdin
.pipe(process.stdout)
//pipe uma forma de encaminhar 
// A entrada está sendo encaminhada para a saída

import {Readable,Writable,Transform} from "node:stream"

class OneToHundreStream extends Readable{
    index=1 

    _read(){//Enviar dados
        const i = this.index++
    setTimeout(()=>{
        if(i>100){
            this.push(null)
        }
        else{
            const buf = Buffer.from(String(i))

            this.push(buf)
        }
    },1000)
    
}

}

class InverseNumber extends Transform{
    _transform(chunk,encoding,callback){
       const transformed = (Number(chunk.toString()) * -1)
        callback(null, Buffer.from(String(transformed)) )
        
    }

}

class MultiplyByTenStreams extends Writable{

    _write(chunk, encoding, callback){//pedaços, como está codificado, funçõa passada como parâmetro e assincrona
        console.log(Number(chunk.toString()) * 10)
        callback()//Indicar que a operação de escrita está completa
    }
}

new OneToHundreStream()
    .pipe(new InverseNumber)
    .pipe(new MultiplyByTenStreams)

