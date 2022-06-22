<template>
<div class="container">
  <div class="col-md-12">
    <div v-if="isProductLoading" class="text-center">
      <grid-loader :loading="isProductLoading" :color="loaderColor" :size="loaderSize" class="d-inline-block" />
    </div>
    <div v-else class="card">
      <div class="row">
        <div class="col-12 col-md-4 offset-md-4">
          <div class="intrinsic">
            <img class="img-fluid intrinsic-item" :src="item.image_url" alt="">
          </div>
        </div>
      </div>

      <div class="caption-full">
        <h4 class="pull-right">$ {{ item.price }}</h4>
        <h4> {{ item.name }}</h4>
        <p> {{ item.description }} </p>
      </div>
      <div class="ratings">
        <span>{{ item.productInventory.quantity }} pozostało w magazynie </span>
        <p class="pull-right">
          <button @click="addItem" :disabled="item.productInventory.quantity === 0 || !isLoggedIn " class="btn btn-success">
                            Dodaj do koszyka
                        </button>
        </p>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  mapActions,
  mapGetters
} from 'vuex';
import GridLoader from 'vue-spinner/src/GridLoader.vue';

export default {
  components: {
    GridLoader
  },
  data() {
    return {
      loaderColor: "#5cb85c",
      loaderSize: "50px",
    }
  },
  computed: {
    ...mapGetters(['isProductLoading', 'products','isLoggedIn', 'currentUser' ]),
    item() {
      let id = this.$route.params.id;
      if (this.products.length >= id) {
        let filterArr = this.products.filter((item) => {
          return item.id == id
        });
        if (filterArr.length > 0) {
          return filterArr[0];
        }
      }
      return {};
    },
    loggedIn() {
      return this.isLoggedIn;
    }
  },
  methods: {
    ...mapActions(['addItemToCart']),
    addItem() {
      console.log("user add " + this.currentUser.token);
      console.log("user add id item " + this.item.id);
      // const order = {
      //   item: Object.assign({}, this.item),
      //   quantity: 1,
      //   isAdd: true,
      //   token: this.currentUser.token
      // };
      const data = {
        //item: Object.assign({}, this.item),
       // quantity: 1,
        //isAdd: true,
        token: this.currentUser.token,
        item: this.item
      };
      //let token = this.currentUser.token;
     // let itemId = this.item.id;

      this.addItemToCart(data);
    }
  }
}
</script>

<style scoped>
.caption-full {
  padding-right: 10px;
  padding-left: 10px;
}

.ratings {
  padding-right: 10px;
  padding-left: 10px;
  color: #d17581;
}
</style>
