import PageClient from '../agregaCats/page';

export const metadata ={
    title: `Mis gatos - ${process.env.APP_NAME}`,
    description: "Mis Gatos registrados",
};

export default function Page(){
    return <PageClient/>
}