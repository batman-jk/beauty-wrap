export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: 
    | "Necklaces"
    | "Earrings"
    | "Rings"
    | "Bracelets"
    | "Bangles"
    | "Anklets"
    | "Bridal Sets"
    | "Gifting";
  price: number;
  originalPrice: number;
  discountPercent?: number;
  material: string;
  purity: string;
  rating: number;
  reviewsCount: number;
  stock: number;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
  occasion: "Everyday" | "Cocktail & Party" | "Bridal & Wedding" | "Festive" | "Workwear";
  images: string[];
  description: string;
  details: {
    dimensions?: string;
    weight?: string;
    plating?: string;
    gemstone?: string;
    closure?: string;
  };
  sizes?: string[];
  tags: string[];
}

export const CATEGORIES = [
  "All",
  "Necklaces",
  "Earrings",
  "Rings",
  "Bracelets",
  "Bangles",
  "Anklets",
  "Bridal Sets",
  "Gifting",
] as const;

export const MATERIALS = [
  "18K Gold Vermeil",
  "Rose Gold Plated",
  "925 Sterling Silver",
  "Freshwater Pearls",
  "Lab Diamond & Moissanite",
  "22K Gold Dipped Brass",
] as const;

export const OCCASIONS = [
  "Everyday",
  "Cocktail & Party",
  "Bridal & Wedding",
  "Festive",
  "Workwear",
] as const;

export const PRODUCTS: Product[] = [
  {
    id: "hbw-01",
    slug: "celestial-solstice-layered-pendant",
    name: "Celestial Solstice Layered Pendant",
    subtitle: "Triple-strand layered collar with hammered coin and sunburst charm",
    category: "Necklaces",
    price: 3499,
    originalPrice: 4299,
    discountPercent: 19,
    material: "18K Gold Vermeil",
    purity: "18K Gold over 925 Sterling Silver",
    rating: 4.9,
    reviewsCount: 142,
    stock: 14,
    isBestseller: true,
    isFeatured: true,
    occasion: "Everyday",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611591475155-426462615521?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Bathed in the warm aura of golden hour, the Celestial Solstice pendant combines delicate fine chains with artisanal brushed textures. Designed to sit effortlessly against collarbones, capturing the gentle gleam of sunlight.",
    details: {
      dimensions: "Chain lengths: 16\", 18\", 20\" with 2\" extender",
      weight: "8.4 grams",
      plating: "2.5 Micron 18 Karat Yellow Gold",
      closure: "Secure lobster clasp with logo tag",
    },
    sizes: ["Adjustable 16\" - 20\""],
    tags: ["Layered", "Gold", "Necklace", "Bestseller"]
  },
  {
    id: "hbw-02",
    slug: "aurelia-baroque-pearl-drop-earrings",
    name: "Aurelia Baroque Pearl Drops",
    subtitle: "Organic freshwater baroque pearls hand-set in sculptured molten bronze",
    category: "Earrings",
    price: 2899,
    originalPrice: 3499,
    discountPercent: 17,
    material: "Freshwater Pearls",
    purity: "Natural Cultured Pearl & 18K Gold Finish",
    rating: 4.8,
    reviewsCount: 89,
    stock: 9,
    isBestseller: true,
    isFeatured: true,
    occasion: "Cocktail & Party",
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Each Aurelia drop features unique, organic baroque freshwater pearls selected for their iridescent luster and fluid curves. Finished with hand-cast bronze huggies that feel weightless all night.",
    details: {
      dimensions: "Drop length: 42mm, Pearl size: ~14mm",
      weight: "5.2 grams per earring",
      plating: "Hypoallergenic 18K Gold coat",
      gemstone: "Grade AAA Natural Baroque Pearl",
      closure: "Comfort click-latch hoop",
    },
    sizes: ["One Size"],
    tags: ["Pearls", "Earrings", "Cocktail", "Handmade"]
  },
  {
    id: "hbw-03",
    slug: "solaris-hammered-dome-signet-ring",
    name: "Solaris Hammered Dome Ring",
    subtitle: "Bold statement dome ring with satin brushed finish and pavé moissanite line",
    category: "Rings",
    price: 2199,
    originalPrice: 2799,
    discountPercent: 21,
    material: "18K Gold Vermeil",
    purity: "Solid 925 Silver with Thick Gold Vermeil",
    rating: 4.9,
    reviewsCount: 112,
    stock: 18,
    isBestseller: true,
    isNewArrival: false,
    occasion: "Everyday",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "A testament to subtle power and tactile allure. The Solaris ring sits softly contoured on the finger, radiating a mellow sunlit glow that elevates both structured blazers and slip dresses.",
    details: {
      dimensions: "Band width: 4mm tapering to 11mm dome",
      weight: "6.8 grams",
      plating: "2.5 Micron 18K Yellow Gold",
      gemstone: "Micro-pavé Lab Moissanite accents",
    },
    sizes: ["US 6", "US 7", "US 8", "US 9"],
    tags: ["Ring", "Statement", "Gold", "Dome"]
  },
  {
    id: "hbw-04",
    slug: "elysian-twined-cuff-bracelet",
    name: "Elysian Twined Rope Cuff",
    subtitle: "Intertwined twisted cable cuff with polished ball finials",
    category: "Bracelets",
    price: 2699,
    originalPrice: 3299,
    discountPercent: 18,
    material: "22K Gold Dipped Brass",
    purity: "22K Gold Plated Artisan Brass",
    rating: 4.7,
    reviewsCount: 65,
    stock: 12,
    isNewArrival: true,
    occasion: "Workwear",
    images: [
      "https://images.unsplash.com/photo-1611591475155-426462615521?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Inspired by ancient Mediterranean filigree, this architectural cuff balances structure and comfort. Bendable core allows a bespoke contour around your wrist.",
    details: {
      dimensions: "Interior diameter: 60mm (Flexible fit)",
      weight: "14.2 grams",
      plating: "Anti-tarnish protective lacquer coat",
      closure: "Open cuff style",
    },
    sizes: ["Adjustable Fit"],
    tags: ["Cuff", "Bracelet", "Sculptural", "Gold"]
  },
  {
    id: "hbw-05",
    slug: "noor-kundan-polki-heritage-bridal-set",
    name: "Noor Royal Kundan Polki Choker Set",
    subtitle: "Intricate uncut Polki choker, matching chandelier earrings & maangtikka",
    category: "Bridal Sets",
    price: 12499,
    originalPrice: 15999,
    discountPercent: 22,
    material: "22K Gold Dipped Brass",
    purity: "Handcrafted Jadau Kundan with Meenakari backing",
    rating: 5.0,
    reviewsCount: 78,
    stock: 5,
    isFeatured: true,
    isBestseller: true,
    occasion: "Bridal & Wedding",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "The pinnacle of royal craftsmanship. Featuring hand-set uncut stones with pastel green fluorite drops and reversible rose-gold enameled reverse. Created for the unforgettable bride.",
    details: {
      dimensions: "Choker width: 4.5cm, Earring length: 7.5cm",
      weight: "118 grams total set",
      plating: "22K Gold Antique Micron Finish",
      gemstone: "Polki Glass Stones, Cultured Seed Pearls, Emerald Beads",
      closure: "Adjustable silk dori cord",
    },
    sizes: ["Full Bridal Set (Choker + Earrings + Maangtikka)"],
    tags: ["Bridal", "Wedding", "Polki", "Luxury", "Royal"]
  },
  {
    id: "hbw-06",
    slug: "seraphina-herringbone-liquid-chain",
    name: "Seraphina Liquid Gold Herringbone",
    subtitle: "Silky flat weave chain that moves like molten bronze against the skin",
    category: "Necklaces",
    price: 2499,
    originalPrice: 2999,
    discountPercent: 17,
    material: "18K Gold Vermeil",
    purity: "Thick 18K Gold over Italian 925 Silver",
    rating: 4.9,
    reviewsCount: 198,
    stock: 25,
    isBestseller: true,
    isNewArrival: false,
    occasion: "Everyday",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611591475155-426462615521?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Our signature chain and an essential foundation piece. Crafted with mirror-polished interlocking flat links that lie impeccably flat, reflecting light with continuous fluidity.",
    details: {
      dimensions: "Width: 3.5mm, Length: 16\" + 2\" extension",
      weight: "9.1 grams",
      plating: "Heavy 18K Gold Vermeil",
      closure: "Custom lobster clasp",
    },
    sizes: ["16\" + 2\" Extension", "18\" + 2\" Extension"],
    tags: ["Herringbone", "Necklace", "Liquid Gold", "Everyday"]
  },
  {
    id: "hbw-07",
    slug: "zephyr-delicate-beaded-anklet",
    name: "Zephyr Golden Bead & Pearl Anklet",
    subtitle: "Dainty dual-strand anklet with micro gold flutes and freshwater seed pearls",
    category: "Anklets",
    price: 1899,
    originalPrice: 2299,
    discountPercent: 17,
    material: "Freshwater Pearls",
    purity: "925 Sterling Silver base with 18K Yellow Gold Dip",
    rating: 4.8,
    reviewsCount: 54,
    stock: 16,
    isNewArrival: true,
    occasion: "Everyday",
    images: [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "A sensual touch of luxury for sun-drenched steps. Subtle seed pearls shimmer alongside diamond-cut gold beads, chiming with quiet elegance as you move.",
    details: {
      dimensions: "Length: 9\" with 1.5\" extender",
      weight: "3.4 grams",
      plating: "E-coated waterproof anti-tarnish finish",
      closure: "Spring ring with safety tag",
    },
    sizes: ["Standard 9\" - 10.5\""],
    tags: ["Anklet", "Pearls", "Dainty", "Boho Luxe"]
  },
  {
    id: "hbw-08",
    slug: "padma-heritage-kadas-pair",
    name: "Padma Sculpted Lotus Kadas (Set of 2)",
    subtitle: "Pair of openable temple-carved bangles with lotus motif and ruby cabochons",
    category: "Bangles",
    price: 5499,
    originalPrice: 6999,
    discountPercent: 21,
    material: "22K Gold Dipped Brass",
    purity: "Antique 22K Micro Gold Plating",
    rating: 4.9,
    reviewsCount: 92,
    stock: 8,
    isFeatured: true,
    occasion: "Festive",
    images: [
      "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Honoring traditional Indian temple artistry with modern ergonomic wearability. Detailed with blooming lotus relief work and synthetic pink tourmalines with a screw-hinged clasp.",
    details: {
      dimensions: "Inner diameter: 2.4 / 2.6 / 2.8 options",
      weight: "48 grams (pair)",
      plating: "Matte Antique 22K Gold",
      closure: "Side pin screw hinge",
    },
    sizes: ["Size 2.4 (Small)", "Size 2.6 (Medium)", "Size 2.8 (Large)"],
    tags: ["Bangles", "Kadas", "Festive", "Lotus", "Antique"]
  },
  {
    id: "hbw-09",
    slug: "velvet-keepsake-trousseau-gift-box",
    name: "The Grand Muse Velvet Keepsake Box",
    subtitle: "Curated gift set with Solstice necklace, baroque drops & jewelry travel pouch",
    category: "Gifting",
    price: 6499,
    originalPrice: 8299,
    discountPercent: 22,
    material: "18K Gold Vermeil",
    purity: "18K Gold Vermeil & Natural Baroque Pearls",
    rating: 5.0,
    reviewsCount: 46,
    stock: 11,
    isFeatured: true,
    occasion: "Bridal & Wedding",
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "The ultimate expression of thoughtful luxury. Packaged in a plush fawn-velvet lined keepsake trunk with golden brass hardware, wax seal certificate, and custom handwritten note.",
    details: {
      dimensions: "Box: 18cm x 14cm x 8cm",
      weight: "420 grams total packaging",
      plating: "18K Gold Vermeil Pieces",
      closure: "Brass latch lock",
    },
    sizes: ["Signature Curated Box"],
    tags: ["Gift Box", "Set", "Gifting", "Luxury"]
  },
  {
    id: "hbw-10",
    slug: "lumina-solitaire-bezel-tennis-bracelet",
    name: "Lumina Diamond Tennis Bracelet",
    subtitle: "Continuously articulated bezel-set round cut lab moissanites in rose gold",
    category: "Bracelets",
    price: 4899,
    originalPrice: 5999,
    discountPercent: 18,
    material: "Lab Diamond & Moissanite",
    purity: "Solid 925 Silver bathed in 18K Rose Gold",
    rating: 4.9,
    reviewsCount: 104,
    stock: 15,
    isBestseller: true,
    occasion: "Cocktail & Party",
    images: [
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611591475155-426462615521?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "An understated, modern reinterpretation of the iconic tennis bracelet. Bezel cups secure brilliant VVS-grade lab moissanite gems, offering incredible fire and everyday wearability.",
    details: {
      dimensions: "Length: 7\" (includes 0.5\" removable link)",
      weight: "11.2 grams",
      plating: "18K Rose Gold triple coat",
      gemstone: "2.5mm VVS Lab Moissanites (4.2 Ctw)",
      closure: "Double-safety hidden box clasp",
    },
    sizes: ["6.5 Inch", "7.0 Inch", "7.5 Inch"],
    tags: ["Tennis Bracelet", "Moissanite", "Rose Gold", "Sparkle"]
  },
  {
    id: "hbw-11",
    slug: "isla-sculpted-molten-studs",
    name: "Isla Molten Nugget Studs",
    subtitle: "Organic liquid molten gold drops with subtle textural facets",
    category: "Earrings",
    price: 1699,
    originalPrice: 2099,
    discountPercent: 19,
    material: "18K Gold Vermeil",
    purity: "925 Sterling Silver, 18K Heavy Plating",
    rating: 4.8,
    reviewsCount: 88,
    stock: 30,
    isNewArrival: true,
    occasion: "Everyday",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Subtle, understated elegance. The Isla studs take the organic texture of molten gold and freeze it in time, creating a rich glow that flatters any complexion.",
    details: {
      dimensions: "Diameter: 12mm x 9mm irregular",
      weight: "2.8 grams per pair",
      plating: "18K Yellow Gold Satin Glow",
      closure: "Hypoallergenic push butterfly backs",
    },
    sizes: ["One Size"],
    tags: ["Studs", "Earrings", "Minimalist", "Everyday"]
  },
  {
    id: "hbw-12",
    slug: "calla-intertwined-eternity-band",
    name: "Calla Intertwined Eternity Ring",
    subtitle: "Dual intertwined ribbons of warm bronze gold and pavé crystal sparkle",
    category: "Rings",
    price: 1999,
    originalPrice: 2499,
    discountPercent: 20,
    material: "Lab Diamond & Moissanite",
    purity: "18K Gold over 925 Sterling Silver",
    rating: 4.7,
    reviewsCount: 73,
    stock: 22,
    occasion: "Cocktail & Party",
    images: [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Symbolizing perpetual connection and balance. Two undulating ribbons weave smoothly together to form a comfort-fit band that shines from every angle.",
    details: {
      dimensions: "Band height: 5mm",
      weight: "3.9 grams",
      plating: "18K Warm Champagne Gold",
      gemstone: "Precision micro-pavé stones",
    },
    sizes: ["US 5", "US 6", "US 7", "US 8"],
    tags: ["Ring", "Eternity", "Pave", "Gold"]
  },
  {
    id: "hbw-13",
    slug: "zahra-chandbali-pearl-earrings",
    name: "Zahra Filigree Crescent Chandbalis",
    subtitle: "Regal moon crescent earrings with seed pearl fringes and emerald drops",
    category: "Earrings",
    price: 4299,
    originalPrice: 5199,
    discountPercent: 17,
    material: "22K Gold Dipped Brass",
    purity: "Traditional Jodhpur Filigree with 22K Gold Tone",
    rating: 4.9,
    reviewsCount: 61,
    stock: 10,
    isFeatured: true,
    occasion: "Festive",
    images: [
      "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Evoking timeless Mughal romanticism. The Zahra Chandbalis frame the face with delicate cascading pearl droplets and hand-pierced crescent filigree.",
    details: {
      dimensions: "Length: 6.5cm, Width: 4.2cm",
      weight: "16 grams per pair",
      plating: "Antique Micron Gold Dip",
      gemstone: "Hydro emerald drops and cultured rice pearls",
      closure: "Post with silicone disc support",
    },
    sizes: ["One Size"],
    tags: ["Chandbali", "Earrings", "Festive", "Pearls"]
  },
  {
    id: "hbw-14",
    slug: "marina-paperclip-chain-choker",
    name: "Marina Bold Paperclip Link Choker",
    subtitle: "Elongated rectangular links polished to a high mirror sheen with toggle bar",
    category: "Necklaces",
    price: 2999,
    originalPrice: 3699,
    discountPercent: 19,
    material: "18K Gold Vermeil",
    purity: "18K Gold Vermeil on Sterling Silver",
    rating: 4.8,
    reviewsCount: 115,
    stock: 19,
    isBestseller: false,
    isNewArrival: true,
    occasion: "Workwear",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611591475155-426462615521?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Clean, geometric, and effortless. Wear it solo as an edgy centerpiece or clip charms onto its substantial links for a personalized talisman necklace.",
    details: {
      dimensions: "Link dimensions: 14mm x 5mm, Length: 17\"",
      weight: "15.4 grams",
      plating: "18K Yellow Gold Heavy Coat",
      closure: "Sculpted T-bar front toggle",
    },
    sizes: ["16 Inch", "18 Inch"],
    tags: ["Paperclip", "Choker", "Modern", "Necklace"]
  },
  {
    id: "hbw-15",
    slug: "amara-stacked-micro-pave-ring",
    name: "Amara Triple Stack Starlight Ring",
    subtitle: "Trio of graduated gold bands conjoined with floating bezel diamond accents",
    category: "Rings",
    price: 2399,
    originalPrice: 2999,
    discountPercent: 20,
    material: "Lab Diamond & Moissanite",
    purity: "18K Gold over 925 Sterling Silver",
    rating: 4.8,
    reviewsCount: 77,
    stock: 17,
    occasion: "Everyday",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "The illusion of a meticulously curated ring stack in one effortlessly comfortable piece. Three slender wires connect underneath for all-day seamless wear.",
    details: {
      dimensions: "Total width: 7mm",
      weight: "4.5 grams",
      plating: "18K Warm Bronze Gold",
      gemstone: "Lab created diamond stimulants",
    },
    sizes: ["US 6", "US 7", "US 8"],
    tags: ["Stack", "Ring", "Minimal", "Gold"]
  },
  {
    id: "hbw-16",
    slug: "siya-evil-eye-charm-anklet",
    name: "Siya Mother-of-Pearl Evil Eye Anklet",
    subtitle: "Protective talisman with hand-carved mother of pearl and turquoise bead",
    category: "Anklets",
    price: 1599,
    originalPrice: 1999,
    discountPercent: 20,
    material: "925 Sterling Silver",
    purity: "925 Solid Silver with 18K Yellow Gold Finish",
    rating: 4.9,
    reviewsCount: 83,
    stock: 21,
    occasion: "Everyday",
    images: [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611591475155-426462615521?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "An ancient amulet reimagined with modern grace. Carved natural mother of pearl shell ward off negative energy while complementing summer sandals and barefoot beach strolls.",
    details: {
      dimensions: "Length: 9.5\" with 1.5\" extender",
      weight: "2.9 grams",
      gemstone: "Natural Mother of Pearl & Turquoise",
      closure: "Lobster claw",
    },
    sizes: ["Adjustable 9.5\" - 11\""],
    tags: ["Anklet", "Evil Eye", "Protection", "Boho"]
  },
  {
    id: "hbw-17",
    slug: "dharani-matte-gold-broad-cuff-bangle",
    name: "Dharani Brushed Sun-Goddess Broad Cuff",
    subtitle: "Wide architectural wrist cuff with organic hammered ridges and warm bronze hue",
    category: "Bangles",
    price: 3899,
    originalPrice: 4799,
    discountPercent: 19,
    material: "22K Gold Dipped Brass",
    purity: "22K Gold Dipped Artisan Brass",
    rating: 4.8,
    reviewsCount: 52,
    stock: 13,
    occasion: "Festive",
    images: [
      "https://images.unsplash.com/photo-1611591475155-426462615521?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "A commanding statement piece that catches and diffuses light softly. Pairs exceptionally well with linen dresses, tailored pant-suits, and silk sarees.",
    details: {
      dimensions: "Width: 32mm, Diameter: 62mm (Adjustable open back)",
      weight: "28 grams",
      plating: "Hand-brushed 22K Gold Matte Finish",
      closure: "Slip-on cuff",
    },
    sizes: ["M/L Flexible Cuff"],
    tags: ["Bangle", "Cuff", "Sculptural", "Statement"]
  },
  {
    id: "hbw-18",
    slug: "meera-emerald-teardrop-bridal-necklace",
    name: "Meera Emerald Teardrop Bridal Collet",
    subtitle: "Cascading pear-cut emerald doublet stones surrounded by champagne polki florets",
    category: "Bridal Sets",
    price: 8999,
    originalPrice: 11499,
    discountPercent: 22,
    material: "22K Gold Dipped Brass",
    purity: "Heritage Kundan with Hand-enameled reverse",
    rating: 5.0,
    reviewsCount: 63,
    stock: 7,
    isFeatured: true,
    occasion: "Bridal & Wedding",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Designed for the modern royal bride. Emerald green stones replicate the depth of rare Colombian emeralds, complemented by pearl cluster drops.",
    details: {
      dimensions: "Necklace width: 3.5cm, Drop length: 5cm",
      weight: "86 grams",
      plating: "22K Gold Antique Polish",
      closure: "Hand-braided golden zari thread",
    },
    sizes: ["Includes Necklace & Statement Earrings"],
    tags: ["Bridal", "Emerald", "Wedding", "Kundan"]
  },
  {
    id: "hbw-19",
    slug: "rosa-rose-gold-vermeil-chubby-hoops",
    name: "Rosa Sculpted Chubby Huggie Hoops",
    subtitle: "Tubular hollow-cast teardrop huggie hoops in radiant rose gold",
    category: "Earrings",
    price: 2299,
    originalPrice: 2899,
    discountPercent: 21,
    material: "Rose Gold Plated",
    purity: "Solid 925 Silver with 18K Rose Gold Plating",
    rating: 4.9,
    reviewsCount: 137,
    stock: 24,
    isBestseller: true,
    occasion: "Everyday",
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Our bestselling everyday hoop. Ultra-lightweight hollow construction means zero earlobe drag, while the rose bronze hue imparts warmth to every outfit.",
    details: {
      dimensions: "Diameter: 22mm, Thickness: 6mm",
      weight: "3.6 grams per hoop",
      plating: "18K Rose Gold electroplated",
      closure: "Seamless snap latch",
    },
    sizes: ["One Size"],
    tags: ["Hoops", "Earrings", "Rose Gold", "Bestseller"]
  },
  {
    id: "hbw-20",
    slug: "artemis-moonstone-halo-ring",
    name: "Artemis Rainbow Moonstone Halo Ring",
    subtitle: "Iridescent oval cabochon rainbow moonstone nestled in a crown of pavé gems",
    category: "Rings",
    price: 2599,
    originalPrice: 3199,
    discountPercent: 19,
    material: "925 Sterling Silver",
    purity: "925 Sterling Silver with Rhodium & 18K Gold Plated accents",
    rating: 4.8,
    reviewsCount: 59,
    stock: 14,
    occasion: "Everyday",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Capturing ethereal moonlit blue flashes. The natural rainbow moonstone is revered as a stone of inner intuition and feminine grace.",
    details: {
      dimensions: "Center stone: 8mm x 6mm oval",
      weight: "4.1 grams",
      gemstone: "Natural Sri Lankan Rainbow Moonstone",
    },
    sizes: ["US 6", "US 7", "US 8"],
    tags: ["Moonstone", "Ring", "Gemstone", "Ethereal"]
  },
  {
    id: "hbw-21",
    slug: "talia-snake-bone-double-chain-bracelet",
    name: "Talia Sleek Snake Bone Link Bracelet",
    subtitle: "Double rounded snake chain with centered bezel crystal slide charm",
    category: "Bracelets",
    price: 2199,
    originalPrice: 2699,
    discountPercent: 19,
    material: "18K Gold Vermeil",
    purity: "18K Gold over 925 Sterling Silver",
    rating: 4.7,
    reviewsCount: 44,
    stock: 18,
    occasion: "Workwear",
    images: [
      "https://images.unsplash.com/photo-1611591475155-426462615521?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Glides against the skin with effortless, mirror-like gloss. Ideal for stacking with wristwatches or paired alone with tailored cuffs.",
    details: {
      dimensions: "Length: 6.5\" + 1.5\" extender",
      weight: "7.2 grams",
      plating: "18K Champagne Gold Vermeil",
      closure: "Lobster clasp with branded tag",
    },
    sizes: ["Standard 6.5\" - 8\""],
    tags: ["Snake Chain", "Bracelet", "Minimalist", "Gold"]
  },
  {
    id: "hbw-22",
    slug: "florence-keshi-pearl-collar-necklace",
    name: "Florence Keshi Pearl Choker Collar",
    subtitle: "Organic lustrous Japanese keshi pearls with molten bronze gold spacers",
    category: "Necklaces",
    price: 3999,
    originalPrice: 4999,
    discountPercent: 20,
    material: "Freshwater Pearls",
    purity: "Natural Keshi Pearls & 18K Solid Gold Beads",
    rating: 4.9,
    reviewsCount: 71,
    stock: 8,
    isFeatured: true,
    occasion: "Cocktail & Party",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "No two keshi pearls are identical. Their organic, petal-like shapes catch candlelight with unmatched warmth, creating an unforgettable statement for evenings.",
    details: {
      dimensions: "Length: 15\" with 3\" extension chain",
      weight: "18.5 grams",
      gemstone: "Natural High-Luster Keshi Pearls",
      closure: "18K Gold vermeil spring clasp",
    },
    sizes: ["15\" + 3\" Extender"],
    tags: ["Pearls", "Keshi", "Collar", "Necklace"]
  },
  {
    id: "hbw-23",
    slug: "eternal-radiance-anniversary-gift-set",
    name: "Eternal Radiance Keepsake Trio",
    subtitle: "Curated gift set featuring matching solitaire necklace, earrings, and eternity band",
    category: "Gifting",
    price: 5999,
    originalPrice: 7799,
    discountPercent: 23,
    material: "Lab Diamond & Moissanite",
    purity: "18K Gold Vermeil with VVS Lab Moissanites",
    rating: 5.0,
    reviewsCount: 38,
    stock: 9,
    isFeatured: true,
    occasion: "Bridal & Wedding",
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "The complete romantic gift. Arrives nestled in our signature fawn-velvet presentation box with embossed golden ribbon and custom luxury jewelry care kit.",
    details: {
      dimensions: "Necklace 16-18\", Earrings 6mm studs, Ring size adjustable",
      weight: "16.8 grams (total jewelry)",
      plating: "18K Yellow Gold Vermeil",
    },
    sizes: ["Trio Presentation Set"],
    tags: ["Gift", "Set", "Moissanite", "Anniversary"]
  },
  {
    id: "hbw-24",
    slug: "sahara-hammered-coin-anklet",
    name: "Sahara Sunburst Hammered Coin Anklet",
    subtitle: "Dainty shimmering link chain with dangling miniature disc charms",
    category: "Anklets",
    price: 1799,
    originalPrice: 2199,
    discountPercent: 18,
    material: "18K Gold Vermeil",
    purity: "925 Sterling Silver with 18K Gold Dip",
    rating: 4.8,
    reviewsCount: 47,
    stock: 20,
    occasion: "Everyday",
    images: [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611591475155-426462615521?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Seven miniature coins chime with quiet rhythm with every step. Each coin is gently hammered by hand to reflect flickering light like gold dust.",
    details: {
      dimensions: "Length: 9.0\" + 1.5\" extender",
      weight: "3.8 grams",
      plating: "Water-resistant 18K Gold Plating",
      closure: "Lobster clasp with stamped tag",
    },
    sizes: ["Standard 9.0\" - 10.5\""],
    tags: ["Anklet", "Coin", "Boho Luxe", "Summer"]
  },
  {
    id: "hbw-25",
    slug: "aanya-classic-fluted-bangle-pair",
    name: "Aanya Fluted Royal Bangles (Pair)",
    subtitle: "Sculpted ridges with delicate millgrain edges and soft satin luster",
    category: "Bangles",
    price: 3699,
    originalPrice: 4499,
    discountPercent: 18,
    material: "22K Gold Dipped Brass",
    purity: "22K Micron Gold Plated Brass",
    rating: 4.9,
    reviewsCount: 84,
    stock: 15,
    occasion: "Festive",
    images: [
      "https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611591475155-426462615521?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop"
    ],
    description: "Versatile and radiant, the Aanya bangles can be worn stacked with a watch or flanking glass bangles during festive celebrations.",
    details: {
      dimensions: "Width: 8mm each, Size 2.6 standard",
      weight: "32 grams per pair",
      plating: "Anti-tarnish 22K Gold Finish",
      closure: "Slip-on smooth contour",
    },
    sizes: ["Size 2.4", "Size 2.6", "Size 2.8"],
    tags: ["Bangles", "Festive", "Gold", "Royal"]
  }
];

export function formatINR(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}
