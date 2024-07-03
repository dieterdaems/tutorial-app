import Link from "next/link";
import Image from "next/image";

export const Headerlogo = () => {
    return (
        <Link href="/">
           <div className="items-center hidden lg:flex">
                <Image src='/vercel.svg' alt='Logo' height={28} width={28}  />
                <p className="font-semibold text-white text-2xl ml-2.5" >
                    Finance
                </p>
           </div>
        </Link>
    );
}