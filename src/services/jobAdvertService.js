import axios from "axios";

let base = "http://127.0.0.1:8080/api";
export default class JobAdvertService{
    getJobAdverts() {
        return axios.get(`${base} /jobAdverts/get/all`)
    }

    getJobAdvertsWithDetails() {
        return axios.get(base + "/jobAdverts/get/jobAdvertWithDetails")
    }

    getJobAdvertsWithDetailsPageable(pageNumber, pageSize) {
        return axios.get(base + "/jobAdverts/get/jobAdvertWithDetails/pageable?pageNumber=" + pageNumber + "&pageSize="  + pageSize)
    }
}