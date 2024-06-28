import Link from "next/link";
import { auth } from "../_lib/auth"

export const metadata = {
    title: "Accounts",
}

export default async function Page(params) {
    const session = await auth()
    return (
        <> <p className="text-lg text-accent-500">
            HELLO {session.user.name.split(" ")[0].toUpperCase()}
        </p>
            <p className="text-lg">
                You have no reservations yet. Check out our{" "}
                <Link className="underline text-accent-500" href="/cabins">
                    luxury cabins &rarr;
                </Link>
            </p>
        </>
    )
}