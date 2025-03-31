"use client";

import { useRouter} from "next/navigation";
import {Plus} from "lucide-react";

export default function BtnShowMoreComponent({id}: { id: number }) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`http://localhost:3000/vagas/vaga/${id}`);
    };

    return (
        <span className="cursor-pointer btn btn-neutral btn-sm" onClick={handleClick}><Plus /> INFO</span>
    );
};
