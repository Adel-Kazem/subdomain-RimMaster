// products.js - Complete Product Database for GreenLion Electronics
const PRODUCTS = [
    // Mobile Accessories
    {
        id: 1001,
        name: "GreenLion 40W Dual PD Wall Charger",
        category: "mobile-accessories",
        slug: "greenlion-40w-dual-pd-wall-charger",
        brand: "GreenLion",
        price: 29.99,
        originalPrice: 39.99,
        description: "Fast charging wall adapter with dual USB-C PD ports. Supports up to 40W power delivery for rapid charging of smartphones, tablets, and other devices.",
        image: "https://images.unsplash.com/photo-1609592179726-e4ef8b8b5f4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1609592179726-e4ef8b8b5f4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        rating: 4.8,
        reviews: 145,
        inStock: true,
        badge: "Best Seller",
        features: [
            "40W Power Delivery",
            "Dual USB-C Ports",
            "Fast Charging Technology",
            "Compact Design",
            "Universal Compatibility"
        ],
        specifications: {
            "Input Voltage": "100-240V AC",
            "Output Power": "40W Max",
            "Ports": "2x USB-C PD",
            "Dimensions": "6.5 x 3.2 x 2.8 cm",
            "Weight": "85g",
            "Cable Included": "No"
        },
        options: {
            "Color": ["White", "Black"],
            "Cable": [
                { value: "No Cable", priceModifier: 0 },
                { value: "USB-C Cable 1m", priceModifier: 12 },
                { value: "USB-C Cable 2m", priceModifier: 18 }
            ]
        },
        tags: ["charger", "fast-charging", "usb-c", "wall-adapter"],
        sku: "GL-WC40-001",
        createdAt: "2024-01-15T10:00:00Z"
    },
    {
        id: 1002,
        name: "Wireless Charging Pad 15W",
        category: "mobile-accessories",
        slug: "wireless-charging-pad-15w",
        brand: "GreenLion",
        price: 24.99,
        originalPrice: 34.99,
        description: "Premium wireless charging pad with 15W fast charging capability. Compatible with all Qi-enabled devices including iPhone and Android smartphones.",
        image: "https://images.unsplash.com/photo-1609175530830-9ce3a67c0b83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.5,
        reviews: 89,
        inStock: true,
        features: [
            "15W Fast Wireless Charging",
            "Qi Certification",
            "LED Charging Indicator",
            "Non-slip Surface",
            "Foreign Object Detection"
        ],
        specifications: {
            "Max Output": "15W",
            "Input": "USB-C",
            "Charging Distance": "Up to 8mm",
            "Dimensions": "10 x 10 x 0.8 cm",
            "Weight": "120g"
        },
        options: {
            "Color": ["Black", "White", "Navy Blue"]
        },
        tags: ["wireless", "charging", "qi", "15w"],
        sku: "GL-WP15-002",
        createdAt: "2024-01-20T14:30:00Z"
    },
    {
        id: 1003,
        name: "Magnetic Car Phone Holder",
        category: "mobile-accessories",
        slug: "magnetic-car-phone-holder",
        brand: "GreenLion",
        price: 19.99,
        description: "Strong magnetic car mount with 360-degree rotation. Easy one-hand operation with secure grip for safe driving.",
        image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.6,
        reviews: 203,
        inStock: true,
        features: [
            "Strong Magnetic Hold",
            "360° Rotation",
            "One-Hand Operation",
            "Air Vent Mount",
            "Universal Compatibility"
        ],
        specifications: {
            "Mount Type": "Air Vent",
            "Rotation": "360 degrees",
            "Phone Size": "4-7 inches",
            "Weight": "65g"
        },
        tags: ["car", "holder", "magnetic", "mount"],
        sku: "GL-CM-003",
        createdAt: "2024-01-25T09:15:00Z"
    },

    // Charging Solutions
    {
        id: 2001,
        name: "GreenLion 65W GaN Fast Charger",
        category: "charging",
        slug: "greenlion-65w-gan-fast-charger",
        brand: "GreenLion",
        price: 49.99,
        originalPrice: 69.99,
        description: "Ultra-compact GaN technology charger with 65W power delivery. Perfect for laptops, tablets, and smartphones with multiple port options.",
        image: "https://images.unsplash.com/photo-1609592179726-e4ef8b8b5f4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.9,
        reviews: 178,
        inStock: true,
        badge: "New",
        features: [
            "65W GaN Technology",
            "3 Ports (2 USB-C + 1 USB-A)",
            "Ultra-Compact Design",
            "Universal Compatibility",
            "Advanced Safety Features"
        ],
        specifications: {
            "Max Output": "65W",
            "Technology": "GaN (Gallium Nitride)",
            "Ports": "2x USB-C, 1x USB-A",
            "Input": "100-240V AC",
            "Dimensions": "7.2 x 4.5 x 3.1 cm",
            "Weight": "145g"
        },
        options: {
            "Color": ["White", "Black"],
            "Bundle": [
                { value: "Charger Only", priceModifier: 0 },
                { value: "With USB-C Cable", priceModifier: 15 },
                { value: "Travel Bundle", priceModifier: 25 }
            ]
        },
        tags: ["gan", "fast-charging", "laptop", "65w"],
        sku: "GL-GAN65-001",
        createdAt: "2024-02-01T11:00:00Z"
    },
    {
        id: 2002,
        name: "Wireless Charging Stand with Cooling Fan",
        category: "charging",
        slug: "wireless-charging-stand-cooling-fan",
        brand: "GreenLion",
        price: 39.99,
        description: "Advanced wireless charging stand with built-in cooling fan to prevent overheating during fast charging sessions.",
        image: "https://images.unsplash.com/photo-1609175530830-9ce3a67c0b83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.7,
        reviews: 92,
        inStock: true,
        features: [
            "15W Fast Wireless Charging",
            "Built-in Cooling Fan",
            "Adjustable Viewing Angle",
            "LED Status Indicator",
            "Foreign Object Detection"
        ],
        specifications: {
            "Max Output": "15W",
            "Cooling": "Built-in Fan",
            "Angle Adjustment": "0-60 degrees",
            "Input": "USB-C",
            "Dimensions": "12 x 8 x 15 cm"
        },
        tags: ["wireless", "stand", "cooling", "15w"],
        sku: "GL-WCS-002",
        createdAt: "2024-02-05T16:20:00Z"
    },
    {
        id: 2003,
        name: "Multi-Device Charging Station",
        category: "charging",
        slug: "multi-device-charging-station",
        brand: "GreenLion",
        price: 79.99,
        description: "All-in-one charging station for multiple devices. Charge up to 6 devices simultaneously with wireless and wired options.",
        image: "https://images.unsplash.com/photo-1609592179726-e4ef8b8b5f4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.8,
        reviews: 156,
        inStock: true,
        badge: "Popular",
        features: [
            "6-Device Charging",
            "Wireless + Wired Options",
            "Smart Power Distribution",
            "Organized Cable Management",
            "LED Power Indicators"
        ],
        specifications: {
            "Total Output": "100W",
            "Wireless Pads": "2x 15W",
            "USB Ports": "4x USB-A, 2x USB-C",
            "Dimensions": "25 x 15 x 12 cm"
        },
        options: {
            "Configuration": [
                { value: "Standard", priceModifier: 0 },
                { value: "With Apple Watch Charger", priceModifier: 30 }
            ]
        },
        tags: ["multi-device", "charging-station", "wireless", "organization"],
        sku: "GL-MCS-003",
        createdAt: "2024-02-10T13:45:00Z"
    },

    // Audio Devices
    {
        id: 3001,
        name: "GreenLion True Wireless Earbuds Pro",
        category: "audio",
        slug: "greenlion-true-wireless-earbuds-pro",
        brand: "GreenLion",
        price: 89.99,
        originalPrice: 129.99,
        description: "Premium true wireless earbuds with active noise cancellation, premium sound quality, and up to 30 hours of battery life with charging case.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.8,
        reviews: 267,
        inStock: true,
        badge: "Best Seller",
        features: [
            "Active Noise Cancellation",
            "30H Total Battery Life",
            "IPX7 Water Resistance",
            "Touch Controls",
            "Wireless Charging Case"
        ],
        specifications: {
            "Driver Size": "12mm Dynamic",
            "Battery Life": "8H + 22H (Case)",
            "Charging": "USB-C + Wireless",
            "Water Rating": "IPX7",
            "Bluetooth": "5.3",
            "Weight": "4.5g per earbud"
        },
        options: {
            "Color": ["Black", "White", "Blue", "Rose Gold"]
        },
        tags: ["wireless", "earbuds", "anc", "waterproof"],
        sku: "GL-TWE-001",
        createdAt: "2024-01-10T08:30:00Z"
    },
    {
        id: 3002,
        name: "Bluetooth Portable Speaker 40W",
        category: "audio",
        slug: "bluetooth-portable-speaker-40w",
        brand: "GreenLion",
        price: 69.99,
        description: "Powerful 40W portable Bluetooth speaker with 360-degree sound, deep bass, and 20-hour battery life. Perfect for outdoor adventures.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.6,
        reviews: 143,
        inStock: true,
        features: [
            "40W Powerful Sound",
            "360-Degree Audio",
            "20H Battery Life",
            "IPX6 Waterproof",
            "TWS Pairing"
        ],
        specifications: {
            "Power Output": "40W",
            "Battery Life": "20 hours",
            "Charging Time": "3 hours",
            "Bluetooth": "5.2",
            "Water Rating": "IPX6",
            "Dimensions": "20 x 8 x 8 cm"
        },
        options: {
            "Color": ["Black", "Blue", "Red", "Green"]
        },
        tags: ["speaker", "bluetooth", "portable", "waterproof"],
        sku: "GL-BPS-002",
        createdAt: "2024-01-18T12:00:00Z"
    },
    {
        id: 3003,
        name: "Gaming Headset with RGB Lighting",
        category: "audio",
        slug: "gaming-headset-rgb-lighting",
        brand: "GreenLion",
        price: 79.99,
        description: "Professional gaming headset with 7.1 surround sound, noise-canceling microphone, and customizable RGB lighting effects.",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.7,
        reviews: 198,
        inStock: true,
        features: [
            "7.1 Surround Sound",
            "RGB Lighting Effects",
            "Noise-Canceling Mic",
            "Comfortable Padding",
            "Multi-Platform Support"
        ],
        specifications: {
            "Driver Size": "50mm",
            "Frequency Response": "20Hz-20kHz",
            "Impedance": "32Ω",
            "Sensitivity": "108dB",
            "Mic Type": "Omnidirectional",
            "Cable Length": "2.5m"
        },
        options: {
            "Platform": ["PC/Console", "PC Only"]
        },
        tags: ["gaming", "headset", "rgb", "surround-sound"],
        sku: "GL-GHS-003",
        createdAt: "2024-02-15T10:15:00Z"
    },

    // Cables & Adapters
    {
        id: 4001,
        name: "USB-C to USB-C Cable 2M",
        category: "cables",
        slug: "usb-c-to-usb-c-cable-2m",
        brand: "GreenLion",
        price: 14.99,
        description: "High-quality USB-C to USB-C cable with 100W power delivery and 480Mbps data transfer speed. Durable braided design.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.5,
        reviews: 89,
        inStock: true,
        features: [
            "100W Power Delivery",
            "480Mbps Data Transfer",
            "Braided Cable Design",
            "Reinforced Connectors",
            "2 Meter Length"
        ],
        specifications: {
            "Length": "2 meters",
            "Power Delivery": "100W",
            "Data Speed": "480Mbps",
            "Material": "Braided Nylon",
            "Connector": "USB-C 3.1"
        },
        options: {
            "Length": [
                { value: "1M", priceModifier: -3 },
                { value: "2M", priceModifier: 0 },
                { value: "3M", priceModifier: 5 }
            ],
            "Color": ["Black", "White", "Red"]
        },
        tags: ["usb-c", "cable", "braided", "100w"],
        sku: "GL-CC2M-001",
        createdAt: "2024-01-12T14:20:00Z"
    },
    {
        id: 4002,
        name: "Lightning to USB-C Cable MFi Certified",
        category: "cables",
        slug: "lightning-to-usb-c-cable-mfi",
        brand: "GreenLion",
        price: 19.99,
        description: "MFi certified Lightning to USB-C cable for iPhone fast charging. Premium build quality with reinforced stress points.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.8,
        reviews: 156,
        inStock: true,
        badge: "MFi Certified",
        features: [
            "MFi Certification",
            "Fast Charging Support",
            "Reinforced Design",
            "Data Sync Compatible",
            "iPhone Compatible"
        ],
        specifications: {
            "Length": "1.2 meters",
            "Certification": "MFi Certified",
            "Data Speed": "480Mbps",
            "Power": "20W Fast Charging",
            "Compatibility": "iPhone 5 and newer"
        },
        options: {
            "Length": [
                { value: "1M", priceModifier: -2 },
                { value: "1.2M", priceModifier: 0 },
                { value: "2M", priceModifier: 5 }
            ]
        },
        tags: ["lightning", "mfi", "iphone", "fast-charging"],
        sku: "GL-LC12-002",
        createdAt: "2024-01-16T11:30:00Z"
    },
    {
        id: 4003,
        name: "Multi-Port USB Hub 7-in-1",
        category: "cables",
        slug: "multi-port-usb-hub-7in1",
        brand: "GreenLion",
        price: 39.99,
        description: "Compact 7-in-1 USB-C hub with HDMI, USB 3.0 ports, SD card reader, and power delivery pass-through.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.6,
        reviews: 124,
        inStock: true,
        features: [
            "7-in-1 Connectivity",
            "4K HDMI Output",
            "100W PD Pass-through",
            "SD/microSD Card Reader",
            "USB 3.0 High Speed"
        ],
        specifications: {
            "Ports": "3x USB 3.0, 1x HDMI, 1x USB-C PD, 1x SD, 1x microSD",
            "HDMI Resolution": "4K@60Hz",
            "USB Speed": "5Gbps",
            "Power Delivery": "100W Pass-through",
            "Dimensions": "11 x 3.2 x 1.5 cm"
        },
        tags: ["hub", "usb-c", "hdmi", "multiport"],
        sku: "GL-HUB7-003",
        createdAt: "2024-02-20T09:45:00Z"
    },

    // Power Banks
    {
        id: 5001,
        name: "GreenLion Power Bank 20000mAh Fast Charge",
        category: "power-banks",
        slug: "greenlion-power-bank-20000mah",
        brand: "GreenLion",
        price: 49.99,
        originalPrice: 69.99,
        description: "High-capacity 20000mAh power bank with 22.5W fast charging, multiple ports, and digital display. Perfect for travel and daily use.",
        image: "https://images.unsplash.com/photo-1609175530830-9ce3a67c0b83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.7,
        reviews: 234,
        inStock: true,
        badge: "Fast Charging",
        features: [
            "20000mAh High Capacity",
            "22.5W Fast Charging",
            "Digital LED Display",
            "Multiple Device Charging",
            "Power Delivery Support"
        ],
        specifications: {
            "Capacity": "20000mAh",
            "Input": "USB-C 18W",
            "Output": "22.5W Max",
            "Ports": "2x USB-A, 1x USB-C",
            "Display": "LED Battery Indicator",
            "Weight": "420g",
            "Dimensions": "15.5 x 6.8 x 2.2 cm"
        },
        options: {
            "Color": ["Black", "White", "Blue"]
        },
        tags: ["power-bank", "20000mah", "fast-charging", "portable"],
        sku: "GL-PB20K-001",
        createdAt: "2024-01-08T13:15:00Z"
    },
    {
        id: 5002,
        name: "Wireless Power Bank 10000mAh",
        category: "power-banks",
        slug: "wireless-power-bank-10000mah",
        brand: "GreenLion",
        price: 39.99,
        description: "Compact wireless power bank with 10000mAh capacity. Charge devices wirelessly or with cables for maximum convenience.",
        image: "https://images.unsplash.com/photo-1609175530830-9ce3a67c0b83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.5,
        reviews: 167,
        inStock: true,
        features: [
            "Wireless + Wired Charging",
            "10000mAh Capacity",
            "Magnetic Alignment",
            "LED Battery Display",
            "Compact Design"
        ],
        specifications: {
            "Capacity": "10000mAh",
            "Wireless Output": "15W",
            "Wired Output": "20W",
            "Input": "USB-C 18W",
            "Weight": "280g"
        },
        options: {
            "Color": ["Black", "White", "Navy"]
        },
        tags: ["wireless", "power-bank", "10000mah", "magnetic"],
        sku: "GL-WPB10-002",
        createdAt: "2024-01-22T15:30:00Z"
    },
    {
        id: 5003,
        name: "Solar Power Bank 25000mAh",
        category: "power-banks",
        slug: "solar-power-bank-25000mah",
        brand: "GreenLion",
        price: 69.99,
        description: "Rugged solar power bank with massive 25000mAh capacity. Perfect for outdoor adventures with solar charging capability.",
        image: "https://images.unsplash.com/photo-1609175530830-9ce3a67c0b83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.4,
        reviews: 98,
        inStock: true,
        badge: "Outdoor",
        features: [
            "25000mAh Ultra Capacity",
            "Solar Panel Charging",
            "Waterproof Design",
            "LED Flashlight",
            "Dual USB Output"
        ],
        specifications: {
            "Capacity": "25000mAh",
            "Solar Panel": "5W",
            "Output": "2x USB-A 2.4A",
            "Input": "Micro USB + Solar",
            "Water Rating": "IPX6",
            "Weight": "580g"
        },
        tags: ["solar", "power-bank", "25000mah", "outdoor", "waterproof"],
        sku: "GL-SPB25-003",
        createdAt: "2024-03-01T10:20:00Z"
    },

    // Smart Home
    {
        id: 6001,
        name: "Smart WiFi Plug with Energy Monitoring",
        category: "smart-home",
        slug: "smart-wifi-plug-energy-monitoring",
        brand: "GreenLion",
        price: 24.99,
        description: "Smart WiFi plug with real-time energy monitoring, voice control support, and remote app control. Monitor and control your devices from anywhere.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.6,
        reviews: 178,
        inStock: true,
        features: [
            "Real-time Energy Monitoring",
            "Voice Control Support",
            "Remote App Control",
            "Schedule Timer",
            "Compact Design"
        ],
        specifications: {
            "Max Load": "15A/1800W",
            "WiFi": "2.4GHz",
            "Compatibility": "Alexa, Google Assistant",
            "App": "GreenLion Smart",
            "Dimensions": "5.5 x 5.5 x 8.2 cm"
        },
        options: {
            "Quantity": [
                { value: "1 Pack", priceModifier: 0 },
                { value: "2 Pack", priceModifier: 20 },
                { value: "4 Pack", priceModifier: 35 }
            ]
        },
        tags: ["smart-plug", "wifi", "energy-monitoring", "voice-control"],
        sku: "GL-SP-001",
        createdAt: "2024-02-12T12:45:00Z"
    },
    {
        id: 6002,
        name: "Smart LED Light Bulb RGB+W",
        category: "smart-home",
        slug: "smart-led-light-bulb-rgbw",
        brand: "GreenLion",
        price: 19.99,
        description: "Smart LED bulb with millions of colors, tunable white light, and app control. Create the perfect ambiance for any occasion.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.5,
        reviews: 145,
        inStock: true,
        features: [
            "16 Million Colors",
            "Tunable White Light",
            "Voice Control",
            "Music Sync",
            "Energy Efficient"
        ],
        specifications: {
            "Power": "9W (60W equivalent)",
            "Brightness": "800 lumens",
            "Color Temperature": "2700K-6500K",
            "Lifespan": "25000 hours",
            "Base": "E27"
        },
        options: {
            "Base Type": ["E27", "E14"],
            "Quantity": [
                { value: "1 Bulb", priceModifier: 0 },
                { value: "2 Bulbs", priceModifier: 15 },
                { value: "4 Bulbs", priceModifier: 25 }
            ]
        },
        tags: ["smart-bulb", "rgb", "wifi", "voice-control"],
        sku: "GL-SLB-002",
        createdAt: "2024-02-18T14:00:00Z"
    },
    {
        id: 6003,
        name: "Smart Security Camera 1080P",
        category: "smart-home",
        slug: "smart-security-camera-1080p",
        brand: "GreenLion",
        price: 59.99,
        description: "WiFi security camera with 1080P HD video, night vision, motion detection, and two-way audio. Keep your home secure from anywhere.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.7,
        reviews: 201,
        inStock: true,
        badge: "Security",
        features: [
            "1080P HD Video",
            "Night Vision",
            "Motion Detection",
            "Two-Way Audio",
            "Cloud Storage"
        ],
        specifications: {
            "Resolution": "1920x1080",
            "Field of View": "110 degrees",
            "Night Vision": "Up to 10m",
            "Storage": "Cloud + MicroSD",
            "Audio": "Built-in Mic & Speaker",
            "Power": "USB Cable"
        },
        options: {
            "Storage Plan": [
                { value: "Local Only", priceModifier: 0 },
                { value: "Basic Cloud", priceModifier: 10 },
                { value: "Premium Cloud", priceModifier: 20 }
            ]
        },
        tags: ["security-camera", "1080p", "wifi", "night-vision"],
        sku: "GL-SC1080-003",
        createdAt: "2024-02-25T11:30:00Z"
    },

    // Stands & Holders
    {
        id: 7001,
        name: "Adjustable Laptop Stand Aluminum",
        category: "stands",
        slug: "adjustable-laptop-stand-aluminum",
        brand: "GreenLion",
        price: 34.99,
        description: "Premium aluminum laptop stand with adjustable height and angle. Improves ergonomics and cooling for better productivity.",
        image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.8,
        reviews: 134,
        inStock: true,
        features: [
            "Adjustable Height & Angle",
            "Premium Aluminum Build",
            "Enhanced Cooling",
            "Stable Base Design",
            "Foldable & Portable"
        ],
        specifications: {
            "Material": "Aluminum Alloy",
            "Compatibility": "10-17 inch laptops",
            "Weight Capacity": "8kg",
            "Adjustment Range": "15-25cm height",
            "Weight": "1.2kg"
        },
        options: {
            "Color": ["Silver", "Space Gray"]
        },
        tags: ["laptop-stand", "aluminum", "adjustable", "ergonomic"],
        sku: "GL-LS-001",
        createdAt: "2024-02-08T09:20:00Z"
    },
    {
        id: 7002,
        name: "Desktop Phone Stand with Wireless Charging",
        category: "stands",
        slug: "desktop-phone-stand-wireless-charging",
        brand: "GreenLion",
        price: 29.99,
        description: "Elegant desktop phone stand with built-in 15W wireless charging. Perfect viewing angle for video calls and media consumption.",
        image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.6,
        reviews: 89,
        inStock: true,
        features: [
            "15W Wireless Charging",
            "Adjustable Viewing Angle",
            "Anti-slip Base",
            "Case Friendly",
            "LED Charging Indicator"
        ],
        specifications: {
            "Wireless Output": "15W Max",
            "Angle Adjustment": "30-70 degrees",
            "Phone Size": "4-7 inches",
            "Input": "USB-C",
            "Weight": "180g"
        },
        tags: ["phone-stand", "wireless-charging", "desktop", "adjustable"],
        sku: "GL-PS-002",
        createdAt: "2024-02-14T13:15:00Z"
    },

    // Device Protection
    {
        id: 8001,
        name: "Tempered Glass Screen Protector iPhone 15",
        category: "protection",
        slug: "tempered-glass-screen-protector-iphone15",
        brand: "GreenLion",
        price: 12.99,
        description: "Premium tempered glass screen protector with 9H hardness, anti-fingerprint coating, and easy installation kit.",
        image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.7,
        reviews: 456,
        inStock: true,
        badge: "9H Hardness",
        features: [
            "9H Hardness Rating",
            "Anti-fingerprint Coating",
            "Case Friendly Design",
            "Easy Installation",
            "Crystal Clear Transparency"
        ],
        specifications: {
            "Hardness": "9H",
            "Thickness": "0.33mm",
            "Transparency": "99.9%",
            "Compatibility": "iPhone 15 Series",
            "Installation": "Bubble-free"
        },
        options: {
            "Model": [
                { value: "iPhone 15", priceModifier: 0 },
                { value: "iPhone 15 Plus", priceModifier: 2 },
                { value: "iPhone 15 Pro", priceModifier: 3 },
                { value: "iPhone 15 Pro Max", priceModifier: 5 }
            ],
            "Quantity": [
                { value: "1 Pack", priceModifier: 0 },
                { value: "2 Pack", priceModifier: 8 },
                { value: "3 Pack", priceModifier: 12 }
            ]
        },
        tags: ["screen-protector", "tempered-glass", "iphone", "9h"],
        sku: "GL-TG15-001",
        createdAt: "2024-01-30T10:45:00Z"
    },
    {
        id: 8002,
        name: "Universal Tablet Case 10-11 inch",
        category: "protection",
        slug: "universal-tablet-case-10-11-inch",
        brand: "GreenLion",
        price: 24.99,
        description: "Premium universal tablet case with adjustable stand, magnetic closure, and full protection for 10-11 inch tablets.",
        image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.5,
        reviews: 123,
        inStock: true,
        features: [
            "Universal Compatibility",
            "Adjustable Stand Function",
            "Magnetic Auto Sleep/Wake",
            "Premium PU Leather",
            "Full Device Protection"
        ],
        specifications: {
            "Size Compatibility": "10-11 inch tablets",
            "Material": "PU Leather + TPU",
            "Stand Positions": "Multiple angles",
            "Closure": "Magnetic",
            "Weight": "320g"
        },
        options: {
            "Color": ["Black", "Brown", "Navy", "Red"]
        },
        tags: ["tablet-case", "universal", "stand", "magnetic"],
        sku: "GL-TC10-002",
        createdAt: "2024-02-22T14:30:00Z"
    },

    // Gaming Accessories
    {
        id: 9001,
        name: "Gaming Mouse Pad RGB XL",
        category: "gaming",
        slug: "gaming-mouse-pad-rgb-xl",
        brand: "GreenLion",
        price: 29.99,
        description: "Extra-large RGB gaming mouse pad with smooth surface, non-slip base, and customizable lighting effects. Perfect for gaming setups.",
        image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.6,
        reviews: 167,
        inStock: true,
        features: [
            "RGB Lighting Effects",
            "Extra Large Size",
            "Smooth Gaming Surface",
            "Non-slip Rubber Base",
            "Water Resistant"
        ],
        specifications: {
            "Size": "80 x 30 x 0.4 cm",
            "Surface": "Micro-textured cloth",
            "Base": "Natural rubber",
            "LEDs": "10 zones RGB",
            "Connection": "USB-A"
        },
        options: {
            "Size": [
                { value: "Large (60x30cm)", priceModifier: -8 },
                { value: "XL (80x30cm)", priceModifier: 0 },
                { value: "XXL (90x40cm)", priceModifier: 15 }
            ]
        },
        tags: ["gaming", "mouse-pad", "rgb", "xl"],
        sku: "GL-MP-001",
        createdAt: "2024-03-05T11:15:00Z"
    },
    {
        id: 9002,
        name: "Mechanical Gaming Keyboard RGB",
        category: "gaming",
        slug: "mechanical-gaming-keyboard-rgb",
        brand: "GreenLion",
        price: 89.99,
        description: "Professional mechanical gaming keyboard with RGB backlighting, tactile switches, and programmable keys for competitive gaming.",
        image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.8,
        reviews: 234,
        inStock: true,
        badge: "Mechanical",
        features: [
            "Mechanical Switches",
            "RGB Per-key Lighting",
            "Programmable Macros",
            "Anti-ghosting",
            "Aluminum Frame"
        ],
        specifications: {
            "Switch Type": "Blue Mechanical",
            "Layout": "104 Keys",
            "Backlighting": "RGB Per-key",
            "Connection": "USB-C",
            "Polling Rate": "1000Hz",
            "Weight": "1.1kg"
        },
        options: {
            "Switch Type": [
                { value: "Blue (Tactile)", priceModifier: 0 },
                { value: "Red (Linear)", priceModifier: 5 },
                { value: "Brown (Tactile Silent)", priceModifier: 8 }
            ]
        },
        tags: ["mechanical", "keyboard", "gaming", "rgb"],
        sku: "GL-MK-002",
        createdAt: "2024-03-08T16:20:00Z"
    },

    // Computer Accessories
    {
        id: 10001,
        name: "USB-C Docking Station 11-in-1",
        category: "computer-accessories",
        slug: "usb-c-docking-station-11in1",
        brand: "GreenLion",
        price: 89.99,
        description: "Complete 11-in-1 USB-C docking station with dual 4K HDMI, ethernet, multiple USB ports, and 100W power delivery.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.7,
        reviews: 189,
        inStock: true,
        badge: "Professional",
        features: [
            "11-in-1 Connectivity",
            "Dual 4K HDMI Outputs",
            "Gigabit Ethernet",
            "100W PD Pass-through",
            "Plug & Play Setup"
        ],
        specifications: {
            "Ports": "2x HDMI, 3x USB 3.0, 1x USB-C, 1x Ethernet, 2x SD slots, 1x Audio",
            "HDMI Resolution": "4K@60Hz",
            "Power Delivery": "100W",
            "Ethernet Speed": "1Gbps",
            "Dimensions": "15 x 6 x 2 cm"
        },
        tags: ["docking-station", "usb-c", "dual-4k", "ethernet"],
        sku: "GL-DS11-001",
        createdAt: "2024-03-12T13:40:00Z"
    },
    {
        id: 10002,
        name: "Webcam 4K Ultra HD with Auto Focus",
        category: "computer-accessories",
        slug: "webcam-4k-ultra-hd-auto-focus",
        brand: "GreenLion",
        price: 79.99,
        description: "Professional 4K webcam with auto-focus, noise-canceling microphone, and wide-angle lens. Perfect for video conferencing and streaming.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: 4.6,
        reviews: 145,
        inStock: true,
        features: [
            "4K Ultra HD Video",
            "Auto Focus & Exposure",
            "Noise-canceling Microphone",
            "90° Field of View",
            "Plug & Play"
        ],
        specifications: {
            "Resolution": "4K@30fps, 1080p@60fps",
            "Field of View": "90 degrees",
            "Focus": "Auto focus",
            "Microphone": "Dual stereo mics",
            "Connection": "USB 3.0",
            "Compatibility": "Windows, Mac, Linux"
        },
        options: {
            "Bundle": [
                { value: "Webcam Only", priceModifier: 0 },
                { value: "With Tripod", priceModifier: 15 },
                { value: "Professional Kit", priceModifier: 25 }
            ]
        },
        tags: ["webcam", "4k", "auto-focus", "streaming"],
        sku: "GL-WC4K-002",
        createdAt: "2024-03-15T10:25:00Z"
    }
];

// Helper functions for product operations
function getProductById(id) {
    return PRODUCTS.find(product => product.id === id);
}

function getProductBySlug(slug) {
    return PRODUCTS.find(product => product.slug === slug);
}

function getProductsByCategory(category) {
    return PRODUCTS.filter(product => product.category === category);
}

function getFeaturedProducts(limit = 8) {
    return PRODUCTS.filter(product => product.badge).slice(0, limit);
}

function searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return PRODUCTS.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        (product.brand && product.brand.toLowerCase().includes(searchTerm)) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
    );
}

function getProductsByPriceRange(min, max) {
    return PRODUCTS.filter(product => {
        const price = parseFloat(product.price);
        return price >= min && price <= max;
    });
}

function getRelatedProducts(productId, limit = 4) {
    const product = getProductById(productId);
    if (!product) return [];

    return PRODUCTS
        .filter(p => p.category === product.category && p.id !== productId)
        .slice(0, limit);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PRODUCTS,
        getProductById,
        getProductBySlug,
        getProductsByCategory,
        getFeaturedProducts,
        searchProducts,
        getProductsByPriceRange,
        getRelatedProducts
    };
}
