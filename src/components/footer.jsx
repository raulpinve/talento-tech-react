import { FaGithub } from "react-icons/fa";

export default function Footer(){

    return (
        <div className="bg-white border-t border-slate-200 py-8 text-center bottom-0 w-full fixed">
            <h1 className="font-bold text-2xl">Proyecto talento Tech</h1>
            <h2 className="text-sm mt-1">Desarrollador por Raul Velásquez</h2>
            <div className="flex justify-center mt-2">
                <a href="#">
                    <FaGithub />
                </a>
            </div>
        </div>
    );
}