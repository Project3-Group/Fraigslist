import axios from "axios";

export default {
    createItem: function (itemData) {
        console.log(itemData);

        return axios.post("/api/items", itemData);
    }
};
