import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './cartProductCard.styles.scss';
import Img from '../../assets/images/04.png';
import { useCookies } from 'react-cookie';

export default function CartProductCard({ product }) {
	const [cookies] = useCookies();
	const currencyRates = useSelector((state) => state.home.currencyRates);

	function getConvertedPrice(pricetoconvert) {
		const userSelectedCurrency = cookies.userSelectedCurrency;
		const baseCurrency = 'USD';
		const rates = currencyRates && currencyRates.currencyRates;

		if (baseCurrency === userSelectedCurrency && userSelectedCurrency !== undefined) {
			return pricetoconvert + ' $';
		}

		if (userSelectedCurrency !== undefined) {
			const filterdRate = rates.filter((eachRate) => eachRate.currencyCode === userSelectedCurrency);

			return `${(filterdRate[0].currencyValue * pricetoconvert).toFixed(2)} ${filterdRate[0].currencySymbol}`;
		}
		return pricetoconvert + ' $';
	}
	return (
		<div className="cart-product-card">
			<div className="inner-container">
				<div className="product-img">
					<img
						src={
							product.product_type === 'customized'
								? product.customization.customized_image
								: product.product_thumbnail &&
								  product.product_thumbnail.length > 0 &&
								  product.product_thumbnail[0]
						}
						alt="img"
					/>
				</div>
				<div className="product-details">
					<div className="product-name">
						<p className="primary-text">{product && product.product_name}</p>
						<p className="variation">{product && product.color_name}</p>
					</div>
					<div className="price">{product && getConvertedPrice(product.product_price)}</div>
				</div>
			</div>
		</div>
	);
}
