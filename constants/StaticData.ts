export interface CategoryType {
    category: string;
    icon:
        | 'beach-access'
        | 'pool'
        | 'apartment'
        | 'terrain'
        | 'location-city'
        | 'house-siding'
        | 'house';
}

export const houseCategories: CategoryType[] = [
    {
        category: 'Beach House',
        icon: 'beach-access',
    },
    {
        category: 'Lake House',
        icon: 'pool',
    },
    {
        category: 'Apartment',
        icon: 'apartment',
    },
    {
        category: 'Mountain Lodge',
        icon: 'terrain',
    },
    {
        category: 'City Loft',
        icon: 'location-city',
    },
    {
        category: 'Treehouse',
        icon: 'house-siding',
    },
    {
        category: 'Villa',
        icon: 'house',
    },
    // Add more categories as needed
];
