import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import {BaseUrl} from "../../../constants";

const UploadAttendance = () => {
    const [items, setItems] = useState(null);

    const readExcel = (file) => {
        const promise = new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
                const bufferArray = e.target.result;

                const wb = XLSX.read(bufferArray, { type: "buffer" });

                const wsname = wb.SheetNames[0];

                const ws = wb.Sheets[wsname];

                const data = XLSX.utils.sheet_to_json(ws);

                resolve(data);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });

        promise.then((d) => {
            setItems(d);
        });
    };

    const changeFile = (event) => {
        setItems(event.target.files[0]);
        console.log(event.target.files[0]);
    };

    const uploadAttendance = () => {
        try {
            if (items !== null) {
                const formData = new FormData();
                formData.append("file", items);
                const result = axios({
                    method: "post",
                    url: `${BaseUrl}/uploadAttendance`,
                    data: formData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            } else {
                console.log("No file selected");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept=".xlsx"
                onChange={(e) => {
                    changeFile(e);
                }}
            />
            <button
                onClick={() => {
                    uploadAttendance();
                }}
            >
                Submit
            </button>
        </div>
    );
};
export default UploadAttendance;
