const PRODUCTS = [
    {
        id: 100,
        name: 'Sukuna JJK',
        user: 1,
        price: 350,
        image: "https://images.pexels.com/photos/5318967/pexels-photo-5318967.jpeg?auto=compress&cs=tinysrgb&w=600",
        category:1001,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis ullamcorper viverra. Suspendisse quis elit vel justo ultrices cursus. Donec ipsum odio, tincidunt fringilla semper non, vestibulum eu arcu. Phasellus efficitur ante sit amet nulla lacinia ultrices. Proin leo quam, convallis eget congue ac, efficitur a eros. Quisque a sagittis est. Nulla fringilla libero placerat, mattis velit vitae, elementum nisl. Etiam ut scelerisque ligula, eget tristique nulla. Donec eu imperdiet magna. Duis sollicitudin varius eleifend. Nam urna nibh, posuere quis ultrices sed, dignissim in orci. Nullam porta velit justo, vel ullamcorper nisi pulvinar vel. Etiam dapibus efficitur odio, nec bibendum metus laoreet quis.',
        quantity:2
    },
    {
        id: 101,
        name: 'Personagens',
        user: 2,
        price: 350,
        image: 'https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=600',
        category:1001,
        description: 'Vários personagens de vários animes diferentes',
        quantity:10
    },
    {
        id: 102,
        name: 'Arte Cyberpunk',
        user: 3,
        price: 600,
        image: 'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=600',
        category:1002,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis ullamcorper viverra. Suspendisse quis elit vel justo ultrices cursus. Donec ipsum odio, tincidunt fringilla semper non, vestibulum eu arcu. Phasellus efficitur ante sit amet nulla lacinia ultrices. Proin leo quam, convallis eget congue ac, efficitur a eros. Quisque a sagittis est. Nulla fringilla libero placerat, mattis velit vitae, elementum nisl. Etiam ut scelerisque ligula, eget tristique nulla. Donec eu imperdiet magna. Duis sollicitudin varius eleifend. Nam urna nibh, posuere quis ultrices sed, dignissim in orci. Nullam porta velit justo, vel ullamcorper nisi pulvinar vel. Etiam dapibus efficitur odio, nec bibendum metus laoreet quis.',
        quantity:4
    },
    {
        id: 103,
        name: 'SweetHome Cupcake',
        user: 4,
        price: 2,
        image: 'https://images.pexels.com/photos/5318967/pexels-photo-5318967.jpeg?auto=compress&cs=tinysrgb&w=600',
        category:1003,
        description: 'A cupcake (also British English: fairy cake; Hiberno-English: bun; Australian English: fairy cake or patty cake[1]) is a small cake designed to serve one person.',
        quantity:2
    },
    {
        id: 104,
        name: 'Sukuna JJK',
        user: 1,
        price: 350,
        image: 'https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=600',
        category:1001,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis ullamcorper viverra. Suspendisse quis elit vel justo ultrices cursus. Donec ipsum odio, tincidunt fringilla semper non, vestibulum eu arcu. Phasellus efficitur ante sit amet nulla lacinia ultrices. Proin leo quam, convallis eget congue ac, efficitur a eros. Quisque a sagittis est. Nulla fringilla libero placerat, mattis velit vitae, elementum nisl. Etiam ut scelerisque ligula, eget tristique nulla. Donec eu imperdiet magna. Duis sollicitudin varius eleifend. Nam urna nibh, posuere quis ultrices sed, dignissim in orci. Nullam porta velit justo, vel ullamcorper nisi pulvinar vel. Etiam dapibus efficitur odio, nec bibendum metus laoreet quis.',
        quantity:1
    },
    {
        id: 106,
        name: 'SweetHome Cupcake',
        user: 4,
        price: 2,
        image: 'https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=600',
        category:1003,
        description: 'A cupcake (also British English: fairy cake; Hiberno-English: bun; Australian English: fairy cake or patty cake[1]) is a small cake designed to serve one person.',
        quantity:5
    },
];

export function getProducts() {
    console.log("ta aqui3");
    return PRODUCTS;
}
export function getProductsByCategory(CategoryId){
    let products = [];

      
    products = productsFilterByCategory(CategoryId);
    
    return  products;
}
export function getProductsByName(name){
    let products = [];

    if(name != ''){
      
        products = productsFilterByName(name);
    }else{
      
        products = getProducts();
    }
    
    return  products;
}
function productsFilterByCategory(CategoryId){

    return PRODUCTS.filter(product => product.category == CategoryId)
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
        const matchesCategory = CategoryId ? product.category === CategoryId : true;
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

