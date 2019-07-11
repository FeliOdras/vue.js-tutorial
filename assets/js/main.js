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
      class="color-box"
      :style="{backgroundColor: variant.variantColor}"
      @mouseover="updateProduct(index)"
    ></div>
    <div v-for="size in sizes">
      <div class="color-box">{{ size }}</div>
    </div>
    <button
      @click="addToCart"
      :disabled="!inStock"
      :class="{ disabledButton: !inStock }"
    >
      Add to cart
    </button>
    <button @click="removeFromCart">
      Remove from cart
    </button>
    <div class="cart">Cart ({{ cart }})</div>
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
      cart: 0
    };
  },
  methods: {
    addToCart() {
      this.cart += 1;
    },
    removeFromCart() {
      this.cart -= 1;
    },
    updateProduct(index) {
      this.selectedVariant = index;
      console.log(index);
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

const app = new Vue({
  el: "#app",
  data: {
    premium: true
  }
});
