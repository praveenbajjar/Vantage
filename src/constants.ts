import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'ESSENTIAL OVERSIZED TEE',
    price: 45,
    description: 'A premium heavyweight cotton tee designed for a perfect oversized fit. Features dropped shoulders and a thick ribbed collar.',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Essentials',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Onyx', hex: '#1a1a1a' },
      { name: 'Stone', hex: '#d1d1d1' }
    ],
    isBestSeller: true,
    isNewArrival: true,
    stock: 15
  },
  {
    id: '2',
    name: 'CARGO UTILITY PANTS',
    price: 85,
    description: 'Functional meets aesthetic. These cargo pants feature multiple utility pockets and an adjustable hem for a versatile silhouette.',
    images: [
      'https://images.unsplash.com/photo-1624372927054-02d33943b80f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Streetwear',
    sizes: ['28', '30', '32', '34'],
    colors: [
      { name: 'Olive', hex: '#4b5320' },
      { name: 'Black', hex: '#000000' }
    ],
    isBestSeller: true,
    stock: 8
  },
  {
    id: '3',
    name: 'TECH SHELL JACKET',
    price: 120,
    description: 'Water-resistant tech shell with reflective detailing. Perfect for urban exploration and unpredictable weather.',
    images: [
      'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Streetwear',
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Midnight', hex: '#0a0a0a' }
    ],
    isNewArrival: true,
    stock: 5
  },
  {
    id: '4',
    name: 'MINIMAL HOODIE',
    price: 75,
    description: 'Ultra-soft fleece hoodie with a structured hood and hidden side pockets. The ultimate comfort piece.',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Essentials',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Cream', hex: '#f5f5dc' },
      { name: 'Slate', hex: '#708090' }
    ],
    isBestSeller: true,
    stock: 20
  }
];

export const CATEGORIES = ['All', 'Essentials', 'Streetwear', 'Summer Drop'];
