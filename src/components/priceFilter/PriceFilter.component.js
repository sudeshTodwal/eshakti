import React, { useState } from 'react';
import './priceFilter.styles.scss';

// rc slider
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function PriceFilter({ onFilterData }) {
	const [min, setMin] = useState(10);
	const [max, setMax] = useState(250);
	const changeRange = (data) => {
		setMin(data[0]);
		setMax(data[1]);
	};
	const onAfterChange = (data) => {
		var data = {
			min_price: min,
			max_price: max,
		};
		onFilterData('price', data);
	};
	return (
		<div className="price-filter">
			<h2 className="title">By price</h2>
			<>
				<Range min={10} max={250} onChange={changeRange} onAfterChange={onAfterChange} />
				<div className="price-range">
					<span className="label">Price:</span>
					<span className="min">{min}$</span>-<span className="max">{max}$</span>
				</div>
			</>
		</div>
	);
}
