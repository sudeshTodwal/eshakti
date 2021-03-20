import React from 'react';
import './colorFilter.styles.scss';

export default function ColorFilter({ filterData, onFilterData }) {
	return (
		<div className="color-filter">
			<h2 className="title">{filterData.name || ''}</h2>
			<div className="color-list">
				{filterData &&
					filterData.value.map((eachVal, index) => (
						<div className="each-color" key={index}>
							<div className="color" onClick={onFilterData.bind(this, filterData.name, eachVal.id)}>
								<input type="checkbox" className="color-checkbox" value={filterData.id} />
								{eachVal.color_image ? (
									<img
										src={eachVal.color_image}
										alt="img"
										width={20}
										height={20}
										className="color-pic"
									/>
								) : (
									<span className="color-name" style={{ backgroundColor: eachVal.color_code }}></span>
								)}
							</div>
						</div>
					))}
			</div>
		</div>
	);
}
