import axios from 'axios';

const USERS = [
    {
        id: 1,
        name: 'Jao miguel',
        desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using',
        email: 'jao@gmail.com',
        password: '123456',
        pic: 'https://r2.easyimg.io/xtkgzoewa/itadori.jpg',
        telefone:'12997011131',
        saldo: 105.5,
        status: 1,
        plan: 1
    },
    {
        id: 2,
        name: 'Maria silva',
        desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using',
        email: 'maria@gmail.com',
        password: '123456',
        pic: 'https://r2.easyimg.io/dghna6854/headset-100.jpg',
        telefone:'12997011130',
        saldo: 10.5,
        status: 1,
        plan: 2
    },
    {
        id: 3,
        name: 'Carlos',
        desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using',
        email: 'carlos@gmail.com',
        password: '123456',
        pic: 'https://r2.easyimg.io/dghna6854/headset-100.jpg',
        telefone:'12997011111',
        saldo: 15.5,
        status: 1,
        plan: 3
    },
    {
        id: 4,
        name: 'Felipe',
        desc: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using',
        email: 'felipe@gmail.com',
        password: '123456',
        pic: 'https://r2.easyimg.io/dghna6854/headset-100.jpg',
        telefone:'12997011111',
        saldo: 50.5,
        status: 1,
        plan: 1
    }
];

export function getUsers() {
    return USERS;
}

// export function getUsersByEmail(email){
//     return USERS.find((user) => (user.email == email));
// }

import { API_BASE_URL } from '../env.js';

const urlApi = API_BASE_URL;


export async function login(email, password) {
    try {
      const response = await axios.post(`${urlApi}/api/mobile/login`, {
        email: email,
        password: password
      });
      
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
          throw new Error(JSON.stringify(error.response.data));
      } else if (error.request) {
          throw new Error('Erro de rede: não foi possível conectar ao servidor');
      } else {
          throw new Error('Erro ao enviar solicitação');
      }
    }
  }

export function getUsersById(id) {
    return USERS.find((user) => (user.id == id));
}
