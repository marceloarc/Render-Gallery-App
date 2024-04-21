const PRODUCTS = [
    {
        id: 100,
        name: 'Go / jo JJK',
        user: 1,
        price: 350,
        image: "https://r2.easyimg.io/2s1pjmrx4/gojo.jpg",
        category:[1001,1006],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis ullamcorper viverra. Suspendisse quis elit vel justo ultrices cursus. Donec ipsum odio, tincidunt fringilla semper non, vestibulum eu arcu. Phasellus efficitur ante sit amet nulla lacinia ultrices. Proin leo quam, convallis eget congue ac, efficitur a eros. Quisque a sagittis est. Nulla fringilla libero placerat, mattis velit vitae, elementum nisl. Etiam ut scelerisque ligula, eget tristique nulla. Donec eu imperdiet magna. Duis sollicitudin varius eleifend. Nam urna nibh, posuere quis ultrices sed, dignissim in orci. Nullam porta velit justo, vel ullamcorper nisi pulvinar vel. Etiam dapibus efficitur odio, nec bibendum metus laoreet quis.',
        quantity:2
    },
    {
        id: 101,
        name: 'Personagens',
        user: 2,
        price: 350,
        image: 'https://r2.easyimg.io/dghna6854/personagens.jpg',
        category:[1001,1006],
        description: 'Vários personagens de vários animes diferentes',
        quantity:10
    },
    {
        id: 102,
        name: 'Arte Cyberpunk',
        user: 3,
        price: 600,
        image: 'https://r2.easyimg.io/dghna6854/cyber2.png',
        category:[1002],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis ullamcorper viverra. Suspendisse quis elit vel justo ultrices cursus. Donec ipsum odio, tincidunt fringilla semper non, vestibulum eu arcu. Phasellus efficitur ante sit amet nulla lacinia ultrices. Proin leo quam, convallis eget congue ac, efficitur a eros. Quisque a sagittis est. Nulla fringilla libero placerat, mattis velit vitae, elementum nisl. Etiam ut scelerisque ligula, eget tristique nulla. Donec eu imperdiet magna. Duis sollicitudin varius eleifend. Nam urna nibh, posuere quis ultrices sed, dignissim in orci. Nullam porta velit justo, vel ullamcorper nisi pulvinar vel. Etiam dapibus efficitur odio, nec bibendum metus laoreet quis.',
        quantity:4
    },
    {
        id: 104,
        name: 'Itadori JJK',
        user: 1,
        price: 350,
        image: 'https://r2.easyimg.io/xtkgzoewa/itadori.jpg',
        category:[1001,1006],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis ullamcorper viverra. Suspendisse quis elit vel justo ultrices cursus. Donec ipsum odio, tincidunt fringilla semper non, vestibulum eu arcu. Phasellus efficitur ante sit amet nulla lacinia ultrices. Proin leo quam, convallis eget congue ac, efficitur a eros. Quisque a sagittis est. Nulla fringilla libero placerat, mattis velit vitae, elementum nisl. Etiam ut scelerisque ligula, eget tristique nulla. Donec eu imperdiet magna. Duis sollicitudin varius eleifend. Nam urna nibh, posuere quis ultrices sed, dignissim in orci. Nullam porta velit justo, vel ullamcorper nisi pulvinar vel. Etiam dapibus efficitur odio, nec bibendum metus laoreet quis.',
        quantity:1
    },
    {
        id: 106,
        name: 'SweetHome Cupcake',
        user: 4,
        price: 2,
        image: 'https://r2.easyimg.io/dghna6854/cake-102.jpg',
        category:[1003],
        description: 'A cupcake (also British English: fairy cake; Hiberno-English: bun; Australian English: fairy cake or patty cake[1]) is a small cake designed to serve one person.',
        quantity:5
    },
    {
        id: 107,
        name: 'Fusca Realista',
        user: 1,
        price: 600,
        image: 'https://r2.easyimg.io/dghna6854/car-101.jpg',
        category:[1003],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis ullamcorper viverra. Suspendisse quis elit vel justo ultrices cursus. Donec ipsum odio, tincidunt fringilla semper non, vestibulum eu arcu. Phasellus efficitur ante sit amet nulla lacinia ultrices. Proin leo quam, convallis eget congue ac, efficitur a eros. Quisque a sagittis est. Nulla fringilla libero placerat, mattis velit vitae, elementum nisl. Etiam ut scelerisque ligula, eget tristique nulla. Donec eu imperdiet magna. Duis sollicitudin varius eleifend. Nam urna nibh, posuere quis ultrices sed, dignissim in orci. Nullam porta velit justo, vel ullamcorper nisi pulvinar vel. Etiam dapibus efficitur odio, nec bibendum metus laoreet quis.',
        quantity:3
    },
    {
        id: 108,
        name: 'Sukuna JJK',
        user: 1,
        price: 350,
        image: 'https://r2.easyimg.io/5u66q75r7/sukuna.jpg',
        category:[1001,1006],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis ullamcorper viverra. Suspendisse quis elit vel justo ultrices cursus. Donec ipsum odio, tincidunt fringilla semper non, vestibulum eu arcu. Phasellus efficitur ante sit amet nulla lacinia ultrices. Proin leo quam, convallis eget congue ac, efficitur a eros. Quisque a sagittis est. Nulla fringilla libero placerat, mattis velit vitae, elementum nisl. Etiam ut scelerisque ligula, eget tristique nulla. Donec eu imperdiet magna. Duis sollicitudin varius eleifend. Nam urna nibh, posuere quis ultrices sed, dignissim in orci. Nullam porta velit justo, vel ullamcorper nisi pulvinar vel. Etiam dapibus efficitur odio, nec bibendum metus laoreet quis.',
        quantity:2
    },
    {
        id: 109,
        name: 'Arte NFT Rarissima (1 Unidade Apenas)',
        user: 1,
        price: 350,
        image: 'https://r2.easyimg.io/dghna6854/fael.png',
        category:[1003,1005],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis ullamcorper viverra. Suspendisse quis elit vel justo ultrices cursus. Donec ipsum odio, tincidunt fringilla semper non, vestibulum eu arcu. Phasellus efficitur ante sit amet nulla lacinia ultrices. Proin leo quam, convallis eget congue ac, efficitur a eros. Quisque a sagittis est. Nulla fringilla libero placerat, mattis velit vitae, elementum nisl. Etiam ut scelerisque ligula, eget tristique nulla. Donec eu imperdiet magna. Duis sollicitudin varius eleifend. Nam urna nibh, posuere quis ultrices sed, dignissim in orci. Nullam porta velit justo, vel ullamcorper nisi pulvinar vel. Etiam dapibus efficitur odio, nec bibendum metus laoreet quis.',
        quantity:2
    },
    {
        id: 110,
        name: 'Arte Realista Headset',
        user: 1,
        price: 150,
        image: 'https://r2.easyimg.io/dghna6854/headset-100.jpg',
        category:[1003],
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis ullamcorper viverra. Suspendisse quis elit vel justo ultrices cursus. Donec ipsum odio, tincidunt fringilla semper non, vestibulum eu arcu. Phasellus efficitur ante sit amet nulla lacinia ultrices. Proin leo quam, convallis eget congue ac, efficitur a eros. Quisque a sagittis est. Nulla fringilla libero placerat, mattis velit vitae, elementum nisl. Etiam ut scelerisque ligula, eget tristique nulla. Donec eu imperdiet magna. Duis sollicitudin varius eleifend. Nam urna nibh, posuere quis ultrices sed, dignissim in orci. Nullam porta velit justo, vel ullamcorper nisi pulvinar vel. Etiam dapibus efficitur odio, nec bibendum metus laoreet quis.',
        quantity:2
    },
];

export function getProducts() {
    return PRODUCTS;
}
export function getProductsByCategory(CategoryId, producId = null){
    let products = [];
    products = productsFilterByCategory(CategoryId, producId);
    return  products;
}
// export function getProductsByName(name){
//     let products = [];

//     if(name != ''){
      
//         products = productsFilterByName(name);
//     }else{
      
//         products = getProducts();
//     }
    
//     return  products;
// }
function productsFilterByCategory(CategoryIds, producId = null) {
    console.log("entrou aqui");
    return PRODUCTS.filter(product => 
        product.category.some(catId => CategoryIds.includes(catId)) && 
        product.id !== producId
    );
}

function productsFilterByName(name){
    name = name.toLowerCase();
    return PRODUCTS.filter(function (product) { 
        return product.name.toLowerCase().includes(name) ||
        product.description.toLowerCase().includes(name); 
    });
}
export function filterProducts(CategoryId, name) {
    return PRODUCTS.filter(product => {
        const matchesCategory = CategoryId ? product.category.includes(CategoryId) : true;
        const matchesName = name ? 
            product.name.toLowerCase().includes(name.toLowerCase().trim()) || 
            product.description.toLowerCase().includes(name.toLowerCase().trim()) : 
            true;
        return matchesCategory && matchesName;
    });
}
export function getProduct(id) {

    return PRODUCTS.find((product) => (product.id == id));
}

export function getProductsByUser(userId, productId = null) {
    return PRODUCTS.filter(product => product.user === userId && product.id !== productId);
}



