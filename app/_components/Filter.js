'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Filter() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    function filterHandle(filter) {
        const params = new URLSearchParams(searchParams)
        params.set("capacity", filter)
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    }
    const activateFilter = searchParams.get('capacity') ?? 'all'
    return (
        <div className='border border-primary-800 flex'>
            <button className={`px-2 py-2 ${activateFilter === "all" ? "bg-primary-700 text-primary-50" : ""} hover:bg-primary-700`} onClick={() => filterHandle('all')}>
                All cabins
            </button>
            <button className={`px-2 py-2 ${activateFilter === "small" ? "bg-primary-700 text-primary-50" : ""} hover:bg-primary-700`} onClick={() => filterHandle('small')}>
                1&mdash;3 guests
            </button>
            <button className={`px-2 py-2 ${activateFilter === 'medium' ? "bg-primary-700 text-primary-50" : ""} hover:bg-primary-700`} onClick={() => filterHandle('medium')}>
                4&mdash;7 guests
            </button>
            <button className={`px-2 py-2 ${activateFilter === "large" ? "bg-primary-700 text-primary-50" : ""} hover:bg-primary-700`} onClick={() => filterHandle('large')}>
                8&mdash;12 guests
            </button>
        </div >
    )
}
