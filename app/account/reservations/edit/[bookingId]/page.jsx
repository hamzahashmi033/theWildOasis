import UpdateReservationButton from "@/app/_components/UpdateReservationButton";
import { updateReservation } from "@/app/_lib/actions";
import { getBookingByBookingId, getCabin } from "@/app/_lib/data-service";
export const metadata = {
    title: "Edit Reservation"
}
export default async function Page({ params }) {
    // CHANGE
    const { bookingId } = params
    const booking = await getBookingByBookingId(bookingId)
    const cabin = await getCabin(booking.data.cabins_id)

    const maxCapacity = cabin.data.maxCapacity;

    return (
        <div>
            <h2 className="font-semibold text-2xl text-accent-400 mb-7">
                Edit Reservation #{bookingId}
            </h2>

            <form action={updateReservation} className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
                <div className="space-y-2">
                    <label htmlFor="numGuests">How many guests?</label>
                    <select
                        name="numGuests"
                        id="numGuests"
                        className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
                        required
                        defaultValue={booking.data.numGuests}
                    >
                        <option value="" key="">
                            Select number of guests...
                        </option>
                        {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
                            <option value={x} key={x}>
                                {x} {x === 1 ? "guest" : "guests"}
                            </option>
                        ))}
                    </select>
                </div>
                <input type="hidden" value={bookingId} name="bookingId" />
                <div className="space-y-2">
                    <label htmlFor="observations">
                        Anything we should know about your stay?
                    </label>
                    <textarea
                        name="observations"
                        className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
                        defaultValue={booking.data.observations ? booking.data.observations : ""}
                    />
                </div>

                <UpdateReservationButton />
            </form>
        </div>
    );
}
