import { Header } from "@/components/header";

type Props = {
    children: React.ReactNode;
    };


const DashboardLayout = ({ children }: Props) => {
    return (
        <div>
        <Header />
        <main>{children}</main>
        </div>
    );
    }

export default DashboardLayout;