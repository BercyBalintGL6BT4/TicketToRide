import { ticketToRideData } from "./assets/ticket-to-ride-data";

const longDestinations = Object.values(ticketToRideData.longDestinations);
const shortDestinations = Object.values(ticketToRideData.destinations);

export const playerDatas = {
  players: [
    {
      id: 0,
      name: "Joska",
      trains: 45,
      train_cards: [
        {
          id: 1,
          color: "blue",
          count: 1,
        },
        {
          id: 2,
          color: "yellow",
          count: 1,
        },
        {
          id: 3,
          color: "green",
          count: 1,
        },
        {
          id: 4,
          color: "red",
          count: 1,
        },
        {
          id: 5,
          color: "black",
          count: 1,
        },
      ],
      long_distance_card:
        longDestinations[Math.floor(Math.random() * longDestinations.length)],
      short_distance_cards: [
        shortDestinations[Math.floor(Math.random() * shortDestinations.length)],
        shortDestinations[Math.floor(Math.random() * shortDestinations.length)],
        shortDestinations[Math.floor(Math.random() * shortDestinations.length)],
        shortDestinations[Math.floor(Math.random() * shortDestinations.length)],
      ],
      placed_connections: [],
      moves: [],
    },
    {
      id: 1,
      name: "Jancs",
      train_cards: [
        {
          id: 1,
          color: "orange",
          count: 1,
        },
        {
          id: 2,
          color: "purple",
          count: 1,
        },
        {
          id: 3,
          color: "black",
          count: 1,
        },
        {
          id: 4,
          color: "red",
          count: 2,
        },
      ],
      trains: 45,
      long_distance_card:
        longDestinations[Math.floor(Math.random() * longDestinations.length)],
      short_distance_cards: [
        shortDestinations[Math.floor(Math.random() * shortDestinations.length)],
        shortDestinations[Math.floor(Math.random() * shortDestinations.length)],
        shortDestinations[Math.floor(Math.random() * shortDestinations.length)],
        shortDestinations[Math.floor(Math.random() * shortDestinations.length)],
      ],
      placed_connections: [],
      moves: [],
    },
  ],
  actualPlayer: 0,
};
