import { Dayjs } from "dayjs";
import { Control } from "react-hook-form";

export interface FormInput {
    startDateValue: Dayjs | null;
    endDateValue: Dayjs | null;
    houseTypeValue: string;
}

export type FormInputProps = {
    name: "startDateValue" | "endDateValue" | "houseTypeValue",
    control: Control<FormInput>,
    label: string
}

export type ResponseData = {
    version: string,
    class: string,
    label: string,
    source: string,
    updated: string,
    note: string[],
    role: {
        time: string[],
        metric: string[]
    },
    id: string[],
    size: number[],
    dimension: {
        Boligtype: {
            label: string,
            category: {
                index: Record<string, number>,
                label: Record<string, string>
            },
            extension: Record<string, string | boolean>,
            link: {
                describedby:[
                    {
                        extension: Record<string, string>
                    }
                ]
            }
        },
        ContentsCode: {
            label: string,
            category: {
                index: Record<string, string>,
                label: Record<string, string>,
                unit:{
                    [key: string]: Record<string, string | number>
                }
            },
            extension:{
                elimination: boolean,
                refperiod: Record<string, string>,
                show: string
            }
        },
        Tid: {
            label: string,
            category: {
                index: Record<string, number>,
                label: Record<string, string>
            },
            extension: Record<string, string | boolean>
        }
    },
    extension: {
        px: Record<string, string | number | boolean>,
        contact: Record<string, string>[]
    },
    value: number[]
}
