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
//{name: "Diego" , email: "Diego"}
//Object.entries trasforma em um array cahve valor
//[['name','Diego']['email','Diego']]
//Some percorre o array e se pelo menos uma das vezes que ele que percorrer o array ele retornar true quer dizer que aquele item do array deve ser incluido no filter
    select(table,search){
        let data = this.#database[table] ?? []
        if (search){
            data = data.filter(row=>{
                return Object.entries(search).some((key,value)=>{
                    return row[key].toLowerCase().includes(value.toLowerCase())

                })
            })
        }

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
    upadate(table,id,data){
        const rowIndex = this.#database[table].findIndex(row => row.id===id)

        if(rowIndex > -1){
            this.#database[table][rowIndex] = {id,...data}
            this.#persist()
        }
    }

    delete(table,id){
        const rowIndex = this.#database[table].findIndex(row => row.id===id)

        if(rowIndex > -1){
            this.#database[table].splice(rowIndex,1)
            this.#persist()
        }
    }
    

}