import ReservationFormComponent from '@/app/_components/ReservationFormComponent';
import Spinner from '@/app/_components/Spinner';
import TextExpander from '@/app/_components/TextExpander';
import { getCabin } from '@/app/_lib/data-service';
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from 'next/image';
import { Suspense } from 'react';

export async function generateMetadata({ params }) {
    const cabin = await getCabin(params.cabinsId)
    return { title: `${cabin.data.name}` }
}
export default async function page({ params }) {
    const cabin = await getCabin(params.cabinsId)

    const { _id, name, maxCapacity, regularPrice, discount, image, description } =
        cabin.data;
    return (
        <div className="max-w-6xl mx-auto mt-8">
            <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
                <div className="relative scale-[1.15] -translate-x-3">
                    <Image fill src={image} alt={`Cabin ${name}`} />
                </div>

                <div>
                    <h3 className="text-accent-100 font-black text-5xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
                        Cabin {name}
                    </h3>

                    <p className="text-md text-primary-300 mb-10">
                        <TextExpander>
                            {description}
                        </TextExpander>

                    </p>

                    <ul className="flex flex-col gap-4 mb-7">
                        <li className="flex gap-3 items-center">
                            <UsersIcon className="h-5 w-5 text-primary-600" />
                            <span className="text-lg">
                                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                                guests
                            </span>
                        </li>
                        <li className="flex gap-3 items-center">
                            <MapPinIcon className="h-5 w-5 text-primary-600" />
                            <span className="text-lg">
                                Located in the heart of the{" "}
                                <span className="font-bold">Dolomites</span> (Italy)
                            </span>
                        </li>
                        <li className="flex gap-3 items-center">
                            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
                            <span className="text-lg">
                                Privacy <span className="font-bold">100%</span> guaranteed
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            <div>
                <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
                    Reserve {cabin.data.name} today. Pay on arrival.
                </h2>
                <Suspense fallback={<Spinner />}>
                    <ReservationFormComponent cabin={cabin.data} />
                    
                </Suspense>
            </div>
        </div>
    )
}
