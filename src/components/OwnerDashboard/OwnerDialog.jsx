import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/FormInput";

const OwnerDialog = ({ fieldName, fieldId }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button size="lg" className="rounded border-primary w-full">
            {fieldName}
          </Button>
        </DialogTrigger>
        <DialogContent className="w-2/">
          <DialogHeader>
            <DialogTitle>{fieldName}</DialogTitle>
            <hr />
          </DialogHeader>

          <div className="flex items-start justify-between justify">
            <div className="w-1/2 pr-4">
              <h1 className="text-xl font-bold text-primary mb-10 h-auto">
                Opcje:
              </h1>
              <div className="mb-4">
                <Button
                  variant="secondary"
                  size="lg"
                  className="rounded border-primary mb-4 w-full"
                >
                  Edytuj pole
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="rounded border-primary mb-4 w-full"
                >
                  Zarządzaj galerią
                </Button>
                <Button
                  variant="destructive"
                  size="lg"
                  className="rounded border-primary w-full"
                >
                  Usuń pole
                </Button>
              </div>
            </div>
            <div className="w-1/2 pl-4">
              <h1 className="text-xl font-bold text-primary mb-4">Edycja:</h1>
              <div className="mb-4">
                <FormInput label="Nazwa pola" type="text" />
                <FormInput label="Nazwa pola" type="text" />
                <FormInput label="Nazwa pola" type="text" />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default OwnerDialog;
