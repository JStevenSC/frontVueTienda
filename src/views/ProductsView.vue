
<template>
  <div >
    <h1 class="m-3" >Nuestros Productos </h1>
    <div class="card-group  justify-content-center">
      <ProductsCard v-for="(product, index) of products" v-bind:key="index" v-bind:product="product"/>
    </div>
  </div>
</template>


<script>
import  axios from  'axios';
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';
import ProductsCard from '@/components/ProductsCard.vue';

export default {
  components:{
    ProductsCard
  },

  setup() {
    const store = useCounterStore();
    const { count,products } = storeToRefs(store);
    const increment = () => store.increment();
    const fetch1 = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        // Actualiza productos en el store
        store.setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetch1();
    return { increment,count,products };
  },
  data(){
    return {
    }
  },
  methods:{
  },
  created () {
  }
}
</script>
