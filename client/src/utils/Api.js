import axios from "axios";

export default {
    addItem: function (itemData) {
        console.log(itemData);
        return axios.post("/api/items", itemData);
    },
    getItemList: () => {
        console.log('retrieving list');
        return axios.get('/api/items');
    }
};
