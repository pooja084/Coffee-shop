import { Product, BrewMethod } from '../types/coffee';
import HERO_IMAGE from '../assets/images/hero_coffee_bar_1791181493478.jpg';
import POUROVER_IMAGE from '../assets/images/drink_pourover_craft_1791181508225.jpg';
import BEANS_IMAGE from '../assets/images/product_coffee_beans_1791181525736.jpg';
import BAKERY_IMAGE from '../assets/images/bakery_pastries_1791181537907.jpg';

export { HERO_IMAGE, POUROVER_IMAGE, BEANS_IMAGE, BAKERY_IMAGE };

export const PRODUCTS: Product[] = [
  // Specialty Whole Beans
  {
    id: 'bean-guji',
    name: 'Guji Highlands Micro-lot',
    category: 'beans',
    subcategory: 'Single Origin Whole Bean',
    price: 22.00,
    description: 'Slow-ripened Ethiopian heirloom varietals cultivated in volcanic soil. Intensely aromatic with pristine floral clarity and berry sweetness.',
    image: BEANS_IMAGE,
    featured: true,
    tastingNotes: ['Bergamot Blossom', 'Wild Strawberry', 'Cane Sugar', 'Meyer Lemon'],
    origin: 'Ethiopia',
    region: 'Oromia, Guji Zone',
    farm: 'Dambi Uddo Collective',
    altitude: '2,150m – 2,280m',
    process: 'Natural Anaerobic (72h)',
    roastLevel: 'Light',
    harvestYear: '2026'
  },
  {
    id: 'bean-huila',
    name: 'El Paraíso Geisha Reserve',
    category: 'beans',
    subcategory: 'Single Origin Whole Bean',
    price: 28.50,
    description: 'An exceptional high-altitude Colombian Geisha with silky body and layered complexity. Features delicate stone fruit acidity and lingering jasmine.',
    image: BEANS_IMAGE,
    featured: true,
    tastingNotes: ['White Peach', 'Jasmine Flower', 'Golden Honey', 'Lemongrass'],
    origin: 'Colombia',
    region: 'Huila, San Adolfo',
    farm: 'Finca El Paraíso',
    altitude: '1,950m',
    process: 'Double Washed Thermal Shock',
    roastLevel: 'Light',
    harvestYear: '2026'
  },
  {
    id: 'bean-antigua',
    name: 'Antigua Valley Bourbon',
    category: 'beans',
    subcategory: 'Single Origin Whole Bean',
    price: 19.50,
    description: 'Shade-grown under gravilea trees on volcanic slopes. Harmonious balance of bittersweet cacao, candied citrus zest, and roasted praline.',
    image: BEANS_IMAGE,
    featured: false,
    tastingNotes: ['Dark Chocolate', 'Candied Orange', 'Toasted Hazelnut', 'Brown Sugar'],
    origin: 'Guatemala',
    region: 'Antigua Valley',
    farm: 'Hacienda San Rafael',
    altitude: '1,750m',
    process: 'Fully Washed Sun-Dried',
    roastLevel: 'Medium',
    harvestYear: '2026'
  },
  {
    id: 'bean-sumatra',
    name: 'Kerinci Tiger Reserve',
    category: 'beans',
    subcategory: 'Single Origin Whole Bean',
    price: 20.00,
    description: 'Grown near the Kerinci Seblat National Park. Dense, syrup-like mouthfeel with complex forest aromatics and warm spices.',
    image: BEANS_IMAGE,
    featured: false,
    tastingNotes: ['Cedar & Pine', 'Black Currant', 'Raw Cacao', 'Sweet Tobacco'],
    origin: 'Indonesia',
    region: 'Sumatra, Mount Kerinci',
    farm: 'ALKO Koerintji Cooperative',
    altitude: '1,600m',
    process: 'Giling Basah (Wet-Hulled)',
    roastLevel: 'Medium-Dark',
    harvestYear: '2026'
  },

  // Handcrafted Cafe Drinks
  {
    id: 'drink-pourover',
    name: 'Artisan V60 Single-Origin Pour-over',
    category: 'drinks',
    subcategory: 'Filter & Hand Brew',
    price: 6.25,
    description: 'Individual hand-dripped ceramic brew using freshly ground seasonal single-origin micro-lot beans and mineral-balanced water.',
    image: POUROVER_IMAGE,
    featured: true,
    tastingNotes: ['Clean Acidity', 'Silky Body', 'Transparent Terroir'],
    caffeineLevel: 'Full'
  },
  {
    id: 'drink-cortado',
    name: 'Standard Cortado (1:1 Ratio)',
    category: 'drinks',
    subcategory: 'Espresso Bar',
    price: 5.00,
    description: 'Double shot of our house espresso balanced with equal parts silky, micro-foamed warm milk in an imported Gibraltar glass.',
    image: POUROVER_IMAGE,
    featured: true,
    tastingNotes: ['Caramel Swirl', 'Roasted Walnut', 'Velvety Finish'],
    caffeineLevel: 'Full'
  },
  {
    id: 'drink-tonic',
    name: 'Valencia Orange Espresso Tonic',
    category: 'drinks',
    subcategory: 'Cold & Specialty',
    price: 6.75,
    description: 'Crisp Indian botanical tonic poured over hand-cut ice, topped with a floating double shot of Guji espresso and fresh orange peel oil.',
    image: POUROVER_IMAGE,
    featured: true,
    tastingNotes: ['Effervescent Citrus', 'Bittersweet Cocoa', 'Botanical Herbal'],
    caffeineLevel: 'Full'
  },
  {
    id: 'drink-cardamom-latte',
    name: 'Cardamom Seed Velvet Latte',
    category: 'drinks',
    subcategory: 'Espresso Bar',
    price: 6.50,
    description: 'Single-origin espresso steeped with crushed green cardamom pods, steamed with creamy organic oat milk and raw demerara sugar.',
    image: POUROVER_IMAGE,
    featured: false,
    tastingNotes: ['Aromatic Cardamom', 'Vanilla Pod', 'Warm Spice'],
    caffeineLevel: 'Full'
  },
  {
    id: 'drink-kyoto-coldbrew',
    name: 'Kyoto 16-Hour Slow Drip Cold Brew',
    category: 'drinks',
    subcategory: 'Cold & Specialty',
    price: 6.00,
    description: 'Gravity-extracted drop-by-drop through ice towers for 16 hours. Wine-like clarity, zero bitterness, and ultra-smooth chocolate notes.',
    image: POUROVER_IMAGE,
    featured: false,
    tastingNotes: ['Dutch Cocoa', 'Dark Cherry', 'Molasses', 'Whiskey Oak'],
    caffeineLevel: 'Full'
  },
  {
    id: 'drink-ceremonial-matcha',
    name: 'Uji Ceremonial Matcha Cloud',
    category: 'drinks',
    subcategory: 'Tea & Botanicals',
    price: 6.50,
    description: 'First-harvest ceremonial green tea from Uji, Kyoto, whisked to a jade foam over chilled oat milk with a hint of yuzu honey.',
    image: POUROVER_IMAGE,
    featured: false,
    tastingNotes: ['Sweet Umami', 'Fresh Bamboo', 'Citrus Blossom'],
    caffeineLevel: 'Half-Caf'
  },

  // Bakery & Provisions
  {
    id: 'bake-cardamom-bun',
    name: 'Stockholm Cardamom Morning Bun',
    category: 'bakery',
    subcategory: 'House Pastry',
    price: 5.50,
    description: 'Twisted Scandinavian brioche dough laminated with freshly ground organic cardamom seeds, French butter, and pearl sugar.',
    image: BAKERY_IMAGE,
    featured: true,
    tastingNotes: ['Crushed Cardamom', 'Caramelized Butter', 'Crisp Crust'],
    allergens: ['Wheat', 'Dairy', 'Eggs']
  },
  {
    id: 'bake-almond-croissant',
    name: 'Double-Baked Almond Croissant',
    category: 'bakery',
    subcategory: 'House Pastry',
    price: 5.75,
    description: 'Twice-baked sourdough croissant loaded with rich almond frangipane cream, bathed in vanilla syrup, and topped with toasted almond flakes.',
    image: BAKERY_IMAGE,
    featured: false,
    tastingNotes: ['Toasted Almond', 'Madagascar Vanilla', 'Flaky Layers'],
    allergens: ['Wheat', 'Tree Nuts', 'Dairy', 'Eggs']
  },
  {
    id: 'bake-sourdough-toast',
    name: 'Ancient Grain Rye Toast & Sea Salt Butter',
    category: 'bakery',
    subcategory: 'Provisions',
    price: 6.00,
    description: 'Two thick grilled slices of our 48-hour fermented dark rye sourdough, served with Normandy cultured butter and Maldon sea salt flakes.',
    image: BAKERY_IMAGE,
    featured: false,
    tastingNotes: ['Tangy Crust', 'Cultured Cream', 'Maldon Minerals'],
    allergens: ['Wheat', 'Dairy']
  }
];

export const BREW_METHODS: BrewMethod[] = [
  {
    id: 'v60',
    name: 'Hario V60 Dripper',
    subtitle: 'High clarity & vibrant floral acidity',
    ratio: 16,
    defaultDoseGrams: 18,
    grindSize: 'Medium-Fine (like kosher salt)',
    waterTempC: 93,
    waterTempF: 200,
    totalTime: '3:00 min',
    steps: [
      { time: '0:00', action: 'The Bloom', waterTargetGrams: 50, description: 'Pour 50g water in concentric circles. Swirl lightly and let degas for 45s.' },
      { time: '0:45', action: 'First Pour', waterTargetGrams: 150, description: 'Slow gentle pour in a circular pattern avoiding the paper filter edges.' },
      { time: '1:30', action: 'Second Pour', waterTargetGrams: 230, description: 'Steady center pour maintaining an even brew bed temperature.' },
      { time: '2:15', action: 'Final Pour & Drawdown', waterTargetGrams: 288, description: 'Pour up to final weight, gentle swirl, let gravity filter through cleanly.' }
    ]
  },
  {
    id: 'aeropress',
    name: 'AeroPress (Inverted)',
    subtitle: 'Rich body with intense aromatic extraction',
    ratio: 13,
    defaultDoseGrams: 16,
    grindSize: 'Medium (table salt texture)',
    waterTempC: 88,
    waterTempF: 190,
    totalTime: '2:15 min',
    steps: [
      { time: '0:00', action: 'Saturate & Stir', waterTargetGrams: 80, description: 'Add 80g water, stir vigorously 5 times to ensure complete saturation.' },
      { time: '0:30', action: 'Top-Off Water', waterTargetGrams: 208, description: 'Pour remaining water up to top rim of chamber.' },
      { time: '1:00', action: 'Lock & Invert', waterTargetGrams: 208, description: 'Attach rinsed filter cap, flip smoothly onto your serving vessel.' },
      { time: '1:30', action: 'Gentle Plunge', waterTargetGrams: 208, description: 'Press down evenly over 40 seconds until the first hissing sound.' }
    ]
  },
  {
    id: 'frenchpress',
    name: 'French Press (Immersion)',
    subtitle: 'Full body with natural coffee oils & cacao richness',
    ratio: 15,
    defaultDoseGrams: 30,
    grindSize: 'Coarse (sea salt crystals)',
    waterTempC: 95,
    waterTempF: 203,
    totalTime: '4:30 min',
    steps: [
      { time: '0:00', action: 'Initial Bloom Pour', waterTargetGrams: 150, description: 'Pour 150g hot water vigorously to wet all grounds evenly.' },
      { time: '0:45', action: 'Complete Fill', waterTargetGrams: 450, description: 'Pour remaining water up to 450g. Place plunger lid resting on top.' },
      { time: '3:30', action: 'Break the Crust', waterTargetGrams: 450, description: 'Using two spoons, gently stir surface and scoop off foamy top oils.' },
      { time: '4:00', action: 'Steady Press', waterTargetGrams: 450, description: 'Slowly depress mesh filter halfway. Pour immediately to avoid over-steeping.' }
    ]
  },
  {
    id: 'chemex',
    name: 'Chemex 6-Cup',
    subtitle: 'Crisp, crystal-pure cup with zero sediment',
    ratio: 16.5,
    defaultDoseGrams: 30,
    grindSize: 'Medium-Coarse',
    waterTempC: 94,
    waterTempF: 202,
    totalTime: '4:00 min',
    steps: [
      { time: '0:00', action: 'Triple-Layer Bloom', waterTargetGrams: 90, description: 'Pour 90g water, saturate evenly and wait 45 seconds.' },
      { time: '0:45', action: 'Spiraled Pour', waterTargetGrams: 250, description: 'Pour in outward spiral, pausing before water hits top rim.' },
      { time: '2:00', action: 'Final Level Pour', waterTargetGrams: 495, description: 'Slowly bring water to final mark and let drawdown complete.' }
    ]
  }
];

export const CAFE_INFO = {
  name: 'Kroma Coffee Roasters',
  address: '142 St. Clair Avenue, Arts & Roastery District',
  phone: '(415) 890-5412',
  email: 'hello@kromacoffee.com',
  wifi: 'Kroma-Guest // 500 Mbps Fiber',
  hours: [
    { days: 'Monday – Friday', hours: '6:30 AM – 6:00 PM', roastStatus: 'Roasting mornings until 1:00 PM' },
    { days: 'Saturday & Sunday', hours: '7:00 AM – 7:00 PM', roastStatus: 'Weekend cupping sessions at 11:00 AM' }
  ],
  stats: [
    { label: 'Direct Trade Lots', value: '100%' },
    { label: 'Elevation Range', value: '1,600m – 2,300m' },
    { label: 'Roast Turnaround', value: '< 48 Hours' },
    { label: 'Carbon Neutrality', value: 'Zero-Emission Loring' }
  ]
};
