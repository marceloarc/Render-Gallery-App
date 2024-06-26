import axios from 'axios';


// Restante do seu código...

// export function getProducts() {
//     return PRODUCTS;
// }
// export function getProductsByCategory(CategoryId, producId = null){
//     let products = [];
//     products = productsFilterByCategory(CategoryId, producId);
//     return  products;
// }
// // export function getProductsByName(name){
// //     let products = [];

// //     if(name != ''){
      
// //         products = productsFilterByName(name);
// //     }else{
      
// //         products = getProducts();
// //     }
    
// //     return  products;
// // }
// function productsFilterByCategory(CategoryIds, producId = null) {
//     console.log("entrou aqui");
//     return PRODUCTS.filter(product => 
//         product.category.some(catId => CategoryIds.includes(catId)) && 
//         product.id !== producId
//     );
// }

// function productsFilterByName(name){
//     name = name.toLowerCase();
//     return PRODUCTS.filter(function (product) { 
//         return product.name.toLowerCase().includes(name) ||
//         product.description.toLowerCase().includes(name); 
//     });
// }
// export function filterProducts(CategoryId, name) {
//     return PRODUCTS.filter(product => {
//         const matchesCategory = CategoryId ? product.category.includes(CategoryId) : true;
//         const matchesName = name ? 
//             product.name.toLowerCase().includes(name.toLowerCase().trim()) || 
//             product.description.toLowerCase().includes(name.toLowerCase().trim()) : 
//             true;
//         return matchesCategory && matchesName;
//     });
// }
// export function getProduct(id) {

//     return PRODUCTS.find((product) => (product.id == id));
// }

export function getProductsByUser(userId, productId = null) {
    return PRODUCTS.filter(product => product.user === userId && product.id !== productId);
}

import { API_BASE_URL } from '../env.js';

const urlApi = API_BASE_URL;


export async function getProducts(categoryId, searchText) {
    try {
        // console.log(urlApi);
        const response = await axios.post(`${urlApi}/api/mobile/home`, {
            categoryId: categoryId,
            searchText: searchText
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

export async function getProduct(productId){
    try {
        const response = await axios.get(`${urlApi}/api/mobile/product/${productId}`);
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


export async function addItemToCartService(userId, productId, quantity) {
    try {
        const response = await axios.post(`${urlApi}/api/mobile/addtoCart`, {
            userId: userId,
            artId: productId,
            quantidade: quantity
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

export async function addItemToFavService(userId, productId) {
    try {
        const response = await axios.post(`${urlApi}/api/mobile/toggleFavorito`, {
            userId: userId,
            artId: productId
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



