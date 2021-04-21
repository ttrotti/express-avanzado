class ProductController {
    constructor() {
        this.PROD_DB = [];
    }
    
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
        data.id = this.PROD_DB.length + 1;
        this.PROD_DB.push(data)
        return data
    }

    get() {
        if(this.PROD_DB.length < 1) return false;
        return this.PROD_DB;
    }

    getById(id) {
        const filtered = this.PROD_DB.filter((product) => product.id === parseInt(id))[0]
        if (!filtered) return false;
        return filtered;
    }

    update(data, id) {
        const filtered = this.PROD_DB.filter((product) => product.id === parseInt(id))[0];
        if (!filtered) return false;
        filtered.title = data.title;
        filtered.price = data.price;
        filtered.thumbnail = data.thumbnail;
        return filtered;
    }

    delete(id) {
        const filtered = this.PROD_DB.filter((product) => product.id === parseInt(id));
        if(!filtered) return false

        this.PROD_DB = this.PROD_DB.filter((product) => product.id !== parseInt(id));
        return filtered;
    }
}

export default new ProductController();