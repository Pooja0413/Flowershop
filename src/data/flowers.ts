export interface FlowerProduct {
  id: string;
  name: string;
  botanicalSubtitle: string;
  price: number;
  image: string;
  category: 'all' | 'seasonal' | 'romantic' | 'sculptural' | 'sympathy';
  palette: 'pastels' | 'whites' | 'warm-sunset' | 'botanical-green';
  stemCountRange: string;
  featured?: boolean;
  bestseller?: boolean;
  scentProfile: string;
  bloomVarieties: string[];
  description: string;
  careSnippet: string;
}

export interface CustomStem {
  id: string;
  name: string;
  botanicalName: string;
  type: 'focal' | 'foliage' | 'accent' | 'filler';
  pricePerStem: number;
  colorName: string;
  colorHex: string;
  scent: string;
  seasonality: string;
}

export interface Workshop {
  id: string;
  title: string;
  level: string;
  instructor: string;
  date: string;
  time: string;
  seatsTotal: number;
  seatsLeft: number;
  price: number;
  description: string;
  includes: string[];
}

export interface CareTip {
  id: string;
  title: string;
  category: string;
  summary: string;
  steps: string[];
}

export const PRODUCTS: FlowerProduct[] = [
  {
    id: 'wild-meadow',
    name: 'The Wild Meadow Gather',
    botanicalSubtitle: 'Pastoral English Garden Stems',
    price: 88,
    image: '/src/assets/images/bouquet_wild_meadow_1791181669214.jpg',
    category: 'seasonal',
    palette: 'pastels',
    stemCountRange: '20–24 Stems',
    featured: true,
    bestseller: true,
    scentProfile: 'Wild honey, crushed mint, dew-drenched peach blossom',
    bloomVarieties: [
      'David Austin Garden Roses',
      'Japanese Pale Ranunculus',
      'Pink Astilbe',
      'Silvery Dollar Eucalyptus',
      'Sweet Pea'
    ],
    description:
      'Inspired by overgrown Cotswolds walled gardens at sunrise. An organic, airy arrangement combining delicate ruffled ranunculus, velvety garden roses, and textural wild astilbe hand-tied with plant-dyed raw silk ribbon.',
    careSnippet:
      'Loves cool rooms away from heating vents. Replenish vase water every 48 hours for optimal bloom expansion.'
  },
  {
    id: 'sunset-dahlia',
    name: 'Twilight Dahlia & Coral Peony',
    botanicalSubtitle: 'Rich Saturated Sunset Spectrum',
    price: 104,
    image: '/src/assets/images/bouquet_sunset_dahlia_1791181680699.jpg',
    category: 'romantic',
    palette: 'warm-sunset',
    stemCountRange: '24–28 Stems',
    featured: true,
    bestseller: true,
    scentProfile: 'Ripe apricot, damask rose, warm cedar foliage',
    bloomVarieties: [
      'Café au Lait & Bordeaux Dahlias',
      'Coral Charm Peonies',
      'Apricot Spray Garden Roses',
      'Copper Beech Foliage',
      'Rust Ranunculus'
    ],
    description:
      'A dramatic feast of warm amber, dusk coral, and deep velvety burgundy. Features seasonal dinnerplate dahlias nestled beside coral charm peonies that slowly transform in color as they unfurl.',
    careSnippet:
      'Dahlias are thirsty blooms. Check water level daily and snip 1cm off stems at a 45° angle under running water.'
  },
  {
    id: 'classic-white',
    name: 'Monochrome Blanche & Ranunculus',
    botanicalSubtitle: 'Purity & Quiet Luxury Architecture',
    price: 96,
    image: '/src/assets/images/bouquet_classic_white_1791181691258.jpg',
    category: 'sympathy',
    palette: 'whites',
    stemCountRange: '22–26 Stems',
    featured: true,
    bestseller: false,
    scentProfile: 'White gardenia, clean rain, sweet pea florals',
    bloomVarieties: [
      'Japanese White Ranunculus',
      'Blanche Sweet Peas',
      'White Gardenias',
      'Feathery Astrantia',
      'Silvery Mediterranean Olive Greens'
    ],
    description:
      'An exquisite, tranquil composition in varying shades of ivory, alabaster, and soft sage. Crafted for moments of refined celebration, gratitude, or quiet sympathy.',
    careSnippet:
      'Keep away from ripening fruit. White petals stay pristine in filtered, room-temperature spring water.'
  },
  {
    id: 'architectural-orchid',
    name: 'The Architectural Orchid & Anthurium',
    botanicalSubtitle: 'Modern Ikebana-Inspired Spatial Form',
    price: 115,
    image: '/src/assets/images/bouquet_orchid_architectural_1791181700768.jpg',
    category: 'sculptural',
    palette: 'pastels',
    stemCountRange: '14–18 Exotic Stems',
    featured: true,
    bestseller: false,
    scentProfile: 'Subtle fresh green tea, crisp cucumber, gentle vanilla orchid',
    bloomVarieties: [
      'Cascading Phalaenopsis Orchids',
      'Blush Porcelain Anthuriums',
      'Architectural Monstera Foliage',
      'Sculptural Bare Twigs',
      'Pale Lisianthus'
    ],
    description:
      'Sculptural botanicals designed with negative space in mind. Cascading orchid blooms balance against the lacquered sheen of blush porcelain anthuriums for a centerpiece that commands attention in modern interiors.',
    careSnippet:
      'Exceptionally long-lasting (up to 14 days). Mist orchid aerial blooms lightly with distilled water.'
  }
];

export const CUSTOM_STEM_CATALOG: CustomStem[] = [
  {
    id: 'stem-peony-coral',
    name: 'Coral Charm Peony',
    botanicalName: 'Paeonia lactiflora',
    type: 'focal',
    pricePerStem: 9.5,
    colorName: 'Coral Pink to Cream',
    colorHex: '#F87171',
    scent: 'Delicate floral citrus',
    seasonality: 'Spring to Early Summer'
  },
  {
    id: 'stem-garden-rose',
    name: 'Juliet Garden Rose',
    botanicalName: 'Rosa hybrida',
    type: 'focal',
    pricePerStem: 8.0,
    colorName: 'Soft Apricot Peach',
    colorHex: '#FDBA74',
    scent: 'Warm sweet tea rose',
    seasonality: 'Year-Round Harvest'
  },
  {
    id: 'stem-ranunculus-white',
    name: 'Japanese Cloque Ranunculus',
    botanicalName: 'Ranunculus asiaticus',
    type: 'focal',
    pricePerStem: 7.5,
    colorName: 'Paper White',
    colorHex: '#F5F5F4',
    scent: 'Clean grassy aroma',
    seasonality: 'Winter to Spring'
  },
  {
    id: 'stem-dahlia-burgundy',
    name: 'Night Silence Dahlia',
    botanicalName: 'Dahlia pinnata',
    type: 'focal',
    pricePerStem: 7.0,
    colorName: 'Deep Bordeaux',
    colorHex: '#881337',
    scent: 'Earthy subtle nectar',
    seasonality: 'Summer to Late Autumn'
  },
  {
    id: 'stem-eucalyptus',
    name: 'Silver Dollar Eucalyptus',
    botanicalName: 'Eucalyptus cinerea',
    type: 'foliage',
    pricePerStem: 4.0,
    colorName: 'Frosted Sage Green',
    colorHex: '#6B7280',
    scent: 'Vibrant uplifting menthol',
    seasonality: 'Year-Round Harvest'
  },
  {
    id: 'stem-olive',
    name: 'Tuscan Olive Branch',
    botanicalName: 'Olea europaea',
    type: 'foliage',
    pricePerStem: 4.5,
    colorName: 'Silvery Muted Olive',
    colorHex: '#4B5563',
    scent: 'Dry herbal wood',
    seasonality: 'Year-Round Harvest'
  },
  {
    id: 'stem-astilbe',
    name: 'Blush Feather Astilbe',
    botanicalName: 'Astilbe arendsii',
    type: 'accent',
    pricePerStem: 5.0,
    colorName: 'Feathery Rose Dust',
    colorHex: '#F472B6',
    scent: 'Mild honeyed pollen',
    seasonality: 'Late Spring to Summer'
  },
  {
    id: 'stem-sweetpea',
    name: 'Spencer Sweet Pea',
    botanicalName: 'Lathyrus odoratus',
    type: 'accent',
    pricePerStem: 4.5,
    colorName: 'Soft Lilac & Lavender',
    colorHex: '#C084FC',
    scent: 'Intense sweet floral perfume',
    seasonality: 'Spring Harvest'
  },
  {
    id: 'stem-waxflower',
    name: 'Chamelaucium Waxflower',
    botanicalName: 'Chamelaucium uncinatum',
    type: 'filler',
    pricePerStem: 3.5,
    colorName: 'Petite Starry White',
    colorHex: '#E5E7EB',
    scent: 'Citrus herbal needles',
    seasonality: 'Winter to Spring'
  },
  {
    id: 'stem-lavender',
    name: 'French Lavender Stems',
    botanicalName: 'Lavandula angustifolia',
    type: 'filler',
    pricePerStem: 3.5,
    colorName: 'Royal Lavender Blue',
    colorHex: '#818CF8',
    scent: 'Calming aromatherapeutic',
    seasonality: 'Summer Harvest'
  }
];

export const VASE_OPTIONS = [
  {
    id: 'wrapped',
    name: 'Artisan Linen & Silk Tie Wrap',
    price: 0,
    description: 'Recyclable kraft paper, moist water sponge reservoir, tied with naturally dyed silk ribbon.'
  },
  {
    id: 'fluted-ceramic',
    name: 'Handmade Fluted Ceramic Urn',
    price: 28,
    description: 'Matte warm stoneware glazed in natural ivory by local ceramicists. Watertight.'
  },
  {
    id: 'smoked-glass',
    name: 'Mouth-Blown Fluted Glass Vase',
    price: 34,
    description: 'Heavy bottom, subtle warm smoke tint that complements organic stems gracefully.'
  }
];

export const WORKSHOPS: Workshop[] = [
  {
    id: 'ws-handtied',
    title: 'The Art of the Spiral Hand-Tied Bouquet',
    level: 'Beginner to Intermediate',
    instructor: 'Margaux Laurent (Head Florist)',
    date: 'Saturday, October 17',
    time: '10:00 AM – 12:30 PM',
    seatsTotal: 8,
    seatsLeft: 3,
    price: 125,
    description:
      'Learn the foundational French floral spiral technique. You will select seasonal market blooms, balance colors, secure without floral foam, and take home your own $90 bouquet.',
    includes: ['All fresh seasonal blooms', 'Pruners & floral shears to keep', 'Artisan ceramic vessel', 'Herbal teas & French pastries']
  },
  {
    id: 'ws-ikebana',
    title: 'Modern Ikebana: Space, Line & Stillness',
    level: 'All Levels',
    instructor: 'Kenji Takahashi',
    date: 'Sunday, October 25',
    time: '2:00 PM – 4:30 PM',
    seatsTotal: 6,
    seatsLeft: 2,
    price: 145,
    description:
      'Explore Japanese botanical philosophy using kenzan (pin frogs). Focus on asymmetrical balance, negative space, and honoring individual botanical curves.',
    includes: ['Brass kenzan (pin frog)', 'Ceramic shallow Ikebana dish', 'Rare sculptural branches & orchids', 'Japanese green tea pairing']
  }
];

export const CARE_GUIDES: CareTip[] = [
  {
    id: 'care-cut',
    title: 'The 45-Degree Stem Cut & Hydration Ritual',
    category: 'Daily Protocol',
    summary: 'Preventing vascular airlocks allows stems to absorb twice as much fresh water.',
    steps: [
      'Using clean, sharp floral shears (not kitchen scissors), cut 1 to 2 inches off each stem at a 45-degree angle.',
      'Perform this cut underwater or immediately plunge the cut stems into a sanitized vase filled with cool tap water.',
      'Remove all foliage below the waterline to avoid bacterial fermentation.'
    ]
  },
  {
    id: 'care-water',
    title: 'The 48-Hour Water Refresh',
    category: 'Vase Hygiene',
    summary: 'Clear water is the single most critical factor in extending bloom vase life up to 12 days.',
    steps: [
      'Empty the vase completely every two days. Rinse with a drop of unscented soap.',
      'Fill with fresh cold water and stir in a pinch of botanical food.',
      'Trim 0.5 inches off the bottom of each stem before returning them to the vase.'
    ]
  },
  {
    id: 'care-hydrangea',
    title: 'Reviving Fainting Hydrangeas',
    category: 'Emergency Botanical Rescue',
    summary: 'Hydrangeas drink not only through their stems, but also through their delicate petals.',
    steps: [
      'If your hydrangea head wilts prematurely, re-cut the stem with a deep vertical slit up the center.',
      'Submerge the entire flower head upside down in a sink or bowl of lukewarm water for 45 minutes.',
      'Shake gently and return to the vase. Within 2 hours, the petals will reinflate firm and turgid.'
    ]
  }
];
