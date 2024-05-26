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

const urlApi = process.env.API_BASE_URL;


export async function login(email, password) {
    try {
      const response = await axios.post(`http://192.168.0.9:5000/api/mobile/login`, {
        email: email,
        password: password
      });
      
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  }

export function getUsersById(id) {
    return USERS.find((user) => (user.id == id));
}
