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
    <input type="submit" value="Submit" />
  </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null
    };
  },
  methods: {
    onSubmit() {
      let productReview = {
        name: this.name,
        review: this.review,
        rating: this.rating
      };
      this.$emit("review-submitted", productReview);
      this.name = null;
      this.review = null;
      this.rating = null;
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
