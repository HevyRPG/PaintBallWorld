import { Button } from "@/components/ui/button";
export const ProfilePicture = () => {
  return (
    <>
      <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
        <img
          className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
          src="https://avatar.iran.liara.run/public/36"
          alt="Avatar"
        />
        <div className="flex flex-col space-y-5 sm:ml-8">
          <Button
            variant="outline"
            className="rounded bg-primary text-primary-foreground p-4"
          >
            Zmień Zdjęcie
          </Button>
          <Button
            variant="ghost"
            className="rounded border border-primary p-4 hover:bg-primary"
          >
            Usuń Zdjęcie
          </Button>
        </div>
      </div>
    </>
  );
};
