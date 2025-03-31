"use client";

import {useRouter} from "next/navigation";
import {Edit} from "lucide-react";

export default function BtnEditComponent({id}: { id: number }) {
    const router = useRouter();

    const editJob = () => {
        router.push(`http://localhost:3000/vagas/vaga/edit/${id}`);
    };

    return (
        <span className="cursor-pointer btn btn-dash btn-sm" color="orange" onClick={editJob}><Edit/></span>
    );
};
