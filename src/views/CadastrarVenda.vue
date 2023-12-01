<template>
  <div>
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title class="pl-4"> Cadastrar Venda </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-row class="px-9 py-7">
          <v-card style="width: 100%; heigth: calc(80vh - 100px)">
            <v-container>
              <v-row class="pt-4">
                <v-col cols="6" sm="8" md="3">
                  <v-select
                    :items="sellers"
                    label="Vendedor"
                    v-model="sale.user_id"
                    item-text="name"
                    item-value="id"
                    dense
                  ></v-select>
                </v-col>
                <v-col cols="6" sm="8" md="3">
                  <v-text-field
                    v-model="sale.sale_value"
                    label="Valor da Venda"
                    dense
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="2" class="alignment">
                  <v-dialog
                    ref="modal_sale_date"
                    v-model="modal.sale_date"
                    :return-value.sync="sale.sale_date"
                    persistent
                    width="290px"
                    :retain-focus="false"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        dense
                        outlined
                        prepend-icon="fas fa-calendar-alt"
                        label="Data da Venda"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        :value="formatDateInicioGrid"
                        clearable
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="sale.sale_date" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal.sale_date = false"
                        >Cancelar</v-btn
                      >
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.modal_sale_date.save(sale.sale_date)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-dialog>
                </v-col>
              </v-row>
            </v-container>

            <v-card-actions class="alignmentDialog">
              <v-btn class="ma-2" color="error"> Cancelar </v-btn>
              <v-btn class="ma-2" color="primary" @click="addSale()">
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { baseApiUrl } from "@/global";

export default {
  name: "CadastrarVenda",

  data: () => ({
    loading: false,
    sellers: [],
    sale_value: '',

    sale: {
      user_id: null,
      sale_value: 0,
      sale_date: null,
    },

    modal: {
      sale_date: false,
    },
  }),

  async mounted() {
    await this.loadUser();
  },

  computed: {
      formatDateInicioGrid() {
        return this.sale.sale_date
          ? moment(this.sale.sale_date).format("DD/MM/YYYY")
          : "";
      },
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

    addSale() {
      this.sale.sale_date ? moment(this.sale.sale_date).format("YYYY/MM/DD") : "";
      axios
        .post(`${baseApiUrl}/sale/create`, this.sale)
        .then(() => {
          this.$swal({
            title: "Sucesso!!!",
            text: "Venda criada com sucesso.",
            icon: "success",
            confirmButtonText: "Ok",
            confirmButtonColor: "#4BB543",
            allowOutsideClick: true,
          });
          this.sale = {
            description: "",
            status: null,
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
<style scoped>
.alignmentDialog {
  display: flex;
  justify-content: flex-end;
}
.alignment {
  padding-bottom: 0 !important;
  padding-top: 5px !important;
}
</style>
