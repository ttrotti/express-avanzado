let PROD_DB = [];

class ProductController {
    
    add(data) {
        if(data.title === undefined) {
            return({
                error: "debe completar un título para su artículo"
            })
        }
        if(data.price === undefined) {
            return({
                error: "debe completar un precio para su artículo"
            })
        }
        if(data.thumbnail === undefined) {
            return({
                error: "debe completar un thumbnail para su artículo"
            })
        }
        data.id = PROD_DB.length + 1;
        PROD_DB.push(data)
        return data
    }

    get() {
        if(PROD_DB.length < 1) return false;
        return PROD_DB;
    }

    getById(id) {
        const filtered = PROD_DB.filter((user) => user.id === parseInt(id))[0]
        if (!filtered) return false;
        return filtered;
    }
}

export default new ProductController();