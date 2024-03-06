import Image from "next/image";
import Right from "@/components/icons/Right";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="hero mt-4">
            <div className="py-12">
                <h1 className="text-4xl font-semibold">
                    Everything<br/>
                    is better<br/>
                    with a&nbsp;
                    <span className="text-primary">Pizza</span>
                </h1>
                <p className="my-6 text-gray-500">
                    Hello Pizza! Hope you enjoy your Pizza!
                </p>
                <div className="flex gap-4 text-sm">
                    <Link href={'/menu'} className="flex w-full justify-center bg-primary uppercase items-center
                        text-white font-semibold gap-2 px-4 py-2 rounded-full">
                        Order now
                        <Right/>
                    </Link>
                    <Link href={'/#about'} className="flex w-full justify-center border border-gray-300 items-center
                        text-gray-600 font-semibold gap-2 py-2 rounded-full">
                        Learn more
                        <Right/>
                    </Link>
                </div>
            </div>
            <div className="relative">
                <Image src={'/pizza.png'} layout={'fill'} objectFit={'contain'} alt={'pizza'}/>
            </div>
        </section>
    )
}