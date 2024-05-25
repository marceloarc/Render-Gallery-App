const CATEGORIES = [
    {
        id: 0,
        name: 'Todas',
        description: 'Todas',
        icon: 'apps-outline'
    },
    {
        id: 1,
        name: 'Animes',
        description: 'Animes',
        icon: 'book',
    },
    {
        id: 2,
        name: 'PixelArt',
        description: 'PixelArt',
        icon: 'football'
    },
    {
        id: 3,
        name: 'Realismo',
        description: 'Realismo',
        icon:'game-controller'
    },
    {
        id: 4,
        name: 'Personagens',
        description: 'Personagens',
        icon:'people'
    },
    {
        id: 5,
        name: 'Retrô',
        description: 'Retrô',
        icon:'apps'
    },    
    {
        id: 6,
        name: 'Cyberpunk',
        description: 'Cyberpunk',
        icon:'game-controller'
    }
];

export function getCategories() {
    return CATEGORIES;
}

export function getCategory(id) {
    return CATEGORIES.find((category) => (category.id == id));
}

