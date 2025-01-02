# Render Gallery

Render Gallery é um projeto de e-commerce voltado para artistas, onde eles podem vender obras de arte digitais, texturas e outros tipos de imagens. O objetivo principal é fornecer uma plataforma que ofereça opções flexíveis de licenciamento, seja por meio de licenças únicas ou de uso.

## Funcionalidades Principais

- **Cadastro de Artistas e Usuários**
  - Artistas podem criar perfis para enviar suas artes.
  - Usuários podem criar contas para adquirir licenças e baixar conteúdos.

- **Gerenciamento de Conteúdo**
  - Upload de imagens, texturas e artes digitais.
  - Configuração de licenças: exclusiva ou de uso.

- **Loja Online**
  - Interface para exibir artes disponíveis para venda.
  - Sistema de busca e filtro para facilitar a navegação.
  - Chat em tempo real com qualquer artista para tirar dúvidas e/ou pedidos personalizados.

- **Carrinho de Compras e Pagamentos**
  - Adicione produtos ao carrinho.
  - Integração com sistemas de pagamento.

- **Área do Cliente**
  - Histórico de compras e download de itens adquiridos.
  - Gerenciamento de licenças.

## Tecnologias Utilizadas

- **Frontend**: 
  - React Native com Expo

- **Backend**: 
  - [ASP.NET](https://github.com/marceloarc/RenderGalleryRazor)
  - Banco de Dados:MySQL


## Como Executar o Projeto

1. **Pré-requisitos:**
   - Certifique-se de ter o [Node.js](https://nodejs.org/) e/ou outro ambiente necessário instalado.
   - [Backend](https://github.com/marceloarc/RenderGalleryRazor)

2. **Clonar o Repositório:**
   ```bash
   git clone https://github.com/marceloarc/Render-Gallery-App.git
   cd render-gallery
   ```

3. **Instalar Dependências:**
   ```bash
   npm install
   ```
   _Ou o gerenciador de pacotes relevante._

4. **Configurar Variáveis de Ambiente:**
   - Edite o arquivo env.js com as seguintes configurações:
     ```env
     API_BASE_URL = # URL da api backend
     ```

5. **Iniciar o Expo:**
   ```bash
   expo start
   ```

6. **Acessar no Dispositivo ou Emulador:**
   - Escaneie o QR code no terminal com o aplicativo Expo Go no seu dispositivo móvel.

## Estrutura do Projeto

- **/Services**: Conexão com o backend e fetch de dados.
- **/src/screens**: Frontend/Telas.
- **/assets**: Imagens e outros componentes.

## Próximos Passos

- Melhorar a interface do usuário.
- Impleuições
- Sistema de notificações para artistas e compradores.
- Adicionar suporte para mais formatos de arte.
## Contribuições

Contribuições são bem-vindas! Siga os passos abaixo:

1. Fork o projeto.
2. Crie uma branch para sua feature/bugfix:
   ```bash
   git checkout -b minha-feature
   ```
3. Envie seu PR para revisão.

## Licença

Este projeto está sob a licença [MIT](LICENSE).

---

<div align="center">Desenvolvido com 💖 por <a href="https://github.com/marceloarc">Marcelo Correa</a> e <a href="https://github.com/PedroVinicioss">Pedro Vinicios</a> </div>


