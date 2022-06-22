<template>
	<tr>
		<td data-th="Product">
			<div class="row">
				<div class="col-sm-2 d-none d-sm-block">
					<img :src="cartItem.product.imageUrl" alt="..." class="img-fluid"/>
				</div>
				<div class="col-sm-10">
					<h4 class="nomargin">{{ cartItem.product.name }}</h4>
					<p>{{ cartItem.product.description }}</p>
				</div>
			</div>
		</td>
		<td data-th="Price">{{ cartItem.product.price }}</td>
		<td data-th="Quantity">
			<input type="number" class="form-control text-center"
				:value="cartItem.quantity"
				@input="updateQuantity"
				min="0">
		</td>
		<td data-th="Subtotal" class="text-center">{{ subtotal }} zł</td>
		<td class="actions" data-th="">
			<button class="btn btn-danger btn-sm" @click="removeItem"><i class="fa fa-trash-o"></i></button>
		</td>
	</tr>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';
	export default {
		props: ['cartItem'],
		computed: {
			...mapGetters(['currentUser']),
			subtotal() {
				return this.cartItem.total;
			}
		},
		methods: {
			...mapActions(['updateCart', 'removeItemInCart', 'getShoppingCart']),
			removeItem() {
				let vm = this;
				let token= this.currentUser.token;
				this.removeItemInCart({
					token: token,
					itemId: vm.cartItem.id
				});
				//this.getShoppingCart({token});
			},
			updateQuantity(event) {
				let vm = this;
				console.log(vm.cartItem)
				let token= this.currentUser.token;
				const data = {
					token: token,
					itemId: vm.cartItem.id,
					item: vm.cartItem,
					quantity: parseInt(event.target.value)

				};
				this.updateCart(data);
				//this.getShoppingCart({token});
			}
		}
	}
</script>
