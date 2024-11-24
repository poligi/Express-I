import express from 'express'
import cors  from 'cors'
import bcrypt from 'bcrypt'

const app = express()

app.use(cors())

app.use(express.json())



let carros = []   //Criamo um array que armazenará os veículos
let pessoas = [] //Criamos um array que armazene as pessoas usuarias
let proximoId = 1  // Criamos uma variável que vai automatizar a criação dos ids
let proximoUserId = 1


//-------------------- CRIAR carro -------------------------

app.post('/carros',(request,response)=>{

    const modeloDocarro = request.body.modeloDocarro
    const marcaCarro = request.body.marcaCarro
    const anoDoCarro = Number(request.body.anoDoCarro)
    const corDoCarro = request.body.corDoCarro
    const precoDoCarro = Number(request.body.precoDoCarro)

    // Verificamos se a pessoa passou o modelo do Carro. Caso não tenha passado, retorna uma responseposta
    if (!modeloDocarro) {
        response.status(400).send(JSON.stringify({
            Mensagem: 'Passe um modelo válido para registrar o seu carro'
        }))
    }

    // Verificamos se a pessoa passou a marca do Carro. Caso não tenha passado, retorna uma responseposta
    if (!marcaCarro) {
      response.status(400).send(JSON.stringify({
          Mensagem: 'Passe uma marca válida para registrar o seu carro '
      }))
    }

    // Verificamos se a pessoa passou a cor do Carro. Caso não tenha passado, retorna uma responseposta
    if (!corDoCarro) {
      response.status(400).send(JSON.stringify({
          Mensagem: 'Passe uma marca válida para registrar o seu carro '
      }))
    }

    // Verificamos se a pessoa passou o ano do Carro Caso não tenha passado, retorna uma responseposta
    if (!anoDoCarro) {
      response.status(400).send(JSON.stringify({
          Mensagem: 'Passe um ano válido, para registrar o seu carro. O ano deve conter 4 digitos'
      }))
    }

    // Verificamos se a pessoa passou o preço da carro. Caso não tenha passado, retorna uma responseposta
    if(!precoDoCarro){
        response.status(400).send(JSON.stringify({
            Mensagem: 'Passe um preço válido para registrar o seu carro'
        }))
    }

    //Cria um novo carro com os valoresponse passados
    let novoCarro ={
        id: proximoId,
        modeloDocarro:modeloDocarro, 
        marcaCarro:marcaCarro,
        anoDoCarro:anoDoCarro,
        corDoCarro:corDoCarro,
        precoDoCarro:precoDoCarro,
    }

    //Colocamos essa nova carro dentro do array
    carros.push(novoCarro)

    // Adicionamos um ao Id, cada vez que cria um novo produto
    proximoId ++

    //Damos a responseposta para a pessoa usuária, usamos o status 201 pois é um recurso criado
    response.status(201).send(`
    Carro - ${novoCarro.modeloDocarro} criado com sucesso!
    Marca: ${novoCarro.marcaCarro}, 
    Ano do Carro : ${novoCarro.anoDoCarro},
    Cor do Carro :  ${novoCarro.corDoCarro},  
    Preço: ${novoCarro.precoDoCarro}, `
    )

})

//-------------------- LER CARRO -------------------------

app.get('/carros', (request, response) => {
    if (carros.length === 0) {
      // Se a lista de carros estiver vazia, retorna uma mensagem indicando isso.
      return response.status(400).send(JSON.stringify({
        Mensagem: 'Lista vazia, adicione carros para consultar',
      }))
    }
  
    // Cria um array de strings contendo as informações de cada carro, para assim conseguir manipular os dados 
    const dadosMapeados = carros.map((carro) => `Carro: ${carro.modeloDocarro} - Marca: ${carro.marcaCarro} -  Cor : ${carro.corDoCarro} - Preço: ${carro.precoDoCarro}`)
  
    // Envia uma responseposta de status 200 (OK) com a lista de informações dos carros. Captamos os dados que foram mapeados e tratados
    response.status(200).send({
      carros: dadosMapeados,
    })
})


//-------------------- FILTRAR CARRO ---------------------------

app.get ('/carros/:modeloDocarro',(request, response) => {
  //Pegamos o modelo do carro via parametro de requisicao
  const modeloDocarro= request.params.modeloDocarro

  //Verificamos se o carro que estamos passando via url , e comparamos os valores
  const carrosVerificados = carros.find(carro => carro.modeloDocarro === modeloDocarro ) 

  //Se não encontrar o dado do carro no banco retorna uma mensagem
  if(!carrosVerificados){
      response.status(404).json({
          sucess: false,
          message: "Modelo de carro não encontrado no banco"
      })
  }

  //Se encontrar o carro a aplicação retorna o carro que é condizente com o desejado.
  response.status(201).json({
      sucess: true,
      data: carros
  })

})


//-------------------- VERIFICAR API  -------------------------


app.listen(8080, () => console.log("Servidor iniciado na porta 8080"))