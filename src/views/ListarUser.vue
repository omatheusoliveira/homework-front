<template>
  <div>
    <!-- Inicio Principal -->
    <v-card>
      <v-toolbar flat>
        <v-icon> fas fa-user </v-icon>
        <v-toolbar-title class="pl-4"> Lista de Usuários: </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col class="px-6 py-6">
            <v-data-table
              dense
              :headers="listSeller.cabecalho"
              :items="listSeller.items"
              :items-per-page="listSeller.porPagina"
              :loading="listSeller.carregando"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              height="73vh"
              fixed-header
              hide-default-footer
              class="elevation-1"
            >
              <template v-slot:[`item.operacoes`]="{ item }">
                <v-icon size="16" color="green" class="operacoes" @click="openDialogUpdateSeller(item)">fas fa-pen</v-icon>
                <v-icon
                  size="16"
                  color="red"
                  class="operacoes"
                  @click="deleteSeller(item)"
                  >fas fa-trash</v-icon
                >
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <!-- Fim Principal -->

    <!-- Modal Alteracao -->
      <v-row class="px-9 py-7" justify="end">
        <v-dialog v-model="dialogUpdateSeller" max-width="800">
          <v-card>
            <v-container>
              <v-card-title class="text-h5" style="justify-content:center"> Atualizar Vendedor</v-card-title>
              <v-row>
                <v-col cols="8" sm="8" md="8">
                  <v-card-title class="text-h7"> Nome do Vendedor </v-card-title>
                  <v-card-text style="padding-bottom: 0">
                    <v-text-field solo type="text" v-model="seller.name"></v-text-field>
                  </v-card-text>
                </v-col>
                <v-col cols="8" sm="8" md="8">
                  <v-card-title class="text-h7"> Email do Vendedor </v-card-title>
                  <v-card-text style="padding-bottom: 0">
                    <v-text-field solo type="text" v-model="seller.email"></v-text-field>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-container>
            
            <v-card-actions class="alignmentDialog">
              <v-btn class="ma-2" color="error" @click="(dialogUpdateSeller = false, this.loadSeller())">
                Cancelar
              </v-btn>
              <v-btn
                class="ma-2"
                color="primary"
                @click="updateSeller()"
              >
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <!-- Fim Modal Alteracao -->

  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { baseApiUrl } from "@/global";

export default {
  name: "ListarUser",

  data: () => ({
    dialogUpdateSeller: false,

    sortBy: 'id',
    sortDesc: true,

    seller: {
      name: "",
      email: "",
    },

    listSeller: {
      cabecalho: [
        { text: "ID ", value: "id", sortable: true },
        { text: "Nome", value: "name", sortable: true },
        { text: "Email", value: "email", sortable: true },
        { text: "Criado em", value: "created_at", sortable: true },
        { text: "", value: "operacoes", sortable: false, align: "end" },
      ],
      items: [],
      porPagina: 10,
      carregando: false,
    },
  }),

  mounted() {
    this.loadSeller();
  },

  methods: {
    loadSeller() {
      this.listSeller.carregando = true;
      axios
        .get(`${baseApiUrl}/users/list`)
        .then((res) => {
          this.listSeller.items = res.data;
          this.listSeller.porPagina = res.data.length;
          this.listSeller.carregando = false;

          for (let i = 0; i < res.data.length; i++) {

            this.listSeller.items[i].created_at = this.listSeller.items[i].created_at
              ? moment(this.listSeller.items[i].created_at).format(
                  "DD/MM/YYYY"
                )
              : "";
          }

        })

        .catch((error) => {
          console.log(error);
          this.listSeller.carregando = false;
        });
    },
    deleteSeller(item) {
      this.$swal({
        title: "Confirmação",
        html: `Deseja realmente excluir o vendedor ${item.name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
        confirmButtonColor: "#4BB543",
        cancelButtonColor: "#d33",
        allowOutsideClick: false,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios
            .delete(`${baseApiUrl}/user/delete/${item.id}`)
            .then(() => {
              this.$swal({
                title: "Sucesso!!!",
                text: "Vendedor excluído com sucesso.",
                icon: "success",
                confirmButtonText: "Ok",
                confirmButtonColor: "#4BB543",
                allowOutsideClick: true,
              });
              this.loadSeller();
            })
            .catch(() => {
              this.$swal({
                title: "Erro!!!",
                text: "Não foi possível excluir o vendedor pois existe uma venda lançada para o mesmo.",
                icon: "error",
                confirmButtonText: "Ok",
                confirmButtonColor: "#FF0000",
                allowOutsideClick: true,
              });

              this.loadSeller();
            });
        }
      });
    },

    openDialogUpdateSeller(item){
      this.dialogUpdateSeller = true;
      this.seller = item;
    },

    updateSeller(){
      axios
      .put(`${baseApiUrl}/users/update/${this.seller.id}`, this.seller)
      .then(() => {
        this.$swal({
          title: 'Sucesso!!!',
          text: 'Vendedor editado com sucesso.',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#4BB543',
          allowOutsideClick: true,
        });
        this.dialogUpdateSeller = false;
        this.loadSeller();
      })
      .catch((error) => {
        console.log(error)
      })
    },
  },
};

</script>

<style scoped>
.alignmentDialog {
  display: flex;
  justify-content: flex-end;
}
.operacoes {
  cursor: pointer;
  justify-content: flex-end;
  padding-right: 8px;
}
.operacoes::after {
  background-color: transparent !important;
}
.v-icon.v-icon::after {
  display: none;
}
.v-dialog {
  overflow-y: unset;
}
</style>
