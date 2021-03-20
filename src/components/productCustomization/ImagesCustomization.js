import React, { useState, useEffect } from 'react';
import mergeImages from 'merge-images';

export default function ImagesCustomization({ currentCustom, style }) {
	const [top, setTop] = useState(0);
	const [left, setLeft] = useState(0);
	const [right, setRight] = useState(0);
	const [bottom, setBottom] = useState(0);
	const [totalHeight, setTotalHeight] = useState(0);
	const [totalWidth, setTotalWidth] = useState(0);

	useEffect(() => {
		style && resize(style);
	}, [style]);

	useEffect(() => {
		style && resize(style);
	}, [currentCustom]);

	const resize = (style) => {
		var reduceWidthPerchantage = (376.8 / (style.leftWidth + style.topWidth + style.rightWidth)) * 100;
		var left = (style.leftWidth * reduceWidthPerchantage) / 100;
		var top = (style.topWidth * reduceWidthPerchantage) / 100;
		var right = (style.rightWidth * reduceWidthPerchantage) / 100;

		setTop(top);
		setLeft(left);
		setRight(right);

		var reduceWidthPerchantage = (560 / (style.topHeight + style.bottomHeight)) * 100;
		var bottom = (style.topHeight * reduceWidthPerchantage) / 100;

		var Width = 376.8;
		var Height = style.topHeight + style.bottomHeight;

		setBottom(bottom);
		setTotalWidth(Width);
		setTotalHeight(Height);
	};

	return (
		<div className="img-wrapper">
			<div className="img"></div>
			<div className="relativeDiv mx-auto" style={{ width: '376.8px', margin: 'auto', height: '560px' }}>
				<div
					className="absoluteDiv"
					style={{
						width: `${top}px`,
						height: 'auto',
						left: `${left}px`,
					}}
				>
					<img
						className="img img-fluid img-bg"
						src={currentCustom && currentCustom.neck_style && currentCustom.neck_style.neck_design}
						alt=""
					/>
				</div>
				<div
					className="absoluteDiv"
					style={{
						width: `${left}px`,
						height: 'auto',
						top: 0,
						left: 0,
					}}
				>
					<img
						className="img img-fluid img-bg"
						src={currentCustom && currentCustom.sleeve_style && currentCustom.sleeve_style.lhand_design}
						alt=""
					/>
				</div>
				<div
					className="absoluteDiv"
					style={{
						width: right,
						height: 'auto',
						top: 0,
						left: `${left + top}px`,
					}}
				>
					<img
						className="img img-fluid img-bg"
						src={currentCustom && currentCustom.sleeve_style && currentCustom.sleeve_style.rhand_design}
						alt=""
					/>
				</div>
				<div
					className="absoluteDiv"
					style={{
						width: '376.8px',
						height: 'auto',
						left: '0px',
						top: `${bottom}px`,
					}}
				>
					<img
						className="img img-fluid img-bg"
						src={currentCustom && currentCustom.bottom_style && currentCustom.bottom_style.bottom_design}
						alt=""
					/>
				</div>
			</div>
		</div>
	);
}
