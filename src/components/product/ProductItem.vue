<template>
<div class="mb-3 col-sm-6 col-md-4 item" :class="{'list-group-item': displayList}">
  <div class="thumbnail card">
    <div class="img-event intrinsic">
      <img :src="item.imageUrl" alt="" class="grow thumbnail-image card-img-top intrinsic-item p-3">
    </div>
    <div class="card-body">
      <router-link :to="'/product/' + item.id" tag="h5" class="card-title"><a>{{ item.name }}</a></router-link>
      <h6 class="card-subtitle mb-2 remain">{{ item.productInventory.quantity }} pozostało w magazynie</h6>

      <p class="card-text truncate">{{ item.description | shortDescription}}</p>

      <div class="row">
        <p class="col-6 lead">{{ item.price }} zł</p>
        <p class="col-6">
          <button class="btn btn-success pull-right" :disabled="item.productInventory.quantity === 0 || !isLoggedIn" @click="addItem">
            Dodaj do koszyka
          </button>
        </p>
      </div>
      <div class="card-subtitle mb-2 remain" v-if="!isLoggedIn">
        <h6 class="card-subtitle mb-2 remain"> Zaloguj się żeby dodać produkt do koszyka</h6>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  mapActions, mapGetters
} from 'vuex';
export default {
  props: ['item', 'displayList'],
  computed: {
    ...mapGetters(['isLoggedIn', 'currentUser']),
    loggedIn() {
      return this.isLoggedIn;
    }
  },
  methods: {
    ...mapActions(['isProductLoading','addItemToCart']),
    addItem() {
      const data = {
        token: this.currentUser.token,
        item: this.item
      };
      this.addItemToCart(data);
    }
  },
  filters: {
    shortDescription(value) {
      if (value && value.length > 100) {
        return value.substring(0, 100) + '...';
      } else {
        return value;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
div.card {
  height: 100%;
}

.card-text {
  font-size: 0.875rem;
}

.remain {
  color: #d17581;
}

.grow {
  transition: all .2s ease-in-out;
}

.grow:hover {
  transform: scale(1.1);
}

.list-group-item {
  float: none;
  width: 100%;
  background-color: #fff;
  margin-bottom: 30px;
  -ms-flex: 0 0 100%;
  flex: 0 0 100%;
  max-width: 100%;
  padding: 0 1rem;
  border: 0;
  .thumbnail {
    display: inline-block;
    width: 100%;
  }
  .img-event {
    width: 20%;
    float: left;
    padding: 0 !important;
    margin: 0;
    height: auto;
  }

  .thumbnail-image {
    position: static;
  }

  .card-body {
    float: left;
    width: 80%;
    margin: 0;
  }

  @media (max-width: 767.98px) {
    .img-event {
      width: 30%;
      float: left;
      padding: 0 !important;
      margin: 0;
    }

    .card-body {
      float: left;
      width: 70%;
      margin: 0;
    }
  }
}




.item.list-group-item:before, .item.list-group-item:after
{
    display: table;
    content: " ";
}

.item.list-group-item:after {
  clear: both;
}
</style>
