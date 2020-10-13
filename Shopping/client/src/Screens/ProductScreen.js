import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';

function ProductScreen(props) {

    const id = props.match.params.id;
    // const product = data.products.find(item => Number(item._id) === Number(id))
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { product, loading, error } = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(id))
        return () => {

        }
    }, []);

    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qty=" + qty)
        // props.history.push("/");
    }

    return (
        <div className="back-to-result">
            <div>
                <Link to="/">Back to result</Link>
            </div>

            {loading ? <div>Loading...</div> :
                error ? <div>{error}</div> :
                    (
                        <div className="details">
                            <div className="details-image">
                                <img src={product.image} alt="" />
                            </div>
                            <div className="details-info">
                                <ul>
                                    <li><h4>{product.name}</h4></li>
                                    <li>{product.rating} Stars ({product.numReviews} Reviews)</li>
                                    <li><b>${product.price}</b></li>
                                    <li>Description:
                            <div>
                                            {product.description}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="details-action">
                                <ul>
                                    <li>
                                        Price: <b>${product.price}</b>
                                    </li>
                                    <li>
                                        Status: {product.countInstock > 0 ? "In Stock" : "Unavailable"}
                                    </li>
                                    {/* create an Array. if array's value is 10. it will gonna be 0-9 */}
                                    <li>
                                        Qty: <select value={qty} onChange={(e) => { setQty(e.target.value) }}>
                                            {[...Array(product.countInstock).keys()].map(x => (
                                                <option value={x + 1} key={x + 1} >{x + 1}</option>
                                            ))}                                                     
                                        </select>
                                    </li>
                                    <li>
                                        {product.countInstock > 0 &&
                                            <button onClick={handleAddToCart} className="button primary">Add to Cart</button>}
                                            {/* We can use this instead */}
                                            {/* // <Link to={"/cart/" + props.match.params.id + "?qty=" + qty} >Add cart</Link> } */}

                                    </li>
                                </ul>
                            </div>

                        </div>
                    )
            }


        </div>
    )
}

export default ProductScreen;