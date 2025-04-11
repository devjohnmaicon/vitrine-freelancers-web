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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {Trash2} from "lucide-react";

export default function ModalCloseJob() {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline"><Trash2 size={20}/></Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Deseja seguir com a exclusão?</AlertDialogTitle>
                    <AlertDialogDescription>
                       Esta ação não pode ser desfeita. Isso excluirá permanentemente a vaga publicada e removerá a visualização para os interessados.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
