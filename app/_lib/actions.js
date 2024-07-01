"use server"


import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth"
import { createBooking, deleteBooking, getBookings, updateBooking, updateProfile } from "./data-service";
import { redirect } from "next/navigation";
export async function createReservation(bookingData, formData) {
    const session = await auth()

    if (!session) throw new Error("User not found!");

    const newBookingData = {
        ...bookingData,
        guest_id: session.user.guestId,
        numGuests: Number(formData.get("numGuests")),
        observations: formData.get("observations").slice(0, 1000),
        totalPrice: bookingData.cabinPrice,
        extraPrice: 0,
        status: "unconfirmed"
    }
    await createBooking(newBookingData);
    revalidatePath(`/cabins/${bookingData.cabins_id}`)
    redirect("/cabins/thankyou")
}
export async function updateGuest(formData) {
    const session = await auth()

    if (!session) throw new Error("User not found!");

    const nationalID = formData.get("nationalID")
    const nationality = formData.get("nationality")
    const updateUser = { nationality, nationalID }
    const id = session.user.guestId
    await updateProfile(id, updateUser)

}
export async function deleteReservation(bookingId) {
    const session = await auth()
    if (!session) {
        throw new Error("You must need to be logged in");
    }
    const guestsBooking = await getBookings(session.user.guestId)

    const guestBookingsIds = guestsBooking.data.map((booking) => booking.guest_id)
    if (!guestBookingsIds.includes(session.user.guestId)) {
        throw new Error("You are not allowed to delete this booking")
    }
    const message = await deleteBooking(bookingId)
    revalidatePath("/account/reservations")
}
export async function updateReservation(formData) {


    const session = await auth()
    if (!session) {
        throw new Error("You must need to be logged in");
    }
    const guestsBooking = await getBookings(session.user.guestId)

    const guestBookingsIds = guestsBooking.data.map((booking) => booking.guest_id)
    if (!guestBookingsIds.includes(session.user.guestId)) {
        throw new Error("You are not allowed to delete this booking")
    }
    const bookingId = formData.get("bookingId")
    const numGuests = Number(formData.get("numGuests"))
    const observations = formData.get("observations")
    const updatedData = {
        numGuests,
        observations

    }
    try {
        const data = await updateBooking(bookingId, updatedData)
    } catch (error) {
        throw new Error(error.message)
    }
    revalidatePath(`/account/edit/${bookingId}`)
    revalidatePath("/account/reservations")
    redirect("/account/reservations")


}
export async function signInAction() {
    await signIn("github", { redirectTo: "/account" })
}
export async function signOutAction() {
    await signOut({ redirectTo: "/" })
}