import axios from "axios";

export default {
    addItem: function (itemData) {
        console.log(itemData);

        return axios.post("/api/items", itemData);
    }
};
