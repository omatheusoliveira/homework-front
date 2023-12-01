<template class="content">
  <div>
    <!-- Inicio Principal -->
    <v-card>
      <v-toolbar flat>
        <v-icon> fas fa-list </v-icon>
        <v-toolbar-title class="pl-4">
          Lista de Vendas:
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col class="px-6 py-6">

            <v-row>
              <v-col cols="6" sm="8" md="3">
                <v-select
                    :items="sellers"
                    label="Vendedor"
                    v-model="filtredSellerID"
                    item-text="name"
                    item-value="id"
                    dense
                    @change="loadSales(filtredSellerID)"
                  ></v-select>
              </v-col>
            </v-row>

            <v-data-table
              dense
              :headers="listSales.cabecalho"
              :items="listSales.items"
              :items-per-page="listSales.porPagina"
              :loading="listSales.carregando"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              height="73vh"
              hide-default-footer
              fixed-header
              class="elevation-1"
            >
            </v-data-table> 
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <!-- Fim Principal -->
  </div>
</template>

<script>

import axios from "axios";
import moment from "moment";
import { baseApiUrl } from "@/global";

  export default {
    name: 'ListarVenda',

    data: () => ({

      dialogTask: false,

      sortBy: 'id',
      sortDesc: true,

      sellers: [],

      filtredSellerID: null,
      
      listSales: {
        cabecalho: [
          { text: "ID Venda", value: "id", sortable: true },
          { text: "Nome", value: "user.name", sortable: false },
          { text: "Email", value: "user.email", sortable: true },
          { text: "Comissão", value: "commission", sortable: true },
          { text: "Valor da Venda", value: "sale_value", sortable: true },
          { text: "Data da Venda", value: "sale_date", sortable: true },
        ],
        items: [],
        porPagina: 10,
        carregando: false
      },
      
    }),

    async mounted() {
      await this.loadSales();
      await this.loadUser();
    },

    methods: {
      async loadUser() {
        await axios
          .get(`${baseApiUrl}/users/list`)
          .then((res) => {
            this.sellers = res.data;
          })
          .catch((error) => {
            console.log(error);
          });
      },

      async loadSales(idSeller){
        this.listSales.carregando = true;
        await axios
          .get(`${baseApiUrl}/sale/list/${idSeller}`)
          .then((res) => {
            
            this.listSales.items = res.data;
            this.listSales.porPagina = res.data.length;
            this.listSales.carregando = false;

            for (let i = 0; i < res.data.length; i++){
            this.listSales.items[i].sale_date
            this.listSales.items[i].sale_date = this.listSales.items[i].sale_date
              ? moment(this.listSales.items[i].sale_date).format(
                  "DD/MM/YYYY"
                )
              : "";
            }
          })
          .catch((error) => {
            console.log(error);
            this.listSales.carregando = false;
          })
      },
    }

  }
</script>

<style scoped>

.content{
  overflow-y: hidden;
}

.alignmentDialog {
  display: flex;
  justify-content: flex-end;
}
.operacoes {
  cursor: pointer;
  justify-content: flex-end;
  padding-right: 8px;
}
.operacoes::after{
  background-color: transparent !important;
}
.v-icon.v-icon::after{
  display: none;
}
.v-dialog{
  overflow-y: unset;
}
.v-text-field__details{
  display: none;
}
</style>