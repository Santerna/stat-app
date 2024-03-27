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
    const maxDate ="2023-12-31T16:00:00.000Z";
    const [start, setStart] = useState<Dayjs | null>(dayjs(minDate));
    const [end, setEnd] = useState<Dayjs | null>(dayjs(maxDate));
    const { handleSubmit, control } = useForm<FormInput>({
        defaultValues: {
            startDateValue: dayjs(minDate),
            endDateValue: dayjs(maxDate),
            houseTypeValue: "00"
        }
    });

    const submitHandler: SubmitHandler<FormInput> = (data) => {
        handleFormSubmit(data);
    };
    
    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <Grid container alignItems="center" direction="column" paddingBottom={2}>
                <Grid container rowSpacing={1} padding={2}>
                    <Grid item paddingRight={1}>
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
                    </Grid>
                    <Grid item>
                        <Controller
                            name={"endDateValue"}
                            defaultValue={end}
                            control={control}
                            render={({field: { onChange }}) => 
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Period end"
                                        value={end}
                                        maxDate={dayjs(maxDate)}
                                        onChange={(event) => { onChange(event); setEnd(event); }}
                                    />
                                </LocalizationProvider>}
                        />
                    </Grid>
                </Grid>
                <Grid item padding={1}>
                    <FormInputDropdown name={"houseTypeValue"} control={control} label={"House Type"} />
                </Grid>
                <Button variant="contained" color="primary" type="submit" size="large">
                    Submit
                </Button>
            </Grid>
        </form>
    )
}
