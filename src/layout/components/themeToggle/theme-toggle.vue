<script lang="ts" setup>

import { MoonStar, Sun, SunMoon } from '@/components/Icons';
// import { $t } from '@vben/locales';
import {
  preferences,
  updatePreferences,
  usePreferences,
} from '@/preferences';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/components/ui';

import {
  GTooltip
} from '@/components'

import ThemeButton from './theme-button.vue';

defineOptions({
  name: 'ThemeToggle',
});

withDefaults(defineProps<{ shouldOnHover?: boolean }>(), {
  shouldOnHover: false,
});

function handleChange(isDark: boolean) {
  updatePreferences({
    theme: { mode: isDark ? 'dark' : 'light' },
  });
}

const { isDark } = usePreferences();

const PRESETS = [
  {
    icon: Sun,
    name: 'light',
    // title: $t('preferences.theme.light'),
    title: 'light',
  },
  {
    icon: MoonStar,
    name: 'dark',
    // title: $t('preferences.theme.dark'),
    title: 'dark',
  },
  {
    icon: SunMoon,
    name: 'auto',
    // title: $t('preferences.followSystem'),
    title: 'followSystem',
  },
];
</script>
<template>
  <div>
    <GTooltip :disabled="!shouldOnHover" side="bottom">
      <template #trigger>
        <ThemeButton
          :model-value="isDark"
          type="icon"
          @update:model-value="handleChange"
        />
      </template>
      <ToggleGroup
        :model-value="preferences.theme.mode"
        class="gap-2"
        type="single"
        variant="outline"
        @update:model-value="
          (val: any) => updatePreferences({ theme: { mode: val as any } })
        "
      >
        <ToggleGroupItem
          v-for="item in PRESETS"
          :key="item.name"
          :value="item.name"
        >
          <!-- <CustomIcon :icon="item.icon" class="size-5"></CustomIcon> -->
          <component :is="item.icon" class="size-5" />
        </ToggleGroupItem>
      </ToggleGroup>
    </GTooltip>
  </div>
</template>
