/*
Defining the http requests that are going to be made so we can just call this service class from our components.
Passing in data if that request requires it, and passing that along to the server.
*/

import http from "../http-common";

class PracticeItemDataService {
    getAll() {
        return http.get("/practiceItems");
    }

    get(id) {
        return http.get(`/practiceItems/${id}`);
    }

    create(data) {
        return http.post("/practiceItems", data);
    }

    update(id, data) {
        return http.put(`/practiceItems/${id}`, data);
    }

    delete(id) {
        return http.delete(`/practiceItems/${id}`);
    }

    deleteAll() {
        return http.delete(`/practiceItems`);
    }

    findByDescription(description) {
        return http.get(`/practiceItems?description=${description}`);
    }
}

export default new PracticeItemDataService();