import { Product, HomepageConfig } from '../types';

// High-fashion monochrome editorial illustrations with subtle NOVAIRE orange #F15A0A studio accents
export const createFashionGraphic = (type: string, accentTone: string = '#141414', hasOrangeDetail: boolean = true) => {
  return `data:image/svg+xml;utf8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" width="600" height="750">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#FDFBF7"/>
          <stop offset="50%" stop-color="#EFECE6"/>
          <stop offset="100%" stop-color="#DADADA"/>
        </linearGradient>
        <linearGradient id="cloth" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#242424"/>
          <stop offset="60%" stop-color="#141414"/>
          <stop offset="100%" stop-color="#050505"/>
        </linearGradient>
      </defs>
      <rect width="600" height="750" fill="url(#bg)"/>
      <circle cx="300" cy="360" r="230" fill="#FFFFFF" opacity="0.6"/>
      <g transform="translate(100, 90)">
        <path d="M70,80 Q200,60 330,80 L360,260 Q200,280 40,260 Z" fill="${accentTone}" opacity="0.95"/>
        <path d="M120,40 Q200,30 280,40 L340,480 Q200,510 60,480 Z" fill="url(#cloth)"/>
        <path d="M140,50 L200,220 L260,50" fill="none" stroke="#2C2C2C" stroke-width="2"/>
        <line x1="200" y1="50" x2="200" y2="480" stroke="#333333" stroke-width="1.5" stroke-dasharray="6,4"/>
        <path d="M80,180 Q100,340 120,460" stroke="#2A2A2A" stroke-width="2" fill="none"/>
        <path d="M320,180 Q300,340 280,460" stroke="#2A2A2A" stroke-width="2" fill="none"/>
        ${hasOrangeDetail ? '<rect x="188" y="235" width="24" height="6" rx="2" fill="#F15A0A" />' : ''}
      </g>
      <text x="300" y="690" font-family="-apple-system, sans-serif" font-size="11" letter-spacing="4" fill="#666666" text-anchor="middle" font-weight="600">NOVAIRE LONDON · ${type}</text>
    </svg>
  `)}`;
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'nov-uk-001',
    title: 'Architectural Oversized Bomber',
    subtitle: 'Technical Japanese nylon with sculptural silhouette & storm flap',
    slug: 'architectural-oversized-bomber',
    price: 185.00,
    originalPrice: 220.00,
    discount: 16,
    category: 'jackets',
    gender: 'unisex',
    collection: 'URBAN FORM',
    description: 'An exploration of modern volume and functional British tailoring. Crafted from custom dense nylon with a water-repellent finish, dropped shoulders, signature matte gunmetal Excella two-way hardware, and internal magnetic closure pockets.',
    fabricDetails: [
      '100% Technical Recycled Polyamide (Water-Repellent)',
      'Matte gunmetal two-way hardware',
      'Cupro-blend breathable twill lining',
      'Signature NOVAIRE Orange (#F15A0A) internal grosgrain pull tab'
    ],
    careInstructions: [
      'Specialist dry clean only',
      'Do not bleach or tumble dry',
      'Store on wide-shouldered wooden hanger'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    ukSizes: ['Chest 38"', 'Chest 40"', 'Chest 42"', 'Chest 44"'],
    colors: [
      { name: 'Onyx Black', hex: '#0B0B0B' },
      { name: 'Slate Charcoal', hex: '#1C1C1C' },
      { name: 'Paper Grey', hex: '#BFBCB5' }
    ],
    primaryImage: createFashionGraphic('BOMBER 01', '#141414', true),
    secondaryImage: createFashionGraphic('BOMBER 01 REVERSE', '#0A0A0A', true),
    galleryImages: [
      createFashionGraphic('BOMBER 01 DETAIL', '#111111', true),
      createFashionGraphic('BOMBER 01 DRAPE', '#1D1D1D', false)
    ],
    inStock: true,
    stockCount: 14,
    isNew: true,
    isBestSeller: true,
    isPublished: true,
    rating: 4.9,
    reviewsCount: 38
  },
  {
    id: 'nov-uk-002',
    title: 'Double-Breasted Heavy Melton Overcoat',
    subtitle: 'British Melton wool with razor-sharp peak lapels',
    slug: 'double-breasted-heavy-melton-overcoat',
    price: 245.00,
    originalPrice: 285.00,
    discount: 14,
    category: 'jackets',
    gender: 'men',
    collection: 'COLLECTION 01',
    description: 'Cut with an assertive architectural silhouette, this double-breasted overcoat features high gorge peak lapels, dark horn buttons, and an elongated calf-length drape engineered for British winters.',
    fabricDetails: [
      '85% British Virgin Melton Wool, 15% Cashmere',
      'Bemberg cupro lining for frictionless layering',
      'Genuine dark horn buttons',
      'Reinforced floating canvas chest piece'
    ],
    careInstructions: [
      'Professional dry clean only',
      'Brush with natural bristle garment brush after wear'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    ukSizes: ['UK 38R', 'UK 40R', 'UK 42R', 'UK 44R'],
    colors: [
      { name: 'Deep Ink', hex: '#050505' },
      { name: 'Muted Slate', hex: '#2B2B2E' }
    ],
    primaryImage: createFashionGraphic('MELTON COAT', '#080808', false),
    secondaryImage: createFashionGraphic('MELTON COAT BACK', '#131313', false),
    galleryImages: [
      createFashionGraphic('MELTON LAPEL', '#161616', true),
      createFashionGraphic('MELTON TEXTURE', '#222222', false)
    ],
    inStock: true,
    stockCount: 8,
    isNew: true,
    isBestSeller: false,
    isPublished: true,
    rating: 5.0,
    reviewsCount: 24
  },
  {
    id: 'nov-uk-003',
    title: 'Heavyweight Minimalist Tee (340 GSM)',
    subtitle: 'Combed organic cotton with high architectural mock collar',
    slug: 'heavyweight-minimalist-tee',
    price: 45.00,
    originalPrice: 55.00,
    discount: 18,
    category: 'oversized-t-shirts',
    gender: 'unisex',
    collection: 'THE ESSENTIALS',
    description: 'The foundational daily luxury piece. Woven at 340 grams per square metre from combed long-staple cotton for a crisp, boxy drape that retains structural form wash after wash.',
    fabricDetails: [
      '100% GOTS Certified Combed Organic Cotton (340 GSM)',
      'Pre-shrunk enzyme washed finish',
      'High 30mm double-layer ribbed collar',
      'Blind stitched hem and sleeves'
    ],
    careInstructions: [
      'Machine wash gentle at 30°C',
      'Line dry in shade',
      'Reshape whilst damp'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    ukSizes: ['UK XS', 'UK S', 'UK M', 'UK L', 'UK XL', 'UK XXL'],
    colors: [
      { name: 'Washed Black', hex: '#161616' },
      { name: 'Raw Ivory', hex: '#FFFDF2' },
      { name: 'NOVAIRE Orange', hex: '#F15A0A' }
    ],
    primaryImage: createFashionGraphic('HEAVY TEE', '#121212', true),
    secondaryImage: createFashionGraphic('HEAVY TEE ANGLE', '#1A1A1A', true),
    galleryImages: [
      createFashionGraphic('HEAVY TEE COLLAR', '#0D0D0D', false),
      createFashionGraphic('HEAVY TEE WEAVE', '#202020', true)
    ],
    inStock: true,
    stockCount: 52,
    isNew: false,
    isBestSeller: true,
    isPublished: true,
    rating: 4.85,
    reviewsCount: 128
  },
  {
    id: 'nov-uk-004',
    title: 'Pleated Wide-Leg Tailored Trousers',
    subtitle: 'High-waist fluid drape with deep front double pleats',
    slug: 'pleated-wide-leg-tailored-trousers',
    price: 110.00,
    originalPrice: 135.00,
    discount: 18,
    category: 'trousers',
    gender: 'unisex',
    collection: 'URBAN FORM',
    description: 'Designed for fluid movement and modern proportions. Features an extended tab closure, interior curtain waistband, side buckle adjusters, and a generous break that pools elegantly over footwear.',
    fabricDetails: [
      '70% Tropical Wool, 28% Viscose, 2% Elastane',
      'Internal cotton curtain waistband',
      'Corozo button side adjusters',
      'Concealed zip fly with double hook and bar'
    ],
    careInstructions: [
      'Dry clean or gentle cold hand wash',
      'Hang dry along crease line',
      'Medium heat press with damp cloth'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    ukSizes: ['Waist 30"', 'Waist 32"', 'Waist 34"', 'Waist 36"'],
    colors: [
      { name: 'Charcoal Black', hex: '#18181A' },
      { name: 'Deep Smoke', hex: '#313136' }
    ],
    primaryImage: createFashionGraphic('WIDE TROUSER', '#111111', false),
    secondaryImage: createFashionGraphic('WIDE TROUSER DETAIL', '#1C1C1E', false),
    galleryImages: [
      createFashionGraphic('TROUSER PLEAT', '#191919', true),
      createFashionGraphic('TROUSER DRAPE', '#0A0A0A', false)
    ],
    inStock: true,
    stockCount: 22,
    isNew: true,
    isBestSeller: true,
    isPublished: true,
    rating: 4.9,
    reviewsCount: 46
  },
  {
    id: 'nov-uk-005',
    title: 'Relaxed Loopback Heavy Hoodie (480 GSM)',
    subtitle: 'Custom French terry with double-lined hood and seamless pouch',
    slug: 'relaxed-loopback-heavy-hoodie',
    price: 85.00,
    originalPrice: 98.00,
    discount: 13,
    category: 'hoodies',
    gender: 'unisex',
    collection: 'THE ESSENTIALS',
    description: 'Meticulously engineered from 480 GSM diagonal loopback cotton fleece. Features a structured double-layer hood without eyelets for a clean architectural aesthetic.',
    fabricDetails: [
      '100% Organic Heavy Loopback Cotton (480 GSM)',
      'Flatlocked reinforced seams',
      'Concealed seam hip pockets',
      'Subtle tonal NOVAIRE embroidery'
    ],
    careInstructions: [
      'Machine wash cold at 30°C',
      'Wash inside out with similar darks'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    ukSizes: ['UK S', 'UK M', 'UK L', 'UK XL'],
    colors: [
      { name: 'Jet Black', hex: '#0D0D0D' },
      { name: 'Heather Cream', hex: '#FFFDF2' },
      { name: 'NOVAIRE Orange', hex: '#F15A0A' }
    ],
    primaryImage: createFashionGraphic('HOODIE 01', '#151515', true),
    secondaryImage: createFashionGraphic('HOODIE 01 BACK', '#1D1D1D', true),
    galleryImages: [
      createFashionGraphic('HOODIE HOOD', '#0E0E0E', true),
      createFashionGraphic('HOODIE CUFF', '#1E1E1E', false)
    ],
    inStock: true,
    stockCount: 28,
    isNew: true,
    isBestSeller: true,
    isPublished: true,
    rating: 4.92,
    reviewsCount: 64
  },
  {
    id: 'nov-uk-006',
    title: 'Asymmetric Draped Japanese Poplin Shirt',
    subtitle: 'High-density crisp poplin with crossover side tie',
    slug: 'asymmetric-draped-japanese-poplin-shirt',
    price: 95.00,
    originalPrice: 115.00,
    discount: 17,
    category: 'shirts',
    gender: 'men',
    collection: 'AFTER HOURS',
    description: 'A synthesis of eastern minimalist tailoring and modern architectural eveningwear. Features a cross-body drape with hidden interior anchor and exterior self-fabric ties.',
    fabricDetails: [
      '100% Japanese High-Density Cotton Poplin',
      'Concealed mother-of-pearl buttons',
      'French seams throughout',
      'Crisp washed handle'
    ],
    careInstructions: [
      'Machine wash gentle cycle cold',
      'Hang dry immediately',
      'Warm iron whilst slightly damp'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    ukSizes: ['UK 38', 'UK 40', 'UK 42', 'UK 44'],
    colors: [
      { name: 'Pitch Black', hex: '#0B0B0B' },
      { name: 'Bone White', hex: '#FFFDF2' }
    ],
    primaryImage: createFashionGraphic('KIMONO SHIRT', '#151515', false),
    secondaryImage: createFashionGraphic('KIMONO SHIRT OPEN', '#212121', false),
    galleryImages: [
      createFashionGraphic('KIMONO COLLAR', '#0E0E0E', false),
      createFashionGraphic('KIMONO TIE', '#191919', true)
    ],
    inStock: true,
    stockCount: 16,
    isNew: true,
    isBestSeller: false,
    isPublished: true,
    rating: 4.75,
    reviewsCount: 22
  },
  {
    id: 'nov-uk-007',
    title: 'Stand-Collar Sculpted Women’s Blazer',
    subtitle: 'Tailored architectural shoulders with concealed magnet closure',
    slug: 'stand-collar-sculpted-womens-blazer',
    price: 195.00,
    originalPrice: 225.00,
    discount: 13,
    category: 'jackets',
    gender: 'women',
    collection: 'EVERYDAY LUXURY',
    description: 'Sharp, modern, and commanding. A minimalist women’s blazer featuring a high architectural mandarin collar, internal waist contouring, and clean slit wrist cuffs.',
    fabricDetails: [
      '96% Virgin Wool, 4% Spandex Crepe',
      'Fully lined in 100% silk habotai',
      'Concealed double magnetic fastenings',
      'Hand-finished interior seams'
    ],
    careInstructions: [
      'Specialist dry clean only',
      'Do not iron directly on crepe'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    ukSizes: ['UK 6', 'UK 8', 'UK 10', 'UK 12'],
    colors: [
      { name: 'Pure Black', hex: '#000000' },
      { name: 'Warm Cream', hex: '#FFFDF2' }
    ],
    primaryImage: createFashionGraphic('STAND BLAZER', '#0D0D0D', false),
    secondaryImage: createFashionGraphic('STAND BLAZER SIDE', '#181818', false),
    galleryImages: [
      createFashionGraphic('BLAZER COLLAR', '#151515', false),
      createFashionGraphic('BLAZER CUFF', '#222222', true)
    ],
    inStock: true,
    stockCount: 11,
    isNew: true,
    isBestSeller: false,
    isPublished: true,
    rating: 4.95,
    reviewsCount: 19
  },
  {
    id: 'nov-uk-008',
    title: 'Fluid Sandwashed Silk Bias Midi Skirt',
    subtitle: '22-momme heavy mulberry silk with asymmetric stepped hem',
    slug: 'fluid-sandwashed-silk-bias-midi-skirt',
    price: 125.00,
    originalPrice: 145.00,
    discount: 14,
    category: 'trousers',
    gender: 'women',
    collection: 'AFTER HOURS',
    description: 'Cut on the bias to drape effortlessly over the body. Crafted from 22-momme sandwashed mulberry silk with a matte luster and seamless elasticized interior waistband.',
    fabricDetails: [
      '100% Pure Sandwashed Grade-6A Mulberry Silk (22-momme)',
      'French seam finishes throughout',
      'Subtle asymmetric stepped hemline'
    ],
    careInstructions: [
      'Hand wash cold with delicate silk detergent or dry clean',
      'Do not wring or twist',
      'Dry flat in shade'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    ukSizes: ['UK 6', 'UK 8', 'UK 10', 'UK 12'],
    colors: [
      { name: 'Deep Midnight', hex: '#0C0D11' },
      { name: 'Oyster Cream', hex: '#FFFDF2' }
    ],
    primaryImage: createFashionGraphic('SILK SKIRT', '#101114', false),
    secondaryImage: createFashionGraphic('SILK SKIRT MOVEMENT', '#1A1B20', false),
    galleryImages: [
      createFashionGraphic('SILK TEXTURE', '#121216', false),
      createFashionGraphic('SILK HEM', '#222328', true)
    ],
    inStock: true,
    stockCount: 15,
    isNew: true,
    isBestSeller: true,
    isPublished: true,
    rating: 4.9,
    reviewsCount: 31
  }
];

export const INITIAL_HOMEPAGE_CONFIG: HomepageConfig = {
  announcementText: 'COMPLIMENTARY ROYAL MAIL TRACKED 24 ON ALL UK ORDERS OVER £80 · LONDON ATELIER DISPATCH',
  heroSeasonLabel: 'NEW SEASON / 2026',
  heroHeadline: 'NOVAIRE',
  heroSecondaryHeadline: 'THE ART OF BEING DIFFERENT.',
  manifestoStatement: 'WE BELIEVE STYLE IS MORE THAN WHAT YOU WEAR. IT IS HOW YOU DEFINE YOURSELF.',
  brandStoryQuote: 'STYLE IS NOT ABOUT FOLLOWING. IT IS ABOUT DEFINING.',
  editorialBannerText: 'CONTEMPORARY FASHION. TIMELESS IDENTITY.',
  freeShippingThresholdGBP: 80.00
};

export const INITIAL_UK_REVIEWS = [
  {
    id: 'rev-uk-01',
    productId: 'nov-uk-001',
    author: 'Julian Thorne',
    rating: 5,
    date: '28 February 2026',
    title: 'The architectural silhouette is second to none',
    comment: 'The volume on this bomber is unlike anything on Regent Street. The Japanese technical nylon holds its cut with absolute precision, and the subtle orange interior pull tab is an exquisite touch.',
    verified: true
  },
  {
    id: 'rev-uk-02',
    productId: 'nov-uk-003',
    author: 'Eleanor Vance',
    rating: 5,
    date: '14 February 2026',
    title: 'Best 340 GSM heavy tee in London',
    comment: 'The collar stays crisp through continuous wash cycles and the boxy drape is unmatched. Bought both the washed black and raw cream.',
    verified: true
  },
  {
    id: 'rev-uk-03',
    productId: 'nov-uk-005',
    author: 'Callum Davies',
    rating: 5,
    date: '02 March 2026',
    title: '480 GSM perfection',
    comment: 'Incredible weight and loopback texture. The absence of drawstring eyelets gives it a clean, brutalist luxury look. Superb Royal Mail next-day delivery.',
    verified: true
  }
];
