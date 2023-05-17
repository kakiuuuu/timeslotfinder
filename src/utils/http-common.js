import axios from "axios"

export default axios.create({
  baseURL: "https://ap-southeast-1.aws.data.mongodb-api.com/app/timeslotfinder-ldwbs/endpoint/",
  headers: {
    "Content-type": "application/json"
  }
})