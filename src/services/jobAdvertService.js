import axios from "axios";

let base = "http://192.168.1.111:8080/api/jobAdverts";
export default class JobAdvertService{

    getJobAdvertsWithDetails() {
        return axios.get(base + "/get/jobAdvertWithDetails")
    }

    getJobAdvertsWithDetailsOnlyUnverified() {
        return axios.get(base + "/get/jobAdvertWithDetails/onlyUnverifieds")
    }

    getJobAdvertsWithDetailsPageable(pageNumber, pageSize) {
        return axios.get(base + "/get/jobAdvertWithDetails/pageable?pageNumber=" + pageNumber + "&pageSize="  + pageSize)
    }

    verifyAdvert(advertId) {
        return axios.post(base + "/changeStatus/jobAdvert?advertId="+ advertId + "&status=true")
    }

    deleteAdvert(advertId) {
        return axios.post(base + "/delete/jobAdvert?advertId=" + advertId)
    }
}