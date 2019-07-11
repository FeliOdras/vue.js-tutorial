const app = new Vue({
  el: "#app",
  data: {
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
    }
  }
});
