Vue.config.devtools = true;

Vue.component("product-details", {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
  <ul>
    <li v-for="detail in details">{{ detail }}</li>
  </ul>
  `
});

Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
  <div class="product">
  <div class="product-image">
    <img v-bind:src="image" />
  </div>
  <div class="product-info">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <p v-if="inStock">In stock</p>
    <p v-else :class="{ strokeThrough: !inStock }">Out of stock</p>
    <p v-show="onSale && inStock">{{ isOnSale }}</p>
    <p>Shipping: {{ shipping }}</p>
    <product-details :details="details"></product-details>
    <div
      v-for="(variant, index) in variants"
      :key="variant.variantID"
      class="color-box "
      :style="{backgroundColor: variant.variantColor}"
      @mouseover="updateProduct(index)"
    ></div>
    <div class="size">
      <div  v-for="size in sizes" class="size-box">{{ size }}</div>
    </div>
    <button
      @click="addToCart"
      :disabled="!inStock"
      :class="{ disabledButton: !inStock }"
    >
      Add to cart
    </button>
    <button
      @click="removeFromCart"
    >
      Remove from cart
    </button>
    <div>
      <h2>Reviews</h2>
      <p v-if="!reviews.length">There are no reviews yet</p>
      <ul>
        <li v-for="review in reviews">
          <p>Name:<br /> {{review.name}}</p>
          <p>Review: <br /> {{review.review}}<p>
          <p>Rating: {{review.rating}}</p>
          <p>Recommended: {{ review.recommend }}
        </li>
      </ul>
    </div>
    <product-review @review-submitted="addReview"></product-review>
  </div>
  <footer>Created by <a :href="link" target="_blank">odras</a></footer>
</div>
  `,
  data() {
    return {
      product: "Socks",
      brand: "Vue Mastery",
      description: "These are nice and warm socks.",
      selectedVariant: 0,
      link: "https://me.odras.de",
      onSale: true,
      details: ["80% cotton", "20% polyester", "Gender-neutral"],
      variants: [
        {
          variantID: 2234,
          variantColor: "green",
          variantImage: "./assets/img/vmSocks-green-onWhite.jpg",
          variantQuantity: 10
        },
        {
          variantID: 2235,
          variantColor: "blue",
          variantImage: "./assets/img/vmSocks-blue-onWhite.jpg",
          variantQuantity: 0
        }
      ],
      sizes: ["XL", "L", "M", "S", "XS"],
      reviews: []
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].variantID);
    },
    removeFromCart() {
      this.$emit(
        "remove-from-cart",
        this.variants[this.selectedVariant].variantID
      );
    },
    updateProduct(index) {
      this.selectedVariant = index;
    },
    addReview(productReview) {
      this.reviews.push(productReview);
    }
  },
  computed: {
    title() {
      return `${this.brand} ${this.product}`;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    isOnSale() {
      return `Grab your ${this.brand} ${this.product} now for a special price`;
    },
    shipping() {
      if (this.premium) {
        return "Free";
      } else {
        return "2.99";
      }
    }
  }
});

Vue.component("product-review", {
  template: `
  <form class="review-form" @submit.prevent="onSubmit">
  <p v-if="errors.length">
    <strong>Please correct the following error(s):</strong>
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  
  </p>
    <p>
      <label for="name">Name: </label>
      <input id="name" v-model="name"/>
    </p>
    <p>
      <label for="review">Review</label>
      <textarea id="review" v-model="review"></textarea>
    </p>  
    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
    </p>
    <p>
      <p>Would you recommend this product?</p>
      <input type="radio" value="yes" id="yes" name="recommend" v-model="recommend">
      <label for="yes">Yes.</label>
      <input type="radio" value="no" id="no" name="recommend" v-model="recommend">
      <label for="no">No.</label>
    <input type="submit" value="Submit" />
  </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      errors: [],
      recommend: null
    };
  },
  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommend: this.recommend
        };
        this.$emit("review-submitted", productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
      } else {
        if (!this.name) this.errors.push("Name required");
        if (!this.review) this.errors.push("Review required");
        if (!this.rating) this.errors.push("Rating required");
        if (!this.recommend)
          this.errors.push("Choose if you recommend this product or not");
      }
    }
  }
});
const app = new Vue({
  el: "#app",
  data: {
    premium: true,
    cart: []
  },
  methods: {
    updateCartAdd(id) {
      this.cart.push(id);
    },
    updateCartRemove(id) {
      this.cart.pop(id);
    }
  }
});
