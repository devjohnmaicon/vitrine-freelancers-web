"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LockKeyhole, Trash2 } from "lucide-react";
import { deleteJob } from "@/app/actions/jobs-service";
import { getToken } from "@/app/actions/get-token";
import { toast } from "sonner";

export default function ModalCloseJob({
  jobId,
  sizeIcon,
}: {
  jobId: number;
  sizeIcon?: number;
}) {
  const handleDeleteJob = async () => {
    const response = await deleteJob(jobId);
    console.log("Response from deleteJob:", response);

    if (response.error) {
      toast.info(response.message || "Erro ao excluir a vaga");
    }
    toast("Vaga excluída com sucesso!");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="cursor-pointer">
        <LockKeyhole color="red" size={sizeIcon ? sizeIcon : 24} />
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja seguir com a exclusão?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso excluirá permanentemente a
            vaga publicada e removerá a visualização para os interessados.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteJob}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
