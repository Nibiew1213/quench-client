import axios from "axios";
import React from "react";
import { Card, Button, Placeholder } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

import ImageComponent from "../../../components/image-component/ImageComponent";
import { useShoppingCart } from "../../../context/ShoppingCartContext";
import styles from './beverage-card.module.scss';

function BeverageCard({ beverage }) {
    //destructurting
    const { _id, name, price, spec, img } = beverage;
    const { setUserCart, setTotalItemsTotal, setCartTotalPrice } = useShoppingCart()

    const addToCart = () => {
        const userData = JSON.parse(localStorage.getItem("user_data")) 
        const baseUsersURL = `${process.env.REACT_APP_USER_BASE_URL}/${userData.userId}`;
        const axiosCall = async () => {
            try {
                await axios.post(`${baseUsersURL}/cart`, 
                {
                    beverageId: _id,
                    quantity: 1
                });

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
        };

        axiosCall();
    }
    
    return (
        <>
        <div className="d-grid gap-3">
            <div className={styles['child']}>
                <div className="p-2 bg-light border">
                    {beverage ? (
                        
                            <Card style={{ width: "18rem", height: "600px" }}>
                                <Link to={`/beverages/${_id}`}>
                                <Card.Img className={styles['image']} variant="top" src={ImageComponent(img)} style={{objectFit: "cover"}} />
                                    <Card.Body>
                                        <div className={styles['priceheart']}>
                                            <Card.Text><b>${price.toFixed(2)}</b></Card.Text>
                                            {/* svg for the add favourite heart */}
                                            <button type="button" className="btn btn-outline-danger btn-sm mb-2" data-mdb-toggle="tooltip" title="Move to the wish list">
                                                <FontAwesomeIcon icon={icon({name: 'heart', style: 'regular', })} />
                                            </button>
                                            {/* <svg width="24" height="24" viewBox="0 0 24 24" color="#0d6efd"><title>favourite</title><path d="M20.5 9.225a4.73 4.73 0 0 1-1.38 3.34l-6.766 6.788a.5.5 0 0 1-.708 0l-6.767-6.788a4.734 4.734 0 0 1 0-6.68 4.701 4.701 0 0 1 6.664 0l.457.458.457-.458a4.703 4.703 0 0 1 6.663 0 4.73 4.73 0 0 1 1.38 3.34zM12 18.292l5.6-5.62.812-.813a3.73 3.73 0 0 0 0-5.268 3.703 3.703 0 0 0-5.247 0l-.811.814a.5.5 0 0 1-.708 0l-.812-.814a3.701 3.701 0 0 0-5.247 0 3.734 3.734 0 0 0 0 5.268L12 18.292z" fill="currentColor" fill-rule="evenodd"></path></svg> */}
                                        </div>
                                            <Card.Title>{name}</Card.Title>
                                            <Card.Text>{spec}</Card.Text>                              
                                    </Card.Body>
                                </Link>
                                <Card.Footer className={styles['greycontainer']}>
                                    <div className="mt-auto">
                                        <Button onClick={addToCart} variant="primary">Add to Cart</Button> 
                                    </div>
                                </Card.Footer>
                            </Card>
                    ) : (
                        <Card style={{ width: "18rem" }}>
                            <Card.Img variant="top" src={ImageComponent()} />
                            <Card.Body>
                                <Placeholder as={Card.Title} animation="glow">
                                    <Placeholder xs={6} />
                                </Placeholder>
                                <Placeholder as={Card.Text} animation="glow">
                                    <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                                    <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                                    <Placeholder xs={8} />
                                </Placeholder>
                                <Placeholder.Button variant="primary" xs={6} />
                            </Card.Body>
                        </Card>
                    )}
                </div>
            </div>
        </div>
        </>
    );
}

export default BeverageCard;
