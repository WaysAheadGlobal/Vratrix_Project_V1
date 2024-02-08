import React from 'react'

export default function TeamCard({ name, role, image, info }) {
    const [isExpanded, setIsExpanded] = React.useState(false);

    return (
        <div className="text-white shadow-sm max-w-[400px] bg-[#8b3dff] p-4 rounded-lg">
            <div className="flex flex-row md:flex-col xl:!flex-row items-center gap-8 space-y-1.5 p-2 md:!p-6">
                <span className="relative flex w-20 aspect-square shrink-0 overflow-hidden rounded-full">
                    <img src={image} alt="founder" className="flex h-full w-full items-center justify-center rounded-full object-cover object-center" />
                </span>
                <div className="mt-2">
                    <h3 className="whitespace-nowrap tracking-tight text-lg font-semibold">{name}</h3>
                    <p className="text-sm text-white/80">{role}</p>
                </div>
            </div>
            <div className="px-3 md:px-6 text-sm">
                {
                    !isExpanded ? info.join("").slice(0, 200) + " ..." : (
                        <ul className='list-disc'>
                            {
                                info.map((item, index) => {
                                    return <li key={index} className="list-item text-start">
                                        <span>{item}</span>
                                    </li>
                                })
                            }
                        </ul>
                    )
                }
            </div>
            <div className="flex items-center p-6 mt-4">
                <button className="text-white font-semibold hover:underline" onClick={() => {
                    setIsExpanded(!isExpanded);
                }}>
                    {isExpanded ? "Show less" : "Show more"}
                </button>
            </div>
        </div>
    )
}