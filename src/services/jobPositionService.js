import axios from "axios"

let base = "http://127.0.0.1:8080/api";
export default class JobPositionService{
    getJobPositions() {
        return axios.get(`${base} /jobPositions/get/all`)
    }
}