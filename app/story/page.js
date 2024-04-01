import SectionHeaders from "@/components/layout/SectionHeaders";

export default function StoryPage() {
    return (
        <>
            <section className="mt-16 text-center">
                <SectionHeaders
                    mainHeader={'Casino History'}
                />
                <div className="flex items-center justify-center px-2">
                    <img className="rounded-2xl mt-4" src="/pizza-history.webp" alt={''}/>
                </div>
                <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
                    <p>Casino has
                        given you a taste of the best of pizza and beyond since 1985. Get to
                        know
                        our story and brand history.</p>
                </div>
                <h2 className="text-2xl font-semibold text-primary mt-16 italic">30+ YEARS OF DELICIOUS PIZZA</h2>

                <div className="flex justify-center">
                    <div className="p-2">
                        <img className="rounded-2xl" src="/ourstory_1.webp" alt={''}/>
                    </div>
                    <div className="p-2">
                        <img className="rounded-2xl" src="/ourstory_2.webp" alt={''}/>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="p-2">
                        <img className="rounded-2xl" src="/ourstory_3.webp" alt={''}/>
                    </div>
                    <div className="p-2">
                        <img className="rounded-2xl" src="/ourstory_4.webp" alt={''}/>
                    </div>
                </div>
            </section>

            <section className="text-center mb-16">
            <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
                    <p className="">
                        We are the Australian-owned master franchise holder for Casino in Australia,
                        New Zealand, Belgium, France, the Netherlands, Japan, Germany, Luxembourg, Taiwan,
                        Malaysia, Singapore and Cambodia.
                    </p>
                    <p className="">
                        We’re driven by a passion to connect people with faster, fresher quality food. In doing this,
                        we’ve become a leader in the food-technology space, achieving industry firsts in drone delivery,
                        app ordering, voice assistants, artificial intelligence and augmented reality. We’re committed
                        to constantly enhancing our customer's lives and continually improving and innovating our
                        product,
                        our people and our technology to make sure our customers receive a world class experience.
                    </p>
                </div>
            </section>
        </>
    );
}