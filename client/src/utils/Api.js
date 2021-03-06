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
    getSellerAmountMade: sellerId => {
        return axios.get('/api/user/' + sellerId);
    },
    updateItem: (id , data) => {
        // console.log("updating item: " + id);
        return axios.put('/api/items/' + id, data);
    },
    updateSellerAmountMade: (sellerId, data) => {
        console.log('new data: ' + data);
        return axios.put('/api/user/' + sellerId, data);
    },
    getUserItems: id => {
        // console.log("working???")
        return axios.get('/api/store/' + id);
    },
    deleteItem: id => {
        // console.log("deleting item: " + id);
        return axios.delete('/api/items/' + id);
    },

};
