import room1Img from '../assets/room1.jpg';
import room2Img from '../assets/room2.jpg';
import room3Img from '../assets/room3.jpg';

export const roomsData = [
  {
    id: "pine-chalet",
    name: "Pine Chalet",
    type: "Mountain Refuge",
    occupancy: "2 Adults • Forest View",
    price: 340,
    priceInr: 18000,
    description: "Tucked away in a private corner of the property, the Pine Chalet is a celebration of raw organic textures. With its private balcony and hand-selected wood paneling, it offers an immersive experience into the surrounding forest.",
    amenities: ["Fiber Wi-Fi", "Stone Fireplace", "Private Balcony", "Organic Linens"],
    icons: ["wifi", "whatshot", "balcony", "eco"],
    image: room1Img
  },
  {
    id: "cedar-suite",
    name: "Cedar Suite",
    type: "Elevated Luxury",
    occupancy: "4 Guests • River Facing",
    price: 520,
    priceInr: 24500,
    description: "Our most expansive offering, the Cedar Suite features 180-degree panoramic views of the Himalayan range. Designed for those who seek uncompromised space, the suite includes a dedicated lounge area and a spa-inspired bathroom.",
    amenities: ["Copper Tub", "Panoramic Views", "Private Lounge", "Nespresso Station"],
    icons: ["bathtub", "landscape", "weekend", "local_cafe"],
    image: room2Img
  },
  {
    id: "oak-studio",
    name: "Oak Studio",
    type: "Intimate Escape",
    occupancy: "2 Guests • Garden View",
    price: 210,
    priceInr: 15000,
    description: "Perfect for the solo explorer or a couple seeking intimacy, the Oak Studio is a masterclass in functional minimalism. Its compact layout maximizes light and views, providing a serene base for your mountain adventures.",
    amenities: ["Reading Nook", "Natural Light", "Queen Size Bed", "Studio Porch"],
    icons: ["menu_book", "light_mode", "bed", "deck"],
    image: room3Img
  }
];

export const getRooms = () => {
  return Promise.resolve(roomsData);
};

export const getRoomById = (id) => {
  const room = roomsData.find(r => r.id === id);
  if (room) {
    return Promise.resolve(room);
  }
  return Promise.reject(new Error("Room not found"));
};

export const createBooking = (bookingData) => {
  // Mock booking confirmation
  const bookingId = "BK-" + Math.floor(100000 + Math.random() * 900000);
  const room = roomsData.find(r => r.id === bookingData.roomId) || roomsData[0];
  
  const booking = {
    id: bookingId,
    ...bookingData,
    roomName: room.name,
    totalPrice: room.priceInr,
    status: "Confirmed",
    createdAt: new Date().toISOString()
  };

  return Promise.resolve({
    booking,
    message: `Thank you, ${bookingData.guestName}! Your stay in ${room.name} has been successfully confirmed. A detailed itinerary has been sent to ${bookingData.guestEmail}.`,
    success: true
  });
};
