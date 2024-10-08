describe('API para criação de token', function() {
  it('Verificar retorno 200 para a criação de token na API', function() {
    
    //Constantes não alteradas de usuário e senha
    const clientId = '67823c6d-58de-494f-96d9-86a4c22682cb'
    const clientSecret = 'c2d6a06f-5f31-448b-9079-7e170e8536e4'
    const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

    //Chamada da API - Post - Com URL de homolog (Caso necessário, alterar URL), com os dados especificados na documentação
    cy.request({
      method: 'POST',
      url: 'https://api-homologacao.getnet.com.br/auth/oauth/v2/token',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: {
        scope: 'oob',
        grant_type: 'client_credentials'
      }
    }).then((response) => {
      expect(response.status).to.eq(200)
      
      //Validando os campos obrigatórios do response da API
      expect(response.body).to.have.all.keys('access_token', 'token_type', 'expires_in', 'scope')
      expect(response.body.access_token).to.be.a('string')
      expect(response.body.token_type).to.equal('Bearer')
      expect(response.body.expires_in).to.be.a('number')
      expect(response.body.scope).to.equal('oob')
    
      expect(response.body.access_token).to.exist
      cy.log('Token criado com sucesso:', response.body)
    })
  })
})
