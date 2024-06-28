import React from 'react'
import DateSelector from './DateSelector'
import ReservationForm from './ReservationForm'
import { getBookedDatesByCabinId, getSettings } from '../_lib/data-service'
import { auth } from '../_lib/auth'
import LoginMessage from './LoginMessage'

export default async function ReservationFormComponent({ cabin }) {
    const [settings, bookedDates] = await Promise.all([
        getSettings(),
        getBookedDatesByCabinId(cabin._id)
    ])
    const session = await auth()
    return (
        <div>
            <div className='grid grid-cols-2 border border-primary-800 min-h-[400px]'>
                <DateSelector bookedDates={bookedDates.data} settings={settings.data} cabin={cabin} />
                {
                    session?.user ? (
                        <>
                            <ReservationForm cabin={cabin} user={session?.user} />
                        </>
                    ) : (
                        <LoginMessage />
                    )
                }
            </div>
        </div>
    )
}
