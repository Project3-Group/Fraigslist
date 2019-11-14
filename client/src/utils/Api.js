import axios from "axios";

export default {
    addItem: function (itemData) {
        // console.log(itemData);
        return axios.post("/api/items", itemData);
    },
    getItemList: () => {
        // console.log('retrieving list');
        return axios.get('/api/items');
    },
    getItem: id => {
        // console.log('retriving item data');
        return axios.get('/api/items/' + id);
    },
    updateItem: (id , data) => {
        // console.log("updating item: " + id);
        return axios.put('/api/items/' + id, data);
    },
    getUserItems: id => {
        console.log("working???")
        return axios.get('/api/store/' + id);
    }
};
