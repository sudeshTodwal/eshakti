import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getCart,
	updateCart,
	removeCart,
	placeOrder,
	getCountryList,
	getStateList,
	getCityList,
	getShippingChargesList,
	getPublishingKey,
	getBillingDetails,
	getShippingDetails,
} from '../../store/home/homeAction';
import './shippingInfopage.styles.scss';

import { Link } from 'react-router-dom';
import CartProductCard from '../cart-product-card/CartProductCard.component';
import FormInput from '../form-input/FormInput.component';
import SelectFormElement from '../select-form-element/SelectFormElement.component';
import { ToastContainer, toast } from 'react-toastify';
import StripeCheckout from 'react-stripe-checkout';

import { IoIosArrowBack } from 'react-icons/io';
import BillingAddress from './BillingAddress';

// react-cookies
import { useCookies } from 'react-cookie';

export default function ShippingInfoPage() {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [alternate_phone, setAlternate_phone] = useState('');
	const [address, setAddress] = useState('');
	const [address_type, setAddress_type] = useState('');
	const [city, setCity] = useState('');
	const [country, setCountry] = useState('');
	const [state, setState] = useState('');
	const [zip_code, setZip_code] = useState('');
	const [landmark, setLandmark] = useState('');
	const [shipping_id, setShipping_id] = useState('');
	const [shippingAddress, setShippingAddress] = useState(false);
	const [shippingCharges, setShippingCharges] = useState(false);

	const [billingname, setBillingName] = useState('');
	const [billingphone, setBillingPhone] = useState('');
	const [billingalternate_phone, setBillingAlternate_phone] = useState('');
	const [billingaddress, setBillingAddress] = useState('');
	const [billingaddress_type, setBillingAddress_type] = useState('');
	const [billingcity, setBillingCity] = useState('');
	const [billingcountry, setBillingCountry] = useState('');
	const [billingstate, setBillingState] = useState('');
	const [billingzip_code, setBillingZip_code] = useState('');
	const [billinglandmark, setBillingLandmark] = useState('');
	const [billingshipping_id, setBillingShipping_id] = useState('');

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const [cookies] = useCookies();

	const currencyRates = useSelector((state) => state.home.currencyRates);
	const publishingKey = useSelector((state) => state.home.publishingKey);

	const shippingDetails = useSelector((state) =>
		state.home.shippingDetails ? state.home.shippingDetails.shipping_address : null
	);

	const billingDetails = useSelector((state) => state.home.billingDetails);

	const cart = useSelector((state) => state.home.cart);
	const countryList = useSelector((state) => state.home.countryList);

	const stateList = useSelector((state) => state.home.stateList);
	const cityList = useSelector((state) => state.home.cityList);
	const shippingChargesList = useSelector((state) => state.home.shippingChargesList);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCart());
		dispatch(getCountryList());

		// dispatch(getCityList());
		dispatch(getShippingChargesList());
		dispatch(getPublishingKey());

		let userId = localStorage.getItem('es_user_id');
		dispatch(getShippingDetails(userId));
		dispatch(getBillingDetails(userId));
	}, []);

	useEffect(() => {
		if (shippingDetails) {
			setName(shippingDetails.name);
			setPhone(shippingDetails.phone);
			setAlternate_phone(shippingDetails.alternate_phone);
			setAddress(shippingDetails.address);
			setAddress_type(shippingDetails.address_type);
			setCity(shippingDetails.city);
			setCountry(shippingDetails.country);
			setState(shippingDetails.state);
			setZip_code(shippingDetails.zip_code);
			setLandmark(shippingDetails.landmark);
			setShipping_id(shippingDetails.shipping_id);
			setShippingAddress(shippingDetails.shippingAddress);
			setShippingCharges(shippingDetails.shippingCharges);
		}
	}, [shippingDetails]);
	useEffect(() => {
		if (billingDetails) {
			setBillingName(billingDetails.name);
			setBillingPhone(billingDetails.phone);
			setBillingAlternate_phone(billingDetails.alternate_phone);
			setBillingAddress(billingDetails.address);
			setBillingAddress_type(billingDetails.address_type);
			setBillingCity(billingDetails.city);
			setBillingCountry(billingDetails.country);
			setBillingState(billingDetails.state);
			setBillingZip_code(billingDetails.zip_code);
			setBillingLandmark(billingDetails.landmark);
			setBillingShipping_id(billingDetails.shipping_id);
		}
	}, [billingDetails]);

	const updateQunitity = (type, cart_id) => {
		let quantity;
		if (type === 'add') {
			for (let i = 0; i < cart.length; i++) {
				if (cart_id === cart[i].cart_id) {
					quantity = cart[i].quantity + 1;
				}
			}
		} else {
			for (let i = 0; i < cart.length; i++) {
				if (cart_id === cart[i].cart_id) {
					if (cart[i].quantity > 1) {
						quantity = cart[i].quantity - 1;
					}
				}
			}
		}
		let data = {
			quantity: quantity,
		};
		dispatch(updateCart(data, cart_id));
	};

	const cartTotalBeforeShipping = () => {
		let total = 0;
		if (cart) {
			for (let i = 0; i < cart.length; i++) {
				total = total + cart[i].product_price;
			}
		}
		return total;
	};
	const cartGrandTotal = () => {
		let total = 0;
		if (cart) {
			for (let i = 0; i < cart.length; i++) {
				total = total + cart[i].product_price;
			}
		}

		if (shippingCharges) {
			total = total + shippingCharges;
		}
		return total;
	};

	const onPlaceOrder = (token) => {
		let cart_id = [];
		if (!cart.length > 0) {
			toast('Your cart is empty!', {
				type: toast.TYPE.ERROR,
				autoClose: 10000,
			});
			return false;
		}
		for (let i = 0; i < cart.length; i++) {
			cart_id.push(cart[i].cart_id);
		}

		let shipping_charge = 0;
		let selling_zone_id;
		for (let i = 0; i < shippingChargesList.length; i++) {
			if (shipping_id == shippingChargesList[i].id) {
				shipping_charge = shippingChargesList[i].cost;
				selling_zone_id = shippingChargesList[i].zone_id;
			}
		}

		let data = {
			stripe_token: token,
			currency_code: cookies.userSelectedCurrency ? cookies.userSelectedCurrency : 'usd',
			currency_sign: cookies.currencySymbol ? cookies.currencySymbol : '$',
			totPrice: cartGrandTotal(),
			user_id: localStorage.getItem('es_user_id'),
			shipping_method_id: shipping_id,
			selling_zone_id: selling_zone_id,
			cart_id: cart_id,
			shipping_address: {
				name: name,
				phone: phone,
				alternate_phone: alternate_phone,
				address: address,
				address2: address,
				address_type: address_type,
				city: city,
				country: country,
				state: state,
				zip_code: zip_code,
				landmark: landmark,
			},

			payment: {
				mode: 'COD',
				status: 'Unpaid',
			},
		};

		shippingAddress
			? (data.billing_address = {
					name: billingname,
					phone: billingphone,
					alternate_phone: billingalternate_phone,
					address: billingaddress,
					address2: billingaddress,
					address_type: billingaddress_type,
					city: billingcity,
					country: billingcountry,
					state: billingstate,
					zip_code: billingzip_code,
					landmark: billinglandmark,
			  })
			: (data.billing_address = {
					name: name,
					phone: phone,
					alternate_phone: alternate_phone,
					address: address,
					address2: address,
					address_type: address_type,
					city: city,
					country: country,
					state: state,
					zip_code: zip_code,
					landmark: landmark,
			  });

		dispatch(placeOrder(data));
	};

	const selectCountry = (e) => {
		setCountry(e.target.value);
		dispatch(getStateList(e.target.value));
	};
	const selectState = (e) => {
		setState(e.target.value);
		dispatch(getCityList(e.target.value));
	};
	const selectCity = (e) => {
		setCity(e.target.value);
	};
	const selectPincode = (e) => {
		setZip_code(e.target.value);
		let data = {
			country_id: country,
			state_id: state,
			city_id: city,
			postal_code: e.target.value,
		};
		dispatch(getShippingChargesList(data));
	};
	const selectCharges = (e) => {
		setShipping_id(e.target.value);

		for (let i = 0; i < shippingChargesList.length; i++) {
			console.log(e.target.value, shippingChargesList[i]);
			if (e.target.value == shippingChargesList[i].id) {
				setShippingCharges(parseInt(shippingChargesList[i].cost));
			}
		}
	};
	const onToken = (token) => {
		console.log('hello');
		onPlaceOrder(token.id);
	};

	function getConvertedPrice(pricetoconvert) {
		if (pricetoconvert) {
			const userSelectedCurrency = cookies.userSelectedCurrency;
			const baseCurrency = 'USD';
			const rates = currencyRates && currencyRates.currencyRates;

			if (baseCurrency === userSelectedCurrency && userSelectedCurrency !== undefined) {
				return pricetoconvert + ' $';
			}

			if (userSelectedCurrency !== undefined) {
				const filterdRate = rates && rates.filter((eachRate) => eachRate.currencyCode === userSelectedCurrency);

				return `${(filterdRate && filterdRate[0].currencyValue * pricetoconvert).toFixed(2)} ${
					filterdRate[0].currencySymbol
				}`;
			}
			return pricetoconvert + ' $';
		}
	}
	return (
		<div className="shipping-info">
			<ToastContainer></ToastContainer>
			<div className="inner-container">
				<div className="left">
					<div className="top-title-area">
						<h2 className="title">contact information</h2>
						<div className="login-link">
							<Link className="link" to="/login">
								Already have an account ? Log In
							</Link>
						</div>
					</div>
					<div className="info-form">
						<form onSubmit={onPlaceOrder}>
							<FormInput
								type={'text'}
								placeholder={'Enter Phone Number'}
								name={'phone'}
								value={phone}
								onChange={(e) => {
									var text = e.target.value.replace(/[^0-9+]/gi, '');
									setPhone(text);
								}}
								required
							/>
							<div className="mid-title">
								<h2 className="title-text">Shipping Address</h2>
							</div>

							<div className="inline-form-shipping-address">
								<FormInput
									type="text"
									placeholder="Full Name"
									className={'firstName'}
									name="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									required
								/>
								{/* <FormInput
                  type={"text"}
                  placeholder={"Last Name"}
                  className="lastName"
                  name={"lastName"}
                /> */}
							</div>

							<FormInput
								type={'text'}
								placeholder={'Apartment, Suit, etc'}
								className="residency"
								name="address"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								required
							/>
							{/* <FormInput
                type={"text"}
                placeholder={"City"}
                className={"city"}
                name={"city"}
              /> */}
							<div className="inline-form-field">
								<select onChange={selectCountry} required>
									<option>Select Country</option>
									{countryList &&
										countryList.map((country, key) => (
											<option key={key} value={country.id}>
												{country.name}
											</option>
										))}
								</select>
								<select onChange={selectState} required>
									<option>Select State</option>
									{stateList &&
										stateList.map((state, key) => (
											<option key={key} value={state.id}>
												{state.name}
											</option>
										))}
								</select>
							</div>
							<div className="inline-form-field" required>
								<select onChange={selectCity}>
									<option>Select City</option>
									{cityList &&
										cityList.map((city, key) => (
											<option key={key} value={city.id}>
												{city.name}
											</option>
										))}
								</select>

								<FormInput
									type={'text'}
									className="pincode"
									placeholder="PIN"
									value={zip_code}
									onChange={selectPincode}
									required
								/>
							</div>
							<div className="inline-form-field select-charges">
								<select onChange={selectCharges} required>
									<option>Select Charges</option>
									{shippingChargesList &&
										shippingChargesList.map((method, key) => (
											<option key={key} value={method.id}>
												{method.label}
											</option>
										))}{' '}
								</select>
							</div>
							<div className="save-info">
								<FormInput
									type={'checkbox'}
									className="save-info-checkbox"
									checked={!shippingAddress ? true : false}
									onClick={() => setShippingAddress(!shippingAddress)}
								/>
								<p>Use shipping address same as billing address</p>
							</div>

							{shippingAddress && (
								<BillingAddress
									setBillingName={(text) => setBillingName(text)}
									setBillingPhone={(text) => setBillingPhone(text)}
									setBillingAlternate_phone={(text) => setBillingAlternate_phone(text)}
									setBillingAddress={(text) => setBillingAddress(text)}
									setBillingAddress_type={(text) => setBillingAddress_type(text)}
									setBillingCity={(text) => setBillingCity(text)}
									setBillingCountry={(text) => setBillingCountry(text)}
									setBillingState={(text) => setBillingState(text)}
									setBillingZip_code={(text) => setBillingZip_code(text)}
									setBillingLandmark={(text) => setBillingLandmark(text)}
									setBillingShipping_id={(text) => setBillingShipping_id(text)}
								></BillingAddress>
							)}

							<div className="bottom">
								<div className="return-link">
									<Link to="/cart" className="link">
										<span className="icon">
											<IoIosArrowBack />
										</span>
										Return to Cart
									</Link>
								</div>
								{/* <FormInput
                  type={"submit"}
                  className="submit-btn"
                  value="continue to shopping"
                /> */}
							</div>
						</form>
					</div>
				</div>
				<div className="right">
					<div className="cart-products">
						{cart && cart.length > 0 ? cart.map((product) => <CartProductCard product={product} />) : ' '}

						{/* <CartProductCard /> */}
					</div>
					<div className="cost-amounts">
						<div className="sub-total">
							<span className="text">Sub Total</span>
							<span className="value">
								{getConvertedPrice(cartTotalBeforeShipping() ? cartTotalBeforeShipping() : 0)}
							</span>
						</div>
						<div className="sub-total">
							<span className="text">Shipping</span>
							<span className="value">{getConvertedPrice(shippingCharges ? shippingCharges : 0)}</span>
						</div>
						<div className="tax">
							<span className="text">Taxes (estimated)</span>
							<span className="value">{getConvertedPrice(0)}</span>
						</div>
						<div className="total">
							<span className="text">Total</span>
							<span className="value">{getConvertedPrice(cartGrandTotal() ? cartGrandTotal() : 0)}</span>
						</div>
					</div>
					<StripeCheckout
						token={onToken}
						stripeKey={
							'pk_test_51IVUw2GZXq85JtYzRMYpVEPMlJj32IRys5co67jmCIOUnhavVqGzuPjPTYsw5CFYhlcdPAKcWZW6cQjr4fC9GSPA00dgCogPjO'
						}
						amount={getConvertedPrice(cartGrandTotal() * 100)}
						currency={cookies.userSelectedCurrency}
					>
						<div className="checkout-btn"> Make Payment</div>
					</StripeCheckout>
				</div>
			</div>
		</div>
	);
}
