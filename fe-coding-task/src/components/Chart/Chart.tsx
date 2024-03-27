import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { BarChart } from "@mui/x-charts/BarChart";
import { Container, Typography } from "@mui/material";
import { FormInput, ResponseData } from "../../utils/types";
import { getQuarters, parseFormData } from "../../utils/parseFormData";

type ChartProps = {
    props: FormInput,
}

const chartSettings = {
    height: 300,
    margin: {bottom: 50, left: 70, right: 20, top: 20},
    skipAnimation: true
}

export const Chart: React.FC<ChartProps> = (props) => {
    const baseUrl = process.env.BASE_URL as string;
    const [chartData, setChartData] = useState<ResponseData>({} as ResponseData);

    const query = parseFormData(props);

    const getData = useCallback(() => {
        axios.post<ResponseData>(baseUrl, query, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            setChartData(response.data);
        }).catch(error => console.error(error))
    }, []);

    useEffect(() => {
        localStorage.setItem('dataKey', JSON.stringify(baseUrl+query));
        getData();
    }, [query]);

    const value = chartData.value;
    const quarters = getQuarters(props.props.startDateValue!, props.props.endDateValue!);

    if (value === undefined) {
        return (
        <Typography variant="h5" padding={3}> 
            Still loading...
        </Typography>)
    }

    return (
        <Container maxWidth={false}>
            <Typography variant="h5" padding={3}> 
                Prices for {props.props.startDateValue?.year()}-{props.props.endDateValue?.year()} Period (NOK)
            </Typography>
            <BarChart
                xAxis={[{ scaleType: "band", data: quarters }]}
                series={[{ data: value }]}
                {...chartSettings}
            />
        </Container>
    )
}
