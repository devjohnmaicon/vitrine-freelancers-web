"use client";

import {useRouter} from "next/navigation";
import {Trash2} from "lucide-react";

export default function BtncloseJobComponent({id}: { id: number }) {
    const router = useRouter();

    const deleteJob = () => {
        alert("Deletar vaga " + id);
    };

    return (
        <span className="cursor-pointer btn btn-dash  btn-sm" color="red" onClick={deleteJob}><Trash2/></span>
    );
};
