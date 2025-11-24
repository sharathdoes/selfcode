import next from "eslint-config-next";

export default [
  ...next("core-web-vitals"),
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];
