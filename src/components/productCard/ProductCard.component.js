import React, { useState } from 'react';
import './productCard.styles.scss';

import { addToWishlist, removeFromWishlist } from '../../store/home/homeAction';

// react-cookies
import { useCookies } from 'react-cookie';

import {
	FacebookShareButton,
	FacebookIcon,
	PinterestShareButton,
	PinterestIcon,
	TwitterShareButton,
	TwitterIcon,
} from 'react-share';

// toastify
import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';

// import react icons
import { AiOutlineStar, AiOutlineHeart, AiOutlineShareAlt, AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export default function ProductCard({ product = {} }) {
	const currencyRates = useSelector((state) => state.home);
	const dispatch = useDispatch();

	const { id } = product;
	const { brand } = product;
	const { product_name } = product;
	const { product_price } = product;
	const { total_price } = product;
	const { product_thumbnail } = product;
	const { is_in_wishlist } = product;
	const { wishlist_item_id } = product;

	const [cookies] = useCookies();

	function getConvertedPrice(pricetoconvert) {
		const userSelectedCurrency = cookies.userSelectedCurrency;
		const baseCurrency = 'USD';

		const rates = currencyRates && currencyRates.currencyRates && currencyRates.currencyRates.currencyRates;

		if (baseCurrency === userSelectedCurrency && userSelectedCurrency !== undefined) {
			return pricetoconvert + ' $';
		}

		if (userSelectedCurrency !== undefined) {
			const filterdRate = rates && rates.filter((eachRate) => eachRate.currencyCode === userSelectedCurrency);

			return `${(filterdRate[0].currencyValue * pricetoconvert).toFixed(2)} ${filterdRate[0].currencySymbol}`;
		}
		return pricetoconvert + ' $';
	}

	return (
		<>
			<div className="product_card">
				<div className="share-and-wish">
					<span
						className={'icon'}
						onClick={(e) => {
							if (!is_in_wishlist) {
								if (localStorage.getItem('es_login')) {
									dispatch(
										addToWishlist({
											user_id: localStorage.getItem('es_user_id'),
											product_id: id,
										})
									);
								} else {
									toast.dark('Please Login first');
								}
							} else if (is_in_wishlist) {
								if (localStorage.getItem('es_login')) {
									dispatch(removeFromWishlist(wishlist_item_id));
								}
							}
						}}
					>
						{is_in_wishlist ? <AiFillHeart /> : <AiOutlineHeart />}
					</span>
					<div className="share-icon">
						<span>
							<AiOutlineShareAlt />
						</span>
						<div className="social-icons">
							<TwitterShareButton
								url={`http://eshakti.ewtlive.in/product-details/${id}`}
								title={product_name}
								className="Demo__some-network__share-button"
							>
								<TwitterIcon size={28} round />
							</TwitterShareButton>
							<FacebookShareButton
								url={`http://eshakti.ewtlive.in/product-details/${id}`}
								title={product_name}
								className="Demo__some-network__share-button"
							>
								<FacebookIcon size={28} round />
							</FacebookShareButton>

							<PinterestShareButton
								url={`http://eshakti.ewtlive.in/product-details/${id}`}
								title={product_name}
								className="Demo__some-network__share-button"
							>
								<PinterestIcon size={28} round />
							</PinterestShareButton>
						</div>
					</div>
				</div>

				<Link to={`/product-details/${id}`}>
					<div className="product_img">
						<div className="img">
							<img
								className="img"
								src={
									(product_thumbnail && product_thumbnail.length > 0 && product_thumbnail[0]) ||
									'https://img1.eshakti.com/clothimages/CL0081518MP.jpg'
								}
								alt=""
							/>
						</div>
					</div>
					<div className="brand">{brand || 'brand name'}</div>
					<div className="product_name">{product_name || 'product name'}</div>
					<div className="price_and_rating">
						<div className="price">
							<span className="prev_price">{getConvertedPrice(product_price) || 222}</span>
							<span className="current_price">{getConvertedPrice(total_price) || 333}</span>
						</div>
						<span className="rating">
							<span className="each_star">
								<AiOutlineStar />
							</span>
							<span className="each_star">
								<AiOutlineStar />
							</span>
							<span className="each_star">
								<AiOutlineStar />
							</span>
						</span>
					</div>
				</Link>
			</div>
		</>
	);
}
