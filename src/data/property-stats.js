export const propertyStats = {
  overview: {
    totalSqFt: 3000000,
    totalSqFtFormatted: '3M',
    annualVisitors: 40000000,
    annualVisitorsFormatted: '40M+',
    totalBrands: 450,
    diningOptions: 70,
    parkingSpaces: 33000,
    entertainmentPercent: 55,
    occupancyRate: 90
  },
  location: {
    city: 'East Rutherford',
    state: 'New Jersey',
    distanceToNYC: 7, // miles
    metroPopulation: 20000000,
    metroPopulationFormatted: '20M+',
    medianHouseholdIncome: 75000,
    taxAdvantage: 'Zero sales tax on clothing & footwear'
  },
  luxury: {
    wingName: 'The Avenue',
    keyBrands: ['Hermès', 'Saint Laurent', 'Tiffany & Co.', 'Dolce & Gabbana', 'Gucci', 'Balenciaga'],
  },
  entertainment: {
    nickelodeonUniverse: {
      name: 'Nickelodeon Universe',
      tagline: 'Largest indoor theme park in the Western Hemisphere',
      rides: 20,
      sqFt: 8.5, // acres
    },
    dreamWorksWaterPark: {
      name: 'DreamWorks Water Park',
      tagline: 'Largest indoor water park in North America',
      slides: 15,
      temp: '82°F year-round',
    },
    bigSnow: {
      name: 'Big SNOW',
      tagline: 'North America\'s only indoor real-snow ski slope',
      verticalDrop: 160, // feet
      acres: 5,
    }
  },
  venues: {
    dreamLive: {
      name: 'Dream Live Performing Arts Center',
      capacity: 3000,
      features: ['Luxury boxes', 'VIP seating', '4 signature bars', 'Multi-level layout'],
      ticketing: 'Ticketmaster',
      catering: 'Aramark',
      types: ['Concerts', 'Comedy', 'Theater', 'Corporate Events', 'Private Galas', 'Brand Activations']
    }
  },
  dining: {
    total: 70,
    foodHallSqFt: 10000,
    highlights: [
      { name: 'Carpaccio', type: 'Upscale Italian', location: 'The Avenue' },
      { name: 'Yard House', type: 'American Craft', location: 'Court A' },
      { name: 'H Mart Food Hall', type: 'Korean Market', location: 'Court B' },
      { name: 'Lady M', type: 'Boutique Bakery', location: 'Food Hall' },
    ]
  }
};
