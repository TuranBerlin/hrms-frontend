import axios from "axios";

let base = "http://192.168.1.111:8080/api";
export default class CandidateService {
    getCandidates() {
        return axios.get(base + "/candidates/get/all")
    }

    addCandidate(firstName, lastName, nationalIdentityNumber, email, password, confirmPassword, yearOfBirth) {
     var isEmailConfirmed = Boolean();
     isEmailConfirmed = false;
        return axios.post(base + "/candidates/add",
            
            { firstName, lastName, nationalIdentityNumber, email, password, confirmPassword, yearOfBirth, isEmailConfirmed }
        )
}
}