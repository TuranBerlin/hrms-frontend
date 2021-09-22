import axios from "axios"

let base = "http://192.168.1.111:8080/api";
export default class JobPositionService{
    getJobPositions() {
        return axios.get( base + "/jobPositions/get/all" )
    }
}