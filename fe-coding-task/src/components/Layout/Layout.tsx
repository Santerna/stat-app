import { Form } from "../Form/Form";
import { Chart } from "../Chart/Chart";
import { Paper, Typography } from "@mui/material";
import { useState } from "react";
import { FormInput } from "../../utils/types";

export const Layout: React.FC = () => {
  const [formData, setFormData] = useState<FormInput>({} as FormInput);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = (data: FormInput) => {
    setFormData(data);
    setFormSubmitted(true);
  };

  return (
    <Paper>
        {!formSubmitted ? 
            <Typography variant="h5" padding={5}> Choose time period and house type </Typography> : <></>
        }
        <Form handleFormSubmit={handleFormSubmit}/>
        {formSubmitted ? <Chart props={formData} /> : <></>}
    </Paper>
  )
}
