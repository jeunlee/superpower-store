import React from 'react'
import {connect} from 'react-redux'
import {Link, browserHistory} from 'react-router'

import StarRatingComponent from 'react-star-rating-component';

import {

  receiveSingleProduct,
  receiveSimilarProducts,
  receiveProductReviews,

  clearSelectedProduct,
  clearSimilarProducts,
  clearProductReviews

} from '../reducers/products'

import { updateOrder, addNewOrder } from '../reducers/order'


/*-----------------COMPONENT------------------*/

export class SingleProduct extends React.Component {

  constructor(props) {
    super(props)
    // this.state = {
    //   addBtnClicked: false
    // }

    this.handleCloseClick = this.handleCloseClick.bind(this)
    this.nameParser = this.nameParser.bind(this)
  }

  nameParser(name) {
    var nameArr = name.toLowerCase().split('');
    for(var i = 0; i < nameArr.length; i++) {
      if(nameArr[i] === ' ') {
        nameArr[i] = '-'
      }
    }
    return nameArr.join('');
  }

  handleCloseClick() {
    this.props.clearDetailView()
  }

  handleNewItemClick(productId) {
    this.props.setNewSelectedProduct(productId)
  }

  handleAddItemToCart(productId) {
  //  this.setState({ addBtnClicked: true })

    if (!this.props.selectedOrder.id) {
       this.props.addNewOrder(productId)
    } else {
    this.props.updateOrder({ orderId: this.props.selectedOrder.id, productId: productId })
    }

  }

  render() {
    var selectedProduct = this.props.selectedProduct
    var imgClass = this.nameParser(selectedProduct.name)
    return (
      <div className="popUp">
        <div className="row">

          <div className={`column-2 product-thumbnail ${imgClass}`}>
            <div>
              <img src={`./thumbnails/${selectedProduct.thumbnail}`} />
            </div>
          </div>

          <div className="column-2">
            <Link to="#" className="close" onClick={this.handleCloseClick} >X</Link>
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>

            <div className="row">
              <div className="column-2">
                <span>{selectedProduct.price}</span>
              </div>
              <div className="column-2">
                <button className="product-view-btns" onClick={this.handleAddItemToCart.bind(this, selectedProduct.id)}>Add to Cart</button>
                <Link to="/cart">
                  <button className="product-view-btns">Review Cart</button>
                </Link>

                 {
                //   this.state.addButtonClicked && <div id="cart_conf">{selectedProduct.name} has been added to cart!</div>
                 }

              </div>
            </div>

          </div>

        </div>

        <div className="review-link">
          { this.props.currentUser ?
          <Link to="/review">Leave a Review of This Power</Link> :
          <Link to='/signup'>Sign up to leave a review</Link> }
        </div>
        <div className="item-reviews column-2">
          {this.props.reviews.slice(0, 3).map((review) => {
            return (
              <div key={review.id} className="item-reviews">
                <h5>{review.user ? review.user.name : 'anonymous'}</h5>
                <StarRatingComponent name="product-rating" value={review.rating} editing={false} className="stars"/>
              <div>
                <span>{review.text}</span>
              </div>
            </div>)
          })}
        </div>
        <hr />
        <div className="similar-items">
          <h3>Similar Products</h3>

          {this.props.similarProducts.slice(0, 5).map((product) => {
            return (<div key={product.id} className="column-5 similar-tile">
              <h4>{product.name}</h4>
              <div className={`similar-thumbnail ${this.nameParser(product.name)}`}>
                <Link to='#' onClick={this.handleNewItemClick.bind(this, product.id)}>
                  <img src={`./thumbnails/${product.thumbnail}`} />
                </Link>
              </div>
            </div>)
          })}
        </div>
        <hr />
      </div>
    )
  }
}

/*-----------------CONTAINER------------------*/

function mapStateToProps(state) {
  return {
    currentUser: state.auth,
    similarProducts: state.products.similarProducts,
    selectedProduct: state.products.selectedProduct,
    reviews: state.products.selectedProductReviews,
    selectedOrder: state.orders.selectedOrder,
    selectedOrderDetails: state.orders.selectedOrderDetails
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clearDetailView: () => {
      dispatch(clearSelectedProduct())
      dispatch(clearSimilarProducts())
      dispatch(clearProductReviews())
    },
    setNewSelectedProduct: (productId) => {
      dispatch(receiveSingleProduct(productId))
      dispatch(receiveSimilarProducts(productId))
      dispatch(receiveProductReviews(productId))
    },
    addNewOrder: (productId) => {
      dispatch(addNewOrder(productId))
    },
    updateOrder: (orderObj) => {
      dispatch(updateOrder(orderObj))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
