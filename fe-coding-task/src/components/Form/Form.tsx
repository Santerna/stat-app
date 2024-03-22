import { Button, Grid } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FormInputDropdown } from "./SelectInput";
import { FormInput } from "../../utils/types";

type FormProps = {
    handleFormSubmit: (data: FormInput) => void
}

export const Form: React.FC<FormProps> = ({
    handleFormSubmit
  })=> {
    const minDate = "2009-01-01T16:00:00.000Z";
    const [start, setStart] = useState<Dayjs | null>(dayjs(minDate));
    const [end, setEnd] = useState<Dayjs | null>(dayjs(new Date()));
    const { handleSubmit, control } = useForm<FormInput>({
        defaultValues: {
            startDateValue: dayjs(minDate),
            endDateValue: dayjs(new Date()),
            houseTypeValue: "00"
        }
    });

    const submitHandler: SubmitHandler<FormInput> = (data) => {
        console.log(data)
        handleFormSubmit(data);
    };
    
    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <Grid container alignItems="center" direction="column">
                <Grid item>
                    <Controller
                        name={"startDateValue"}
                        defaultValue={start}
                        control={control}
                        render={({field: { onChange }}) => 
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Period start"
                                    value={start}
                                    minDate={dayjs(minDate)}
                                    onChange={(event) => { onChange(event); setStart(event); }}
                                />
                            </LocalizationProvider>}
                    />
                    <Controller
                         name={"endDateValue"}
                         defaultValue={end}
                         control={control}
                         render={({field: { onChange }}) => 
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Period end"
                                    value={end}
                                    onChange={(event) => { onChange(event); setEnd(event); }}
                                />
                            </LocalizationProvider>}
                    />
                </Grid>
                <Grid item>
                    <FormInputDropdown name={"houseTypeValue"} control={control} label={"House Type"} />
                </Grid>
                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </Grid>
        </form>
    )
}
