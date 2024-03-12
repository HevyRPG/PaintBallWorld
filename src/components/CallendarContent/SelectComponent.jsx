import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectComponent = ({onChange}) => {
  // @todo: onChange
  return (
    <>
      <Select>
        <SelectTrigger className="m-1 w-[100px] rounded">
          <SelectValue placeholder="+0 KM" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10">+10 KM</SelectItem>
          <SelectItem value="20">+20 KM</SelectItem>
          <SelectItem value="50">+50 KM</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export default SelectComponent;
