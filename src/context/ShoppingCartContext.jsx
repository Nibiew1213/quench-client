import axios from "axios";
import  {useContext, createContext, useState, useEffect} from 'react'


const ShoppingCartContext = createContext({});




//custon hook - function that returns some stuff
export function useShoppingCart() {
    return useContext(ShoppingCartContext); 
}

export function ShoppingCartProvider({ children }) {
    //what info i want to make available throughout the app
    const [userData, setUserData] = useState({})
    const [isFetchingCart, setFetchingCart] = useState(true)
    const [userCart, setUserCart] = useState({})
    const [cartTotalPrice, setCartTotalPrice] = useState(0.00)
    const [totalItemsInCart, setTotalItemsTotal] = useState(0)

    //is user loggedin?
    const userLoggedIn = localStorage.getItem("user_token")
    
    useEffect(() => {

        if (userLoggedIn) {
            
            let userId = userData.userId

            //cart with items
            const userBaseURL = `${process.env.REACT_APP_USER_BASE_URL}/${userId}/cart`;
            
            const getCart = async () => {
        
                try {
                    const response = await axios.get(userBaseURL)
                    setUserCart(response.data)
                    console.log("response.data: ", response.data)
    
    
                    const cartSum = response.data.lineItems.reduce((previousValue, currentValue) => previousValue + (currentValue.quantity * currentValue.product.price), 0)
                    setCartTotalPrice(cartSum)
    
                    const totalItemsInCart = response.data.lineItems.reduce((previousValue, currentValue) => previousValue + (currentValue.quantity), 0)
                    setTotalItemsTotal(totalItemsInCart)
                    setFetchingCart(false)
        
                } catch (error) {
                    console.log(error)
                    return
                }
            }
    
           getCart().catch(console.error);
        }
    // eslint-disable-next-line
    },[userLoggedIn]);

    //total items in cart
    //total price of cart
    //add to cart
    //remove from cart
    
    
    const value = {
        //all the functions here
        cartTotalPrice,
        isFetchingCart,
        totalItemsInCart,
        userCart,
        userData,
        setCartTotalPrice,
        setFetchingCart,
        setTotalItemsTotal,
        setUserCart,
        setUserData
    }

    return (
        <ShoppingCartContext.Provider value={value}>
            {children}
        </ShoppingCartContext.Provider>
    );
}


