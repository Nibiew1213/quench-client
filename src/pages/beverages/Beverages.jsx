import axios from "axios";
import React, { useEffect, useState } from "react";

import BeverageCard from "./beverage-card/BeverageCard";
import BeverageCardPlaceHolder from "./beverage-card/BeverageCardPlaceholder";
import styles from './beverage-card/beverage-card.module.scss'

const baseURL = process.env.REACT_APP_BEVERAGES_BASE_URL;

function Beverages() {
    const [beverages, setBeverages] = useState([]);
    
    useEffect(() => {
        axios.get(baseURL).then((response) => {
            setBeverages(response.data);
        });

        if (!beverages) return null;
    }, []);

    const beverageCards = beverages.map((beverage) => (
        <BeverageCard key={beverage._id} beverage={beverage} />
    ));

    console.log(beverages)
    return (
        <div className={styles['card-container']}>
            {/* <div className='d-flex flex-row justify-content-center'> */}
                {beverages.length !==0 ? (
                    <>
                        { beverageCards }
                    </>
                ) : (
                    <>
                    <div className="d-flex flex-wrap">
                        <BeverageCardPlaceHolder />
                        <BeverageCardPlaceHolder />
                        <BeverageCardPlaceHolder />
                        <BeverageCardPlaceHolder />
                        <BeverageCardPlaceHolder />
                        <BeverageCardPlaceHolder />
                        <BeverageCardPlaceHolder />
                        <BeverageCardPlaceHolder />
                        <BeverageCardPlaceHolder />
                        <BeverageCardPlaceHolder />
                        <BeverageCardPlaceHolder />
                        <BeverageCardPlaceHolder />
                    </div>
                    </>

                )}
            {/* </div> */}
        </div>     
    );
}

export default Beverages;
