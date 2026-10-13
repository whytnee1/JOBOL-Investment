"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  AiOutlineSearch,
  AiOutlineClose,
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineEnvironment,
  AiOutlineCheck,
  AiOutlinePlus,
} from "react-icons/ai";

// 100 Nigerian Foodstuffs dataset
const products = [
  // Vegetables (15)
  { id: 1, name: "Fresh Tomatoes (Basket)", category: "vegetables", minPrice: 28500, maxPrice: 85500, inSeason: false, unit: "basket", image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80" },
  { id: 2, name: "Pumpkin Leaves (Ugu)", category: "vegetables", minPrice: 1000, maxPrice: 7000, inSeason: true, unit: "bunch", image: "https://th.bing.com/th/id/OIP.xewUW-Y-Q5cj3gZK-u1ASwHaFj?w=225&h=180&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3" },
  { id: 3, name: "Fresh Bell Peppers (Tatashe)", category: "vegetables", minPrice: 500, maxPrice: 43550, inSeason: true, unit: "painter", image: "https://th.bing.com/th/id/OIP.ag-Vy1HCK7EmHdtCV1AgjAHaE7?w=287&h=191&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3" },
  { id: 4, name: "Scotch Bonnet Peppers (Atarodo)", category: "vegetables", minPrice: 1000, maxPrice: 55000, inSeason: true, unit: "painter", image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=80" },
  { id: 5, name: "Bitter Leaf (Onugbu)", category: "vegetables", minPrice: 800, maxPrice: 10200, inSeason: true, unit: "pack", image: "https://th.bing.com/th/id/OIP.qbOLzHEGSWtosBbWG29-vAHaE8?w=229&h=180&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3" },
  { id: 6, name: "Scent Leaf (Efirin)", category: "vegetables", minPrice: 500, maxPrice: 6350, inSeason: true, unit: "bunch", image: "https://th.bing.com/th/id/OIP.oRJ9QkkSq4CtMMBGoU_j6wHaFj?w=210&h=180&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3" },
  { id: 7, name: "Waterleaf (Gbure)", category: "vegetables", minPrice: 600, maxPrice: 5000, inSeason: true, unit: "bunch", image: "https://th.bing.com/th/id/OIP.dhK--D-C-tGXmgUs_IpnWwHaK-?w=135&h=200&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3" },
  { id: 8, name: "Okra (Lady Fingers)", category: "vegetables", minPrice: 1500, maxPrice: 88000, inSeason: true, unit: "basket", image: "https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?auto=format&fit=crop&w=600&q=80" },
  { id: 9, name: "Ewedu Leaves (Jute Leaves)", category: "vegetables", minPrice: 500, maxPrice: 6250, inSeason: true, unit: "bunch", image: "https://th.bing.com/th/id/OIP.3fbxZnoTL7-W6Qm9AjrjkwHaFj?w=226&h=180&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=30" },
  { id: 10, name: "Fresh Onions (Red)", category: "vegetables", minPrice: 2000, maxPrice: 15500, inSeason: true, unit: "bag", image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80" },
  { id: 11, name: "White Onions", category: "vegetables", minPrice: 2500, maxPrice: 18300, inSeason: false, unit: "painter", image: "https://th.bing.com/th/id/OIP.RKtCk15Bfz9VriVTQOuoKQHaHa?w=186&h=187&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3" },
  { id: 12, name: "Spring Onions", category: "vegetables", minPrice: 700, maxPrice: 5800, inSeason: true, unit: "bunch", image: "https://th.bing.com/th/id/OIP.k73XiqOVGI_Met-dYjX5SAHaE8?w=295&h=197&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3" },
  { id: 13, name: "Cabbage (Medium Head)", category: "vegetables", minPrice: 1200, maxPrice: 1800, inSeason: true, unit: "head", image: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=600&q=80" },
  { id: 14, name: "Carrots (Fresh)", category: "vegetables", minPrice: 1500, maxPrice: 4500, inSeason: true, unit: "painter", image: "https://th.bing.com/th/id/OIP.lAet_g2y14k8-azK9U-1-QHaEZ?w=262&h=180&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3" },
  { id: 15, name: "Green Peppers (Salad)", category: "vegetables", minPrice: 2000, maxPrice: 9000, inSeason: true, unit: "painter", image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=600&q=80" },

  // Grains & Swallow (15)
  { id: 16, name: "Local Brown Beans (Painter)", category: "grains-swallow", minPrice: 4200, maxPrice: 5000, inSeason: true, unit: "painter", image: "https://th.bing.com/th/id/OIP.timinLfh_8aRVaMop4I3PwHaHI?w=191&h=184&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3" },
  { id: 17, name: "Poundo Yam Flour (5kg Bag)", category: "grains-swallow", minPrice: 3850, maxPrice: 75600, inSeason: true, unit: "bag", image: "https://th.bing.com/th/id/OIP.lJLytyCC5ISYu_8phW1bYQHaHa?w=176&h=180&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3" },
  { id: 18, name: "Ofada Rice (Paint Bucket)", category: "grains-swallow", minPrice: 5500, maxPrice: 6500, inSeason: false, unit: "painter", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80" },
  { id: 19, name: "White Garri (Ijebu)", category: "grains-swallow", minPrice: 2500, maxPrice: 3200, inSeason: true, unit: "painter", image: "https://tse1.mm.bing.net/th/id/OIP.36-OjnEPmNGWKfRTk2TvjAHaHa?r=0&pid=ImgDet&w=195&h=195&c=7&dpr=1.4&o=7&rm=3" },
  { id: 20, name: "Yellow Garri (Bendel)", category: "grains-swallow", minPrice: 2800, maxPrice: 3500, inSeason: true, unit: "painter", image: "https://th.bing.com/th/id/OIP.xcF1Ml2ZiWSjg_rJ4Zf2YAHaFb?w=234&h=180&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3" },
  { id: 21, name: "Elubo / Yam Flour (Amala)", category: "grains-swallow", minPrice: 1500, maxPrice: 5500, inSeason: true, unit: "painter", image: "https://tse4.mm.bing.net/th/id/OIP.ISAcsQYMkLfOZF7xQwZz_wHaHa?r=0&pid=ImgDet&w=195&h=195&c=7&dpr=1.4&o=7&rm=3" },
  { id: 22, name: "Golden Penny Semovita (5kg Bag)", category: "grains-swallow", minPrice: 3700, maxPrice: 17300, inSeason: true, unit: "bag", image: "https://tse3.mm.bing.net/th/id/OIP.R2ern6ZbN8Xc205W5L--DQHaHa?r=0&pid=ImgDet&w=195&h=195&c=7&dpr=1.4&o=7&rm=3" },
  { id: 23, name: "Golden Penny Wheat Flour (5kg)", category: "grains-swallow", minPrice: 3800, maxPrice: 16680, inSeason: true, unit: "bag", image: "https://th.bing.com/th/id/OIP.OcJlu5sYEJj88oT1HnhRaQHaGo?w=205&h=183&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3" },
  { id: 24, name: "Foreign Parboiled Rice (50kg)", category: "grains-swallow", minPrice: 65000, maxPrice: 85000, inSeason: true, unit: "bag", image: "https://th.bing.com/th/id/OIP.ExSUpHVo6plmjGvfzeMCTwHaGQ?w=234&h=197&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3" },
  { id: 25, name: "Abakaliki Local Rice", category: "grains-swallow", minPrice: 42000, maxPrice: 65000, inSeason: true, unit: "bag", image: "https://th.bing.com/th/id/OIP.9iP_90Rr2MRl4R5lCqp3eQHaE8?w=243&h=180&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3" },
  { id: 26, name: "Oloyin Beans (Sweet Beans)", category: "grains-swallow", minPrice: 5000, maxPrice: 6200, inSeason: true, unit: "painter", image: "https://th.bing.com/th/id/OIP.katQZ5xIhU_z_2UoQ1WrYAHaNL?w=132&h=194&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3" },
  { id: 27, name: "White Maize Grains", category: "grains-swallow", minPrice: 3000, maxPrice: 4000, inSeason: true, unit: "painter", image: "https://th.bing.com/th/id/OIP.8ZEMtjQje3TTeoDaoxMN_wHaGL?w=251&h=210&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3" },
  { id: 28, name: "Yellow Corn Grains", category: "grains-swallow", minPrice: 3200, maxPrice: 4100, inSeason: true, unit: "painter", image: "https://th.bing.com/th/id/OIP.Dyj4juxcwQ62av5eDp-u4wHaFc?w=235&h=180&c=7&r=0&o=7&dpr=1.4&pid=1.7&rm=3" },
  { id: 29, name: "Millet Grains (Acha)", category: "grains-swallow", minPrice: 3500, maxPrice: 4500, inSeason: true, unit: "painter", image: "https://tse1.explicit.bing.net/th/id/OIP.jxCw2NZxF80ilEmp7yRPyAHaHa?r=0&pid=ImgDet&w=195&h=195&c=7&dpr=1.4&o=7&rm=3" },
  { id: 30, name: "Sorghum Grains (Dawa)", category: "grains-swallow", minPrice: 3000, maxPrice: 3800, inSeason: true, unit: "painter", image: "https://th.bing.com/th/id/OIP.OSiao9TXyfWObBb-Xho0mwHaE4?w=295&h=194&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },

  // Protein & Seafoods (15)
  { id: 31, name: "Stockfish (Okporoko)", category: "protein-seafoods", minPrice: 12500, maxPrice: 15000, inSeason: true, unit: "piece", image: "https://th.bing.com/th/id/OIP.fA_6ZRxHstyiFwXb5fVaDQHaHa?w=179&h=182&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 32, name: "Dry Smoked Catfish", category: "protein-seafoods", minPrice: 4500, maxPrice: 6000, inSeason: true, unit: "pack", image: "https://th.bing.com/th/id/OIP.V6gK86KlNxC2cGEXhbPqmwAAAA?w=193&h=193&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 33, name: "Crayfish (Ground 1 Paint)", category: "protein-seafoods", minPrice: 6500, maxPrice: 8000, inSeason: true, unit: "painter", image: "https://th.bing.com/th/id/OIP.NCAGUyayREoyHQspObMddAAAAA?w=181&h=204&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 34, name: "Frozen Chicken(Kilo)", category: "protein-seafoods", minPrice: 6000, maxPrice: 20000, inSeason: true, unit: "kg", image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=600&q=80" },
  { id: 35, name: "Frozen Turkey Wings (Kilo)", category: "protein-seafoods", minPrice: 6000, maxPrice: 28700, inSeason: true, unit: "kg", image: "https://th.bing.com/th/id/OIP.QeYchWsHgW44k8sjO3L7pwHaHa?w=181&h=182&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 36, name: "Fresh Beef (Kilo)", category: "protein-seafoods", minPrice: 4500, maxPrice: 5200, inSeason: true, unit: "kg", image: "https://th.bing.com/th/id/OIP.y1OzwTfGw58KMyN6SLGb4AHaHa?w=192&h=192&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 37, name: "Goat Meat (Kilo)", category: "protein-seafoods", minPrice: 5500, maxPrice: 6800, inSeason: true, unit: "kg", image: "https://th.bing.com/th/id/OIP.ghGh8-8ZKt8zP1L-3Tg6vAHaHa?w=195&h=195&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 38, name: "Cow Tripe (Shaki)", category: "protein-seafoods", minPrice: 1000, maxPrice: 22000, inSeason: true, unit: "kg", image: "https://th.bing.com/th/id/OIP.5_P6rTfos_1I-2JJUc4SZAHaGo?w=184&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 39, name: "Dry Panla Fish", category: "protein-seafoods", minPrice: 3000, maxPrice: 4200, inSeason: true, unit: "pack", image: "https://th.bing.com/th/id/OIP.Zem5qlmIFZHc-7eC0Fzh8wHaI0?w=144&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 40, name: "Dried Prawns / Shrimps", category: "protein-seafoods", minPrice: 5000, maxPrice: 6500, inSeason: true, unit: "cup", image: "https://tse1.explicit.bing.net/th/id/OIP.zx6bB32-WXzRCy6swcbipQHaHH?r=0&pid=ImgDet&w=184&h=176&c=7&dpr=1.3&o=7&rm=3" },
  { id: 41, name: "Fresh Croaker Fish", category: "protein-seafoods", minPrice: 5000, maxPrice: 155000, inSeason: true, unit: "kg", image: "https://th.bing.com/th/id/OIP.4KrGc5iOTZS0T-IzEhvycwHaE8?w=272&h=181&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 42, name: "Titus Fish", category: "protein-seafoods", minPrice: 7200, maxPrice: 185500, inSeason: true, unit: "kg", image: "https://th.bing.com/th/id/OIP.qDatLsRb_FSXQ-qHzV_uQwHaEk?w=261&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 43, name: "Snails (Large Size)", category: "protein-seafoods", minPrice: 12000, maxPrice: 16000, inSeason: true, unit: "4 pieces", image: "https://th.bing.com/th/id/OIP.i1G8YrpCkCnhud_gsTXM-QHaFc?w=261&h=192&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 44, name: "Cow Hide (Ponmo)", category: "protein-seafoods", minPrice: 2000, maxPrice: 3000, inSeason: true, unit: "pack", image: "https://tse2.mm.bing.net/th/id/OIP.hF3PASxq9EV4NMeZmxhyLQHaE8?r=0&pid=ImgDet&w=184&h=122&c=7&dpr=1.3&o=7&rm=3" },
  { id: 45, name: "Fresh Eggs (Crate)", category: "protein-seafoods", minPrice: 4200, maxPrice: 4800, inSeason: true, unit: "crate", image: "https://th.bing.com/th/id/OIP.1-AYwzeCxfd56ucCZYiUjQHaFc?w=261&h=192&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },

  // Tubers & Root (10)
  { id: 46, name: "Benue Yam Tubers (5 Medium)", category: "tubers", minPrice: 12000, maxPrice: 15000, inSeason: true, unit: "5 tubers", image: "https://tse1.explicit.bing.net/th/id/OIP.OPkL3gP40KgsK9QqBlJsKAHaJD?r=0&pid=ImgDet&w=184&h=224&c=7&dpr=1.3&o=7&rm=3" },
  { id: 47, name: "Sweet Potatoes (Paint Bucket)", category: "tubers", minPrice: 2500, maxPrice: 3500, inSeason: true, unit: "painter", image: "https://tse1.explicit.bing.net/th/id/OIP.cusV6vovaEuQsGJGaEw-rwHaHa?r=0&pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3" },
  { id: 48, name: "Irish Potatoes (Paint Bucket)", category: "tubers", minPrice: 4500, maxPrice: 6000, inSeason: false, unit: "painter", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80" },
  { id: 49, name: "Cocoyam (Ede)", category: "tubers", minPrice: 3000, maxPrice: 4200, inSeason: true, unit: "painter", image: "https://th.bing.com/th/id/OIP.WGhxEP9oV_aJXJQp0LzugQAAAA?w=132&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 50, name: "Cassava Roots (Fresh)", category: "tubers", minPrice: 2000, maxPrice: 3000, inSeason: true, unit: "bag", image: "https://th.bing.com/th/id/OIP.fee8T85eKSJM67zAeUirRQHaE7?w=264&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 51, name: "Water Yam (Ewura)", category: "tubers", minPrice: 3500, maxPrice: 5000, inSeason: true, unit: "tuber", image: "https://th.bing.com/th/id/OIP.Ra28MVi8VW0KfHgeMmvq8QHaFF?w=271&h=187&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 52, name: "Unripe Plantains (Bunch)", category: "tubers", minPrice: 3500, maxPrice: 5000, inSeason: true, unit: "bunch", image: "https://th.bing.com/th/id/OIP._QbRrQnMJIuSpXRoloB5rAHaIw?w=165&h=197&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 53, name: "Ripe Yellow Plantains", category: "tubers", minPrice: 4000, maxPrice: 5500, inSeason: true, unit: "bunch", image: "https://th.bing.com/th/id/OIP.sc3LSahyjhJSodVZvFLRjQHaEu?w=256&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 54, name: "Ginger Roots (Fresh)", category: "tubers", minPrice: 3000, maxPrice: 4500, inSeason: true, unit: "painter", image: "https://th.bing.com/th/id/OIP.jgm_eGlzvrjb2iUTAhmHpgHaHa?w=177&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 55, name: "Garlic Bulbs (Fresh)", category: "tubers", minPrice: 2500, maxPrice: 3800, inSeason: true, unit: "painter", image: "https://th.bing.com/th/id/OIP.zjt1-VqxpyzExGFa2eyzjgHaHa?w=188&h=187&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },

  // Fruits (10)
  { id: 56, name: "Fresh Watermelons (Large)", category: "fruits", minPrice: 2000, maxPrice: 3000, inSeason: true, unit: "piece", image: "https://th.bing.com/th/id/OIP.o-O4_ZCpYBNLldvv8pMcAAHaFh?w=241&h=181&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 57, name: "Sweet Oranges (Basket)", category: "fruits", minPrice: 3000, maxPrice: 4500, inSeason: true, unit: "basket", image: "https://th.bing.com/th/id/OIP.rTw8c-sX5bAF99KhrgTrvQHaHa?w=186&h=187&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 58, name: "Ripe Pawpaw (Papaya)", category: "fruits", minPrice: 1000, maxPrice: 1800, inSeason: true, unit: "piece", image: "https://th.bing.com/th/id/OIP.auB2eC-W9G77NUgBpAqaEgHaFk?w=276&h=207&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 59, name: "Pineapples (Large)", category: "fruits", minPrice: 1500, maxPrice: 2200, inSeason: true, unit: "piece", image: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&w=600&q=80" },
  { id: 60, name: "Benue Mangoes (Basket)", category: "fruits", minPrice: 3500, maxPrice: 5000, inSeason: false, unit: "basket", image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80" },
  { id: 61, name: "Avocado Pears", category: "fruits", minPrice: 2000, maxPrice: 3200, inSeason: true, unit: "4 pieces", image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80" },
  { id: 62, name: "Bananas (Bunch)", category: "fruits", minPrice: 1500, maxPrice: 2500, inSeason: true, unit: "bunch", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80" },
  { id: 63, name: "Garden Eggs (White)", category: "fruits", minPrice: 1500, maxPrice: 2500, inSeason: true, unit: "painter", image: "https://th.bing.com/th/id/OIP.Xfpd3Z5z9AxPOjvW2gKx7QHaG5?w=209&h=195&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 64, name: "Limes & Lemons (Bag)", category: "fruits", minPrice: 1200, maxPrice: 2000, inSeason: true, unit: "pack", image: "https://th.bing.com/th/id/OIP.pHxv2bN8g-feV8qNRbMBsgHaHa?w=187&h=187&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 65, name: "Guava (Fresh)", category: "fruits", minPrice: 1000, maxPrice: 1800, inSeason: false, unit: "pack", image: "https://tse2.mm.bing.net/th/id/OIP.HxeWEgIKUPV-AnTVQzzyOQHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" },

  // Spices & Oils (15) - NO SEASON BADGE
  { id: 66, name: "Red Palm Oil (5 Litres)", category: "spices", minPrice: 7500, maxPrice: 8500, inSeason: null, unit: "5L jar", image: "https://tse4.mm.bing.net/th/id/OIP.lKB9fG0_DHoHbNv4aFx3LQHaE9?r=0&pid=ImgDet&w=184&h=123&c=7&dpr=1.3&o=7&rm=3" },
  { id: 67, name: "Vegetable Oil (5 Litres)", category: "spices", minPrice: 9500, maxPrice: 11000, inSeason: null, unit: "5L jar", image: "https://th.bing.com/th/id/OIP.RQSRWUp5UJR_JXyFswcqAQHaHa?w=191&h=191&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 68, name: "Locust Beans (Iru / Dawadawa)", category: "spices", minPrice: 1000, maxPrice: 1500, inSeason: null, unit: "wrap", image: "https://th.bing.com/th/id/OIP.sDzcFLJXKnLY6R01x2dypAHaHa?w=186&h=186&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 69, name: "Ground Ogbono Seeds", category: "spices", minPrice: 4500, maxPrice: 5800, inSeason: null, unit: "painter", image: "https://th.bing.com/th/id/OIP.rTGRP8o_yDECOcPBfJfE0wHaHa?w=196&h=195&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 70, name: "Egusi Seeds (Melon)", category: "spices", minPrice: 4000, maxPrice: 5200, inSeason: null, unit: "painter", image: "https://tse4.mm.bing.net/th/id/OIP.VbPiUcVsfiLHg7ECLqLASQHaHa?r=0&pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3" },
  { id: 71, name: "Tiger Curry Powder & Thyme (Pack)", category: "spices", minPrice: 800, maxPrice: 1200, inSeason: null, unit: "pack", image: "https://th.bing.com/th/id/OIP.H3UUukcVzfHDAJGvCf3A1gHaF_?w=215&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 72, name: "Maggi / Knorr Seasoning Cubes", category: "spices", minPrice: 1200, maxPrice: 1600, inSeason: null, unit: "packet", image: "https://th.bing.com/th/id/OIP.9MHSt7R8yL2fB8LPVjOFzAHaHa?w=168&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 73, name: "Dry Pepper (Cameroon Pepper)", category: "spices", minPrice: 2000, maxPrice: 3000, inSeason: null, unit: "painter", image: "https://th.bing.com/th/id/OIP.dCYL1tIF2cz3hp_t4xo2YQAAAA?w=214&h=214&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 74, name: "Suya Pepper Mix (Yaji)", category: "spices", minPrice: 1500, maxPrice: 2200, inSeason: null, unit: "pack", image: "https://tse4.mm.bing.net/th/id/OIP.OJmrH1nmSDnBBCePlJSDRwHaHa?r=0&pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3" },
  { id: 75, name: "Mr Chef Salt (1kg)", category: "spices", minPrice: 400, maxPrice: 600, inSeason: null, unit: "pack", image: "https://th.bing.com/th/id/OIP.ot6nzf2Yts23HS9mhieLRgHaHa?w=177&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 76, name: "Ehuru (African Nutmeg)", category: "spices", minPrice: 1000, maxPrice: 1500, inSeason: null, unit: "cup", image: "https://th.bing.com/th/id/OIP.7PlwSuoQEi4_Q1zq3nJ-hwHaHa?w=187&h=187&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 77, name: "Uda Pods (Negro Pepper)", category: "spices", minPrice: 800, maxPrice: 1200, inSeason: null, unit: "pack", image: "https://th.bing.com/th/id/OIP.zvPs1OsoAahukwekJWkoMwHaEv?w=274&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 78, name: "Uziza Seeds (Dry)", category: "spices", minPrice: 1200, maxPrice: 1800, inSeason: null, unit: "cup", image: "https://th.bing.com/th/id/OIP.yn22QZ4KxhGMYBhAA6h-8gHaGV?w=242&h=207&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 79, name: "Ground Nutmeg", category: "spices", minPrice: 600, maxPrice: 1000, inSeason: null, unit: "bottle", image: "https://th.bing.com/th/id/OIP.TRfgDR1j0Vqrix3EOtrvrQHaHa?w=184&h=185&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 80, name: "Sesame Seed Oil", category: "spices", minPrice: 3500, maxPrice: 5000, inSeason: null, unit: "bottle", image: "https://tse4.mm.bing.net/th/id/OIP.QGWSCXMp4ijerwCZMR8JsgHaHa?r=0&pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3" },

  // Beverages (10) - NO SEASON BADGE
  { id: 81, name: "Bournvita / Milo (500g Refill)", category: "beverages", minPrice: 2800, maxPrice: 3400, inSeason: null, unit: "pack", image: "https://th.bing.com/th/id/OIP.A09zBbqF6NusAzcSqCKthAHaHa?w=179&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 82, name: "Peak Full Cream Milk (Powder)", category: "beverages", minPrice: 3200, maxPrice: 3800, inSeason: null, unit: "pack", image: "https://th.bing.com/th/id/OIP.PZfOJM-B5YOi1AcSxYxWDAAAAA?w=146&h=193&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 83, name: "Lipton Yellow Label Tea Bags", category: "beverages", minPrice: 1000, maxPrice: 1400, inSeason: null, unit: "box", image: "https://th.bing.com/th/id/OIP.jYheJ5UYNiYHCE3qj4ju9wHaHa?w=177&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 84, name: "Granulated Sugar (1kg)", category: "beverages", minPrice: 1800, maxPrice: 2300, inSeason: null, unit: "pack", image: "https://tse2.mm.bing.net/th/id/OIP.TbYW2sbsOAOIXYeNemPNlgHaHa?r=0&pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3" },
  { id: 85, name: "Nescafé Classic Coffee", category: "beverages", minPrice: 2500, maxPrice: 3200, inSeason: null, unit: "jar", image: "https://th.bing.com/th/id/OIF.0mdB1uJlU8Sne8iGfF05gw?w=210&h=176&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 86, name: "Zobo Leaves (Hibiscus Dry)", category: "beverages", minPrice: 1500, maxPrice: 2200, inSeason: null, unit: "painter", image: "https://th.bing.com/th/id/OIP.s4VlA4IXL15rHAC9d9-HCAHaFX?w=254&h=183&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 87, name: "Kunu / Millet Drink Spice Mix", category: "beverages", minPrice: 1000, maxPrice: 1500, inSeason: null, unit: "pack", image: "https://tse3.mm.bing.net/th/id/OIP.8xv1l46vz45eku67TOsEpgHaHa?r=0&pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3" },
  { id: 88, name: "Green Tea Organic Bags", category: "beverages", minPrice: 1800, maxPrice: 2500, inSeason: null, unit: "box", image: "https://th.bing.com/th/id/OIP.PMs6E0l8lJNF3g4d9fejcwHaHa?w=179&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 89, name: "Peak Evaporated Milk (Tin Cans)", category: "beverages", minPrice: 600, maxPrice: 850, inSeason: null, unit: "can", image: "https://tse1.mm.bing.net/th/id/OIP.Ue1c6Nnl75iGQiKjza7IGgHaGp?r=0&pid=ImgDet&w=184&h=165&c=7&dpr=1.3&o=7&rm=3" },
  { id: 90, name: "Checkers Custard Powder (Vanilla 2kg)", category: "beverages", minPrice: 3000, maxPrice: 3800, inSeason: null, unit: "bucket", image: "https://tse2.mm.bing.net/th/id/OIP.a4aqTi34_Yf8dRkgW31sAQHaHa?r=0&pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3" },

  // Home Essentials (10) - NO SEASON BADGE
  { id: 91, name: "Viva Washing Soap Bar (Pack)", category: "home-essentials", minPrice: 1500, maxPrice: 2200, inSeason: null, unit: "pack", image: "https://th.bing.com/th/id/OIP.cMDAIhcBjYMWKVRW_ESKfgAAAA?w=192&h=191&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 92, name: "Sunlight Detergent Powder (2kg)", category: "home-essentials", minPrice: 2800, maxPrice: 3500, inSeason: null, unit: "pack", image: "https://th.bing.com/th/id/OIP.e0YgTFLErdy6S_J9yjnv-AHaHa?w=206&h=206&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 93, name: "Good Mama Dishwashing Liquid (1L)", category: "home-essentials", minPrice: 1200, maxPrice: 1800, inSeason: null, unit: "bottle", image: "https://tse1.mm.bing.net/th/id/OIP.9LZMsd_EQZ8zgtu2jqCS6AHaHa?r=0&pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3" },
  { id: 94, name: "Scouring Sponges (Pack of 5)", category: "home-essentials", minPrice: 600, maxPrice: 1000, inSeason: null, unit: "pack", image: "https://th.bing.com/th/id/OIP.05D7Fx2en0FtuoaT9oBGgwHaFP?w=259&h=183&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 95, name: "Disinfectant Liquid (Dettol)", category: "home-essentials", minPrice: 2500, maxPrice: 3200, inSeason: null, unit: "bottle", image: "https://th.bing.com/th/id/OIP.nixYqfLedC9LGdyefQvajQHaES?w=328&h=190&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 96, name: "Kitchen Towels", category: "home-essentials", minPrice: 1500, maxPrice: 2200, inSeason: null, unit: "pack", image: "https://th.bing.com/th/id/OIF.sKJ7hypPECyeWyRfBNet1Q?w=180&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 97, name: "Insecticide Spray (Mortein)", category: "home-essentials", minPrice: 2200, maxPrice: 2800, inSeason: null, unit: "can", image: "https://th.bing.com/th?id=OIF.c%2bxZd0YgWxlwlphZxc5UpA&w=179&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 98, name: "Bleach Liquid (Hypo 1L)", category: "home-essentials", minPrice: 900, maxPrice: 1300, inSeason: null, unit: "bottle", image: "https://th.bing.com/th/id/OIP.6d1RiQQgvbnnNGCObmuvNAHaHa?w=212&h=212&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 99, name: "Matches Box (Bundle)", category: "home-essentials", minPrice: 500, maxPrice: 800, inSeason: null, unit: "bundle", image: "https://th.bing.com/th/id/OIP.lqTKqOcrBn_Musr6PZeAJAHaE8?w=283&h=189&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
  { id: 100, name: "Aluminum Foil Roll", category: "home-essentials", minPrice: 1800, maxPrice: 2400, inSeason: null, unit: "roll", image: "https://th.bing.com/th/id/OIP.UJyuh7HvZ7QMIHihehOnGgHaFj?w=253&h=191&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
];

const categories = [
  { id: "all", name: "All Items", icon: "🛒" },
  { id: "vegetables", name: "Vegetables", icon: "🥬" },
  { id: "grains-swallow", name: "Grains & Swallow", icon: "🍲" },
  { id: "protein-seafoods", name: "Proteins & Seafood", icon: "🐟" },
  { id: "tubers", name: "Tubers & Roots", icon: "🥔" },
  { id: "fruits", name: "Fruits", icon: "🍉" },
  { id: "spices", name: "Spices & Oils", icon: "🌶️" },
  { id: "beverages", name: "Beverages", icon: "☕" },
  { id: "home-essentials", name: "Home Essentials", icon: "🧼" },
];

const locations = ["Abuja", "Niger State"];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("Abuja");
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [favorites, setFavorites] = useState({});

  // Sync cart count from localStorage
  useEffect(() => {
    const updateCount = () => {
      const stored = localStorage.getItem("jobol_cart");

      if (stored) {
        try {
          const items = JSON.parse(stored);
          setCartCount(items.length);
        } catch (e) {
          console.error(e);
        }
      } else {
        setCartCount(0);
      }
    };

    updateCount();

    window.addEventListener("storage", updateCount);

    return () => window.removeEventListener("storage", updateCount);
  }, []);

  // Save to localStorage WITHOUT redirecting
  const handleAddToCart = (product) => {
    let existingCart = [];

    try {
      existingCart = JSON.parse(localStorage.getItem("jobol_cart")) || [];
    } catch (error) {
      console.error("Could not read cart:", error);
    }

    const index = existingCart.findIndex(
      (item) => item.id === product.id
    );

    if (index > -1) {
      existingCart[index].quantity =
        (existingCart[index].quantity || 1) + 1;
    } else {
      existingCart.push({
        id: product.id,
        name: product.name,
        unitPrice: "",
        quantity: 1,
        unit: product.unit || "basket",
        image: product.image,
      });
    }

    localStorage.setItem("jobol_cart", JSON.stringify(existingCart));

    setCartCount(existingCart.length);

    alert(`"${product.name}" added to your cart!`);
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main
      className="min-h-screen pb-28 relative bg-cover bg-center bg-fixed text-slate-800"
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundImage: `url('/JIS.png')`,
      }}
    >
      <div className="absolute inset-0 bg-white/74 backdrop-blur-[2px] pointer-events-none" />

      {/* Floating Fixed Cart Icon */}
      <div className="fixed right-4 sm:right-8 md:right-22 top-[130px] md:top-[120px] z-50">
        <Link
          href="/cart"
          className="relative flex items-center justify-center w-10 h-10 md:w-14 md:h-14 bg-blue-600 hover:bg-red-600 text-white rounded-full shadow-2xl transition-all transform hover:scale-110"
          aria-label="View Cart"
        >
          <AiOutlineShoppingCart className="text-2xl" />

          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[11px] font-extrabold text-white ring-2 ring-white">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </Link>
      </div>

      {/* Responsive Floating WhatsApp Button */}
      <a
        href="https://wa.me/2348123377017?text=Hello%21%20How%20can%20we%20help%20you%20today%3F"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        title="Chat with us on WhatsApp"
        className="fixed bottom-19 right-4 sm:bottom-6 sm:right-6 md:right-8 z-50 flex h-9 w-9 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-[#128C7E] focus:outline-none focus:ring-4 focus:ring-green-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="currentColor"
          className="h-7 w-7 sm:h-8 sm:w-8"
          aria-hidden="true"
        >
          <path d="M16.04 2.003C8.32 2.003 2.04 8.28 2.037 16c-.001 2.466.65 4.875 1.887 6.995L2 30l7.174-1.881a13.96 13.96 0 0 0 6.86 1.793h.006c7.718 0 13.997-6.278 14-13.998a13.91 13.91 0 0 0-4.097-9.899 13.91 13.91 0 0 0-9.903-4.012Zm-.008 25.54h-.005a11.6 11.6 0 0 1-5.907-1.614l-.424-.252-4.258 1.117 1.136-4.152-.276-.426a11.59 11.59 0 0 1-1.78-6.216c.003-6.356 5.176-11.526 11.528-11.526a11.46 11.46 0 0 1 8.16 3.383 11.46 11.46 0 0 1 3.376 8.163c-.003 6.355-5.175 11.523-11.55 11.523Zm6.33-8.634c-.346-.173-2.05-1.012-2.368-1.127-.318-.116-.55-.173-.78.173-.232.346-.896 1.127-1.1 1.358-.202.231-.404.26-.751.087-.346-.173-1.463-.539-2.787-1.719-1.03-.92-1.727-2.057-1.93-2.404-.202-.346-.021-.533.152-.705.156-.156.346-.404.52-.607.173-.202.23-.346.346-.577.116-.231.058-.433-.029-.606-.087-.173-.78-1.878-1.07-2.57-.282-.674-.568-.582-.78-.592-.202-.01-.433-.012-.665-.012-.23 0-.606.087-.925.433-.318.346-1.214 1.185-1.214 2.89s1.243 3.352 1.416 3.583c.173.231 2.447 3.737 5.927 5.24.828.358 1.475.572 1.98.732.831.265 1.588.228 2.186.138.667-.1 2.05-.839 2.34-1.647.289-.81.289-1.503.202-1.647-.087-.144-.318-.231-.665-.404Z" />
        </svg>
      </a>

      <div className="relative z-10">
        {/* Top Sticky Header */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Brand Logo & Location Modal Trigger */}
              <div className="flex items-center justify-between w-full md:w-auto gap-4">
                <Link href="/" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-white shadow-xs borde borde-gray-100 flex items-center justify-center shrink-0">
                    <img
                      src="/JIS.png"
                      alt="JIS Logo"
                      className="w-2 h-2 object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>

                  <span className="text-xl font-arial font-black tracking-tight text-blue-900">
                   NAIJA<span className="text-red-600">MARKET</span>
                  </span>
                </Link>

                <button
                  onClick={() => setIsLocationModalOpen(true)}
                  className="flex md:hidden items-center gap-0.2 md:gap-1.5 py-1. px-3 md:px-3 md:py-1.5 bg-blue-50 border-3 border-blue-200 rounded-full text-[8px] md:text-xs font-bold text-blue-900"
                >
                  <AiOutlineEnvironment className="text-red-600 text-[10px] md:text-sm" />
                  <span>{selectedLocation}</span>
                </button>
              </div>

              {/* Fast Search Input */}
              <div className="w-full md:max-w-xl relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-blue-600">
                  <AiOutlineSearch className="text-xl" />
                </div>

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search 100+ items: tomatoes, garri, stockfish, palm oil, yam..."
                  className="w-full pl-11 pr-9 py-1.5 md:py-3.5 bg-blue-50/50 border border-blue-200 rounded-2xl text-sm font-medium text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all shadow-inner"
                />

                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-red-600"
                    aria-label="Clear search"
                  >
                    <AiOutlineClose className="text-lg font-bold" />
                  </button>
                )}
              </div>

              {/* Desktop Location Button */}
              <div className="hidden md:flex items-center gap-4">
                <button
                  onClick={() => setIsLocationModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-2xl text-xs font-bold text-blue-900 transition-colors shadow-xs"
                >
                  <AiOutlineEnvironment className="text-red-600 text-base" />
                  <span>{selectedLocation}</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-red-900 text-white p-6 sm:p-12 shadow-2xl">
            <div className="relative z-10 max-w-xl space-y-4">
              <span className="inline-block px-3.5 py-1 md:py-1.5 bg-red-600 text-white text-xs font-extrabold rounded-full uppercase tracking-wider shadow-md">
                Fresh Nigerian Foodstuff Hub
              </span>

              <h1 className="text-3xl sm:text-5xl font-black italic tracking-tight leading-tight text-white/70">
                Delivered Directly to You!
              </h1>

              <p className="text-blue-100 text-sm sm:text-base font-medium">
                Verified price ranges for local markets across {selectedLocation}.
              </p>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-10">
          <div className="flex items-center justify-between mb-6 gap-2">
            <h2 className="text-xl sm:text-2xl italic font-black text-gray-900 tracking-tight">
              Shop Categories
            </h2>

            {selectedCategory !== "all" && (
              <button
                onClick={() => setSelectedCategory("all")}
                className="text-xs font-bold text-red-600 hover:underline"
              >
                Clear Category Filter
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                  selectedCategory === cat.id
                    ? "bg-blue-600 text-white border-blue-600 shadow-md font-bold"
                    : "bg-white text-gray-800 border-gray-200 hover:border-blue-400"
                }`}
              >
                <span className="text-2xl mb-1">{cat.icon}</span>
                <span className="text-[11px] text-center leading-tight font-bold">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Products Grid */}
        <section className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-10">
          <div className="flex items-center justify-between mb-6 gap-2">
            <h2 className="text-base sm:text-2xl font-black italic text-gray-900 tracking-tight">
              Foodstuff Marketplace ({filteredProducts.length} items)
            </h2>

            <span className="shrink-0 text-[10px] sm:text-xs font-bold text-blue-900 bg-blue-50 px-2 sm:px-3 py-1.5 rounded-full border border-blue-100">
              {selectedLocation}
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm space-y-3">
              <p className="text-gray-600 text-sm font-bold">
                No foodstuffs matched your search query.
              </p>

              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            /*
              MOBILE: 3 columns
              SMALL SCREENS: 2 columns
              MEDIUM SCREENS: 3 columns
              DESKTOP: 4 columns
            */
            <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group min-w-0 bg-white rounded-xl sm:rounded-3xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  {/* Product Image */}
                  <div className="relative h-24 sm:h-44 w-full bg-gray-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Season Indicator Badge */}
                    {product.inSeason !== null && (
                      <div className="absolute top-1 left-1 sm:top-3 sm:left-3 z-10">
                        {product.inSeason ? (
                          <span className="px-1 py-0.5 sm:px-2.5 sm:py-1 bg-green-600 text-white text-[7px] sm:text-[10px] font-extrabold rounded-full shadow-md">
                            In Season
                          </span>
                        ) : (
                          <span className="px-1 py-0.5 sm:px-2.5 sm:py-1 bg-red-600 text-white text-[7px] sm:text-[10px] font-extrabold rounded-full shadow-md">
                            Off Season
                          </span>
                        )}
                      </div>
                    )}

                    {/* Favorite Button */}
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute top-1 right-1 sm:top-3 sm:right-3 z-10 p-1 sm:p-2 rounded-full bg-white/90 text-gray-700 hover:bg-white shadow-md"
                      aria-label={`Save ${product.name} to favorites`}
                    >
                      {favorites[product.id] ? (
                        <AiFillHeart className="text-red-600 text-xs sm:text-base" />
                      ) : (
                        <AiOutlineHeart className="text-gray-700 text-xs sm:text-base" />
                      )}
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="p-2 sm:p-5 flex flex-col flex-grow justify-between space-y-2 sm:space-y-4">
                    <div>
                      <span className="text-[7px] sm:text-[10px] font-black uppercase text-blue-600 tracking-wide sm:tracking-wider line-clamp-1">
                        {categories.find(
                          (c) => c.id === product.category
                        )?.name || "Foodstuff"}
                      </span>

                      <h3 className="text-[10px] sm:text-sm font-bold text-gray-900 mt-1 line-clamp-2 break-words">
                        {product.name}
                      </h3>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2 sm:pt-3 border-t border-gray-100">
                      <div className="min-w-0">
                        <span className="text-[9px] sm:text-xs font-black text-gray-900 block leading-tight break-words">
                          ₦{product.minPrice.toLocaleString()} - ₦
                          {product.maxPrice.toLocaleString()}
                        </span>

                        <span className="text-[8px] sm:text-[10px] text-gray-400 block mt-1">
                          per {product.unit}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full sm:w-auto flex items-center justify-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 bg-blue-600 hover:bg-red-600 text-white rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold transition-colors shadow-sm"
                      >
                        <AiOutlinePlus className="text-[10px] sm:text-xs" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Location Selection Modal */}
        {isLocationModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[2px] px-4">
            <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <AiOutlineEnvironment className="text-red-600 text-2xl" />
                  <h3 className="text-base font-black text-gray-900">
                    Select Location
                  </h3>
                </div>

                <button
                  onClick={() => setIsLocationModalOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                  aria-label="Close location selector"
                >
                  <AiOutlineClose className="text-lg font-bold" />
                </button>
              </div>

              <div className="space-y-2 mb-4">
                {locations.map((loc) => {
                  const isSelected = selectedLocation === loc;

                  return (
                    <button
                      key={loc}
                      onClick={() => {
                        setSelectedLocation(loc);
                        setIsLocationModalOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-xs font-bold transition-all ${
                        isSelected
                          ? "bg-blue-50 border-blue-600 text-blue-900"
                          : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span>{loc}</span>

                      {isSelected && (
                        <AiOutlineCheck className="text-blue-600 text-base" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}