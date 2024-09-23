import {
  defineConfig,
  presetAttributify,
  presetUno,
  presetTagify,
  transformerVariantGroup,
} from "unocss";
// import presetRemToPx from "@unocss/preset-rem-to-px";

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetTagify(),
    // presetRemToPx({
    //   baseFontSize: 4,
    // }),
  ],
  transformers: [transformerVariantGroup()],
  rules: [
    ["w-content", { width: "var(--content-width)", margin: "0 auto" }],
    ["text-white-1", { color: "var(--white-85)" }],
    ["text-white-2", { color: "var(--white-65)" }],
    ["text-white-3", { color: "var(--white-45)" }],

    ["text-color-2", { color: "rgba(27, 32, 40, 0.65)" }],
    ["text-consult", { color: "var(--color-text-consult)" }],
    ["bg-divider", { background: "var(--color-bg-divider)" }],
    ["bg-nav", { background: "var(--color-bg-nav)" }],
    ["bg-btn", { background: "var(--color-bg-btn)" }],
    ["border-white", { border: "1px solid var(--color-border-white)" }],
    [
      "btn-liner",
      { background: "linear-gradient(270deg, #3D57FF 0%, #3D94FF 100%);" },
    ],
    [
      "btn-liner-hover",
      {
        background: "linear-gradient(270deg, #4D64FF 0%, #4D9DFF 100%)",
      },
    ],
    [
      "image-cover",
      {
        position: "absolute",
        top: 0,
        left: 0,
      },
    ],
    [
      "absolute-center",
      {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      },
    ],
    [
      "absolute-x-center",
      {
        position: "absolute",
        left: "50%",
        transform: "translateX(-50%)",
      },
    ],
    [
      "cur-p",
      {
        cursor: "pointer",
      },
    ],
    [
      "ani-all",
      {
        transitionProperty: "all",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        transitionDuration: "150ms",
      },
    ],
  ],
  shortcuts: [
    [
      /^flex-(.*)-(.*)$/,
      ([, c, d]) => `flex justify-${c} items-${d}`,
      {
        autocomplete: ["flex-"],
      },
    ],
    [
      /^dur-(.*)$/,
      ([, c]) => `duration-${c}`,
      {
        autocomplete: ["dur-"],
      },
    ],
  ],
});
