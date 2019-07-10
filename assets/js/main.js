const app = new Vue({
  el: "#app",
  data: {
    product: "Socks",
    description: "These are nice and warm socks.",
    image: "./assets/img/vmSocks-green-onWhite.jpg",
    link: "https://me.odras.de",
    inventory: 100,
    onSale: true,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    variants: [
      {
        variantID: 2234,
        variantColor: "green",
        variantImage: "./assets/img/vmSocks-green-onWhite.jpg"
      },
      {
        variantID: 2235,
        variantColor: "blue",
        variantImage: "./assets/img/vmSocks-blue-onWhite.jpg"
      }
    ],
    sizes: ["XL", "L", "M", "S", "XS"],
    cart: 0
  },
  methods: {
    addToCart: function() {
      this.cart += 1;
    }
  }
});
