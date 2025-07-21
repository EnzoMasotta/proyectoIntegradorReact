import { calculateDistanceInKm } from "./distanceCalculator";
import { locationsByCountry } from "../data/locations";
import packages from "../data/packages.json";

export const buildAllPackages = () => {
  const allPackages = [];

  for (const pais in packages) {
    const provincias = packages[pais];
    for (const provincia in provincias) {
      const packagesProvincia = provincias[provincia];
      packagesProvincia.forEach((hotel) => {
        allPackages.push({
          ...hotel,
          country: pais,
          province: provincia,
          city: provincia,
        });
      });
    }
  }

  return allPackages;
};

export const findCityCoords = (cityName) => {
  for (const country in locationsByCountry) {
    const cityObj = locationsByCountry[country].find(
      (c) => c.city.toLowerCase() === cityName.toLowerCase()
    );
    if (cityObj) return cityObj;
  }
  return null;
};

export const calculatePackageResults = ({
  allPackages,
  destinoCity,
  fromCoords,
  range,
  fixedFlightCost = 100000,
  pricePerKm = 150,
}) => {
  return allPackages
    .filter(
      (pkg) =>
        pkg.province?.toLowerCase().includes(destinoCity) ||
        pkg.country?.toLowerCase().includes(destinoCity) ||
        pkg.title?.toLowerCase().includes(destinoCity)
    )
    .map((pkg) => {
      const toCoords = findCityCoords(pkg.city);
      let distanceCost = 0;

      if (fromCoords && toCoords) {
        const distance = calculateDistanceInKm(
          fromCoords.lat,
          fromCoords.lon,
          toCoords.lat,
          toCoords.lon
        );
        distanceCost = Math.round(distance * pricePerKm);
      }

      const totalNights =
        range.from && range.to
          ? Math.max(
              1,
              Math.round((range.to - range.from) / (1000 * 60 * 60 * 24))
            )
          : 1;

      const totalFlightCost = fixedFlightCost + distanceCost;
      const totalPrice = pkg.pricePerNight * totalNights + totalFlightCost;

      return {
        ...pkg,
        pricePerNight: pkg.pricePerNight,
        nights: totalNights,
        flightCostFixed: fixedFlightCost,
        flightCostVariable: distanceCost,
        totalFlightCost,
        totalPrice,
      };
    });
};
