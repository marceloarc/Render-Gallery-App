const CATEGORIES = [
    {
        id: 1001,
        name: 'Animes',
        image: require('../assets/categories/gojo2.png'),
        description: 'A headset combines a headphone with microphone. Headsets are made with either a single-earpiece (mono) or a double-earpiece (mono to both ears or stereo).'
    },
    {
        id: 1002,
        name: 'Cyberpunk',
        image: require('../assets/categories/cyber.jpg'),
        description: 'A model car, or toy car, is a miniature representation of an automobile. Other miniature motor vehicles, such as trucks, buses, or even ATVs, etc. are often included in this general category.'
    },
    {
        id: 1003,
        name: 'Realista',
        image: require('../assets/categories/real.jpg'),
        description: 'A cupcake (also British English: fairy cake; Hiberno-English: bun; Australian English: fairy cake or patty cake[1]) is a small cake designed to serve one person.'
    }
];

export function getCategories() {
    return CATEGORIES;
}

export function getCategory(id) {
    return CATEGORIES.find((category) => (category.id == id));
}

