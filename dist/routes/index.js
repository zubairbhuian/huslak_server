"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../app/modules/users/user.routes");
const city_routes_1 = require("../app/modules/city/city.routes");
const hospital_routes_1 = require("../app/modules/hospital/hospital.routes");
const pharmacy_routes_1 = require("../app/modules/pharmacy/pharmacy.routes");
const super_market_routes_1 = require("../app/modules/super-market/super-market.routes");
const atm_routes_1 = require("../app/modules/atm/atm.routes");
const activity_routes_1 = require("../app/modules/activities/activity.routes");
const restaurant_routes_1 = require("../app/modules/restaurants/restaurant.routes");
const emergency_number_routes_1 = require("../app/modules/emergency-number/emergency-number.routes");
const hotel_routes_1 = require("../app/modules/hotels/hotel.routes");
const monthly_rental_apartments_routes_1 = require("../app/modules/monthly-rental-apartments/monthly-rental-apartments.routes");
const room_routes_1 = require("../app/modules/room/room.routes");
const short_stay_apartments_routes_1 = require("../app/modules/short-stay-apartments/short-stay-apartments.routes");
const country_routes_1 = require("../app/modules/country/country.routes");
const router = express_1.default.Router();
const modelRoutes = [
    { path: '/user', route: user_routes_1.UserRoute },
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
];
modelRoutes.forEach(ru => router.use(ru.path, ru.route));
exports.allRoutes = router;
//# sourceMappingURL=index.js.map