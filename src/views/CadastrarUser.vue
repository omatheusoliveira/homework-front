<template>
  <div>
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title class="pl-4">
          Cadastrar Vendedor
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-row class="px-9 py-7">
          <v-card style="width: 100%; heigth: calc(80vh - 100px)">
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-card-title class="text-h7"> Nome do Vendedor </v-card-title>
                  <v-card-text style="padding-bottom: 0">
                    <v-text-field 
                    solo 
                    type="text"
                    v-model="user.name"
                    :rules="[rules.required]"
                    ></v-text-field>
                  </v-card-text>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-card-title class="text-h7"> Email do Vendedor </v-card-title>
                  <v-card-text style="padding-bottom: 0">
                    <v-text-field 
                    solo 
                    type="text"
                     v-model="user.email"
                     :rules="[rules.required, rules.email]"
                     ></v-text-field>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-container>

            <v-card-actions class="alignmentDialog">
              <v-btn class="ma-2" color="error">
                Cancelar
              </v-btn>
              <v-btn
                class="ma-2"
                color="primary"
                @click="registerSeller()"
              >
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
import { baseApiUrl } from "@/global";

  export default {
    name: 'CadastrarUser',

    data: () => ({
      loading: false,
      user: {
        nome: "",
        email: "",
      },
      rules: {
          required: value => !!value || 'Obrigatório.',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Insira um email válido.'
          },
        },
    }),
    methods: {
      registerSeller(){
        axios
        .post(`${baseApiUrl}/users/create`, {
          name: this.user.name,
          email: this.user.email,
        })
        .then(() => {
          this.$swal({
            title: 'Sucesso!!!',
            text: 'Usuário criado com sucesso.',
            icon: 'success',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#4BB543',
            allowOutsideClick: true,
          });
          this.user = []
        })
        .catch((error) => {
          console.log(error)
        })
      }
    }

  }
</script>
<style scoped>
.alignmentDialog {
  display: flex;
  justify-content: flex-end;
}

</style>