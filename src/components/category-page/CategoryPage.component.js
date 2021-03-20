import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductByCategory, getfiltersData, onFilteredProducts } from '../../store/home/homeAction';

import './categoryPage.styles.scss';

// react router
import { useParams } from 'react-router-dom';

// local icons
import icon1 from '../../assets/icons/01.png';
import icon2 from '../../assets/icons/02.png';

// react icons
import { FiChevronDown } from 'react-icons/fi';

import ProductCard from '../productCard/ProductCard.component';
import BrandFilter from '../brand-filter/BrandFilter.component';
import PriceFilter from '../priceFilter/PriceFilter.component';
import SizeFilter from '../sizeFilter/SizeFilter.component';
import ColorFilter from '../colorFilter/ColorFilter.component';
import DefaultFilter from '../defaultFilter/DefaultFilter.component';

// importing axios
export default function CategoryPage() {
	const [filterState, setFilterState] = useState([
		{ type: 'attribute', attributes_id: [] },
		{ type: 'color', attributes_id: [] },
		{ type: 'price', min_price: 0, max_price: 0 },
	]);
	const [gridView, setGridView] = useState('grid-view-three');
	const dispatch = useDispatch();
	const products = useSelector((state) => state.home.productByCategory);
	const [showFilter, setShowFilter] = useState('');
	const [sorting, setSorting] = useState('');

	const categoryFilters = useSelector((state) => state.home.categoryFilters);
	const categoryHasProducts = useSelector((state) => state.home.categoryHasProducts);

	// extracting category id
	const { id } = useParams();

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(getProductByCategory(id));
		dispatch(getfiltersData(id));
		localStorage.setItem('es_product_category_id', id);
	}, [id]);

	if (categoryHasProducts === undefined) {
		return (
			<div className="category-page">
				<div className="loading">
					<div className="spinner"></div>
				</div>
			</div>
		);
	}

	const onFilterData = (name, value, sortValue) => {
		console.log(sortValue);
		console.log(name, value);
		var filterData = filterState;
		var exist = false;

		if (name && value) {
			if (name.toLowerCase() === 'color') {
				for (let i = 0; i < filterData.length; i++) {
					if (filterData[i].type == 'color') {
						if (filterData[i].type.toLowerCase() == name.toLowerCase()) {
							exist = true;
							var attributes = filterData[i].attributes_id;

							var index = attributes.indexOf(value);

							if (index !== -1) {
								attributes.splice(index, 1);
							} else {
								attributes.push(value);
							}

							filterData[i].attributes_id = attributes;
						}
					}
				}
			}

			if (name.toLowerCase() === 'price') {
				exist = true;
				for (let i = 0; i < filterData.length; i++) {
					if (filterData[i].type == 'price') {
						filterData[i].min_price = value.min_price;
						filterData[i].max_price = value.max_price;
					}
				}
			}

			if (!exist) {
				for (let i = 0; i < filterData.length; i++) {
					if (filterData[i].type == 'attribute') {
						exist = true;
						var attributes = filterData[i].attributes_id;

						var index = attributes.indexOf(value);

						if (index !== -1) {
							attributes.splice(index, 1);
						} else {
							attributes.push(value);
						}

						filterData[i].attributes_id = attributes;
					}
				}
			}
		}

		var data = {
			category_id: id,
			filter_data: filterData,
			sorting: sortValue === 'asc' || sortValue === 'desc' ? sortValue : sorting,
		};

		console.log(data);
		dispatch(onFilteredProducts(data));
	};
	const onSorting = (e) => {
		setSorting(e.target.value);

		onFilterData(null, null, e.target.value);
	};
	return (
		<div className="category-page">
			<div className="inner-container">
				<div className={`filters-area ${showFilter}`}>
					{categoryFilters && categoryFilters.length > 0 ? <PriceFilter onFilterData={onFilterData} /> : null}
					{categoryFilters &&
						categoryFilters.length > 0 &&
						categoryFilters.map((eachfilter, index) => {
							switch (eachfilter.name.toLowerCase()) {
								case 'brand':
									return (
										<BrandFilter key={index} filterData={eachfilter} onFilterData={onFilterData} />
									);

								case 'size':
									return (
										<SizeFilter key={index} filterData={eachfilter} onFilterData={onFilterData} />
									);

								case 'color':
									return (
										<ColorFilter key={index} filterData={eachfilter} onFilterData={onFilterData} />
									);

								default:
									return (
										<DefaultFilter
											key={index}
											filterData={eachfilter}
											onFilterData={onFilterData}
										/>
									);
							}
						})}
				</div>{' '}
				{products && products.length > 0 ? (
					<div className="product-listing">
						<div className="details-and-view-options">
							<div
								className="filter-badge"
								onClick={() => setShowFilter(showFilter === 'show' ? '' : 'show')}
							>
								<span className="text">Filters</span>
								<span className="icon">
									<FiChevronDown />
								</span>
							</div>
							<div className="number-of-results">Showing 1-12 of 99 Results</div>

							<div className="right-actions">
								<div className="dropdown">
									<select onChange={onSorting}>
										<option value={null}>Default Sorting</option>
										<option value="asc">Low to High</option>
										<option value="desc">High to Low</option>
									</select>
								</div>
								<div className="views-icons">
									<img src={icon1} onClick={() => setGridView('grid-view-two')} alt="img" />
									<img src={icon2} onClick={() => setGridView('grid-view-three')} alt="img" />
								</div>
							</div>
						</div>
						<div className="number-of-results-small">Showing 1-12 of 99 Results</div>
						<div className={`products ${gridView}`}>
							{products && products.length > 0
								? products.map((product, key) => <ProductCard key={key} product={product} />)
								: ''}
						</div>
					</div>
				) : (
					<div className="no-data">
						<h3>No Products</h3>
					</div>
				)}
			</div>
		</div>
	);
}
