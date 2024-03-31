import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home() {
  return (
      <>
          <Hero/>
          <HomeMenu/>
          <section className="text-center" id="contact">
              <SectionHeaders
                  subHeader={'Don\'t hesitate'}
                  mainHeader={'Contact us'}
              />
              <div className="mt-8">
                  <a className="text-2xl underline text-gray-500" href="tel:+61 0466 888 888">+61 0466 888 888</a>
              </div>
          </section>

      </>
  );
}
