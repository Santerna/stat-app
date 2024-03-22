import { parseFormData } from "../../utils/parseFormData";
import { useEffect, useMemo, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import axios, { AxiosResponse } from "axios";
import { FormInput, ResponseData } from "../../utils/types";


type ChartProps = {
    props: FormInput,
}

export const Chart: React.FC<ChartProps> = (props) => {
    const baseUrl = process.env.BASE_URL as string;
    const [chartData, setChartData] = useState<ResponseData>({} as ResponseData);
    const query = useMemo(() => parseFormData(props), [props]);

    useEffect(() => {
        localStorage.setItem('dataKey', JSON.stringify(baseUrl+query));
        axios.post<AxiosResponse>(baseUrl, query, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            const { data } = response.data;
            setChartData(data)
        }).catch(error => console.error(error))
    }, [query])

    const axis = Object.keys(chartData.dimension?.Tid?.category?.label) ?? ["2009K1", "2024K2"];

    return (
        <BarChart
            xAxis={[{ scaleType: "band", data: axis }]}
            series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
            width={500}
            height={300}
        />
    )
}
