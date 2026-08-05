import room1Img from '../assets/room1.jpg';
import room2Img from '../assets/room2.jpg';
import room3Img from '../assets/room3.jpg';
import cabinInterior from '../assets/cabin_interior.jpg';
import pineSlide1 from '../assets/pine_slide1.jpg';
import pineSlide2 from '../assets/pine_slide2.jpg';
import pineSlide3 from '../assets/pine_slide3.jpg';
import pineSlide4 from '../assets/pine_slide4.jpg';
import heroBalcony from '../assets/hero_balcony.jpg';
import heroWinter from '../assets/hero_winter.jpg';

export const roomsData = [
  {
    id: "pine-chalet",
    name: "Anandaa",
    type: "Mountain Refuge",
    occupancy: "2 Adults | Mountain View",
    price: 340,
    priceInr: 3500,
    rateDetails: "",
    description: "Start your mornings with a cup of coffee on your private balcony as the first rays of sunlight touch the mountains. Anandaa is designed for those who seek quiet moments, uninterrupted views, and the simple comfort of slowing down. Warm wooden interiors and thoughtful details create a space that feels calm, cozy, and effortlessly welcoming.",
    amenities: [
      "Private Balcony",
      "Wifi",
      "Electric Kettle",
      "Geyser",
      "Wooden Interiors",
      "Pet Friendly",
      "Attached Washroom",
      "Blankets & Linens"
    ],
    icons: ["balcony", "wifi", "local_cafe", "whatshot", "check_circle", "pets", "wash", "bed"],
    images: [room1Img, pineSlide1, pineSlide2],
    image: room1Img
  },
  {
    id: "cedar-suite",
    name: "Tattva",
    type: "Elevated Luxury",
    occupancy: "2 Adults • Private Balcony",
    price: 520,
    priceInr: 3500,
    rateDetails: "",
    description: "Tattva invites you to experience the mountains at their own pace. Step onto your private balcony to watch the clouds drift through the valley, spend your afternoons lost in a good book, and let the silence become part of your stay. It's a room made for rest, reflection, and reconnecting with nature.",
    amenities: [
      "Private Balcony",
      "Wifi",
      "Electric Kettle",
      "Geyser",
      "Wooden Interiors",
      "Pet Friendly",
      "Attached Washroom",
      "Blankets & Linens"
    ],
    icons: ["balcony", "wifi", "local_cafe", "whatshot", "check_circle", "pets", "wash", "bed"],
    images: [room2Img, pineSlide3, pineSlide4],
    image: room2Img
  },
  {
    id: "oak-studio",
    name: "Samsara",
    type: "Intimate Escape",
    occupancy: "2 Guests • Garden View",
    price: 210,
    priceInr: 15000,
    rateDetails: "BASE RATE FOR 2 GUESTS. MEALS AND LOCAL GUIDED WALK INCLUDED.",
    description: "Perfect for the solo explorer or a couple seeking intimacy, the Oak Studio is a masterclass in functional minimalism. Its compact layout maximizes light and views, providing a serene base for your mountain adventures.",
    amenities: [
      "Reading Nook",
      "Natural Light",
      "Queen Size Bed",
      "Studio Porch",
      "En-suite bathroom",
      "Writing desk"
    ],
    icons: ["menu_book", "light_mode", "bed", "deck", "check_circle", "check_circle"],
    images: [room3Img, heroBalcony, heroWinter],
    image: room3Img
  },
  {
    id: "private-rooms",
    name: "Lokah- The Dormitory",
    type: "Cozy Refuge",
    occupancy: "2 Adults • Mountain View",
    price: 150,
    priceInr: 8000,
    rateDetails: "BASE RATE FOR 2 ADULTS. EXTRA BED AVAILABLE AT ₹1,500/NIGHT. ROOM ONLY — MEALS ARE A LA CARTE FROM THE RESTAURANT.",
    description: "Wooden interiors. A private washroom. A balcony facing the mountain. You will watch moonrises from here. And sunsets. And a night sky that makes you understand why people come to places like this.",
    amenities: [
      "Private washroom",
      "Mountain-facing balcony",
      "Wooden interiors throughout",
      "Moonrise, sunset and night sky views",
      "Base occupancy 2 adults",
      "Extra bed on request (₹1,500/night)",
      "Kids welcome",
      "Pets welcome (₹1,000/pet)",
      "WiFi, heating, hot water"
    ],
    icons: ["check_circle", "check_circle", "check_circle", "check_circle", "check_circle", "check_circle", "check_circle", "check_circle", "check_circle"],
    images: [cabinInterior, room1Img, room2Img],
    image: cabinInterior
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
