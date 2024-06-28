import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";

export const revalidate = 0;
export default async function CabinList({ filter }) {
    const cabins = await getCabins()

    if (!cabins.data.length) {
        return null
    }
    let displayedCabins;


    if (filter === "all") {
        displayedCabins = cabins.data;
    } else if (filter === "small") {
        displayedCabins = cabins.data.filter((cabin) => cabin.maxCapacity <= 3);
    } else if (filter === "medium") {
        displayedCabins = cabins.data.filter((cabin) => cabin.maxCapacity > 3 && cabin.maxCapacity < 8);
    } else if (filter === "large") {
        displayedCabins = cabins.data.filter((cabin) => cabin.maxCapacity >= 8);
    }

    return (
        <div>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
                {displayedCabins.map((cabin) => (
                    <CabinCard key={cabin._id} cabin={cabin} />
                ))}
            </div>

        </div>
    )
}
