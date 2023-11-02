import fs from 'node:fs/promises'

//lidar com caminhos
const databasaePath = new URL('../db.json',import.meta.url)// Arquivo será criado na raiz

export class Database{
    #database = {}

    constructor(){
        fs.readFile(databasaePath,"utf-8")
        .then(data => {
            this.#database = JSON.parse(data)
        })
        .catch(()=>{
            this.#persist()
        })
    }

    #persist(){
        fs.writeFile(databasaePath, JSON.stringify(this.#database))

    }

    select(table){
        const data = this.#database[table] ?? []
        return data
    }

    insert(table,data){
        if(Array.isArray(this.#database[table])){
            this.#database[table].push(data)
        }
        else{
            this.#database[table] = [data]
        }
        this.#persist();

        return data;
    }
    

}