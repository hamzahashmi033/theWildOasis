import ReservationCard from "@/app/_components/ReservationCard";
import { auth } from "@/app/_lib/auth";
import { getBookings, getCabinByCabinId } from "@/app/_lib/data-service";
export const metadata = {
  title: "Reservations"
}
export default async function Page() {
  // CHANGE
  const session = await auth()
  const bookings = await getBookings(session.user.guestId);
  

 
 
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.data.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}d
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ul>
          {bookings.data.map((booking) => (
            <li key={booking._id}>
              <ReservationCard booking={booking}  />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
