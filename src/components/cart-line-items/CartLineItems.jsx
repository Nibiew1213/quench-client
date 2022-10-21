import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Link } from "react-router-dom";

import ImageComponent from "../image-component/ImageComponent";
import { useShoppingCart } from "../../context/ShoppingCartContext";

function LineItemCard({lineItem}) {

    //just receive props as it's a dumb component
    const { setUserCart, setTotalItemsTotal, setCartTotalPrice} = useShoppingCart()
    
    // destructurting
    const { _id, name, price, spec, img } = lineItem.product;
    const { quantity } = lineItem
    console.log("quantity:", quantity)
    
    const userData = JSON.parse(localStorage.getItem("user_data")) 
    const baseUsersURL = `${process.env.REACT_APP_USER_BASE_URL}/${userData.userId}`;

    // since CartLineItems is a dumb component, put this in Cart.jsx
    const removeFromCart = () => {
        const axiosCall = async () => {
            try {
                await axios.delete(`${baseUsersURL}/cart/lineItem/${lineItem._id}`);

                const getUpdatedCart = await axios.get(`${baseUsersURL}/cart`)
                const totalItemsInCart = getUpdatedCart.data.lineItems.reduce((previousValue, currentValue) => previousValue + (currentValue.quantity), 0)
                const cartSum = getUpdatedCart.data.lineItems.reduce((previousValue, currentValue) => previousValue + (currentValue.quantity * currentValue.product.price), 0)
                
                setUserCart(getUpdatedCart.data)
                setTotalItemsTotal(totalItemsInCart)
                setCartTotalPrice(cartSum)

                console.log("deleted from cart!")
            } catch (error) {
                console.log(error)
                return
            }
        };

        axiosCall();

    }

    // since CartLineItems is a dumb component, put this in Cart.jsx
    const increaseQuantity = () => {
        const axiosCall = async () => {
            try {
                await axios.patch(`${baseUsersURL}/cart/lineItem/${lineItem._id}`, {
                    quantity: quantity + 1
                })

                const getUpdatedCart = await axios.get(`${baseUsersURL}/cart`)
                const totalItemsInCart = getUpdatedCart.data.lineItems.reduce((previousValue, currentValue) => previousValue + (currentValue.quantity), 0)
                const cartSum = getUpdatedCart.data.lineItems.reduce((previousValue, currentValue) => previousValue + (currentValue.quantity * currentValue.product.price), 0)

                setUserCart(getUpdatedCart.data)
                setTotalItemsTotal(totalItemsInCart)
                setCartTotalPrice(cartSum)

            } catch (error) {
                console.log(error)
                return
            }
        }

        axiosCall();
    }

    const decreaseQuantity = () => {
        const axiosCall = async () => {
            if(quantity !== 1) {
                try {
                    await axios.patch(`${baseUsersURL}/cart/lineItem/${lineItem._id}`, {
                        quantity: quantity - 1
                    })
    
                    const getUpdatedCart = await axios.get(`${baseUsersURL}/cart`)
                    const totalItemsInCart = getUpdatedCart.data.lineItems.reduce((previousValue, currentValue) => previousValue + (currentValue.quantity), 0)
                    const cartSum = getUpdatedCart.data.lineItems.reduce((previousValue, currentValue) => previousValue + (currentValue.quantity * currentValue.product.price), 0)
    
                    setUserCart(getUpdatedCart.data)
                    setTotalItemsTotal(totalItemsInCart)
                    setCartTotalPrice(cartSum)
    
                } catch (error) {
                    console.log(error)
                    return
                }
            } else {
                removeFromCart()
            }
        }

        axiosCall();
    }

    return (
        <>
        <div className="card-body">
            <div className="row">
                <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                    <div
                        className="bg-image hover-overlay hover-zoom ripple rounded"
                        data-mdb-ripple-color="light"
                    >
                        <Link to={`/beverages/${_id}`}>
                            <img
                                src={ImageComponent(img)}
                                className="w-100"
                                alt={name}
                            />
                        </Link>
                    </div>
                </div>

                <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                    <Link to={`/beverages/${_id}`} style={{ textDecoration: 'none' , color: "black"}}>
                        <p>
                            <strong>{name}</strong>
                        </p>
                        <p>Spec: {spec}</p>
                    </Link>
                    <button
                        onClick={removeFromCart}
                        type="button"
                        className="btn btn-outline-primary btn-sm me-1 mb-2"
                        data-mdb-toggle="tooltip"
                        title="Remove item"
                    >
                        <FontAwesomeIcon
                            icon={icon({ name: "trash", style: "solid" })}
                        />
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-danger btn-sm mb-2"
                        data-mdb-toggle="tooltip"
                        title="Move to the wish list"
                    >
                        <FontAwesomeIcon
                            icon={icon({ name: "heart", style: "regular" })}
                        />
                    </button>
                </div>

                <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
    
                    <div className="d-flex mb-4 justify-content-center">
                        <button
                            className="btn btn-primary px-3 me-2"
                            onClick={decreaseQuantity}
                        >
                            <FontAwesomeIcon
                                icon={icon({ name: "minus", style: "solid" })}
                            />
                            {/* {quantity === 1 ? (
                                <FontAwesomeIcon
                                    icon={icon({ name: "minus", style: "solid" })}
                                />
                            ) : (
                                <FontAwesomeIcon
                                    icon={icon({ name: "trash", style: "solid" })}
                                />
                            )} */}
                        </button>

                        <div className="form-outline my-auto">
                            {/* <input
                                id={_id}
                                min="0"
                                name="quantity"
                                value= {quantity}
                                type="number"
                                className="form-control"
                            /> */}
                            <label className="form-label d-flex justify-content-center my-auto" for={_id}>
                                <strong>{quantity} in Cart</strong>
                            </label>
                        </div>

                        <button
                            className="btn btn-primary px-3 ms-2"
                            onClick={increaseQuantity}
                            // onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                        >
                            <FontAwesomeIcon
                                icon={icon({ name: "plus", style: "solid" })}
                            />
                        </button>
                    </div>
                    

                    <p className="text-start text-md-center">
                        <strong>${price.toFixed(2)}</strong>
                    </p>
                </div>
            </div>

            <hr className="my-4" />
        </div>

    </>
    );
}

export default LineItemCard;