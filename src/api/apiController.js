import http from "../utils/http-common";

class EventAPI {
  createEvent(data) {
    console.log('data>>>>>>>', data)
    return http.post("/createEvent", data);
  }

  getEvent(id) {
    return http.get(`/getEvent/${id}`);
  }
}

export default new EventAPI();