export default {
  "roots": [
    "./src"
  ],
  "transform": {
    "\\.[jt]sx?$": ["ts-jest"],
  },
  "transformIgnorePatterns": [
    "/node_modules/(?!three/.*)",
  ]
}