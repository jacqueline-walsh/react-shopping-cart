import { FETCH_PRODUCTS } from "../types";

const fetchProducts = () => async (dispatch) => {
    const res = await fetch("/api/products");
    const data = await res.json();
    dispatch({
        type: FETCH_PRODUCTS,
        payload: data
    })
}
export default fetchProducts;