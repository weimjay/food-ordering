import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
        <section className="text-center my-16">
            <SectionHeaders
                subHeader={'Our story'}
                mainHeader={'About us'}
            />
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
                    to constantly enhancing our customer's lives and continually improving and innovating our product,
                    our people and our technology to make sure our customers receive a world class experience.
                </p>
            </div>
        </section>
        <section className="text-center">
            <SectionHeaders
                subHeader={'Don\'t hesitate'}
                mainHeader={'Contact us'}
            />
            <div className="mt-8">
                <a className="text-4xl underline text-gray-500" href="tel:+61 0466 888 888">+61 0466 888 888</a>
            </div>
        </section>

    </>
  );
}
