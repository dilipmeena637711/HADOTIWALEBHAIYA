/*
=========================================================
HADOTI WALE BHAIYA
INDIA DESTINATIONS DATABASE
BATCH 1 — 100 CITIES
=========================================================
*/

"use strict";

const HADOTI_DESTINATIONS = [

    {
        id: "mumbai",
        rank: 1,
        name: "Mumbai",
        nameHi: "मुंबई",
        state: "Maharashtra",
        region: "West India",
        category: ["Metro", "Beach", "Culture"],
        description: "भारत की आर्थिक राजधानी, समुद्र तटों, बॉलीवुड और ऐतिहासिक स्थलों के लिए प्रसिद्ध।",
        popularFor: ["Gateway of India", "Marine Drive", "Elephanta Caves"],
        tags: ["Maharashtra", "Bollywood", "Beach", "Gateway of India"]
    },

    {
        id: "delhi",
        rank: 2,
        name: "Delhi",
        nameHi: "दिल्ली",
        state: "Delhi",
        region: "North India",
        category: ["Heritage", "Culture", "Metro"],
        description: "भारत की राजधानी और इतिहास, संस्कृति तथा आधुनिक जीवन का शानदार संगम।",
        popularFor: ["Red Fort", "India Gate", "Qutub Minar"],
        tags: ["Capital", "History", "Monuments", "Culture"]
    },

    {
        id: "bengaluru",
        rank: 3,
        name: "Bengaluru",
        nameHi: "बेंगलुरु",
        state: "Karnataka",
        region: "South India",
        category: ["Metro", "Technology", "Garden"],
        description: "भारत का प्रमुख technology hub और pleasant weather के लिए प्रसिद्ध शहर।",
        popularFor: ["Lalbagh", "Cubbon Park", "Bangalore Palace"],
        tags: ["IT", "Technology", "Gardens", "Karnataka"]
    },

    {
        id: "hyderabad",
        rank: 4,
        name: "Hyderabad",
        nameHi: "हैदराबाद",
        state: "Telangana",
        region: "South India",
        category: ["Heritage", "Food", "Metro"],
        description: "चारमीनार, बिरयानी और निज़ामों की विरासत के लिए प्रसिद्ध शहर।",
        popularFor: ["Charminar", "Golconda Fort", "Hussain Sagar"],
        tags: ["Telangana", "Charminar", "Biryani", "Heritage"]
    },

    {
        id: "chennai",
        rank: 5,
        name: "Chennai",
        nameHi: "चेन्नई",
        state: "Tamil Nadu",
        region: "South India",
        category: ["Beach", "Culture", "Metro"],
        description: "दक्षिण भारत का प्रमुख सांस्कृतिक और समुद्री शहर।",
        popularFor: ["Marina Beach", "Kapaleeshwarar Temple", "Fort St George"],
        tags: ["Tamil Nadu", "Beach", "Temples", "Culture"]
    },

    {
        id: "kolkata",
        rank: 6,
        name: "Kolkata",
        nameHi: "कोलकाता",
        state: "West Bengal",
        region: "East India",
        category: ["Culture", "Heritage", "Food"],
        description: "साहित्य, कला, संस्कृति और colonial heritage के लिए प्रसिद्ध शहर।",
        popularFor: ["Victoria Memorial", "Howrah Bridge", "Indian Museum"],
        tags: ["West Bengal", "Culture", "Food", "Heritage"]
    },

    {
        id: "ahmedabad",
        rank: 7,
        name: "Ahmedabad",
        nameHi: "अहमदाबाद",
        state: "Gujarat",
        region: "West India",
        category: ["Heritage", "Food", "Metro"],
        description: "गुजरात का प्रमुख शहर और ऐतिहासिक तथा culinary experiences के लिए प्रसिद्ध।",
        popularFor: ["Sabarmati Ashram", "Adalaj Stepwell", "Old City"],
        tags: ["Gujarat", "Heritage", "Food", "Sabarmati"]
    },

    {
        id: "pune",
        rank: 8,
        name: "Pune",
        nameHi: "पुणे",
        state: "Maharashtra",
        region: "West India",
        category: ["Culture", "Education", "History"],
        description: "महाराष्ट्र का प्रमुख cultural और educational city।",
        popularFor: ["Shaniwar Wada", "Aga Khan Palace", "Sinhagad"],
        tags: ["Maharashtra", "Maratha", "Education", "History"]
    },

    {
        id: "jaipur",
        rank: 9,
        name: "Jaipur",
        nameHi: "जयपुर",
        state: "Rajasthan",
        region: "North India",
        category: ["Heritage", "Culture", "Shopping"],
        description: "राजस्थान की राजधानी और प्रसिद्ध Pink City।",
        popularFor: ["Amber Fort", "Hawa Mahal", "City Palace"],
        tags: ["Rajasthan", "Pink City", "Forts", "Heritage"]
    },

    {
        id: "surat",
        rank: 10,
        name: "Surat",
        nameHi: "सूरत",
        state: "Gujarat",
        region: "West India",
        category: ["Food", "Business", "Culture"],
        description: "गुजरात का प्रमुख business city और अपने food culture के लिए प्रसिद्ध।",
        popularFor: ["Dumas Beach", "Surat Castle", "Dutch Garden"],
        tags: ["Gujarat", "Food", "Business", "Beach"]
    },

    {
        id: "lucknow",
        rank: 11,
        name: "Lucknow",
        nameHi: "लखनऊ",
        state: "Uttar Pradesh",
        region: "North India",
        category: ["Heritage", "Food", "Culture"],
        description: "नवाबी संस्कृति, architecture और शानदार cuisine के लिए प्रसिद्ध।",
        popularFor: ["Bara Imambara", "Rumi Darwaza", "Hazratganj"],
        tags: ["Uttar Pradesh", "Nawabi", "Biryani", "Heritage"]
    },

    {
        id: "kanpur",
        rank: 12,
        name: "Kanpur",
        nameHi: "कानपुर",
        state: "Uttar Pradesh",
        region: "North India",
        category: ["City", "History", "Culture"],
        description: "गंगा किनारे बसा उत्तर प्रदेश का प्रमुख industrial city।",
        popularFor: ["JK Temple", "Moti Jheel", "Ganga Barrage"],
        tags: ["Uttar Pradesh", "Ganga", "Culture"]
    },

    {
        id: "nagpur",
        rank: 13,
        name: "Nagpur",
        nameHi: "नागपुर",
        state: "Maharashtra",
        region: "Central India",
        category: ["City", "Nature", "Culture"],
        description: "भारत के मध्य में स्थित प्रमुख शहर और Orange City के नाम से प्रसिद्ध।",
        popularFor: ["Deekshabhoomi", "Futala Lake", "Sitabardi Fort"],
        tags: ["Maharashtra", "Orange City", "Lakes"]
    },

    {
        id: "indore",
        rank: 14,
        name: "Indore",
        nameHi: "इंदौर",
        state: "Madhya Pradesh",
        region: "Central India",
        category: ["Food", "City", "Culture"],
        description: "मध्य प्रदेश का प्रमुख शहर और शानदार street food के लिए प्रसिद्ध।",
        popularFor: ["Rajwada", "Sarafa Bazaar", "Lal Bagh Palace"],
        tags: ["Madhya Pradesh", "Food", "Rajwada", "Street Food"]
    },

    {
        id: "bhopal",
        rank: 15,
        name: "Bhopal",
        nameHi: "भोपाल",
        state: "Madhya Pradesh",
        region: "Central India",
        category: ["Lakes", "Heritage", "Nature"],
        description: "झीलों के शहर के रूप में प्रसिद्ध मध्य प्रदेश की राजधानी।",
        popularFor: ["Upper Lake", "Sanchi", "Van Vihar"],
        tags: ["Madhya Pradesh", "Lake", "Nature", "Heritage"]
    },

    {
        id: "varanasi",
        rank: 16,
        name: "Varanasi",
        nameHi: "वाराणसी",
        state: "Uttar Pradesh",
        region: "North India",
        category: ["Spiritual", "Heritage", "Culture"],
        description: "गंगा घाटों और प्राचीन आध्यात्मिक परंपराओं के लिए प्रसिद्ध शहर।",
        popularFor: ["Ganga Ghats", "Kashi Vishwanath", "Ganga Aarti"],
        tags: ["Kashi", "Ganga", "Temples", "Spiritual"]
    },

    {
        id: "agra",
        rank: 17,
        name: "Agra",
        nameHi: "आगरा",
        state: "Uttar Pradesh",
        region: "North India",
        category: ["Heritage", "Monuments", "Culture"],
        description: "ताजमहल और मुगल विरासत के लिए विश्व प्रसिद्ध शहर।",
        popularFor: ["Taj Mahal", "Agra Fort", "Mehtab Bagh"],
        tags: ["Taj Mahal", "Mughal", "Heritage", "Uttar Pradesh"]
    },

    {
        id: "udaipur",
        rank: 18,
        name: "Udaipur",
        nameHi: "उदयपुर",
        state: "Rajasthan",
        region: "West India",
        category: ["Lakes", "Heritage", "Romantic"],
        description: "झीलों, महलों और अरावली पहाड़ियों के लिए प्रसिद्ध राजस्थान का शहर।",
        popularFor: ["City Palace", "Lake Pichola", "Sajjangarh"],
        tags: ["Rajasthan", "Lakes", "Palace", "Aravalli"]
    },

    {
        id: "jodhpur",
        rank: 19,
        name: "Jodhpur",
        nameHi: "जोधपुर",
        state: "Rajasthan",
        region: "West India",
        category: ["Heritage", "Desert", "Culture"],
        description: "Blue City और Mehrangarh Fort के लिए प्रसिद्ध शहर।",
        popularFor: ["Mehrangarh Fort", "Blue City", "Jaswant Thada"],
        tags: ["Rajasthan", "Blue City", "Fort", "Desert"]
    },

    {
        id: "kota",
        rank: 20,
        name: "Kota",
        nameHi: "कोटा",
        state: "Rajasthan",
        region: "Hadoti",
        category: ["Education", "Heritage", "River"],
        description: "चंबल नदी और शिक्षा के लिए प्रसिद्ध हाड़ौती का प्रमुख शहर।",
        popularFor: ["Chambal River", "Kota Barrage", "Seven Wonders Park"],
        tags: ["Hadoti", "Rajasthan", "Chambal", "Education"]
    },

    {
        id: "bundi",
        rank: 21,
        name: "Bundi",
        nameHi: "बूंदी",
        state: "Rajasthan",
        region: "Hadoti",
        category: ["Heritage", "Fort", "Culture"],
        description: "किले, महलों, बावड़ियों और चित्रकला के लिए प्रसिद्ध हाड़ौती शहर।",
        popularFor: ["Taragarh Fort", "Bundi Palace", "Raniji Ki Baori"],
        tags: ["Hadoti", "Rajasthan", "Fort", "Baori"]
    },

    {
        id: "ajmer",
        rank: 22,
        name: "Ajmer",
        nameHi: "अजमेर",
        state: "Rajasthan",
        region: "North India",
        category: ["Spiritual", "Heritage", "Culture"],
        description: "धार्मिक और ऐतिहासिक महत्व वाला राजस्थान का प्रमुख शहर।",
        popularFor: ["Ajmer Sharif", "Ana Sagar", "Adhai Din Ka Jhonpra"],
        tags: ["Rajasthan", "Ajmer Sharif", "Lake", "Heritage"]
    },

    {
        id: "pushkar",
        rank: 23,
        name: "Pushkar",
        nameHi: "पुष्कर",
        state: "Rajasthan",
        region: "North India",
        category: ["Spiritual", "Culture", "Desert"],
        description: "पवित्र झील, मंदिरों और प्रसिद्ध Pushkar Fair के लिए जाना जाता है।",
        popularFor: ["Pushkar Lake", "Brahma Temple", "Pushkar Fair"],
        tags: ["Rajasthan", "Temple", "Lake", "Fair"]
    },

    {
        id: "amritsar",
        rank: 24,
        name: "Amritsar",
        nameHi: "अमृतसर",
        state: "Punjab",
        region: "North India",
        category: ["Spiritual", "Food", "Heritage"],
        description: "Golden Temple और पंजाबी संस्कृति के लिए प्रसिद्ध शहर।",
        popularFor: ["Golden Temple", "Jallianwala Bagh", "Wagah Border"],
        tags: ["Punjab", "Golden Temple", "Food", "History"]
    },

    {
        id: "chandigarh",
        rank: 25,
        name: "Chandigarh",
        nameHi: "चंडीगढ़",
        state: "Chandigarh",
        region: "North India",
        category: ["City", "Architecture", "Garden"],
        description: "योजनाबद्ध architecture और modern urban design के लिए प्रसिद्ध शहर।",
        popularFor: ["Rock Garden", "Sukhna Lake", "Capitol Complex"],
        tags: ["Punjab", "Haryana", "Architecture", "Garden"]
    },

    {
        id: "dehradun",
        rank: 26,
        name: "Dehradun",
        nameHi: "देहरादून",
        state: "Uttarakhand",
        region: "North India",
        category: ["Nature", "Hills", "Education"],
        description: "हिमालय की तलहटी में बसा खूबसूरत शहर।",
        popularFor: ["Robber's Cave", "Sahastradhara", "Forest Research Institute"],
        tags: ["Uttarakhand", "Hills", "Nature"]
    },

    {
        id: "haridwar",
        rank: 27,
        name: "Haridwar",
        nameHi: "हरिद्वार",
        state: "Uttarakhand",
        region: "North India",
        category: ["Spiritual", "River", "Culture"],
        description: "गंगा तट पर स्थित भारत के प्रमुख तीर्थ शहरों में से एक।",
        popularFor: ["Har Ki Pauri", "Ganga Aarti", "Mansa Devi"],
        tags: ["Uttarakhand", "Ganga", "Temple", "Spiritual"]
    },

    {
        id: "rishikesh",
        rank: 28,
        name: "Rishikesh",
        nameHi: "ऋषिकेश",
        state: "Uttarakhand",
        region: "North India",
        category: ["Adventure", "Spiritual", "Nature"],
        description: "योग, गंगा और adventure activities के लिए प्रसिद्ध शहर।",
        popularFor: ["Laxman Jhula", "River Rafting", "Ganga Aarti"],
        tags: ["Uttarakhand", "Yoga", "Rafting", "Ganga"]
    },

    {
        id: "shimla",
        rank: 29,
        name: "Shimla",
        nameHi: "शिमला",
        state: "Himachal Pradesh",
        region: "North India",
        category: ["Hill Station", "Nature", "Heritage"],
        description: "हिमाचल प्रदेश की प्रसिद्ध पहाड़ी राजधानी।",
        popularFor: ["Mall Road", "Ridge", "Jakhoo Temple"],
        tags: ["Himachal Pradesh", "Hill Station", "Snow", "Mountains"]
    },

    {
        id: "manali",
        rank: 30,
        name: "Manali",
        nameHi: "मनाली",
        state: "Himachal Pradesh",
        region: "North India",
        category: ["Hill Station", "Adventure", "Nature"],
        description: "बर्फ, पहाड़ों और adventure activities के लिए प्रसिद्ध destination।",
        popularFor: ["Solang Valley", "Rohtang", "Hadimba Temple"],
        tags: ["Himachal Pradesh", "Snow", "Adventure", "Mountains"]
    },

    {
        id: "dharamshala",
        rank: 31,
        name: "Dharamshala",
        nameHi: "धर्मशाला",
        state: "Himachal Pradesh",
        region: "North India",
        category: ["Hills", "Spiritual", "Nature"],
        description: "धौलाधार पहाड़ियों और Tibetan culture के लिए प्रसिद्ध।",
        popularFor: ["McLeod Ganj", "Dal Lake", "Triund"],
        tags: ["Himachal Pradesh", "Mountains", "Tibetan", "Trekking"]
    },

    {
        id: "srinagar",
        rank: 32,
        name: "Srinagar",
        nameHi: "श्रीनगर",
        state: "Jammu and Kashmir",
        region: "North India",
        category: ["Lake", "Mountains", "Culture"],
        description: "डल झील, शिकारा और कश्मीर की प्राकृतिक सुंदरता के लिए प्रसिद्ध।",
        popularFor: ["Dal Lake", "Mughal Gardens", "Shikara Ride"],
        tags: ["Kashmir", "Dal Lake", "Mountains", "Shikara"]
    },

    {
        id: "jammu",
        rank: 33,
        name: "Jammu",
        nameHi: "जम्मू",
        state: "Jammu and Kashmir",
        region: "North India",
        category: ["Spiritual", "Heritage", "Hills"],
        description: "मंदिरों और हिमालयी क्षेत्र के gateway के रूप में प्रसिद्ध।",
        popularFor: ["Vaishno Devi", "Raghunath Temple", "Bahubali"],
        tags: ["Jammu", "Temple", "Hills", "Pilgrimage"]
    },

    {
        id: "leh",
        rank: 34,
        name: "Leh",
        nameHi: "लेह",
        state: "Ladakh",
        region: "North India",
        category: ["Adventure", "Mountains", "Culture"],
        description: "ऊँचे पहाड़ों, monasteries और spectacular landscapes के लिए प्रसिद्ध।",
        popularFor: ["Leh Palace", "Shanti Stupa", "Magnetic Hill"],
        tags: ["Ladakh", "Mountains", "Buddhism", "Adventure"]
    },

    {
        id: "goa",
        rank: 35,
        name: "Panaji",
        nameHi: "पणजी",
        state: "Goa",
        region: "West India",
        category: ["Beach", "Culture", "Food"],
        description: "गोवा की राजधानी और Portuguese heritage तथा beaches का gateway।",
        popularFor: ["Fontainhas", "Miramar Beach", "Dona Paula"],
        tags: ["Goa", "Beach", "Portuguese", "Food"]
    },

    {
        id: "nashik",
        rank: 36,
        name: "Nashik",
        nameHi: "नासिक",
        state: "Maharashtra",
        region: "West India",
        category: ["Spiritual", "Food", "Nature"],
        description: "गोदावरी नदी, मंदिरों और vineyards के लिए प्रसिद्ध।",
        popularFor: ["Trimbakeshwar", "Sula Vineyards", "Godavari Ghats"],
        tags: ["Maharashtra", "Temple", "Godavari", "Vineyard"]
    },

    {
        id: "aurangabad",
        rank: 37,
        name: "Chhatrapati Sambhajinagar",
        nameHi: "छत्रपति संभाजीनगर",
        state: "Maharashtra",
        region: "West India",
        category: ["Heritage", "Caves", "Culture"],
        description: "Ajanta और Ellora जैसे विश्व प्रसिद्ध heritage sites का gateway।",
        popularFor: ["Ajanta Caves", "Ellora Caves", "Bibi Ka Maqbara"],
        tags: ["Maharashtra", "Ajanta", "Ellora", "Heritage"]
    },

    {
        id: "vadodara",
        rank: 38,
        name: "Vadodara",
        nameHi: "वडोदरा",
        state: "Gujarat",
        region: "West India",
        category: ["Heritage", "Culture", "Art"],
        description: "महलों, कला और सांस्कृतिक विरासत के लिए प्रसिद्ध गुजरात का शहर।",
        popularFor: ["Laxmi Vilas Palace", "Sayaji Garden", "Baroda Museum"],
        tags: ["Gujarat", "Palace", "Culture", "Art"]
    },

    {
        id: "rajkot",
        rank: 39,
        name: "Rajkot",
        nameHi: "राजकोट",
        state: "Gujarat",
        region: "West India",
        category: ["Culture", "History", "Food"],
        description: "सौराष्ट्र क्षेत्र का प्रमुख शहर और गांधीजी के जीवन से जुड़ा स्थान।",
        popularFor: ["Kaba Gandhi No Delo", "Rotary Midtown Dolls Museum"],
        tags: ["Gujarat", "Gandhi", "Saurashtra"]
    },

    {
        id: "bhubaneswar",
        rank: 40,
        name: "Bhubaneswar",
        nameHi: "भुवनेश्वर",
        state: "Odisha",
        region: "East India",
        category: ["Temple", "Heritage", "Culture"],
        description: "मंदिरों और प्राचीन कलिंग architecture के लिए प्रसिद्ध।",
        popularFor: ["Lingaraj Temple", "Udayagiri Caves", "Dhauli"],
        tags: ["Odisha", "Temple", "Kalinga", "Heritage"]
    },

    {
        id: "puri",
        rank: 41,
        name: "Puri",
        nameHi: "पुरी",
        state: "Odisha",
        region: "East India",
        category: ["Beach", "Spiritual", "Culture"],
        description: "जगन्नाथ मंदिर और समुद्र तट के लिए प्रसिद्ध धार्मिक शहर।",
        popularFor: ["Jagannath Temple", "Puri Beach", "Rath Yatra"],
        tags: ["Odisha", "Jagannath", "Beach", "Rath Yatra"]
    },

    {
        id: "konark",
        rank: 42,
        name: "Konark",
        nameHi: "कोणार्क",
        state: "Odisha",
        region: "East India",
        category: ["Heritage", "Temple", "Culture"],
        description: "प्रसिद्ध Sun Temple और ancient architecture के लिए जाना जाता है।",
        popularFor: ["Sun Temple", "Chandrabhaga Beach"],
        tags: ["Odisha", "Sun Temple", "Heritage"]
    },

    {
        id: "guwahati",
        rank: 43,
        name: "Guwahati",
        nameHi: "गुवाहाटी",
        state: "Assam",
        region: "Northeast India",
        category: ["Nature", "Spiritual", "Culture"],
        description: "असम का प्रमुख gateway city और ब्रह्मपुत्र नदी के किनारे स्थित शहर।",
        popularFor: ["Kamakhya Temple", "Brahmaputra River", "Umananda"],
        tags: ["Assam", "Brahmaputra", "Kamakhya", "Northeast"]
    },

    {
        id: "shillong",
        rank: 44,
        name: "Shillong",
        nameHi: "शिलांग",
        state: "Meghalaya",
        region: "Northeast India",
        category: ["Hill Station", "Nature", "Culture"],
        description: "मेघालय की पहाड़ियों और waterfalls के लिए प्रसिद्ध राजधानी।",
        popularFor: ["Umiam Lake", "Elephant Falls", "Shillong Peak"],
        tags: ["Meghalaya", "Hills", "Waterfalls", "Northeast"]
    },

    {
        id: "gangtok",
        rank: 45,
        name: "Gangtok",
        nameHi: "गंगटोक",
        state: "Sikkim",
        region: "Northeast India",
        category: ["Mountains", "Culture", "Nature"],
        description: "हिमालयी views और Buddhist monasteries के लिए प्रसिद्ध।",
        popularFor: ["Tsomgo Lake", "Rumtek Monastery", "MG Marg"],
        tags: ["Sikkim", "Himalaya", "Monastery", "Mountains"]
    },

    {
        id: "darjeeling",
        rank: 46,
        name: "Darjeeling",
        nameHi: "दार्जिलिंग",
        state: "West Bengal",
        region: "East India",
        category: ["Hill Station", "Tea", "Nature"],
        description: "चाय के बागानों और Kanchenjung
// ===============================
// HADOTI WALE BHAIYA - DATABASE API
// ===============================

const API_BASE_URL = "https://hadotiwalebhaiya.onrender.com";

async function loadDestinationsFromDatabase() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/destinations`);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const result = await response.json();

        console.log("Database destinations:", result);

        return result;
    } catch (error) {
        console.error("Database connection error:", error);
        return null;
    }
}

loadDestinationsFromDatabase();