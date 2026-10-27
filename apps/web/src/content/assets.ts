export const imageAssets = {
  systems: { src: "systems", width: 512, height: 512 },
  performance: { src: "performance", width: 512, height: 512 },
  visualization: { src: "visualization", width: 512, height: 512 },
  enterprise: { src: "enterprise", width: 512, height: 512 },
  craft: { src: "craft", width: 512, height: 512 },
  exploration: { src: "exploration", width: 512, height: 512 },
  tarantula: { src: "tarantula", width: 512, height: 300 },
} as const;
export type ImageId = keyof typeof imageAssets;
