import { eachDayOfInterval } from 'date-fns';
import axios from 'axios';
import { notFound } from 'next/navigation';
import { revalidatePath } from 'next/cache';
/////////////
// GET

export async function getCabin(id) {
  try {

    const data = await axios.get(`${process.env.BACKEND_URL}/single-cabin/${id}`);
    return data;
  } catch (error) {
    notFound()
  }
}

export async function getCabinPrice(id) {
  const { data, error } = await supabase
    .from('cabins')
    .select('regularPrice, discount')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}
export const getCabinByCabinId = async function (id) {
  try {
    const data = await axios.get(`${process.env.BACKEND_URL}/single-cabin/${id}`);
    return data;
  } catch (error) {
    console.error('Error getting results', error.message);
  }
}
export const getCabins = async function () {
  const data = await axios.get(`${process.env.BACKEND_URL}/cabins`);
  return data;
}
// Guests are uniquely identified by their email address
export async function getGuest(email) {
  try {
    const data = await axios.get(`${process.env.BACKEND_URL}/user?email=${email}`)
    return data

  } catch (error) {
    console.log(error.message);
    throw new Error(error.message)

  }

}

export async function getBookingByBookingId(id) {
  try {
    const data = await axios.get(`${process.env.BACKEND_URL}/booking/${id}`)

    return data
  } catch (error) {
    throw new Error(error.message)

  }
}

export async function getBookings(guestId) {
  try {
    const data = await axios.get(`${process.env.BACKEND_URL}/getBookingsByGuestId/${guestId}`)

    return data
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message)

  }
}

export async function getBookedDatesByCabinId(cabins_id) {

  try {
    const data = await axios.get(`${process.env.BACKEND_URL}/getBookedDatesByCabinId/${cabins_id}`)

    return data
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message)

  }
}

export async function getSettings() {
  try {
    const data = await axios.get(`${process.env.BACKEND_URL}/settings`);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCountries() {
  try {
    const response = await axios.get('https://api.apyhub.com/data/dictionary/country', {
      headers: {
        'Content-Type': 'application/json',
        'apy-token': 'APY0TQFCCcl6EYfdlYS3wJqQm7lnzxyWyWMpDl5VC2i0nCtMnLtNM738SamJAnnSi3'
      }
    });

    // Extract the data array
    const countriesData = response.data.data;

    // Map over the data array to get the "value" field
    const countryValues = countriesData.map(country => country.value);


    return countryValues;
  } catch (error) {
    console.error('Could not fetch countries', error);
    throw new Error('Could not fetch countries');
  }
}

/////////////
// CREATE

export async function createGuest(newGuest) {
  try {
    const data = await axios.post(`${process.env.BACKEND_URL}/user`, newGuest)
    return data

  } catch (error) {
    console.log(error.message);
    throw new Error(error.message)

  }
}

export async function createBooking(newBooking) {
  try {
    const data = await axios.post(`${process.env.BACKEND_URL}/booking`, newBooking)
    return data

  } catch (error) {
    console.log(error.message);
    throw new Error(error.message)

  }
}

/////////////
// UPDATE

// The updatedFields is an object which should ONLY contain the updated data
export async function updateProfile(id, updateUser) {
  revalidatePath("/account/profile")
  try {
    const updatedData = await axios.put(`${process.env.BACKEND_URL}/user`, { id, updateUser })
    return updatedData
  } catch (error) {
    console.error(error);
    throw new Error('Internal Server error');
  }
}

export async function updateBooking(id, updatedFields) {
  try {
    const data = await axios.put(`${process.env.BACKEND_URL}/update-booking/${id}`, updatedFields)

    return data
  } catch (error) { 
    console.log(error.message);
    throw new Error(error.message)

  }
}

/////////////
// DELETE

export async function deleteBooking(id) {
  try {
    const data = await axios.delete(`${process.env.BACKEND_URL}/delete-booking/${id}`);
    return data;
  } catch (error) {
    console.error('Error deleting booking', error.message);
  }
}
