

const sampleListing =[

        {
          title: "Eiffel Tower",
          discription: "A wrought-iron lattice tower on the Champ de Mars in Paris, France.",
          location: "Champ de Mars, 5 Avenue Anatole France, 75007 Paris",
          country: "France",
          image:{
            filename : "Listing image",
            url : "https://c4.wallpaperflare.com/wallpaper/150/385/134/trees-design-house-lawn-wallpaper-preview.jpg"
          },
          price: 2550,
        },
        {
          title: "Great Wall of China",
          discription: "A series of fortifications made of stone, brick, tamped earth, wood, and other materials.",
          location: "Huairou District, China",
          country: "China",
          image:{
            filename : "Listing image",
            url : "https://c4.wallpaperflare.com/wallpaper/150/385/134/trees-design-house-lawn-wallpaper-preview.jpg"
          },
          price: 4000,
        },
        {
          title: "Statue of Liberty",
          discription: "A colossal neoclassical sculpture on Liberty Island in New York Harbor within New York City.",
          location: "Liberty Island, New York, NY 10004",
          country: "USA",
          image:{
            filename : "Listing image",
            url : "https://c4.wallpaperflare.com/wallpaper/150/385/134/trees-design-house-lawn-wallpaper-preview.jpg"
          },
          price: 1850
        },
        {
          title: "Taj Mahal",
          discription: "An ivory-white marble mausoleum on the south bank of the Yamuna river in the Indian city of Agra.",
          location: "Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001",
          country: "India",
          image:{
            filename : "Listing image",
            url : "https://c4.wallpaperflare.com/wallpaper/150/385/134/trees-design-house-lawn-wallpaper-preview.jpg"
          },
          price: 1500
        },
        {
          title: "Machu Picchu",
          discription: "An Incan citadel set high in the Andes Mountains in Peru, above the Urubamba River valley.",
          location: "08680, Peru",
          country: "Peru",
          image:{
            filename : "Listing image",
            url : "https://c4.wallpaperflare.com/wallpaper/150/385/134/trees-design-house-lawn-wallpaper-preview.jpg"
          },
          price: 6000,
          owner :"66c24382c47b733603cba55d",
        },
        {
          title: "Colosseum",
          discription: "An ancient amphitheatre in the centre of the city of Rome, Italy.",
          location: "Piazza del Colosseo, 1, 00184 Roma RM, Italy",
          country: "Italy",
          image:{
            filename : "Listing image",
            url : "https://c4.wallpaperflare.com/wallpaper/150/385/134/trees-design-house-lawn-wallpaper-preview.jpg"
          },
          price: 1600
        },
        {
          title: "Christ the Redeemer",
          discription: "An Art Deco statue of Jesus Christ in Rio de Janeiro, Brazil.",
          location: "Parque Nacional da Tijuca - Alto da Boa Vista, Rio de Janeiro - RJ, Brazil",
          country: "Brazil",
          image:{
            filename : "Listing image",
            url : "https://c4.wallpaperflare.com/wallpaper/150/385/134/trees-design-house-lawn-wallpaper-preview.jpg"
          },
          price: 1200
        },
        {
          title: "Acropolis of Athens",
          discription: "An ancient citadel located on a rocky outcrop above the city of Athens.",
          location: "Athens 105 58, Greece",
          country: "Greece",
          image:{
            filename : "Listing image",
            url : "https://c4.wallpaperflare.com/wallpaper/150/385/134/trees-design-house-lawn-wallpaper-preview.jpg"
          },
          price: 2000
        },
        {
          title: "Sydney Opera House",
          discription: "A multi-venue performing arts centre in Sydney, New South Wales, Australia.",
          location: "Bennelong Point, Sydney NSW 2000, Australia",
          country: "Australia",
          image:{
            filename : "Listing image",
            url : "https://c4.wallpaperflare.com/wallpaper/150/385/134/trees-design-house-lawn-wallpaper-preview.jpg"
          },
          price: 3500
        },
        {
          title: "Niagara Falls",
          discription: "Three waterfalls at the southern end of Niagara Gorge, spanning the border between Ontario in Canada and New York in the United States.",
          location: "Niagara Falls, NY 14303, USA",
          country: "USA",
          image:{
            filename : "Listing image",
            url : "https://c4.wallpaperflare.com/wallpaper/150/385/134/trees-design-house-lawn-wallpaper-preview.jpg"
          },
          price:6000
        },
        {
          title: "Burj Khalifa",
          discription: "A skyscraper in Dubai, United Arab Emirates, and is the tallest structure and building in the world.",
          location: "1 Sheikh Mohammed bin Rashid Blvd - Downtown Dubai - Dubai - United Arab Emirates",
          country: "UAE",
          image:{
            filename : "Listing image",
            url : "https://c4.wallpaperflare.com/wallpaper/150/385/134/trees-design-house-lawn-wallpaper-preview.jpg"
          },
          price: 3800
        },
        {
          title: "Santorini",
          discription: "An island in the southern Aegean Sea, about 200 km southeast of the Greek mainland.",
          location: "Santorini, Thira 847 00, Greece",
          country: "Greece",
          image:{
            filename : "Listing image",
            url : "https://c4.wallpaperflare.com/wallpaper/150/385/134/trees-design-house-lawn-wallpaper-preview.jpg"
          },
          price: 5000
        },
        {
          title: "Mount Fuji",
          discription: "An active stratovolcano about 100 kilometers southwest of Tokyo, Japan.",
          location: "Kitayama, Fujinomiya, Shizuoka 418-0112, Japan",
          country: "Japan",
          image:{
            filename : "Listing image",
            url : "https://c4.wallpaperflare.com/wallpaper/150/385/134/trees-design-house-lawn-wallpaper-preview.jpg"
          },
          price: 5000
        },
        {
          title: "Grand Canyon",
          discription: "A steep-sided canyon carved by the Colorado River in Arizona, United States.",
          location: "Grand Canyon, AZ 86023, USA",
          country: "USA",
          image:{
            filename : "Listing image",
            url : "https://c4.wallpaperflare.com/wallpaper/150/385/134/trees-design-house-lawn-wallpaper-preview.jpg"
          },
          price: 3500
        },
        {
          title: "Victoria Falls",
          discription: "A waterfall in southern Africa on the Zambezi River at the border between Zambia and Zimbabwe.",
          location: "Mosi-o-tunya Road, Livingstone, Zambia",
          country: "Zambia",
          image:{
            filename : "Listing image",
            url : "https://c4.wallpaperflare.com/wallpaper/150/385/134/trees-design-house-lawn-wallpaper-preview.jpg"
          },
          price: 3000
        },
        {
          title: "Great Barrier Reef",
          discription: "The world's largest coral reef system composed of over 2,900 individual reefs and 900 islands.",
          location: "Queensland, Australia",
          country: "Australia",
          image:{
            filename : "Listing image",
            url : "https://c4.wallpaperflare.com/wallpaper/150/385/134/trees-design-house-lawn-wallpaper-preview.jpg"
          },
          price: 5000
        },
        {
          title: "Pyramids of Giza",
          discription: "An archaeological site on the Giza Plateau, on the outskirts of Cairo, Egypt.",
          location: "Al Haram, Nazlet El-Semman, Al Giza Desert, Giza Governorate, Egypt",
          country: "Egypt",
          image:{
            filename : "Listing image",
            url : "https://c4.wallpaperflare.com/wallpaper/150/385/134/trees-design-house-lawn-wallpaper-preview.jpg"
          },
          price: 1000
        },
        {
          title: "Banff National Park",
          discription: "Canada's oldest national park, located in the Rocky Mountains.",
          location: "Banff, AB, Canada",
          country: "Canada",
          image:{
            filename : "Listing image",
            url : "https://c4.wallpaperflare.com/wallpaper/150/385/134/trees-design-house-lawn-wallpaper-preview.jpg"
          },
          price: 1000
        },
        {
          title: "Sagrada Familia",
          discription: "A large unfinished Roman Catholic minor basilica in Barcelona, Spain.",
          location: "Carrer de Mallorca, 401, 08013 Barcelona, Spain",
          country: "Spain",
          image:{
            filename : "Listing image",
            url : "https://c4.wallpaperflare.com/wallpaper/150/385/134/trees-design-house-lawn-wallpaper-preview.jpg"
          },
          price: 2500
        },
        {
          title: "Golden Gate Bridge",
          discription: "A suspension bridge spanning the Golden Gate, the one-mile-wide strait connecting San Francisco Bay and the Pacific Ocean.",
          location: "Golden Gate Bridge, San Francisco, CA, USA",
          country: "USA",
          image:{
            filename : "Listing image",
            url : "https://c4.wallpaperflare.com/wallpaper/150/385/134/trees-design-house-lawn-wallpaper-preview.jpg"
          },
          price: 3000
        },
        {
          title: "Alhambra",
          discription: "A palace and fortress complex located in Granada, Andalusia, Spain.",
          location: "Calle Real de la Alhambra, s/n, 18009 Granada, Spain",
          country: "Spain",
          image:{
            filename : "Listing image",
            url : "https://c4.wallpaperflare.com/wallpaper/150/385/134/trees-design-house-lawn-wallpaper-preview.jpg"
          },
          price: 1400
        },
        {
          title: "Chichen Itza",
          discription: "A large pre-Columbian archaeological site built by the Maya civilization.",
          location: "Yucatan, Mexico",
          country: "Mexico",
          image:{
            filename : "Listing image",
            url : "https://c4.wallpaperflare.com/wallpaper/150/385/134/trees-design-house-lawn-wallpaper-preview.jpg"
          },
          price: 2000
        },
        {
          title: "Mount Kilimanjaro",
          discription: "A dormant volcano in Tanzania. It is the highest mountain in Africa.",
          location: "Mount Kilimanjaro National Park, Tanzania",
          country: "Tanzania",
          image:{
            filename : "Listing image",
            url : "https://c4.wallpaperflare.com/wallpaper/150/385/134/trees-design-house-lawn-wallpaper-preview.jpg"
          },
          price:6045
        }
    ]

module.exports = {data : sampleListing};