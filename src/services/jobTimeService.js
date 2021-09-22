import axios from "axios"

let base = "http://192.168.1.111:8080/api";
export default class JobTimeService{
    getJobTimes() {
        return axios.get(base + "/jobTimes/get/all")
    }
}