import { Form } from "../Form/Form";
import { Chart } from "../Chart/Chart";
import { Paper, Typography } from "@mui/material";
import { useState } from "react";
import { FormInput } from "../../utils/types";

export const Layout: React.FC = () => {
  const [response, setResponse] = useState<FormInput>({} as FormInput);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (data: FormInput) => {
    console.log(`Data ${JSON.stringify(data)}`);
    setResponse(data);
    setFormSubmitted(true);
  };

  return (
    <Paper>
        {!formSubmitted ? 
            <Typography variant="h5"> Choose time period and house type </Typography> 
            : <Typography variant="h5"> Prices for {response.startDateValue?.year()}-{response.endDateValue?.year()} Period</Typography>
        }
        <Form handleFormSubmit={handleFormSubmit}/>
        {formSubmitted ? <Chart props={response}/> : <></>}
    </Paper>
  )
}
