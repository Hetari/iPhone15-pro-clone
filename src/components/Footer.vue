<template>
  <footer class="py-5 px-5 sm:px-10">
    <div class="screen-max-width">
      <div>
        <p class="font-semibold text-gray text-xs">
          More ways to shop:
          <span class="underline text-blue cursor-pointer"
            >Find an Apple Store</span
          >
          or
          <span class="underline text-blue cursor-pointer">other retailer</span>
          near you
        </p>

        <p class="font-semibold text-gray text-xs">Or call 000001-234-5679</p>
      </div>

      <div class="bg-neutral-700 my-5 h-[1px] w-full"></div>
      <div class="flex md:flex-row flex-col md:items-center justify-between">
        <p class="font-semibold text-gray text-xs">
          Copyright &copy; {{ new Date().getFullYear() }} Apple Inc. All rights
          reserved.
        </p>

        <div class="flex">
          <div
            class="group"
            v-for="(link, index) in footerLinks"
            :key="index">
            <p
              class="cursor-pointer font-semibold text-gray text-xs group-hover:text-white transition-[color] duration-300">
              {{ link }}
              <span
                class="mx-2 group-hover:text-gray"
                v-if="index < footerLinks.length - 1"
                >|</span
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  import { footerLinks } from '@/constants';
</script>
