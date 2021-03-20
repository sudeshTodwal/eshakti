import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductById,
  addToCart,
  addToWishlist,
  removeFromWishlist,
  getCurrencyRates,
  getFeedbacks,
} from "../../store/home/homeAction";

import "./productDetails.scss";
import {
  AiOutlineStar,
  AiOutlineHeart,
  AiFillHeart,
  AiFillStar,
} from "react-icons/ai";

// react slidy for slider
import ReactSlidy from "react-slidy";
import "react-slidy/lib/index.scss";

import RecomenddedProducts from "../recomendded-prducts/RecomenddedProducts.component";
import ProductTabList from "../productTabList/ProductTabList";
import ProductCustomization from "../productCustomization/ProductCustomization";
import FeedbackForm from "../feedback-form/FeedbackForm.component";
import SizeChartPopup from "../size-chart-popup/SizeChartPopup.component";
import RecomendedProductDetailPopup from "../recomended-product-detail-popup/RecomendedProductDetailPopup.component";
import mergeImages from "merge-images";

// react-cookies
import { useCookies } from "react-cookie";

// react router
import { useParams } from "react-router-dom";

// toastify
import { ToastContainer, toast } from "react-toastify";

import Login from "../login/Login.component";
import SignUp from "../signup/SignUp";

export default function ProductDetails() {
  const dispatch = useDispatch();
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [openFeedback, setOpenFeedback] = useState(false);
  const [openSizeChart, setOpenSizeChart] = useState(false);
  const [
    openRecomendedProductDetails,
    setOpenRecomendedProductDetails,
  ] = useState(false);
  const [cookies] = useCookies();
  const productDetail = useSelector((state) => state.home.productDetail);

  const variant =
    productDetail &&
    productDetail.variant_products &&
    productDetail.variant_products.length > 0 &&
    productDetail.variant_products[0].variants;

  const [isCustomizationOpen, setIsCustomization] = useState(false);
  const [currentVariant, setCurrentVariant] = useState(variant);
  const [size, setSize] = useState(
    currentVariant &&
      currentVariant.product_size &&
      currentVariant.product_size[0]
  );
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState("");
  const [currentCustom, setCurrentCustom] = useState({});
  const [customizedImage, setCustomizedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [height, setHeight] = useState("");
  const [color, setColor] = useState("");
  const [color_id, setColorId] = useState("");
  const [price, setPrice] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [product_variant_id, setproduct_variant_id] = useState("");

  const currencyRates = useSelector((state) => state.home.currencyRates);
  const productFeedbacks = useSelector((state) => state.home.product_feedbacks);

  const matchedProduct = variant && variant.matchedProduct;
  const variationComboCollection =
    productDetail && productDetail.variationComboCollection;

  useEffect(() => {
    setCurrentVariant(variant);
    setSize(variant && variant.product_size && variant.product_size[0]);
    setHeight(variant && variant.height && variant.height[0]);
    setColorId(variant && variant.id);

    selectedDefaultAttributes();
  }, [productDetail]);

  useEffect(() => {
    productDetail &&
      productDetail.have_style_customization &&
      setCurrentCustom({
        neck_style: currentVariant ? currentVariant.default_design[0] : null,
        sleeve_style: currentVariant ? currentVariant.default_design[1] : null,
        bottom_style: currentVariant ? currentVariant.default_design[2] : null,
      });
  }, [currentVariant]);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getProductById(id));
    dispatch(getCurrencyRates());
    dispatch(getFeedbacks(id));
  }, [id]);

  function getConvertedPrice(pricetoconvert) {
    const userSelectedCurrency = cookies.userSelectedCurrency;
    const baseCurrency = "USD";
    const rates = currencyRates.currencyRates;

    if (
      baseCurrency === userSelectedCurrency &&
      userSelectedCurrency !== undefined
    ) {
      return pricetoconvert + " $";
    }

    if (userSelectedCurrency !== undefined) {
      const filterdRate = rates.filter(
        (eachRate) => eachRate.currencyCode === userSelectedCurrency
      );

      return `${(filterdRate[0].currencyValue * pricetoconvert).toFixed(2)} ${
        filterdRate[0].currencySymbol
      }`;
    }
    return pricetoconvert + " $";
  }

  // for login model
  const onOpenLoginModal = () => setOpenLogin(true);
  const onCloseLoginModal = () => setOpenLogin(false);

  // for registration modal
  const onOpenRegisterModal = () => setOpenRegister(true);
  const onCloseRegisterModal = () => setOpenRegister(false);

  // for feedback modal
  const onOpenFeedbackForm = () => setOpenFeedback(true);
  const onCloseFeedbackForm = () => setOpenFeedback(false);

  // for SizeChartPopup
  const onOpenSizeChart = () => setOpenSizeChart(true);
  const onCloseSizeChart = () => setOpenSizeChart(false);

  // for cutomisation model
  const openCustomization = () => {
    setIsCustomization(true);
  };
  const closeCustomization = () => {
    setIsCustomization(false);
  };

  const changeVarient = (variant) => {
    setCurrentVariant(variant);
    setColor(variant.color_name);
    setTimeout(() => {
      checkPrice();
    }, 10);
  };
  const selectHeight = (e) => {
    setHeight(e.target.value);
    checkPrice(size, e.target.value, color);
  };
  const selectSize = (size, attributeName) => {
    var variationCollection = productDetail.variationCollection;

    for (let i = 0; i < variationCollection.length; i++) {
      if (attributeName === variationCollection[i].name) {
        var data = {
          name: variationCollection[i].name,
          value: size,
        };
        var exist = false;
        for (let j = 0; j < selectedAttributes.length; j++) {
          if (selectedAttributes[j].name == attributeName) {
            selectedAttributes[j].value = size;
            exist = true;
          }
        }

        if (exist === false) {
          selectedAttributes.push(data);
        }
      }
    }
    setSelectedAttributes(selectedAttributes);
    setSize(size);
    setTimeout(() => {
      checkPrice();
    }, 10);
  };
  const saveFinalCustomisation = (currentCustom) => {
    setCurrentCustom(currentCustom);
  };
  const saveFinalImage = (image) => {
    setCustomizedImage(image);
  };
  const updateQuantity = (type) => {
    if (type === "add") {
      setQuantity(quantity + 1);
    } else {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    }
  };

  // for login model
  const openRecomendedProductDetailsPopup = () =>
    setOpenRecomendedProductDetails(true);
  const closeRecomendedProductDetailsPopup = () =>
    setOpenRecomendedProductDetails(false);

  // adding product to cart
  const onAddToCart = () => {
    if (!localStorage.getItem("es_user_id")) {
      toast("Please Login!", {
        type: toast.TYPE.ERROR,
        autoClose: 5000,
      });

      onOpenLoginModal();
    }

    var data = {
      user_id: parseInt(localStorage.getItem("es_user_id")),
      product_id: productDetail.id,
      quantity: quantity,
      color_id: currentVariant ? color_id : "",
      product_variant_id: product_variant_id,
      product_type:
        currentVariant && productDetail.have_style_customization
          ? "customized"
          : "normal",

      // sku_id: productDetail.sku_id,
    };

    if (currentVariant && productDetail.have_style_customization) {
      data.customization = {
        sleeve_id: currentCustom.sleeve_style.id
          ? currentCustom.sleeve_style.id
          : currentVariant.default_design[0].id,
        bottom_id: currentCustom.bottom_style.id
          ? currentCustom.bottom_style.id
          : currentVariant.default_design[1].id,
        neck_id: currentCustom.neck_style.id
          ? currentCustom.neck_style.id
          : currentVariant.default_design[2].id,
        optional_style: {
          "Embroidery Option": "Remove Embroidery / Embellishment",
          "Pocket Option": "Remove Pocket",
          "Zip Option": "Add Side Zip",
        },
        customized_image: customizedImage
          ? customizedImage
          : compressImage(currentVariant.gallary_image[0]),
      };
    } else {
      data.customization = {};
    }

    dispatch(addToCart(data));
  };

  const checkPrice = () => {
    for (let i = 0; i < variationComboCollection.length; i++) {
      var priceCheck = 0;
      const combination_collection =
        variationComboCollection[i].combination_collection;
      for (let j = 0; j < combination_collection.length; j++) {
        for (let m = 0; m < selectedAttributes.length; m++) {
          if (
            combination_collection[j].attributeName ===
              selectedAttributes[m].name &&
            combination_collection[j].value == selectedAttributes[m].value
          ) {
            priceCheck = priceCheck + 1;
          }
        }
      }

      for (let j = 0; j < combination_collection.length; j++) {
        if (combination_collection[j].attributeName === "color") {
          if (combination_collection[j].value === color) {
            priceCheck = priceCheck + 1;
          }
        }
      }

      if (priceCheck === combination_collection.length) {
        setPrice(variationComboCollection[i].price);
        setproduct_variant_id(variationComboCollection[i].id);
      }
    }
  };

  const selectedDefaultAttributes = () => {
    if (productDetail) {
      var variationComboCollection = productDetail.variationComboCollection;
      for (let i = 0; i < variationComboCollection.length; i++) {
        if (variationComboCollection[i].default_variation) {
          setproduct_variant_id(variationComboCollection[i].id);
          var array = variationComboCollection[i].combination_collection;
          var data = [];
          for (let j = 0; j < array.length; j++) {
            var obj = {
              name: array[j].attributeName,
              value: array[j].value,
            };

            data.push(obj);
            setPrice(variationComboCollection[i].price);
          }
        }
      }

      setSelectedAttributes(data);
    }
  };

  const compressImage = (value) => {
    mergeImages([value]).then((b64) => {
      return b64;
    });
  };

  const handleClickWishlistbtn = () => {
    console.log("clicke");
    if (localStorage.getItem("es_login")) {
      if (productDetail && productDetail.is_in_wishlist) {
        dispatch(
          removeFromWishlist(productDetail.wishlist_item_id, productDetail.id)
        );
      } else if (productDetail && productDetail.is_in_wishlist !== true) {
        dispatch(
          addToWishlist({
            user_id: localStorage.getItem("es_user_id"),
            product_id: productDetail.id,
          })
        );
      }
    } else {
      toast.dark("please login first");
    }
  };

  return (
    <div>
      <ToastContainer></ToastContainer>
      <Login
        open={openLogin}
        openRegister={onOpenRegisterModal}
        onCloseModal={onCloseLoginModal}
      />
      <SignUp open={openRegister} onCloseModal={onCloseRegisterModal} />
      <FeedbackForm open={openFeedback} onCloseModal={onCloseFeedbackForm} />
      <SizeChartPopup
        open={openSizeChart}
        size_chart_img={
          productDetail !== undefined ? productDetail.size_chart : null
        }
        onCloseModal={onCloseSizeChart}
      />
      <RecomendedProductDetailPopup
        open={openRecomendedProductDetails}
        onCloseModal={closeRecomendedProductDetailsPopup}
      />

      <div className="product-details-container">
        <div className="img-wrapper">
          {productDetail && productDetail.have_style_customization ? (
            <img
              src={
                customizedImage
                  ? customizedImage
                  : currentImage
                  ? currentImage
                  : currentVariant && currentVariant.gallary_image[0]
              }
              alt=""
            />
          ) : (
            <img
              src={productDetail && productDetail.product_thumbnail[0]}
              alt=""
            />
          )}

          {productDetail && productDetail.have_style_customization ? (
            <div className="thumb-wrapper">
              <ReactSlidy numOfSlides={3} sanitize={false}>
                {currentVariant &&
                  currentVariant.gallary_image.map((image, key) =>
                    key < 4 ? (
                      <div key={key} onClick={() => setCurrentImage(image)}>
                        <div className="thumb" key={key}>
                          <img src={image} alt="" />
                        </div>
                      </div>
                    ) : null
                  )}
              </ReactSlidy>
            </div>
          ) : (
            <div className="thumb-wrapper">
              <ReactSlidy numOfSlides={3} sanitize={false}>
                {currentVariant &&
                  currentVariant.gallary_image.map((image, key) => (
                    <div className="each-img-wrapper">
                      <img src={image} alt="" />
                    </div>
                  ))}
              </ReactSlidy>
            </div>
          )}
        </div>
        <div className="details-wrapper">
          <p className="text-muted">{productDetail && productDetail.brand}</p>
          <h5 className="product-title">
            {productDetail && productDetail.product_name}
          </h5>

          {console.log(productDetail)}
          <div className="product-details">
            <div className="product-review">
              <span className="rating">
                <span className="each_star">
                  <AiFillStar />
                </span>
                <span className="each_star">
                  <AiFillStar />
                </span>
                <span className="each_star">
                  <AiFillStar />
                </span>
                <span className="each_star">
                  <AiFillStar />
                </span>
                <span className="each_star">
                  <AiOutlineStar />
                </span>
              </span>
              {/* <span className="review-text">2 Review</span> */}
            </div>
            <div className="stock-text">
              {productDetail && productDetail.stock}
            </div>
            <div className="color-text">
              STYLE # {productDetail && productDetail.sku_id}
            </div>
          </div>
          <div className="product-price">
            <p>
              {productDetail &&
              productDetail.total_price &&
              currencyRates !== undefined
                ? getConvertedPrice(
                    price
                      ? price.toFixed(2)
                      : productDetail.total_price.toFixed(2)
                  )
                : null}
            </p>
          </div>
          <div className="text-muted">Tax Included</div>

          {productDetail && productDetail.have_style_customization ? (
            <div className="attributes-wrapper">
              <div onClick={openCustomization} className="attribute-item">
                <div className="attribute-box">
                  <img
                    className="icon"
                    src={
                      currentCustom && currentCustom.neck_style
                        ? currentCustom.neck_style.design_icon
                        : "http://eshakti.ewtlive.in/dashboard/public/style/v.jpg"
                    }
                    onError={(ev) =>
                      (ev.target.src =
                        "http://eshakti.ewtlive.in/dashboard/public/style/v.jpg")
                    }
                    alt=""
                  />
                  {currentCustom && currentCustom.neck_style
                    ? currentCustom.neck_style.design_name
                    : "Neckline"}
                </div>
                {/* <p>Change Style</p> */}
              </div>
              <div onClick={openCustomization} className="attribute-item">
                <div className="attribute-box">
                  <img
                    className="icon"
                    src={
                      currentCustom && currentCustom.sleeve_style
                        ? currentCustom.sleeve_style.design_icon
                        : "http://eshakti.ewtlive.in/dashboard/public/style/Three%20quarter%20length.jpg"
                    }
                    onError={(ev) =>
                      (ev.target.src =
                        "http://eshakti.ewtlive.in/dashboard/public/style/Three%20quarter%20length.jpg")
                    }
                    alt=""
                  />
                  {currentCustom && currentCustom.sleeve_style
                    ? currentCustom.sleeve_style.design_name
                    : "Sleeve type"}
                </div>
                <p>Change Style</p>
              </div>
              <div onClick={openCustomization} className="attribute-item">
                <div className="attribute-box">
                  <img
                    className="icon"
                    src={
                      currentCustom && currentCustom.bottom_style
                        ? currentCustom.bottom_style.design_icon
                        : "http://eshakti.ewtlive.in/dashboard/public/style/6.png"
                    }
                    onError={(ev) =>
                      (ev.target.src =
                        "http://eshakti.ewtlive.in/dashboard/public/style/6.png")
                    }
                    alt=""
                  />
                  {currentCustom && currentCustom.bottom_style
                    ? currentCustom.bottom_style.design_name
                    : "length"}
                </div>
                {/* <p>Change Style</p> */}
              </div>
            </div>
          ) : null}

          <div className="alert-danger">
            Hurry, Only {productDetail && productDetail.quantity} left
          </div>

          <div className="color-attribute">
            COLOR : <b>{currentVariant && currentVariant.color_name}</b>
          </div>

          <div className="color-palette-wrapper">
            {productDetail &&
              productDetail.variant_products &&
              productDetail.variant_products.map((varient, index) => (
                <div
                  key={index}
                  onClick={changeVarient.bind(this, varient.variants)}
                  className="color"
                  style={{
                    backgroundColor: varient.variants.color_code,
                  }}
                ></div>
              ))}
          </div>

          <div className="size-attribute">
            {productDetail &&
              productDetail.variationCollection &&
              productDetail.variationCollection.map((attribute, index) => (
                <div key={index}>
                  <div className="color-attribute">
                    {attribute.name} :{" "}
                    <b>
                      {selectedAttributes &&
                        selectedAttributes.map((selectedAtt) =>
                          attribute.name === selectedAtt.name
                            ? selectedAtt.value
                            : null
                        )}
                    </b>
                  </div>
                  {attribute.value.map((sizes, index) => (
                    <div
                      key={index}
                      className={`size ${
                        selectedAttributes &&
                        selectedAttributes.map((selectAtt) =>
                          attribute.name === selectAtt.name
                            ? selectAtt.value === sizes
                              ? " selected "
                              : null
                            : null
                        )
                      }`}
                      onClick={selectSize.bind(this, sizes, attribute.name)}
                    >
                      {sizes}
                    </div>
                  ))}
                </div>
              ))}

            {productDetail && productDetail.size_chart !== null ? (
              <>
                <br />
                <div
                  className="size-chart-btn"
                  onClick={() => onOpenSizeChart()}
                >
                  Size Chart
                </div>
              </>
            ) : null}
          </div>

          {/* default img gallery */}
          {/* {productDetail && productDetail.defaultGallery.length > 0 && (
						<div className="default-img-gallery">
							<h4 className="title-text">Gallery</h4>
							<ReactSlidy numOfSlides={3}>
								{productDetail.defaultGallery.map((eachImg, index) => (
									<div className="each-img-wrapper">
										<img src={eachImg} alt="" />
									</div>
								))}
							</ReactSlidy>
						</div>
					)} */}
          {/* <div className="height-attribute">
            <div className="height">
              <span className="text">
                Height: {<b>{height}</b> || <b>choose height</b>}
              </span>
            </div>

            <select
              name="height"
              value={height}
              className="size"
              onChange={selectHeight}
            >
              <option value="">Height</option>
              {productDetail &&
                productDetail.variationCollection &&
                productDetail.variationCollection.map((attribute, index) =>
                  attribute.name === "Height"
                    ? attribute.value.map((height) => (
                        <option key={index} value={height}>
                          {height}
                        </option>
                      ))
                    : null
                )}
            </select>
          </div> */}

          {productDetail && productDetail.have_style_customization ? (
            matchedProduct.length > 0 ? (
              <RecomenddedProducts
                openRecomendedPopup={openRecomendedProductDetailsPopup}
                matchedProduct={matchedProduct}
              />
            ) : null
          ) : null}

          <div className="purchasing-actions-wrapper">
            <div className="wishlist-btn" onClick={handleClickWishlistbtn}>
              {productDetail && productDetail.is_in_wishlist ? (
                <span>
                  {" "}
                  <AiFillHeart /> Remove from Wishlist
                </span>
              ) : (
                <span>
                  {" "}
                  <AiOutlineHeart /> Add to Wishlist
                </span>
              )}
            </div>

            <div className="quantity-addtocart">
              <div className="quantity-wrapper">
                <div
                  className="minus"
                  onClick={updateQuantity.bind(this, "less")}
                >
                  -
                </div>
                <div className="quantity">{quantity}</div>
                <div
                  className="plus"
                  onClick={updateQuantity.bind(this, "add")}
                >
                  +
                </div>
              </div>
              <div className="add-cart-btn" onClick={onAddToCart}>
                ADD TO CART
              </div>
            </div>
          </div>
          <div
            className="feedback-popup-trigger"
            onClick={() => onOpenFeedbackForm()}
          >
            Feedback
          </div>
        </div>
      </div>
      <ProductTabList
        productDetail={productDetail && productDetail.long_descript}
        feature_description={productDetail && productDetail.feature_description}
        reviews={productDetail && productFeedbacks}
        additionalInfo={productDetail && productDetail.additionInfoCollection}
      ></ProductTabList>
      {productDetail && productDetail.have_style_customization && (
        <ProductCustomization
          open={isCustomizationOpen}
          close={closeCustomization}
          currentVariant={currentVariant}
          saveFinalCustomisation={saveFinalCustomisation}
          saveFinalImage={saveFinalImage}
          productDetail={productDetail}
        ></ProductCustomization>
      )}
    </div>
  );
}
