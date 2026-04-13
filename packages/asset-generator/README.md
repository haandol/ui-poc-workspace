# asset-generator

fal.ai의 Qwen Image 모델을 활용한 이미지 생성 MCP 서버입니다.

## 기능

- **Text-to-Image** (`generate_image`) — 텍스트 프롬프트로 이미지 생성
- **Image-to-Image** (`generate_image_from_image`) — 참조 이미지 + 텍스트 프롬프트로 새 이미지 생성

## 사전 준비

[fal.ai](https://fal.ai)에서 API 키를 발급받아 환경변수로 설정합니다.

```bash
export FAL_KEY="your-fal-ai-api-key"
```

## 개발

```bash
# 의존성 설치
pnpm install

# 개발 모드 실행
pnpm --filter @non-tech-ui-poc-workshop/asset-generator dev

# 빌드
pnpm --filter @non-tech-ui-poc-workshop/asset-generator build
```

## MCP 서버 등록

`.mcp.json`에 아래와 같이 등록되어 있습니다:

```json
{
  "asset-generator": {
    "command": "npx",
    "args": ["tsx", "packages/asset-generator/src/index.ts"],
    "env": {
      "FAL_KEY": "${FAL_KEY}"
    }
  }
}
```

## MCP 도구

### `generate_image`

텍스트 프롬프트로 이미지를 생성합니다.

| 파라미터              | 타입   | 필수 | 설명                                                                                            |
| --------------------- | ------ | ---- | ----------------------------------------------------------------------------------------------- |
| `prompt`              | string | O    | 이미지 생성 프롬프트                                                                            |
| `negative_prompt`     | string |      | 제외할 요소                                                                                     |
| `image_size`          | enum   |      | `square_hd`, `square`, `portrait_4_3`, `portrait_16_9`, `landscape_4_3`(기본), `landscape_16_9` |
| `num_inference_steps` | number |      | 추론 단계 수 (기본: 30)                                                                         |
| `guidance_scale`      | number |      | CFG 스케일 (기본: 2.5)                                                                          |
| `seed`                | number |      | 재현성을 위한 시드                                                                              |
| `num_images`          | number |      | 생성할 이미지 수 (기본: 1, 최대: 4)                                                             |
| `output_format`       | enum   |      | `png`(기본) 또는 `jpeg`                                                                         |

### `generate_image_from_image`

참조 이미지와 텍스트 프롬프트를 조합하여 새 이미지를 생성합니다.

`generate_image`의 모든 파라미터에 아래 2개가 추가됩니다:

| 파라미터    | 타입   | 필수 | 설명                                                                |
| ----------- | ------ | ---- | ------------------------------------------------------------------- |
| `image_url` | string | O    | 참조 이미지 URL                                                     |
| `strength`  | number |      | denoising 강도 (기본: 0.6). 1.0 = 완전히 새로 생성, 0.0 = 원본 유지 |

`image_size` 미지정 시 입력 이미지의 크기를 따릅니다.
