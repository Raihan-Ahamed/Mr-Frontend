export const categories = [
  { id:'pizzas', name:'Pizzas', icon:'🍕' },
  { id:'burgers', name:'Burgers', icon:'🍔' },
  { id:'wings', name:'Wings', icon:'🍗' },
  { id:'meatboxes', name:'Meatboxes', icon:'🍱' },
  { id:'ricebowls', name:'Rice Bowls', icon:'🍚' },
  { id:'pastas', name:'Pastas', icon:'🍝' },
  { id:'shawarmas', name:'Shawarmas', icon:'🌯' },
  { id:'momos', name:'Momos', icon:'🥟' },
  { id:'fries', name:'Fries', icon:'🍟' },
  { id:'nachos', name:'Nachos', icon:'🧀' },
  { id:'soup', name:'Soup', icon:'🍲' },
  { id:'salad', name:'Salad', icon:'🥗' },
  { id:'shakes', name:'Shakes', icon:'🥤' },
];

export const menuItems = [
  {id:'p1',category:'pizzas',name:'Chicken Classic Pizza',desc:'Pizza sauce, mozzarella cheese, chicken, green capsicum, onion',sizes:{reg:379,med:479,lar:599}},
  {id:'p2',category:'pizzas',name:'Naga Blast Pizza',desc:'Pizza sauce, mozzarella cheese, chicken, capsicum, naga sauce, black olive',sizes:{reg:449,med:569,lar:699}},
  {id:'p3',category:'pizzas',name:'Chicken Tikka Pizza',desc:'Pizza sauce, mozzarella cheese, tikka chicken, capsicum, green chilli',sizes:{reg:429,med:549,lar:679}},
  {id:'p4',category:'pizzas',name:'Sausage Carnival',desc:'Pizza sauce, mozzarella cheese, chicken, capsicum, loaded chicken sausage, black olive',sizes:{reg:469,med:579,lar:699}},
  {id:'p5',category:'pizzas',name:'Meat Machine Pizza',desc:'Pizza sauce, mozzarella cheese, chicken pepperoni, chicken meatball, pizza chicken, capsicum',sizes:{reg:449,med:569,lar:699}},
  {id:'p6',category:'pizzas',name:'Chicken Pepperoni Pizza',desc:'Pizza sauce, mozzarella cheese, pizza chicken, pepperoni, chicken sausage, capsicum',sizes:{reg:419,med:519,lar:619}},
  {id:'p7',category:'pizzas',name:'Meaty BBQ Pizza',desc:'BBQ sauce, mozzarella cheese, capsicum, mushroom mix chicken, black olive',sizes:{reg:449,med:549,lar:689}},
  {id:'p8',category:'pizzas',name:'Vegetarian Pizza',desc:'Pizza sauce, mozzarella cheese, capsicum, sweet corn, onion',sizes:{reg:349,med:449,lar:599}},
  {id:'p9',category:'pizzas',name:'Four Flavours Pizza',desc:'Pizza sauce, mozzarella cheese, chicken, mushroom, chicken sausage, sweet corn',sizes:{med:599,lar:799}},
  {id:'p10',category:'pizzas',name:'Overloaded Cheesy Pizza',desc:'Pizza sauce, loaded mozzarella cheese, pizza chicken, capsicum, black olive',sizes:{reg:489,med:599,lar:729}},
  {id:'p11',category:'pizzas',name:'Half Pounds Cheese Pizza',desc:'Pizza sauce, half pounds mozzarella cheese, pizza chicken, capsicum',sizes:{lar:799}},
  {id:'p12',category:'pizzas',name:'Chicken Meatball Pizza',desc:'Pizza sauce, mozzarella cheese, pizza chicken, chicken meatball, capsicum',sizes:{reg:499,med:599,lar:699}},
  {id:'p13',category:'pizzas',name:'Chicken Nugget Pizza',desc:'Pizza sauce, mozzarella cheese, pizza chicken, chicken nuggets, capsicum',sizes:{reg:499,med:599,lar:699}},
  {id:'p14',category:'pizzas',name:'Chicken Mushroom Pizza',desc:'Pizza sauce, mozzarella cheese, mushroom mix, pizza chicken, capsicum',sizes:{reg:399,med:499,lar:699}},
  {id:'p15',category:'pizzas',name:'Cheesy Margarita',desc:'Pizza sauce, mozzarella cheese, sweet corn',sizes:{reg:399,med:529,lar:629}},
  {id:'p16',category:'pizzas',name:'Sausage Curst Pizza',desc:'Pizza sauce, mozzarella cheese, pizza chicken, chicken sausage, capsicum',sizes:{med:699,lar:849}},
  {id:'p17',category:'pizzas',name:'Kebab Crust Pizza',desc:'Pizza sauce, mozzarella cheese, pizza chicken, kebab chicken, capsicum',sizes:{med:699,lar:899}},
  {id:'p18',category:'pizzas',name:'Mr. Doughe Special Pizza',desc:'Pizza sauce, mozzarella cheese, pizza chicken, chicken sausage, chicken meatball, capsicum',sizes:{reg:549,med:699,lar:899}},

  {id:'b1',category:'burgers',name:'Chicken Burger',desc:'Chicken, burger bun, lettuce, tomato, mayonnaise, special sauce',price:199},
  {id:'b2',category:'burgers',name:'Crispy Chicken Burger',desc:'Crispy chicken fillet, burger bun, lettuce, tomato, onion, cheese, mayonnaise',price:219},
  {id:'b3',category:'burgers',name:'Chicken Naga Cheesy Burger',desc:'Chicken patty, burger bun, cheese, naga sauce, lettuce, onion',price:269},
  {id:'b4',category:'burgers',name:'BBQ Chicken Burger',desc:'Crispy chicken patty, burger bun, cheese, BBQ sauce, lettuce, onion, tomato',price:290},
  {id:'b5',category:'burgers',name:'Cheesy Chicken Patty Burger',desc:'Chicken patty, burger bun, cheese, mayonnaise, lettuce, tomato, onion',price:299},
  {id:'b6',category:'burgers',name:'Double Layer Cheesy Chicken Patty Burger',desc:'2x chicken patty, egg, double cheese, burger bun, mayonnaise, lettuce, tomato, onion',price:349},

  {id:'w1',category:'wings',name:'Crispy Chicken Wings (6 pcs)',desc:'Golden-fried crispy chicken wings',price:250},
  {id:'w2',category:'wings',name:'BBQ Chicken Wings (6 pcs)',desc:'Wings glazed in BBQ sauce',price:279},
  {id:'w3',category:'wings',name:'Honey Chicken Wings (6 pcs)',desc:'Wings glazed in honey sauce',price:290},
  {id:'w4',category:'wings',name:'Chicken Lollipop (5 pcs)',desc:'Frenched chicken drumettes, fried and sauced',price:270},
  {id:'w5',category:'wings',name:'Naga Wing (6 pcs)',desc:'Wings tossed in naga sauce',price:259},

  {id:'mb1',category:'meatboxes',name:'Regular Meatbox',desc:'Crispy chicken, chicken meatball, sausages, fries, mayonnaise sauce',price:269},
  {id:'mb2',category:'meatboxes',name:'Naga Meatbox',desc:'Crispy chicken, chicken meatball, sausages, fries, naga sauce',price:279},
  {id:'mb3',category:'meatboxes',name:'BBQ Meatbox',desc:'Crispy chicken, meatball, nuggets, sausages, fries, BBQ sauce',price:289},
  {id:'mb4',category:'meatboxes',name:'Chessy Meatbox',desc:'Crispy chicken, meatball, nuggets, sausages, fries, cheese, red chilli sauce',price:299},
  {id:'mb5',category:'meatboxes',name:'Special Meatbox',desc:'Crispy chicken, meatball, nuggets, sausages, fries, cheese ball, red chilli sauce',price:369},

  {id:'r1',category:'ricebowls',name:'Sausage Rice Bowl',desc:'Fried rice, chicken sausage, egg, mixed vegetables, capsicum, onion',price:249},
  {id:'r2',category:'ricebowls',name:'BBQ Rice Bowl',desc:'Fried rice, BBQ chicken drumstick, egg, mixed vegetables, BBQ sauce',price:289},
  {id:'r3',category:'ricebowls',name:'Chicken Masala Ricebowl',desc:'Fried rice, chicken masala, egg, mixed vegetables, masala sauce',price:299},
  {id:'r4',category:'ricebowls',name:'Mexican Fried Rice',desc:'Mexican fried rice, chicken breast, egg, mixed vegetables',price:289},
  {id:'r5',category:'ricebowls',name:'Crispy Ricebowl',desc:'Fried rice, crispy drumstick, egg, mixed vegetables',price:289},
  {id:'r6',category:'ricebowls',name:'Chinese Vegetable (add-on)',desc:'Extra side',price:99},
  {id:'r7',category:'ricebowls',name:'Chilli Chicken (add-on)',desc:'Extra side',price:150},
  {id:'r8',category:'ricebowls',name:'Fried Rice (add-on)',desc:'Extra side',price:119},

  {id:'pa1',category:'pastas',name:'Spicy Pasta',desc:'Chicken breast, pasta, capsicum, chilli sauce, naga sauce',sizes:{med:260,lar:370}},
  {id:'pa2',category:'pastas',name:'Oven Baked Pasta',desc:'Chicken breast, pasta, capsicum, mayonnaise, black olive, mozzarella',sizes:{med:289,lar:429}},
  {id:'pa3',category:'pastas',name:'Naga Oven Baked Pasta',desc:'Chicken breast, pasta, capsicum, naga sauce, cheese, mozzarella',sizes:{med:299,lar:429}},
  {id:'pa4',category:'pastas',name:'White Cream Pasta',desc:'Chicken breast, pasta, capsicum, cream sauce',sizes:{med:289,lar:429}},
  {id:'pa5',category:'pastas',name:'Alfredo Pasta',desc:'Pasta, chicken breast, alfredo sauce, mushroom, cheese',sizes:{med:299,lar:449}},

  {id:'s1',category:'shawarmas',name:'Regular Chicken Shawarma',desc:'Chicken, capsicum, cucumber, mayonnaise',price:150},
  {id:'s2',category:'shawarmas',name:'BBQ Chicken Shawarma',desc:'BBQ chicken, BBQ sauce, capsicum, cucumber, mayonnaise',price:170},
  {id:'s3',category:'shawarmas',name:"Chef's Special Shawarma",desc:'Chicken, cheese, chef special sauce, capsicum, fries',price:230},

  {id:'mo1',category:'momos',name:'Steam Momo',desc:'Classic steamed chicken momo',price:250},
  {id:'mo2',category:'momos',name:'Cheesy Dumpling',desc:'Cheese-loaded dumpling',price:300},

  {id:'f1',category:'fries',name:'Chicken Fry',desc:'Golden-fried chicken pieces',price:129},
  {id:'f2',category:'fries',name:'Crispy Drumstick',desc:'Crispy fried chicken drumstick',price:129},
  {id:'f3',category:'fries',name:'Chicken Strips (6 pcs)',desc:'Breaded chicken strips',price:249},
  {id:'f4',category:'fries',name:'Chicken Hot Popcorn',desc:'Bite-size crispy popcorn chicken',price:229},
  {id:'f5',category:'fries',name:'French Fry',desc:'Classic salted fries',price:149},
  {id:'f6',category:'fries',name:'Chicken Finger',desc:'Crispy chicken fingers',price:269},
  {id:'f7',category:'fries',name:'BBQ Drumstick',desc:'Drumstick glazed in BBQ sauce',price:169},

  {id:'n1',category:'nachos',name:'Chicken Nachos',desc:'Nachos, chicken, capsicum, red sauce, mayo, onion',price:230},
  {id:'n2',category:'nachos',name:'BBQ Chicken Nachos',desc:'Nachos, BBQ chicken, BBQ sauce, mayo, capsicum, onion',price:250},
  {id:'n3',category:'nachos',name:'Cheesy Nachos',desc:'Nachos, red sauce, mozzarella, cheddar, mayo, capsicum, onion',price:280},

  {id:'so1',category:'soup',name:'Thai Soup with Wonton',desc:'Chicken breast, shrimp, mushroom, egg, pasta',sizes:{med:290,lar:450}},

  {id:'sa1',category:'salad',name:'Cashew Nut Salad',desc:'Chicken breast, cucumber, tomato, capsicum, cashew nut, mayonnaise',sizes:{med:289,lar:399}},
  {id:'sa2',category:'salad',name:'Honey Cashew Nut Salad',desc:'Chicken breast, cucumber, tomato, capsicum, cashew nut, honey mustard sauce',sizes:{med:299,lar:449}},

  {id:'sh1',category:'shakes',name:'Vanilla Milkshake',desc:'Classic vanilla shake',price:180},
  {id:'sh2',category:'shakes',name:'Chocolate Milkshake',desc:'Rich chocolate shake',price:200},
  {id:'sh3',category:'shakes',name:'Strawberry Milkshake',desc:'Fresh strawberry shake',price:200},
  {id:'sh4',category:'shakes',name:'Oreo Milkshake',desc:'Oreo cookie shake',price:220},
  {id:'sh5',category:'shakes',name:'Kitkat Milkshake',desc:'Kitkat chocolate shake',price:250},
];

export const deliveryZones = [
  { id:'chawkbazar', name:'Chawkbazar', charge:0 },
  { id:'kotwali', name:'Kotwali', charge:30 },
  { id:'panchlaish', name:'Panchlaish', charge:50 },
  { id:'agrabad', name:'Agrabad', charge:70 },
  { id:'halishahar', name:'Halishahar', charge:80 },
  { id:'nasirabad', name:'Nasirabad', charge:60 },
];

export const bestSellerIds = ['p1','b2','w1','mo1'];
export const sizeLabel = { reg:'Regular', med:'Medium', lar:'Large' };
