import { Dayjs } from "dayjs";
import { FormInput } from "./types";

type RequestFormData = {
    props: FormInput
}

export const getQuarters = (start: Dayjs, end: Dayjs): string[] => {
    const startYear = start.year();
    const startMonth = start.month();
    const endYear = end.year();
    const endMonth: number = end.month();
    const quarters = ["K1", "K2", "K3", "K4"];
    const options: string[] = [];

    for (let pastYear = startYear; pastYear < endYear; pastYear++) {
        quarters.forEach(q => options.push(pastYear + q));
    }
    
    quarters.slice(0, endMonth / 3 + 1).forEach(q => options.push(endYear + q));

    const res = options.slice(startMonth / 3 + 1);
    return res;
}

export const parseFormData = (formData: RequestFormData) => {
    const dateRange = getQuarters(formData.props.startDateValue!, formData.props.endDateValue!);
    const query = {
        query: [
            {
                code: "Boligtype",
                selection: {
                    filter: "item",
                        values: [
                            formData.props.houseTypeValue
                        ]
                }
            },
            {
                code: "ContentsCode",
                selection: {
                    filter: "item",
                    values: [
                        "KvPris"
                    ]
                }
            },
            {
                code: "Tid",
                selection: {
                    filter: "item",
                    values: dateRange
                }
            }
        ],
        response: {
            format: "json-stat2"
        }
    };

    return query;
}
