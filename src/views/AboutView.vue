<template>
  <div>
    <div class="container">
      <div class="row">

        <div class="col-12 col-md-3 d-flex justify-content-center align-items-center">
          <div class="text-center">
            <img class="img-fluid" alt="Izquierda" src="../assets/wompiizquierda.png" style="max-width: 60%;">
            <p class="mt-4 texto">
              Wompi cuenta con el respaldo de Bancolombia y, al unirte a nuestra pasarela, disfrutarás de diferentes beneficios para tu negocio.
            </p>
          </div>
        </div>

        <div class="col-12 col-md-6 d-flex justify-content-center align-items-center">
          <div class="text-center">
            <img class="img-fluid" alt="Centro" src="../assets/logowompi.png" style="max-width: 50%;">
            <p class="mt-4 texto">
              ¡Somos la pasarela de pagos para impulsar las ventas en línea de tu negocio con el respaldo de Bancolombia!
            </p>

            <img class="img-fluid mt-4" alt="Descarga" src="../assets/queeswompi.png" style="max-width: 30%;">
            <p class="mt-4 texto">
              En Wompi encuentras los principales medios de pago electrónico del mercado: tarjetas débito, crédito, transferencias y efectivo
            </p>
          </div>

        </div>

        <div class="col-12 col-md-3 d-flex justify-content-center align-items-center">
          <div class="text-center">
            <img class="img-fluid" alt="Derecha" src="../assets/wompiderecha.png" style="max-width: 70%;">
            <p class="mt-4 texto">
              Vende por internet integrando soluciones fáciles y seguras para recaudar tu pagos digitales.
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';

export default {
  data() {
    return {
    };
  },
  setup() {
    const store = useCounterStore();
    const { count, products } = storeToRefs(store);
    const increment = () => store.increment();


    return { increment,count,products }; // Retornar las referencias para usarlas en el template

  },
  methods: {
  },
};
</script>

<style>

</style>