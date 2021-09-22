import axios from "axios";

let base = "http://192.168.1.111:8080/api";
export default class EmployerService{
    getEmployers() {
        return axios.get(base + "/employers/get/all")
    }

    addEmployer(companyName, webAddress, phoneNumber, email, password, confirmPassword) {
        var isEmailConfirmed = Boolean();
        isEmailConfirmed = false;
        var isEmployeeConfirmed = Boolean();
        isEmployeeConfirmed = false;
           return axios.post(base + "/employers/add",
               
               { companyName, webAddress, phoneNumber, email, password, confirmPassword, isEmailConfirmed, isEmployeeConfirmed }
           )
   }
}