<template>
    <div>
        <div class="card-group mt-4 me-4 ms-4">
            <div class="card border custom-card">
                <div class="card-body text-center">
                    <h5 class="card-title">{{ product.product }}</h5>
                </div>
                <div class="d-flex justify-content-center mb-3">

                    <img :src="product.url" alt="Imagen de Producto" class="img-custom mb-3">
                </div>

                <div class="  card-body ">
                  <ul class="list-unstyled ">
                    <li>
                    <strong ><i class="bi bi-currency-dollar icon-margin"></i>Precio:</strong> {{ formatPrice(product.price) }}
                    </li>
                    <li>
                    <strong><i class="bi bi-file-earmark-text icon-margin"></i>Descripción:</strong> {{ product.descripcion}}
                    </li>
                    <li>
                    <strong><i class="bi bi-cart icon-margin"></i> Disponible:</strong>{{ product.amount }}
                    </li>

                  </ul>

                  <div class="card border">
                    <div class="m-3">
                        <label for="quantity" class="form-label"><strong><i class="bi bi-123 icon-margin"></i> Cantidad a comprar</strong></label>
                        <input type="number" class="form-control" id="quantity" v-model="quantity" min="1">
                    </div>
                   </div>
                  <button type="button" class="btn custom-btn m-3" @click="openModal(product,quantity )">Comprar </button>

                  <div v-if="showAlert" class="alert alert-danger" role="alert">
                    Se debe comprar una cantidad inferior a la disponible.
                    </div>

                </div>
            </div>
        </div>



        <div class="modal fade" ref="paymentModal" >
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" > {{ modalTitle }} </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div v-if="modalType === 'transaction'">

                        <div class="card-body border border-2 m-2 text-center">
                            <strong ><h5 class="card-title m-2"> {{ product.product }}</h5></strong>
                            <hr>
                            <ul class="list-unstyled m-3 ">
                                <li>
                                <strong ><i class="bi bi-currency-dollar icon-margin"></i>Precio total:</strong> {{ formatPrice(product.price * quantity) }}
                                </li>
                                <li>
                                <strong><i class="bi bi-cart icon-margin"></i> Cantidad:</strong>{{ quantity }}
                                </li>
                            </ul>
                        </div>




                        <div class="card-body border border-2 m-2">
                          <div class="payment-card">
                            <h3 class="m-3">Información de Tarjeta</h3>
                            <form @submit.prevent="submitPayment">
                              <div class="form-group m-2">
                                <label for="cardNumber">Número de Tarjeta</label>
                                <div class="input-group">
                                  <span class="input-group-text">
                                    <i :class="cardLogoClass"></i>
                                  </span>
                                  <input
                                    type="text"
                                    id="cardNumber"
                                    v-model="transactionData.card.number"
                                    class="form-control"
                                    required
                                    @input="updateCardLogo"
                                  />
                                </div>
                              </div>
                              <div class="form-group m-2">
                                <label for="cvc">CVC</label>
                                <div class="input-group">
                                  <span class="input-group-text">
                                    <i class="bi bi-lock"></i>
                                  </span>
                                  <input
                                    type="text"
                                    id="cvc"
                                    v-model="transactionData.card.cvc"
                                    class="form-control"
                                    required
                                  />
                                </div>
                              </div>
                              <div class="form-group m-2">
                                <label for="expMonth">Mes de Expiración</label>
                                <div class="input-group">
                                  <span class="input-group-text">
                                    <i class="bi bi-calendar3"></i>
                                  </span>
                                  <input
                                    type="text"
                                    id="expMonth"
                                    v-model="transactionData.card.exp_month"
                                    class="form-control"
                                    required
                                  />
                                </div>
                              </div>
                              <div class="form-group m-2">
                                <label for="expYear">Año de Expiración</label>
                                <div class="input-group">
                                  <span class="input-group-text">
                                    <i class="bi bi-calendar3"></i>
                                  </span>
                                  <input
                                    type="text"
                                    id="expYear"
                                    v-model="transactionData.card.exp_year"
                                    class="form-control"
                                    required
                                  />
                                </div>
                              </div>
                              <div class="form-group m-2">
                                <label for="name">Nombre</label>
                                <div class="input-group">
                                  <span class="input-group-text">
                                    <i class="bi bi-person"></i>
                                  </span>
                                  <input
                                    type="text"
                                    id="name"
                                    v-model="transactionData.card.card_holder"
                                    class="form-control"
                                    required
                                  />
                                </div>
                              </div>
                              <div class="form-group m-2">
                                <label for="email">Correo Electrónico</label>
                                <div class="input-group">
                                  <span class="input-group-text">
                                    <i class="bi bi-envelope"></i>
                                  </span>
                                  <input
                                    type="email"
                                    id="email"
                                    v-model="transactionData.transaction.customer_email"
                                    class="form-control"
                                    required
                                  />
                                </div>
                              </div>
                              <div class="form-group m-2">
                                <label for="installments">Número de Cuotas</label>
                                <div class="input-group">
                                  <span class="input-group-text">
                                    <i class="bi bi-list-ol"></i>
                                  </span>
                                  <input
                                    type="number"
                                    id="installments"
                                    v-model="transactionData.transaction.payment_method.installments"
                                    class="form-control"
                                    required
                                  />
                                </div>
                              </div>
                              <div class="form-group m-2">
                                <label for="currency">Moneda</label>
                                <div class="input-group">
                                  <span class="input-group-text">
                                    <i class="bi bi-currency-exchange"></i>
                                  </span>
                                  <select
                                    id="currency"
                                    v-model="transactionData.transaction.currency"
                                    class="form-control"
                                    required
                                  >
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                    <option value="COP">COP</option>
                                  </select>
                                </div>
                              </div>
                              <button type="submit" class="btn custom-btn m-3">Pagar</button>
                            </form>

                            <div v-if="isLoading" class="overlay">
                              <div class="loading-message">
                                Procesando pago, por favor espere...
                              </div>
                            </div>
                          </div>
                        </div>


                    </div>

                    <div v-if="modalType === 'confirmation'">

                        <div class="card-body border border-2 m-2 text-center">

                            <p class="m-2 text-center">Resumen de compra</p>

                            <img :src="product.url" alt="Imagen de Producto" class="img-custom mb-3">
                        </div>

                            <div class="card-body border border-2 m-2 text-center">
                                <ul class="list-unstyled m-3 ">
                                    <li>
                                    <strong><i class="bi bi-tag icon-margin"></i>Nombre:</strong> {{ product.product}}
                                    </li>
                                    <li>
                                    <strong><i class="bi bi-file-earmark-text icon-margin"></i>Descripción:</strong> {{ product.descripcion}}
                                    </li>
                                    <li>
                                    <strong><i class="bi bi-cart icon-margin"></i> Cantidad:</strong>{{ quantity }}
                                    </li>
                                    <li>
                                    <strong ><i class="bi bi-currency-dollar icon-margin"></i>Precio total:</strong> {{ formatPrice(product.price * quantity) }}
                                    </li>
                                    <li>
                                    <strong ><i class="bi bi-hash icon-margin"></i>Id de Compra:</strong> {{ this.idTransaction }}
                                    </li>

                                </ul>
                            </div>

                    </div>
                    <div v-if="modalType === 'pending'">


                        <div class="card-body border border-2 m-2 text-center">
                            <ul class="list-unstyled m-3 ">
                                <li>
                                <strong ><i class="bi bi-currency-dollar icon-margin"></i>Precio total:</strong> {{ product.price * quantity }}
                                </li>
                                <li>
                                <strong><i class="bi bi-cart icon-margin"></i> Cantidad:</strong>{{ quantity }}
                                </li>
                            </ul>

                            <div v-if="isLoading" class="overlay">
                                <div class="loading-message">
                                    Procesando pago, por favor espere...
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="modalType === 'failed'">

                        <div class="card-body border border-2 m-2 text-center">
                            <p class=" m-2 text-center">
                                Transacción Fallida verificalos datos de tu Tarjeta
                            </p>
                        </div>
                    </div>

                </div>
                <div class="modal-footer d-flex justify-content-center">
                   Pago con Tajeta
                </div>
                </div>
            </div>
        </div>

    </div>

</template>


<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import bootstrapBundleMin from 'bootstrap/dist/js/bootstrap.bundle.min';
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';
import  axios from  'axios';



export default {
  components:{

  },

  setup() {
    const store = useCounterStore();
    const { count,products } = storeToRefs(store);
    const increment = () => store.increment();
    const fetch2 = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        store.setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    return { increment,count,products, fetch2 };

  },
  data(){
    return {
        cardLogoClass: 'bi bi-credit-card',
        idTransaction:'',
        modalTitle: '',
        modalType: 'transaction',
        modal: null,
        isLoading: false,
        showAlert: false,
        quantity: 1 ,
        paymentDetails: {
        cardNumber: '',
        cvc: '',
        expMonth: '',
        expYear: '',
        name: '',
        email: '',
        installments: '',
        currency: 'COP', // Valor por defecto
      },

      transactionData: {
        transaction: {
          amount_in_cents: '',
          currency: "COP",
          customer_email: "",
          payment_method: {
            type: "CARD",
            installments: 1
          },
          reference: "",
          signature: ""
        },
        card: {
          number: "",
          cvc: "",
          exp_month: "",
          exp_year: "",
          card_holder: ""
        }
      },

    }

  },
  methods:{

    async processPayment() {
        this.isLoading = true;
      if (this.product.amount - this.quantity >= 0) {
        try {
          const response = await axios.post('http://localhost:3000/payments/transactioncard', this.transactionData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          this.idTransaction = response.data.data.id
          console.log(this.idTransaction)
          console.log('Pago procesado con éxito:', response.data);
          this.pendingTransaction()

        } catch (error) {
          console.error('Error procesando el pago:', error);
          this.failedTransaction()
          if (error.response) {
            console.log('Error data:', error.response.data);
            console.log('Error status:', error.response.status);
          }
        }
      } else {
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 3000);
        this.isLoading = false;
      }
    },
    pendingTransaction(){
        this.resetTransactionData()
        this.modalType = 'pending'
        this.modalTitle = 'Transacción Pendiente';
        this.validationstatus(this.idTransaction)
    },
    confirmationTransaction(){
        this.isLoading = false;
        this.resetTransactionData()
        this.modalType = 'confirmation'
        this.modalTitle = 'Transacción Confirmada';
        this.postProduct()

    },
    failedTransaction(){
        this.isLoading = false;
        this.resetTransactionData()
        this.modalType = 'failed'
        this.modalTitle = 'Transacción Fallida';
    },


    async postProduct() {
      const url = `http://localhost:3000/products/${this.product.id}`;
      const data = {
        amount: this.quantity
      };

      try {
        const response = await axios.patch(url, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log('Respuesta del servidor:', response.data);
        setTimeout(async () => {
            await this.fetch2();
            console.log(this.product);
        }, 1000);

      } catch (error) {
        console.error('Error al enviar la solicitud:', error);
      }
    },

    async validationstatus(id) {
        this.isLoading = true;
        console.log(id)
    for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await axios.get(`http://localhost:3000/payments/token/${id}`);
      console.log("Estado " + response.data);

      if (response.data === 'APPROVED') {
        console.log('Id aprovado');
        this.confirmationTransaction()
        break;
      } else if (response.data === 'PENDING') {
        console.log('Token pendiente, intentando de nuevo...');
        await new Promise(resolve => setTimeout(resolve, 4000));
      } else {
        console.log('Estado no esperado:', response.data);
        this.failedTransaction()
        break;
      }
    } catch (error) {
      console.error('Error al obtener el token:', error);
      break;
    }
  }
    },
    submitPayment() {
      this.transactionData.transaction.amount_in_cents = this.product.price * this.quantity
      console.log('Detalles de pago:', this.paymentDetails);
      console.log(this.transactionData)
      this.processPayment()

    },
    resetTransactionData() {
        this.transactionData = {
        transaction: {
            amount_in_cents: '',
            currency: "COP",
            customer_email: "",
            payment_method: {
            type: "CARD",
            installments: 1
            },
            reference: "",
            signature: ""
        },
        card: {
            number: "",
            cvc: "",
            exp_month: "",
            exp_year: "",
            card_holder: ""
        }
        };
  },

  openModal(product, quantity) {
      this.modalTitle = 'Iniciar Transacción';

          this.modalType = "transaction";
          if((this.products[product.id-1].amount - quantity) >= 0){
              if (this.modal) {
        this.modal.show();
      } else {
        console.error('Modal no está inicializado');
      }
              this.showAlert = false;
          }else{
              this.showAlert = true;
          }
    },
  updateCardLogo() {
      const cardNumber = this.transactionData.card.number;
      if (cardNumber.startsWith('4')) {
        this.cardLogoClass = 'fab fa-cc-visa'; // Visa
      } else if (cardNumber.startsWith('51') || cardNumber.startsWith('52') ||
                 cardNumber.startsWith('53') || cardNumber.startsWith('54') ||
                 cardNumber.startsWith('55') || cardNumber.startsWith('2221') ||
                 cardNumber.startsWith('2720')) {
        this.cardLogoClass = 'fab fa-cc-mastercard'; // MasterCard
      } else if (cardNumber.startsWith('34') || cardNumber.startsWith('37')) {
        this.cardLogoClass = 'fab fa-cc-amex'; // American Express
      } else if (cardNumber.startsWith('6011') || cardNumber.startsWith('65') ||
                 cardNumber.startsWith('644') || cardNumber.startsWith('645') ||
                 cardNumber.startsWith('646') || cardNumber.startsWith('647') ||
                 cardNumber.startsWith('648') || cardNumber.startsWith('649') ||
                 cardNumber.startsWith('622126') || cardNumber.startsWith('622925')) {
        this.cardLogoClass = 'fab fa-cc-discover'; // Discover
      } else if (cardNumber.startsWith('3528') || cardNumber.startsWith('3589')) {
        this.cardLogoClass = 'fab fa-cc-jcb'; // JCB
      } else if (cardNumber.startsWith('36') || cardNumber.startsWith('38') ||
                 cardNumber.startsWith('39')) {
        this.cardLogoClass = 'fab fa-cc-diners-club'; // Diners Club
      } else if (cardNumber.startsWith('62')) {
        this.cardLogoClass = 'fab fa-cc-unionpay'; // UnionPay
      } else {
        this.cardLogoClass = 'bi bi-credit-card'; // Icono predeterminado
      }
    },
    formatPrice(price) {
      return price.toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }


  },
  props: ["product"],
  created () {

  },

  mounted() {

  this.$nextTick(() => {
        const modalElement = this.$refs.paymentModal;
        if (modalElement) {
          this.modal = new bootstrapBundleMin.Modal(modalElement, {
            backdrop: 'static',
            keyboard: false,
          });
        } else {
          console.error('Referencia al modal no encontrada');
        }
      });
    },


}
</script>

<style lang="scss">

.imagen-pequena {
  width: 200px;
  height: auto;
  margin: 0 auto;
}
.icono-margi {
  margin: 10px;
}
.custom-btn {
  background-color: #400D7E ;
  color: #ffffff
}
.custom-btn:hover {
  background-color: #6415c5
}
.img-custom {
  width: 200px;
  height: auto;

}

.loading-message {
  margin-top: 20px;
  font-size: 34px;
  color: #6415c5
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.card-group {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.custom-card {
  width: 18rem;
  //height: 30rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1rem;
}
</style>
