import { PencilSquareIcon } from '@heroicons/react/24/solid';
import { format, formatDistance, isPast, isToday, parseISO } from 'date-fns';
import DeleteReservation from './DeleteReservation';
import Image from 'next/image';
import { getCabinByCabinId } from '../_lib/data-service';
import Link from 'next/link';

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace('about ', '');

async function ReservationCard({ booking }) {
  const {
    _id,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    createdAt,
    cabins_id
    // cabins: { name, image },
  } = booking;

  const cabin = await getCabinByCabinId(cabins_id)
  const start = parseISO(startDate);

  const end = parseISO(endDate);
  const created = parseISO(createdAt);
  return (
    <div className='flex border border-primary-800 mb-4'>
      <div className='relative h-32 aspect-square'>
        <Image
          src={cabin?.data.image}
          fill
          alt={`Cabin ${cabin?.data.name}`}
          className='object-cover border-r border-primary-800'
        />
      </div>

      <div className='flex-grow px-6 py-3 flex flex-col'>
        <div className='flex items-center justify-between'>
          <h3 className='text-xl font-semibold'>
            {numNights} nights in Cabin {cabin?.data.name}
          </h3>
          {isPast(start) ? (
            <span className='bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm'>
              past
            </span>
          ) : (
            <span className='bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm'>
              upcoming
            </span>
          )}
        </div>

        <p className='text-lg text-primary-300'>
          {format(start, 'EEE, MMM dd yyyy')} (
          {isToday(start) ? 'Today' : formatDistanceFromNow(startDate)}
          ) &mdash; {format(end, 'EEE, MMM dd yyyy')}
        </p>

        <div className='flex gap-5 mt-auto items-baseline'>
          <p className='text-xl font-semibold text-accent-400'>${totalPrice}</p>
          <p className='text-primary-300'>&bull;</p>
          <p className='text-lg text-primary-300'>
            {numGuests} guest{numGuests > 1 && 's'}
          </p>
          <p className='ml-auto text-sm text-primary-400'>
            Booked {format(created, 'EEE, MMM dd yyyy, p')}
          </p>
        </div>
      </div>

      <div className='flex flex-col border-l border-primary-800 w-[100px]'>
        {
          !isPast(start) && (
            <>
              <Link
                href={`/account/reservations/edit/${_id}`}
                className='group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900'
              >
                <PencilSquareIcon className='h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors' />
                <span className='mt-1'>Edit</span>
              </Link>
              <DeleteReservation bookingId={_id} />
            </>
          )
        }
      </div>
    </div>
  );
}

export default ReservationCard;