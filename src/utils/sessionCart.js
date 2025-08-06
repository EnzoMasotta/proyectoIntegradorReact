export function addReservationToCart(reservation) {
  const existingCart =
    JSON.parse(sessionStorage.getItem("reservationCart")) || [];

  const alreadyExistsIndex = existingCart.findIndex((res) => {
    const sameHotel = res.hotelId === reservation.hotelId;

    const sameOriginAirportCode =
      res.flightData.originAirport?.code ===
      reservation.flightData.originAirport?.code;

    return sameHotel && sameOriginAirportCode;
  });

  if (alreadyExistsIndex !== -1) {
    existingCart[alreadyExistsIndex] = reservation;
  } else {
    existingCart.push(reservation);
  }

  sessionStorage.setItem("reservationCart", JSON.stringify(existingCart));
}
