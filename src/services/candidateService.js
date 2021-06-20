import axios from "axios";

let base = "http://127.0.0.1:8080/api";
export default class CandidateService{
    getCandidates() {
        return axios.get(base + "/candidates/get/all")
    }
}