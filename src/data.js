// Edit this file each month: the month name and the three destinations.
// Photos live in the assets folder. Set details to null until a full guide is ready.

export const MONTH = 'November 2026';

export const DESTINATIONS = [
  {
    id: 'lisbon',
    name: 'Lisbon',
    country: 'Portugal',
    photo: require('../assets/lisbon.jpg'),
    tagline: 'Mild winter sun and hilltop views.',
    go: 'Alfama at sunset',
    skip: 'Tram 28 at midday',
    details: {
      why: 'The summer crowds are gone and the days are still mild. On 11 November the city celebrates São Martinho, and roasted chestnut carts fill the street corners.',
      facts: [
        { label: 'WEATHER', value: '11–18°C' },
        { label: 'BUDGET', value: '€€' },
        { label: 'STAY', value: '3–4 days' },
        { label: 'CURRENCY', value: 'Euro' },
      ],
      go: [
        { name: 'Miradouro da Senhora do Monte', note: 'One of the highest viewpoints in the city. Arrive half an hour before sunset.' },
        { name: 'Alfama before 10am', note: 'Wander the old lanes before the tour groups arrive.' },
        { name: 'Belém', note: 'Jerónimos Monastery, then custard tarts at Pastéis de Belém.' },
        { name: 'LX Factory', note: 'A former industrial complex full of shops, bars and the Ler Devagar bookshop.' },
      ],
      skip: [
        { name: 'Tram 28 at midday', note: 'Packed, slow and a favourite with pickpockets.', instead: 'Ride it before 9am, or walk the route.' },
        { name: 'The Santa Justa Lift queue', note: 'A long wait for a very short ride.', instead: 'Walk to the top from Largo do Carmo.' },
        { name: 'Restaurants with touts on Rua Augusta', note: 'Tourist prices for average food.', instead: 'Eat at a local tasca in Graça or Campo de Ourique.' },
      ],
    },
  },
  {
    id: 'kotor',
    name: 'Kotor',
    country: 'Montenegro',
    photo: require('../assets/kotor.jpg'),
    tagline: 'A fjord-like bay without the summer crowds.',
    go: 'The fortress walk at dawn',
    skip: 'Old town on cruise ship days',
    details: null,
  },
  {
    id: 'ljubljana',
    name: 'Ljubljana',
    country: 'Slovenia',
    photo: require('../assets/ljubljana.jpg'),
    tagline: 'Christmas lights from late November.',
    go: 'Riverside cafés on Trubarjeva',
    skip: 'The castle restaurant',
    details: null,
  },
];
