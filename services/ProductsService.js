const PRODUCTS = [
    {
        id: 100,
        name: 'Sukuna JJK',
        nameArtist: 'Marcelo',
        price: 350,
        image: require('../assets/products/buxa.jpeg'),
        category:1001,
        description: 'Arte do buxa'
    },
    {
        id: 101,
        name: 'Personagens',
        nameArtist: 'Marcelo',
        price: 350,
        image: require('../assets/products/Personagens.jpg'),
        category:1001,
        description: 'Vários personagens de vários animes diferentes'
    },
    {
        id: 102,
        name: 'Arte Cyberpunk',
        nameArtist: 'Marcelo',
        price: 600,
        image: require('../assets/products/cyber2.png'),
        category:1002,
        description: 'Arte cyberpunk'
    },
    {
        id: 103,
        name: 'SweetHome Cupcake',
        nameArtist: 'Marcelo',
        price: 2,
        image: require('../assets/products/cake-102.jpg'),
        category:1003,
        description: 'A cupcake (also British English: fairy cake; Hiberno-English: bun; Australian English: fairy cake or patty cake[1]) is a small cake designed to serve one person.'
    }
];

export function getProducts() {
    return PRODUCTS;
}
export function getProductsByCategory(CategoryId){
    let products = [];
    products = productsFilter(CategoryId);
    return  products;
}
function productsFilter(CategoryId){

    return PRODUCTS.filter(product => product.category == CategoryId)
}
export function getProduct(id) {
    console.log(PRODUCTS.find((product) => (product.id == id)));
    return PRODUCTS.find((product) => (product.id == id));
}

