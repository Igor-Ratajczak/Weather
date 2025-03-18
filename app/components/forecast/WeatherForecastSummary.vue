<script setup lang="ts">
import RainAnimate from '~/components/forecast/animation/RainAnimate.vue';
import SnowAnimate from '~/components/forecast/animation/SnowAnimate.vue';
import SleetAnimate from '~/components/forecast/animation/SleetAnimate.vue';
import CloudsAnimate from '~/components/forecast/animation/CloudsAnimate.vue';
import IconArrow from 'public/IconArrow.svg';
import { svgIcons } from '~/utils/getURLWeatherIcons';

const weatherState = useWeatherState().value;
const state = useAppConfig();

const props = defineProps<{
  item: WeatherForecast;
}>();

const checkLength = props.item.hours.length;
const GRAPH_WIDTH = 100 * checkLength;
const X = GRAPH_WIDTH / props.item.hours.length;

const graph = new Graph(props.item.hours);

function getAnimationName(icon: WeatherCondition) {
  if (String(icon).includes('snow')) {
    return 'snow';
  } else if (String(icon).includes('rain')) {
    return 'rain';
  } else if (String(icon).includes('sleet')) {
    return 'sleet';
  } else {
    return null;
  }
}

let stateY = ref(50);
let gapY = ref(5);
let AnimateCloudsY = computed(() => -50 + stateY.value);
let graphY = computed(() => 0 + stateY.value);
let AnimatePrecipitationY = computed(() => -10 + stateY.value);
let tempY = computed(() => 160 + stateY.value + gapY.value);
let timeY = computed(() => 230 + stateY.value + 2 * gapY.value);
let imageY = computed(() => 230 + stateY.value + 3 * gapY.value);
let windY = computed(() => 300 + stateY.value + 4 * gapY.value);
let IconArrowY = computed(() => 315 + stateY.value + 5 * gapY.value);
let moreY = computed(() => 350 + stateY.value + 6 * gapY.value);

const hoursSummary = useTemplateRef('hoursSummary');
let isScrolling = ref(false);
let startX = ref(0);
let scrollLeft = ref(0);

function startScroll(event: MouseEvent) {
  isScrolling.value = true;
  startX.value = event.pageX - hoursSummary.value!.offsetLeft;
  scrollLeft.value = hoursSummary.value!.scrollLeft;
}

function stopScroll() {
  isScrolling.value = false;
}

function handleMouseMove(event: MouseEvent) {
  if (isScrolling.value) {
    const x = event.pageX - hoursSummary.value!.offsetLeft;
    const walk = x - startX.value;
    hoursSummary.value!.scrollLeft = scrollLeft.value - walk;
  }
}

const open = ref(false);
</script>
<template>
  <div class="details">
    <b @click="open = !open">Więcej</b>
    <Transition name="height">
      <div
        v-if="open"
        :class="{ open: open, grabbing: isScrolling }"
        ref="hoursSummary"
        class="hours"
        @mousedown="startScroll"
        @mouseup="stopScroll"
        @mouseleave="stopScroll"
        @mousemove="handleMouseMove"
      >
        <svg :width="GRAPH_WIDTH" height="450" xmlns="http://www.w3.org/2000/svg" :viewBox="`0 0 ${GRAPH_WIDTH} 450`">
          <RainAnimate :item="item" />
          <SnowAnimate :item="item" />
          <SleetAnimate :item="item" />
          <CloudsAnimate :item="item" :width="X" />
          <defs>
            <linearGradient :id="`weatherGradient${item.time.split(' ').join('')}`" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                v-for="(hour, i) in item.hours"
                :key="i"
                :offset="graph.getOffset(i)"
                :stop-color="getColor(hour.temperature)"
              />
            </linearGradient>
          </defs>
          <rect :width="GRAPH_WIDTH" height="200" :y="graphY" />
          <path
            :d="graph.generatePath(item.hours)"
            stroke="black"
            :fill="`url(#weatherGradient${item.time.split(' ').join('')})`"
          />
          <g v-for="(hour, i) in item.hours" :key="i">
            <rect
              v-if="hour.precipitation > 0"
              :x="i * X"
              :y="AnimatePrecipitationY"
              width="100"
              height="210"
              :fill="`url(#${getAnimationName(hour.icon)}Animate${item.time.split(' ').join('')})`"
            />
            <rect
              v-if="getAnimationName(hour.icon) !== null"
              :x="i * X"
              :y="AnimateCloudsY"
              width="100"
              height="50"
              :fill="`url(#cloudsAnimate${item.time.split(' ').join('')})`"
            />
            <text
              class="temp"
              :x="i * X + 45"
              :y="tempY - (hour.temperature - graph.minTemp) * graph.yScale"
              font-size="15"
              text-anchor="middle"
            >
              {{ hour.temperature }}°C
            </text>
            <text :x="i * X + 45" :y="timeY" font-size="20" text-anchor="middle" fill="white">
              {{ hour.time }}
            </text>
            <image :x="i * X + 20" :y="imageY" :href="svgIcons[hour.icon]" width="50" height="50"></image>
            <text :x="i * X + 45" :y="windY" font-size="20" text-anchor="middle" fill="white">
              {{ hour.windSpeed }}
              ㎧
            </text>
            <image
              :href="IconArrow"
              width="25"
              height="25"
              :x="i * X + 30"
              :y="IconArrowY"
              :class="weatherState.theme === 'dark' ? 'dark' : 'light'"
              :transform="`rotate(${hour.windDirection}, ${i * X + 42.5}, ${IconArrowY + 12.5})`"
            ></image>
            <text :x="i * X + 45" :y="moreY" font-size="30" text-anchor="middle" @click="state.weatherExtraData = hour.extra">
              ...
            </text>
          </g>
        </svg>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="less">
.height-enter-active,
.height-leave-active {
  transition: all 0.5s;
  height: 424px;
}

.height-enter-from,
.height-leave-to {
  height: 0;
}

div.details {
  grid-area: details;
  text-align: center;
  width: 100%;
  display: grid;
  justify-items: center;

  .hours {
    overflow: auto hidden;
    width: 100%;
    cursor: grab;

    &.grabbing {
      cursor: grabbing;
    }

    svg {
      > rect {
        border: 2px solid black;
        fill: var(--color-background-graph);
      }

      text {
        fill: var(--color-text);

        &.temp {
          fill: black;
        }
      }

      image.light {
        filter: invert(0%) brightness(1);
      }

      image.dark {
        filter: invert(100%) brightness(1);
      }
    }
  }
}
</style>
