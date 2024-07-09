import express from 'express'

import { ActivityRoute } from '../app/modules/activities/activity.routes'
import { AtmRoute } from '../app/modules/atm/atm.routes'
import { ScheduleRoute } from '../app/modules/availability/availability.routes'
import { BookingRoute } from '../app/modules/bookign/booking.routes'
import { CityRoute } from '../app/modules/city/city.routes'
import { CountryRoute } from '../app/modules/country/country.routes'
import { EmergencyNumberRoute } from '../app/modules/emergency-number/emergency-number.routes'
import goldBox from '../app/modules/goldBox/goldBox.routes'
import { HospitalRoute } from '../app/modules/hospital/hospital.routes'
import { HotelRoute } from '../app/modules/hotels/hotel.routes'
import { MonthlyRentalApartmentRoute } from '../app/modules/monthly-rental-apartments/monthly-rental-apartments.routes'
import { PharmacyRoute } from '../app/modules/pharmacy/pharmacy.routes'
import { RestaurantRoute } from '../app/modules/restaurants/restaurant.routes'
import { RoomRoute } from '../app/modules/room/room.routes'
import { ShortStayApartmentsRoute } from '../app/modules/short-stay-apartments/short-stay-apartments.routes'
import { SuperMarketRoute } from '../app/modules/super-market/super-market.routes'
import { UserRoute } from '../app/modules/users/user.routes'
const router = express.Router()

const modelRoutes = [
  { path: '/user', route: UserRoute },
  {
    path: "/gold-box", route: goldBox
  },
  { path: '/', route: CityRoute },
  { path: '/', route: HospitalRoute },
  { path: '/', route: PharmacyRoute },
  { path: '/', route: SuperMarketRoute },
  { path: '/', route: AtmRoute },
  { path: '/', route: ActivityRoute },
  { path: '/', route: RestaurantRoute },
  { path: '/', route: EmergencyNumberRoute },
  { path: '/', route: HotelRoute },
  { path: '/', route: MonthlyRentalApartmentRoute },
  { path: '/', route: RoomRoute },
  { path: '/', route: ShortStayApartmentsRoute },
  { path: '/', route: CountryRoute },
  { path: '/', route: ScheduleRoute },
  { path: "/", route: BookingRoute }

]
modelRoutes.forEach(ru => router.use(ru.path, ru.route))

export const allRoutes = router
