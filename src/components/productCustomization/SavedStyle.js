import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react';
import ReactSlidy from 'react-slidy';
import 'react-slidy/lib/index.scss';
import { BsXCircle, BsCheckCircle } from 'react-icons/bs';

const SavedStyle = forwardRef((props, ref) => {
	useImperativeHandle(ref, () => ({
		showAlert() {
			getStyleList();
		},
	}));

	const [styleList, setStyledList] = useState([]);
	const [selectedStyle, setSelectedStyle] = useState({});

	useEffect(() => {
		getStyleList();
	}, []);

	const getStyleList = () => {
		var styleList = JSON.parse(localStorage.getItem('saved-style'));
		var array = [];
		for (let i = 0; i < styleList.length; i++) {
			if (styleList[i].product.id == props.productDetail.id) {
				array.push(styleList[i]);
			}
		}

		setStyledList(array);
	};

	const removeItem = (itemId) => {
		if (localStorage.getItem('saved-style')) {
			var savedStyle = JSON.parse(localStorage.getItem('saved-style'));
			for (let i = 0; i < savedStyle.length; i++) {
				if (itemId === savedStyle[i].id) {
					savedStyle.splice(i, 1);
				}
			}
		}
		savedStyle = JSON.stringify(savedStyle);
		localStorage.setItem('saved-style', savedStyle);
		getStyleList();
	};
	const onSelectStyle = (item) => {
		setSelectedStyle(item);
		setTimeout(() => {
			var mainElement = document.querySelector('.product-customization-container');

			mainElement.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
		}, 10);

		props.onSelectSaved(item.currentCustom);
	};
	return (
		<div className="saved-style-wrapper">
			<h5>SAVED STYLES ( {styleList ? styleList.length : 0} ITEM )</h5>
			<div className="style-item-wrapper">
				<ReactSlidy numOfSlides={4} sanitize={false}>
					{localStorage.getItem('saved-style') && props.productDetail
						? styleList.map((item) => (
								<div className="style-item" onClick={onSelectStyle.bind(this, item)}>
									{selectedStyle.id === item.id ? (
										<div className="style-item-img selected">
											<img src={item.image} alt="" style={{ width: '100%' }} />
											<div className="correct">
												<BsCheckCircle></BsCheckCircle>
											</div>
											<div className="wrong" onClick={removeItem.bind(this, item.id)}>
												<BsXCircle></BsXCircle>
											</div>
										</div>
									) : (
										<div className="style-item-img selected not">
											<img src={item.image} alt="" style={{ width: '100%' }} />
											<div className="correct">
												<BsCheckCircle></BsCheckCircle>
											</div>
											<div className="wrong" onClick={removeItem.bind(this, item.id)}>
												<BsXCircle></BsXCircle>
											</div>
										</div>
									)}

									<p>
										{item &&
											item.currentCustom &&
											item &&
											item.currentCustom.neck_style &&
											item &&
											item.currentCustom.neck_style.design_name}
										, <br />
										{item &&
											item.currentCustom &&
											item &&
											item.currentCustom.sleeve_style &&
											item &&
											item.currentCustom.sleeve_style.design_name}
										, <br />
										{item &&
											item.currentCustom &&
											item &&
											item.currentCustom.bottom_style &&
											item &&
											item.currentCustom.bottom_style.design_name}
									</p>
								</div>
						  ))
						: null}
				</ReactSlidy>
			</div>
		</div>
	);
});

export default SavedStyle;
