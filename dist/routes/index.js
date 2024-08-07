"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allRoutes = void 0;
const express_1 = __importDefault(require("express"));
const activity_routes_1 = require("../app/modules/activities/activity.routes");
const airport_transfer_routes_1 = require("../app/modules/AirportTransfer/airport-transfer.routes");
const atm_routes_1 = require("../app/modules/atm/atm.routes");
const availability_routes_1 = require("../app/modules/availability/availability.routes");
const booking_routes_1 = require("../app/modules/bookign/booking.routes");
const car_rental_route_1 = require("../app/modules/carRental/car-rental.route");
const city_routes_1 = require("../app/modules/city/city.routes");
const country_routes_1 = require("../app/modules/country/country.routes");
const emergency_number_routes_1 = require("../app/modules/emergency-number/emergency-number.routes");
const goldBox_routes_1 = __importDefault(require("../app/modules/goldBox/goldBox.routes"));
const hospital_routes_1 = require("../app/modules/hospital/hospital.routes");
const hotel_routes_1 = require("../app/modules/hotels/hotel.routes");
const monthly_rental_apartments_routes_1 = require("../app/modules/monthly-rental-apartments/monthly-rental-apartments.routes");
const pharmacy_routes_1 = require("../app/modules/pharmacy/pharmacy.routes");
const restaurant_routes_1 = require("../app/modules/restaurants/restaurant.routes");
const room_routes_1 = require("../app/modules/room/room.routes");
const short_stay_apartments_routes_1 = require("../app/modules/short-stay-apartments/short-stay-apartments.routes");
const super_market_routes_1 = require("../app/modules/super-market/super-market.routes");
const user_routes_1 = require("../app/modules/users/user.routes");
const router = express_1.default.Router();
const modelRoutes = [
    { path: '/user', route: user_routes_1.UserRoute },
    {
        path: "/gold-box", route: goldBox_routes_1.default
    },
    { path: '/', route: city_routes_1.CityRoute },
    { path: '/', route: hospital_routes_1.HospitalRoute },
    { path: '/', route: pharmacy_routes_1.PharmacyRoute },
    { path: '/', route: super_market_routes_1.SuperMarketRoute },
    { path: '/', route: atm_routes_1.AtmRoute },
    { path: '/', route: activity_routes_1.ActivityRoute },
    { path: '/', route: restaurant_routes_1.RestaurantRoute },
    { path: '/', route: emergency_number_routes_1.EmergencyNumberRoute },
    { path: '/', route: hotel_routes_1.HotelRoute },
    { path: '/', route: monthly_rental_apartments_routes_1.MonthlyRentalApartmentRoute },
    { path: '/', route: room_routes_1.RoomRoute },
    { path: '/', route: short_stay_apartments_routes_1.ShortStayApartmentsRoute },
    { path: '/', route: country_routes_1.CountryRoute },
    { path: '/', route: availability_routes_1.ScheduleRoute },
    { path: "/", route: booking_routes_1.BookingRoute },
    { path: "/", route: airport_transfer_routes_1.airportRouter },
    { path: "/", route: car_rental_route_1.carRentalRouter }
];
modelRoutes.forEach(ru => router.use(ru.path, ru.route));
exports.allRoutes = router;
//# sourceMappingURL=index.js.map