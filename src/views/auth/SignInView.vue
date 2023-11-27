<script setup lang="ts">
import TextInput from "@/components/forms/TextInput.vue";
import FormField from "@/components/forms/FormField.vue";
import TextButton from "@/components/TextButton.vue";
import TextLink from "@/components/TextLink.vue";
import router from "@/router";

const login = (event: Event) => {
  router.push("/home");
}
</script>

<template>
  <div>
    <main class="w-64">
      <form @submit.prevent="login">
        <div class="space-y-3">
          <FormField label="E-mail">
            <TextInput
              type="email"
              placeholder="Insira seu endereço de e-mail"
              name="email"
              autocomplete="email"
              required
            />
          </FormField>

          <FormField label="Senha">
            <TextInput
              type="password"
              placeholder="Insira sua senha"
              name="password"
              required
            />
          </FormField>
        </div>

        <div class="mt-5">
          <TextButton type="submit">
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
