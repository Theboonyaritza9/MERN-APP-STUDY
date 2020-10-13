import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { listProduct } from '../actions/productActions'

function HomeScreen(props) {

    const productList = useSelector(state => state.productList);
    const [searchKeyword, setSearchKeyword] = useState('')
    const [sortOrder, setSortOrder] = useState('')
    const { products, loading, error } = productList;
    // Link() ==> Shirt || Pants
    const category = props.match.params.id ? props.match.params.id : '';
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProduct(category));
        return () => {
            //
        };
    }, [category]) // ถ้าไม่ใส่ฟังชั่นนี้เวลา เปลี่ยนอัพเดตข้อมูลจะทำไม่ได้ ต้อง รีเฟรชหน้าเว็บใหม่เท่านั้น

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(listProduct(category, searchKeyword, sortOrder));
    }

    const sortHandler = (e) => {
        const order = e.target.value;
        console.log(order)
        setSortOrder(order)
        dispatch(listProduct(category, searchKeyword, sortOrder))
    }

    return (<div className="content">
        {category && <h2>{category}</h2>}
        <ul className="filter">
            <li>
                <form onSubmit={submitHandler}>
                    <input name="searchKeyword" onChange={(e) => setSearchKeyword(e.target.value)} />
                    <button type="submit">Search</button>
                </form>
            </li>
            <li>
                Sort By {' '}
                <select name="sortOrder" onChange={sortHandler}>
                    <option value="Pants">Pants</option>
                    <option value="Shirts">Shirts</option>
                </select>
            </li>
        </ul>

        {loading ? <div>Loading...</div> :
            error ? <div>{error}</div> :
                <div>
                    <ul className="products">
                        {
                            products.map(product =>
                                <li key={product._id}>
                                    <div className="product">
                                        <Link to={'/product/' + product._id}>
                                            <div className="cover-image">
                                                <img className="product-image" src={product.image} alt="" />
                                            </div>
                                        </Link>
                                        <div className="product-name">
                                            <Link to={'/product/' + product._id}>{product.name}</Link>
                                        </div>
                                        <div className="product-brand">{product.brand}</div>
                                        <div className="product-price">{product.price} $</div>
                                        <div className="product-rating">{product.rating} Stars ({product.numReviews})</div>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                    {/* } */}
                </div>
        }
    </div>

    )
}

export default HomeScreen;
