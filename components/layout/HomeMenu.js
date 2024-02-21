import Image from "next/image";
import MenuItem from "@/components/menu/MenuItem";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function HomeMenu() {
    return (
        <section className="">
            <div className="absolute  left-0 right-0 w-full justify-start">
                <div className="absolute left-0 -top-[70px] text-left -z-10">
                    <Image src={'/salad1.png'} width={109} height={189} alt={'salad'}/>
                </div>
                <div className="absolute right-0 -top-[100px] -z-10">
                    <Image src={'/salad2.png'} width={109} height={189} alt={'salad'}/>
                </div>
            </div>
            <div className="text-center">
                <SectionHeaders subHeader={'Check out'} mainHeader={'Menu'} />
            </div>
            <div className="grid grid-cols-3 gap-4">
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
            </div>
        </section>
    );
}