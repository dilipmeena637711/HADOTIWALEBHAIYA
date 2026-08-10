/*
=========================================================
HADOTI WALE BHAIYA
DESTINATIONS DATA
=========================================================

This file contains destination information only.
Website functionality is handled by script.js.
=========================================================
*/

"use strict";

const HADOTI_DESTINATIONS = [

    {
        id: "kota",
        name: "Kota",
        nameHi: "कोटा",
        region: "Hadoti, Rajasthan",
        category: "City & Heritage",
        emoji: "🏰",
        description:
            "चंबल नदी, ऐतिहासिक स्थलों, बगीचों और आधुनिक शहर के लिए प्रसिद्ध।",
        tags: [
            "Chambal",
            "Heritage",
            "Gardens",
            "City"
        ]
    },

    {
        id: "bundi",
        name: "Bundi",
        nameHi: "बूंदी",
        region: "Hadoti, Rajasthan",
        category: "Fort & Heritage",
        emoji: "🏯",
        description:
            "किले, महल, बावड़ियों और खूबसूरत चित्रकारी के लिए प्रसिद्ध ऐतिहासिक शहर।",
        tags: [
            "Fort",
            "Palace",
            "Baori",
            "History"
        ]
    },

    {
        id: "baran",
        name: "Baran",
        nameHi: "बारां",
        region: "Hadoti, Rajasthan",
        category: "Nature & Heritage",
        emoji: "🌿",
        description:
            "प्राकृतिक सुंदरता, प्राचीन मंदिरों और स्थानीय संस्कृति से जुड़ा क्षेत्र।",
        tags: [
            "Nature",
            "Temples",
            "Culture",
            "Heritage"
        ]
    },

    {
        id: "jhalawar",
        name: "Jhalawar",
        nameHi: "झालावाड़",
        region: "Hadoti, Rajasthan",
        category: "Nature & Heritage",
        emoji: "🌳",
        description:
            "हरे-भरे वातावरण, ऐतिहासिक इमारतों और आसपास के प्राकृतिक स्थलों के लिए जाना जाता है।",
        tags: [
            "Nature",
            "Heritage",
            "Palaces",
            "Culture"
        ]
    },

    {
        id: "mukundara",
        name: "Mukundara Hills",
        nameHi: "मुकुंदरा हिल्स",
        region: "Hadoti, Rajasthan",
        category: "Wildlife & Nature",
        emoji: "🐅",
        description:
            "पहाड़ियों, जंगलों और वन्यजीवों से जुड़ा खूबसूरत प्राकृतिक क्षेत्र।",
        tags: [
            "Wildlife",
            "Hills",
            "Forest",
            "Nature"
        ]
    },

    {
        id: "chambal",
        name: "Chambal River",
        nameHi: "चंबल नदी",
        region: "Hadoti, Rajasthan",
        category: "Nature",
        emoji: "🌊",
        description:
            "हाड़ौती की पहचान से जुड़ी चंबल नदी और उसके आसपास के खूबसूरत प्राकृतिक दृश्य।",
        tags: [
            "River",
            "Nature",
            "Boating",
            "Photography"
        ]
    }

];


/*
=========================================================
HELPER FUNCTIONS
=========================================================
*/

function getAllDestinations() {
    return [...HADOTI_DESTINATIONS];
}


function getDestinationById(id) {

    if (!id) {
        return null;
    }

    return HADOTI_DESTINATIONS.find(
        destination => destination.id === String(id).toLowerCase()
    ) || null;
}


function searchDestinations(query) {

    if (!query || typeof query !== "string") {
        return getAllDestinations();
    }

    const searchText = query.trim().toLowerCase();

    if (!searchText) {
        return getAllDestinations();
    }

    return HADOTI_DESTINATIONS.filter(destination => {

        const searchableText = [
            destination.id,
            destination.name,
            destination.nameHi,
            destination.region,
            destination.category,
            destination.description,
            ...(destination.tags || [])
        ]
        .join(" ")
        .toLowerCase();

        return searchableText.includes(searchText);
    });
}


/*
=========================================================
OPTIONAL GLOBAL EXPORT
=========================================================
*/

window.HADOTI_DESTINATIONS = HADOTI_DESTINATIONS;
window.getAllDestinations = getAllDestinations;
window.getDestinationById = getDestinationById;
window.searchDestinations = searchDestinations;