import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react';
import 'react-responsive-modal/styles.css';
import './productCustomization.scss';
import { Modal } from 'react-responsive-modal';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { AiOutlineShareAlt } from 'react-icons/ai';
import ImagesCustomization from './ImagesCustomization';
import mergeImages from 'merge-images';

// react share package
import {
	FacebookShareButton,
	FacebookIcon,
	PinterestShareButton,
	PinterestIcon,
	TwitterShareButton,
	TwitterIcon,
} from 'react-share';
import SavedStyle from './SavedStyle';

export default function ProductCustomization({
	open,
	close,
	currentVariant,
	saveFinalCustomisation,
	saveFinalImage,
	productDetail,
}) {
	const childRef = useRef();
	const [style, setStyle] = useState({});
	const [enableSavedStyle, setEnableSavedStyle] = useState(false);
	const [showSavedProduct, setShowSavedProduct] = useState(false);

	useEffect(() => {
		currentVariant && getImgSize();

		setTimeout(() => {
			currentVariant && getImgSize();
			saveFinalCustomisation(currentCustom);
			currentVariant &&
				setCurrentCustom({
					neck_style: currentVariant ? currentVariant.default_design[0] : null,
					sleeve_style: currentVariant ? currentVariant.default_design[1] : null,
					bottom_style: currentVariant ? currentVariant.default_design[2] : null,
				});
		}, 500);

		if (open) {
			setTimeout(() => {
				var mainElement = document.querySelector('.product-customization-container');
				mainElement.scrollTo(0, 0);
				changeSavedProductId();
			}, 10);
		}
	}, [open]);

	const [currentCustom, setCurrentCustom] = useState();

	const changeImage = (data) => {
		getImgSize();
		if (data.type === 'neck_style') {
			setCurrentCustom({ ...currentCustom, neck_style: data });
		} else if (data.type === 'bottom_style') {
			setCurrentCustom({ ...currentCustom, bottom_style: data });
		} else {
			setCurrentCustom({
				...currentCustom,
				sleeve_style: data,
			});
		}

		setEnableSavedStyle(true);
	};

	const getImgSize = () => {
		var style = {};

		var neck_design = new Image();
		neck_design.src =
			currentVariant &&
			currentVariant.neck_style &&
			currentVariant.neck_style.length > 0 &&
			currentVariant.neck_style[0].neck_design;

		style.topWidth = neck_design.width;
		style.topHeight = neck_design.height;

		var lhand_design = new Image();
		lhand_design.src =
			currentVariant &&
			currentVariant.sleeve_style &&
			currentVariant.sleeve_style.length > 0 &&
			currentVariant.sleeve_style[0].lhand_design;
		style.leftWidth = lhand_design.width;

		var rhand_design = new Image();
		rhand_design.src =
			currentVariant &&
			currentVariant.sleeve_style &&
			currentVariant.sleeve_style.length > 0 &&
			currentVariant.sleeve_style[0].rhand_design;
		style.rightWidth = rhand_design.width;

		var bottom_design = new Image();
		bottom_design.src =
			currentVariant &&
			currentVariant.bottom_style &&
			currentVariant.bottom_style.length > 0 &&
			currentVariant.bottom_style[0].bottom_design;
		style.bottomWidth = bottom_design.width;
		style.bottomHeight = bottom_design.height;

		setStyle(style);
		return style;
	};

	const onCloseModal = () => {
		close();
	};

	const left = (e) => {
		sideScroll(e.target.parentElement.parentElement.lastChild, 'left', 25, 55, 10);
	};
	const right = (e) => {
		sideScroll(e.target.parentElement.parentElement.lastChild, 'right', 25, 55, 10);
	};

	const sideScroll = (element, direction, speed, distance, step) => {
		let scrollAmount = 0;
		var slideTimer = setInterval(function () {
			if (direction == 'left') {
				element.scrollLeft -= step;
			} else {
				element.scrollLeft += step;
			}
			scrollAmount += step;
			if (scrollAmount >= distance) {
				window.clearInterval(slideTimer);
			}
		}, speed);
	};

	const onSave = () => {
		saveFinalCustomisation(currentCustom);
		compressImage();
		onCloseModal();
	};

	const compressImage = (value) => {
		mergeImages(
			[
				{
					src: currentCustom && currentCustom.neck_style && currentCustom.neck_style.neck_design,
					x: style.leftWidth,
					y: 0,
				},
				{
					src: currentCustom && currentCustom.sleeve_style && currentCustom.sleeve_style.lhand_design,
					x: 0,
					y: 0,
				},
				{
					src: currentCustom && currentCustom.sleeve_style && currentCustom.sleeve_style.rhand_design,
					x: style.leftWidth + style.topWidth,
					y: 0,
				},
				{
					src: currentCustom && currentCustom.bottom_style && currentCustom.bottom_style.bottom_design,
					x: 0,
					y: style.topHeight,
				},
			],
			{
				width: style.leftWidth + style.topWidth + style.rightWidth,
				height: style.topHeight + style.bottomHeight,
				crossOrigin: true,
			}
		).then((b64) => {
			saveFinalImage(b64);

			if (value == 'saveDesign') {
				onSaveStyle(b64);
			}
		});
	};

	const onSaveStyle = (image) => {
		var data = [];
		var product = {
			id: 1,
			product: productDetail,
			image: image,
			currentCustom: currentCustom,
		};
		if (localStorage.getItem('saved-style')) {
			data = JSON.parse(localStorage.getItem('saved-style'));
			if (data.length > 0) {
				product.id = data[data.length - 1].id + 1;
			}
		}

		data.push(product);
		var data = JSON.stringify(data);
		localStorage.setItem('saved-style', data);
		setShowSavedProduct(true);
		childRef.current.showAlert();

		setTimeout(() => {
			var mainElement = document.querySelector('.product-customization-container');

			mainElement.scrollTo({
				top: mainElement.scrollHeight,
				behavior: 'smooth',
			});
		}, 10);

		if (localStorage.getItem('saved-style')) {
			changeSavedProductId();
		}
	};
	const changeSavedProductId = () => {
		if (localStorage.getItem('saved-style')) {
			var savedStyle = JSON.parse(localStorage.getItem('saved-style'));
			for (let i = 0; i < savedStyle.length; i++) {
				if (productDetail.id === savedStyle[i].product.id) {
					setShowSavedProduct(true);
				}
			}
		}
	};
	return (
		<div>
			<Modal
				classNames={{
					modal: 'customization-modal p-0',
				}}
				open={open}
				onClose={onCloseModal}
				center
			>
				<div id="main-wrapper" className="main-customization-wrapper">
					<div className="product-customization-container">
						<div className="images-customize-section">
							<ImagesCustomization currentCustom={currentCustom} style={style}></ImagesCustomization>
							<div className="details-wrapper">
								<h5 className="product-title">Customize your style with eShakti FX</h5>
								<p className="text-lead">Click on any box and see the style change!</p>

								<div className="attribute-wrapper">
									<div className="attribute-header">NECKLINE</div>
									<div className="attribute-container">
										<div className="default-attribute">
											<div className="text-lead">As Shown</div>
											{currentVariant &&
											currentVariant.default_design &&
											currentVariant.default_design.length > 0 &&
											currentCustom &&
											currentCustom.neck_style &&
											currentCustom.neck_style.id === currentVariant.default_design[0].id ? (
												<div className="default-image selected-image">
													<div className="text-lead">Default</div>
												</div>
											) : (
												<div
													className="default-image"
													onClick={changeImage.bind(
														this,
														currentVariant &&
															currentVariant.default_design &&
															currentVariant.default_design.length > 0 &&
															currentVariant.default_design[0]
													)}
												>
													<div className="text-lead">Default</div>
												</div>
											)}
											<p className="text-lead">
												{currentVariant &&
													currentVariant.default_design &&
													currentVariant.default_design.length > 0 &&
													currentVariant.default_design[0].design_name}
											</p>
										</div>
										<div className="customize-slider-container">
											<div className="text-lead">Click to change Neckline</div>
											<div className="images-slider">
												{currentVariant &&
													currentVariant.neck_style &&
													currentVariant.neck_style.length > 0 &&
													currentVariant.neck_style.map(
														(image, key) =>
															image.id !== '0' && (
																<div
																	key={key}
																	className="image"
																	onClick={changeImage.bind(this, image)}
																>
																	{currentCustom &&
																	currentCustom.neck_style &&
																	currentCustom.neck_style.id === image.id ? (
																		<img
																			className="selected-image"
																			src={image.design_icon}
																			alt=""
																		/>
																	) : (
																		<img src={image.design_icon} alt="" />
																	)}
																	<p className="text-lead">{image.design_name}</p>
																</div>
															)
													)}
											</div>
										</div>
									</div>
								</div>

								<div className="attribute-wrapper">
									<div className="attribute-header">SLEEVE TYPE</div>
									<div className="attribute-container">
										<div className="default-attribute">
											<div className="text-lead">As Shown</div>
											{currentVariant &&
											currentVariant.default_design &&
											currentVariant.default_design.length > 0 &&
											currentCustom &&
											currentCustom.sleeve_style &&
											currentCustom.sleeve_style.id == currentVariant.default_design[1].id ? (
												<div className="default-image selected-image">
													<div className="text-lead">Default</div>
												</div>
											) : (
												<div
													className="default-image"
													onClick={changeImage.bind(
														this,
														currentVariant &&
															currentVariant.default_design &&
															currentVariant.default_design[1]
													)}
												>
													<div className="text-lead">Default</div>
												</div>
											)}
											<p className="text-lead">
												{currentVariant &&
													currentVariant.default_design &&
													currentVariant.default_design[1].design_name}
											</p>
										</div>
										<div className="customize-slider-container">
											<div className="text-lead">Click to change Sleeve Type</div>
											<div className="left-button" onClick={left}>
												<BsChevronLeft />
											</div>
											<div className="right-button" onClick={right}>
												<BsChevronRight />
											</div>
											<div className="images-slider">
												{currentVariant &&
													currentVariant.sleeve_style &&
													currentVariant.sleeve_style.length > 0 &&
													currentVariant.sleeve_style.map(
														(image, key) =>
															image.id !== '0' && (
																<div
																	key={key}
																	className="image"
																	onClick={changeImage.bind(this, image)}
																>
																	{currentCustom &&
																	currentCustom.sleeve_style &&
																	currentCustom.sleeve_style.id === image.id ? (
																		<img
																			className="selected-image"
																			src={image.design_icon}
																			alt=""
																		/>
																	) : (
																		<img src={image.design_icon} alt="" />
																	)}

																	<p className="text-lead">{image.design_name}</p>
																</div>
															)
													)}
											</div>
										</div>
									</div>
								</div>

								<div className="attribute-wrapper">
									<div className="attribute-header">LENGTH</div>
									<div className="attribute-container">
										<div className="default-attribute">
											<div className="text-lead">As Shown</div>
											{currentVariant &&
											currentVariant.default_design &&
											currentVariant.default_design.length > 0 &&
											currentCustom &&
											currentCustom.bottom_style &&
											currentCustom.bottom_style.id == currentVariant.default_design[2].id ? (
												<div className="default-image selected-image">
													<div className="text-lead">Default</div>
												</div>
											) : (
												<div
													className="default-image"
													onClick={changeImage.bind(
														this,
														currentVariant &&
															currentVariant.default_design &&
															currentVariant.default_design.length > 0 &&
															currentVariant.default_design[2]
													)}
												>
													<div className="text-lead">Default</div>
												</div>
											)}
											<p className="text-lead">
												{currentVariant &&
													currentVariant.default_design &&
													currentVariant.default_design.length > 0 &&
													currentVariant.default_design[2].design_name}
											</p>
										</div>
										<div className="customize-slider-container">
											<div className="text-lead">Click to change Sleeve Type</div>
											<div className="left-button" onClick={left}>
												<BsChevronLeft />
											</div>
											<div className="right-button" onClick={right}>
												<BsChevronRight />
											</div>
											<div className="images-slider">
												{currentVariant &&
													currentVariant.bottom_style &&
													currentVariant.bottom_style.map(
														(image, key) =>
															image.id !== '0' && (
																<div
																	key={key}
																	className="image"
																	onClick={changeImage.bind(this, image)}
																>
																	{currentCustom &&
																	currentCustom.bottom_style &&
																	currentCustom.bottom_style.id === image.id ? (
																		<img
																			className="selected-image"
																			src={image.design_icon}
																			alt=""
																		/>
																	) : (
																		<img src={image.design_icon} alt="" />
																	)}
																	<p className="text-lead">{image.design_name}</p>
																</div>
															)
													)}
											</div>
										</div>
									</div>
								</div>

								<div className="other-option-wrapper">
									<div className="other-option-header">OTHER OPTIONS (FREE)</div>
									<div className="checkbox-group">
										<label>
											<input type="checkbox" value="" />
											Remove Pocket
										</label>
									</div>
									<div className="checkbox-group">
										<label>
											<input type="checkbox" value="" />
											Remove Embroidery / Embellishment
										</label>
									</div>
									<div className="checkbox-group">
										<label>
											<input type="checkbox" value="" />
											Add Side Zip
										</label>
									</div>
								</div>
							</div>
						</div>
						{showSavedProduct ? (
							<SavedStyle
								ref={childRef}
								productDetail={productDetail}
								onSelectSaved={(current) => setCurrentCustom(current)}
							></SavedStyle>
						) : null}
					</div>

					<div className="customization-footer">
						<div className="left-footer">
							<p className="text-lead">
								Selected style options -{' '}
								{currentCustom && currentCustom.neck_style && currentCustom.neck_style.design_name},{' '}
								{currentCustom && currentCustom.sleeve_style && currentCustom.sleeve_style.design_name},{' '}
								{currentCustom && currentCustom.bottom_style && currentCustom.bottom_style.design_name}
							</p>
							<div className="share">
								<AiOutlineShareAlt /> <span> Share</span>
								<div className="social-icons">
									<TwitterShareButton
										url={`http://eshakti.ewtlive.in/product-details/${2}`}
										title={'product name'}
										className="Demo__some-network__share-button"
									>
										<TwitterIcon size={28} round />
									</TwitterShareButton>
									<FacebookShareButton
										url={`http://eshakti.ewtlive.in/product-details/${2}`}
										title={'product name'}
										className="Demo__some-network__share-button"
									>
										<FacebookIcon size={28} round />
									</FacebookShareButton>

									<PinterestShareButton
										url={`http://eshakti.ewtlive.in/product-details/${2}`}
										title={'product name'}
										className="Demo__some-network__share-button"
									>
										<PinterestIcon size={28} round />
									</PinterestShareButton>
								</div>
							</div>
						</div>
						<div className="right-footer">
							{enableSavedStyle ? (
								<div
									className="btn save-style selected"
									onClick={compressImage.bind(this, 'saveDesign')}
								>
									Save Style
								</div>
							) : (
								<div className="btn save-style" onClick={compressImage.bind(this, 'saveDesign')}>
									Save Style
								</div>
							)}

							<div className="btn process-style" onClick={onSave}>
								Select style & proceed
							</div>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
}
