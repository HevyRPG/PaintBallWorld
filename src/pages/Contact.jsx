import { Button } from "@/components/ui/button";
import FormInput from "../components/FormInput";
import FormTextarea from "../components/FormTextarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ContactPage = () => {
  return (
    <>
      <div className="max-w-screen-lg mx-auto p-12 ">
        <h1 className="text-3xl text-gray-200 font-bold pb-6 pl-4 ">Kontakt</h1>
        <div className="grid grid-cols-1 md:grid-cols-12 border rounded-r-lg">
          <div className="bg-gray-900 md:col-span-4 p-10 text-white">
            <h3 className="text-2xl sm:text-4xl leading-normal font-bold tracking-tight">
              Napisz do <span className="text-primary">nas! </span>
            </h3>
            <p className="mt-4 leading-7 text-secondary-foreground">
              Z chęcią wysłuchamy opinii, porad oraz wszelkich zgłoszeń.
              Odpiszemy gdy tylko będzie to możliwe!
            </p>

            <div className="flex items-center mt-5">
              <svg
                className="h-6 mr-2 text-primary"
                fill="currentColor"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 300.988 300.988"
                xmlSpace="preserve"
              >
                <g>
                  <g>
                    <path
                      d="M150.494,0.001C67.511,0.001,0,67.512,0,150.495s67.511,150.493,150.494,150.493s150.494-67.511,150.494-150.493
                S233.476,0.001,150.494,0.001z M150.494,285.987C75.782,285.987,15,225.206,15,150.495S75.782,15.001,150.494,15.001
                s135.494,60.782,135.494,135.493S225.205,285.987,150.494,285.987z"
                    ></path>
                    <polygon points="142.994,142.995 83.148,142.995 83.148,157.995 157.994,157.995 157.994,43.883 142.994,43.883 		"></polygon>
                  </g>
                </g>
              </svg>
              <span className="text-sm">24/7</span>
            </div>
          </div>
          <form className="md:col-span-8 p-10 flex flex-col">
            <FormInput label="Imię" name="firstName" type="text" />
            <FormInput label="Nazwisko" name="lastName" type="text" />
            <p className="text-primary">Temat (np. Błąd, Sugestia)</p>
            <Select>
              <SelectTrigger className="w-full p-2 text-secondary bg-white border rounded mb-4 mt-1">
                <SelectValue placeholder="Temat" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pzs">Problemy ze stroną</SelectItem>
                <SelectItem value="pzf">Problemy z formularzem</SelectItem>
                <SelectItem value="inn">Inne</SelectItem>
              </SelectContent>
            </Select>
            <FormTextarea label="Opis" name="message" />
            <div className="mt-4 self-end">
              <Button variant="default" type="submit">
                Wyślij
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
