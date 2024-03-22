import { InputLabel, MenuItem, Select } from "@mui/material";
import { FormInputProps } from "../../utils/types";
import { Controller } from "react-hook-form";

const houseOptions = [
    {
      label: "Boliger i alt",
      value: "00",
    },
    {
      label: "Småhus",
      value: "02",
    },
    {
        label: "Blokkleiligheter",
        value: "03",
    }
];

export const FormInputDropdown: React.FC<FormInputProps> = ({
    name,
    control,
    label,
  }) => {
    const generateSingleOptions = () => {
      return houseOptions.map((option: Record<string, string>) => {
        return (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        );
      });
    };

    return (
      <>
        <InputLabel>{label}</InputLabel>
        <Controller
          render={({ field: { onChange, value } }) => (
            <Select onChange={onChange} value={value ?? "00"}>
              {generateSingleOptions()}
            </Select>
          )}
          control={control}
          name={name}
        />
      </>
    );
  };
  