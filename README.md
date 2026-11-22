# Flow Studio — releases

This repository publishes Flow Studio update packages only. It contains no source code, manuals or SDKs.

이 저장소는 Flow Studio 업데이트 패키지만 게시합니다. 소스 코드, 매뉴얼, SDK는 없습니다.

Product overview / 제품 소개: https://rubiya82.github.io/FlowStudio-release/

| File | Purpose |
| --- | --- |
| [Releases](../../releases) `FlowStudio-<version>-win-x64.zip` | Flow Studio installation folder (Studio, engine, validator, samples). Used by the built-in updater |
| `version.json`, `beta/version.json` | Signed update information for the stable and beta channels (ECDSA P-256) |
| `update-public-key.pem` | Public key that verifies `version.json`. The same key is built into Flow Studio |
| `EULA-FlowStudio.txt` | Flow Studio end user license agreement |
| `THIRD-PARTY-NOTICES.txt` | Third-party notices |

- Flow Studio requires a **device license**. Without a license file (`*.fslic`) it shows only the activation screen.
- Flow Studio는 기기 라이선스가 있어야 동작합니다. 인증 파일이 없으면 인증 화면만 뜹니다. 설치본·매뉴얼·런타임·MFC SDK는 라이선스를 발급할 때 함께 전달합니다.
- Published release files are never replaced. A change gets a new version. / 같은 버전의 파일은 바꾸지 않습니다.
- License inquiries and bug reports: [Issues](../../issues). Do not attach license or device files to issues. / 문의는 Issues. 인증 파일·기기 정보 파일은 올리지 마세요.

Copyright © 2026 Samsung Electronics Co., Ltd.
