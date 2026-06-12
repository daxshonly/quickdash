export const categories = [
  { id: 1, name: 'Fruits & Veggies', emoji: '🥦', color: 'bg-green-50 border-green-200' },
  { id: 2, name: 'Dairy & Bread', emoji: '🥛', color: 'bg-yellow-50 border-yellow-200' },
  { id: 3, name: 'Snacks', emoji: '🍿', color: 'bg-orange-50 border-orange-200' },
  { id: 4, name: 'Cold Drinks', emoji: '🥤', color: 'bg-blue-50 border-blue-200' },
  { id: 5, name: 'Instant Food', emoji: '🍜', color: 'bg-red-50 border-red-200' },
  { id: 6, name: 'Cleaning', emoji: '🧹', color: 'bg-purple-50 border-purple-200' },
  { id: 7, name: 'Personal Care', emoji: '🧴', color: 'bg-pink-50 border-pink-200' },
  { id: 8, name: 'Baby Care', emoji: '👶', color: 'bg-cyan-50 border-cyan-200' },
  { id: 9, name: 'Pet Care', emoji: '🐾', color: 'bg-amber-50 border-amber-200' },
  { id: 10, name: 'Frozen Food', emoji: '❄️', color: 'bg-indigo-50 border-indigo-200' },
];

export const products = [
  // Fruits & Veggies
  {
    id: 1, name: 'Fresh Tomatoes', weight: '500g', category: 'Fruits & Veggies',
    price: 40, mrp: 55, deliveryTime: '9 MINS', emoji: '🍅',
    bg: 'from-red-50 to-orange-50', badge: 'FRESH'
  },
  {
    id: 2, name: 'Bananas', weight: '6 pcs', category: 'Fruits & Veggies',
    price: 35, mrp: 45, deliveryTime: '9 MINS', emoji: '🍌',
    bg: 'from-yellow-50 to-amber-50', badge: 'POPULAR'
  },
  {
    id: 3, name: 'Baby Spinach', weight: '200g', category: 'Fruits & Veggies',
    price: 29, mrp: 40, deliveryTime: '10 MINS', emoji: '🥬',
    bg: 'from-green-50 to-emerald-50', badge: null
  },
  {
    id: 4, name: 'Red Onions', weight: '1 kg', category: 'Fruits & Veggies',
    price: 45, mrp: 60, deliveryTime: '10 MINS', emoji: '🧅',
    bg: 'from-purple-50 to-pink-50', badge: null
  },

  // Dairy & Bread
  {
    id: 5, name: 'Amul Full Cream Milk', weight: '1 L', category: 'Dairy & Bread',
    price: 66, mrp: 66, deliveryTime: '8 MINS', emoji: '🥛',
    bg: 'from-sky-50 to-blue-50', badge: 'DAILY'
  },
  {
    id: 6, name: 'Britannia Bread', weight: '400g', category: 'Dairy & Bread',
    price: 40, mrp: 45, deliveryTime: '8 MINS', emoji: '🍞',
    bg: 'from-amber-50 to-yellow-50', badge: null
  },
  {
    id: 7, name: 'Amul Butter', weight: '100g', category: 'Dairy & Bread',
    price: 56, mrp: 60, deliveryTime: '8 MINS', emoji: '🧈',
    bg: 'from-yellow-50 to-orange-50', badge: null
  },
  {
    id: 8, name: 'Paneer', weight: '200g', category: 'Dairy & Bread',
    price: 85, mrp: 100, deliveryTime: '10 MINS', emoji: '🧀',
    bg: 'from-orange-50 to-amber-50', badge: 'FRESH'
  },

  // Snacks
  {
    id: 9, name: "Lay's Classic Salted", weight: '73g', category: 'Snacks',
    price: 20, mrp: 20, deliveryTime: '10 MINS', emoji: '🥔',
    bg: 'from-yellow-50 to-amber-50', badge: null
  },
  {
    id: 10, name: 'Haldirams Bhujia', weight: '200g', category: 'Snacks',
    price: 65, mrp: 80, deliveryTime: '10 MINS', emoji: '🌶️',
    bg: 'from-orange-50 to-red-50', badge: 'BESTSELLER'
  },
  {
    id: 11, name: 'Parle-G Biscuits', weight: '250g', category: 'Snacks',
    price: 25, mrp: 25, deliveryTime: '10 MINS', emoji: '🍪',
    bg: 'from-amber-50 to-yellow-50', badge: null
  },
  {
    id: 12, name: 'Too Yumm! Multigrain', weight: '80g', category: 'Snacks',
    price: 30, mrp: 35, deliveryTime: '10 MINS', emoji: '🥜',
    bg: 'from-green-50 to-teal-50', badge: null
  },

  // Cold Drinks
  {
    id: 13, name: 'Coca-Cola', weight: '750 ml', category: 'Cold Drinks',
    price: 40, mrp: 45, deliveryTime: '8 MINS', emoji: '🥤',
    bg: 'from-red-50 to-rose-50', badge: null
  },
  {
    id: 14, name: 'Tropicana Orange', weight: '1 L', category: 'Cold Drinks',
    price: 85, mrp: 100, deliveryTime: '8 MINS', emoji: '🍊',
    bg: 'from-orange-50 to-yellow-50', badge: null
  },
  {
    id: 15, name: 'Red Bull Energy', weight: '250 ml', category: 'Cold Drinks',
    price: 110, mrp: 125, deliveryTime: '8 MINS', emoji: '⚡',
    bg: 'from-blue-50 to-sky-50', badge: 'NEW'
  },
  {
    id: 16, name: 'Sprite', weight: '750 ml', category: 'Cold Drinks',
    price: 40, mrp: 45, deliveryTime: '8 MINS', emoji: '💚',
    bg: 'from-green-50 to-lime-50', badge: null
  },

  // Instant Food
  {
    id: 17, name: 'Maggi Noodles', weight: '280g', category: 'Instant Food',
    price: 56, mrp: 64, deliveryTime: '9 MINS', emoji: '🍜',
    bg: 'from-yellow-50 to-red-50', badge: 'POPULAR'
  },
  {
    id: 18, name: 'MTR Ready to Eat', weight: '300g', category: 'Instant Food',
    price: 75, mrp: 90, deliveryTime: '9 MINS', emoji: '🍛',
    bg: 'from-orange-50 to-amber-50', badge: null
  },
];

export const deliveryPartner = {
  name: 'Ravi Kumar',
  rating: 4.8,
  vehicle: 'E-Bike • MH 02 XY 4567',
  avatar: '👨‍💼',
  totalDeliveries: 1243,
};
