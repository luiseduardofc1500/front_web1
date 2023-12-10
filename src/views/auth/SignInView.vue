<script setup lang="ts">
import TextInput from "@/components/forms/TextInput.vue";
import FormField from "@/components/forms/FormField.vue";
import TextButton from "@/components/TextButton.vue";
import TextLink from "@/components/TextLink.vue";
import type {AuthenticationRepository} from "@/lib/domain/repository/authentication";
import {inject, ref} from "vue";
import {useToastsStore} from "@/lib/infrastructure/repository/store/toasts";
import {Toast} from "@/lib/domain/entity/toast";
import {useAuthenticationStore} from "@/lib/infrastructure/repository/store/authentication";
import router from "@/router";

const authenticationStore = useAuthenticationStore();
const toastsStore = useToastsStore();

const repository = inject<AuthenticationRepository>("AuthenticationRepository");
const email = ref("");
const password = ref("");
const loading = ref(false);

const signIn = async (event: Event) => {
  if (!repository) return;

  loading.value = true;

  const result = await repository.signIn(email.value, password.value);

  if (!result) {
    toastsStore.addToast(Toast.error("E-mail ou senha incorretos"));
    loading.value = false;
    return;
  }

  authenticationStore.setUser(result);
  await router.push({name: "home"});
}
</script>

<template>
  <div>
    <main class="w-64">
      <form @submit.prevent="signIn">
        <div class="space-y-3">
          <FormField label="E-mail">
            <TextInput
              type="email"
              placeholder="Insira seu endereço de e-mail"
              name="email"
              autocomplete="email"
              v-model="email"
              required
            />
          </FormField>

          <FormField label="Senha">
            <TextInput
              type="password"
              placeholder="Insira sua senha"
              name="password"
              v-model="password"
              required
            />
          </FormField>
        </div>

        <div class="mt-5">
          <TextButton
            type="submit"
            :loading="loading"
          >
            Entrar
          </TextButton>
        </div>
      </form>

      <hr class="my-5 block">

      <div class="text-center">
        <TextLink
          href="sign-up"
        >
          Ainda não tem conta?
        </TextLink>
      </div>
    </main>
  </div>
</template>
