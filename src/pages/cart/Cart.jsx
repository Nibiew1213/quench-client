import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


import LineItemCard from "../../components/cart-line-items/CartLineItems";
import emptyCartImage from "../cart/empty-cart.png";
import { useShoppingCart } from "../../context/ShoppingCartContext"


function Cart() {
    const { isFetchingCart, userCart, cartTotalPrice, totalItemsInCart, setUserCart, setTotalItemsTotal } = useShoppingCart()
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem("user_data"));

    const lineItemCards = () => {
        if (userCart.lineItems.length !== 0) {
            return userCart.lineItems.map((lineItem) => (
                <LineItemCard
                    key={lineItem._id}
                    lineItem={lineItem}
                />
            ));

        } else {
            return (
                <div>
                    <img
                        src={emptyCartImage}
                        alt="empty-cart"
                    />
                </div>
            )
        }

    }

    const onCheckout = () => {
        const baseUsersURL = `${process.env.REACT_APP_USER_BASE_URL}/${userData.userId}`;

        const axiosCall = async () => {
            try {
                await axios.post(`${baseUsersURL}/cart/checkout`);

                const getUpdatedCart = await axios.get(`${baseUsersURL}/cart`);
                const totalItemsInCart = getUpdatedCart.data.lineItems.reduce(
                    (previousValue, currentValue) => previousValue + currentValue.quantity,0);

                setUserCart(getUpdatedCart.data);
                setTotalItemsTotal(totalItemsInCart);

                toast.success("Successful Checkout!");
                navigate("/beverages")

                console.log("successfully checked out");
            } catch (error) {
                console.log(error);
                return;
            }
        };

        axiosCall();
    };

    return (
        <>
            <section className="">
                <div className="container py-5">
                    <div className="row d-flex justify-content-center my-4">
                        <div className="col-md-8">
                            <div className="card mb-4">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">
                                        Cart - {totalItemsInCart} item(s)
                                    </h5>
                                </div>

                                {!isFetchingCart ? (
                                    <>{lineItemCards()}</>
                                ) : (
                                    <>
                                        <div>
                                            <img
                                                src={emptyCartImage}
                                                alt="empty-cart"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card mb-4">
                                <div className="card-header py-3">
                                    <h5 className="mb-0">Summary</h5>
                                </div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                            Products
                                            <span>
                                                ${cartTotalPrice.toFixed(2)}
                                            </span>
                                        </li>

                                        <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                            Shipping
                                            <span>FREE</span>
                                        </li>

                                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                            <div>
                                                <strong>Total amount</strong>
                                                <strong>
                                                    <p className="mb-0">
                                                        (including GST)
                                                    </p>
                                                </strong>
                                            </div>
                                            <span>
                                                <strong>
                                                    ${cartTotalPrice.toFixed(2)}
                                                </strong>
                                            </span>
                                        </li>
                                    </ul>

                                    {totalItemsInCart ? (
                                    <button
                                        onClick={onCheckout}
                                        type="button"
                                        className="btn btn-primary btn-lg btn-block w-100"
                                    >
                                        Go to checkout
                                        </button>

                                    ) : (
                                        <button
                                        type="button"
                                        className="btn btn-primary btn-lg btn-block w-100" disabled
                                    >
                                        Go to checkout
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Cart;
