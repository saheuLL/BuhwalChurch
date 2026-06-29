# **AWS S3 Static Website Migration with Terraform**

 https://github.com/GeunheeCho/BuhwalChurch

### 프로젝트 개요

기존 정적 홈페이지를 크리에이터링크라는 서비스를 이용하여 제공하고 있었지만 비용 절감과 IaC 와 AWS 학습을 위해 프로젝트를 진행하게 되었습니다. 이를 통해 IaC과 AWS의 여러 서비스들을 학습하며 더욱 저렴하고 안정적인 웹서비스를 제공하기를 목표하고 있습니다. 또한 Terraform을 통한 인프라 관리로 효율성을 높이고자 하였습니다.

### 기술 스택

<aside>
🖥️

AWS S3, AWS CloudFront, Terraform, Github Actions, React, Tailwind CSS, AWS Route53, Gabia Domain

</aside>

### 주요 구현

시스템 아키텍처 User -> Route53 -> CloudFront (CDN/HTTPS) -> S3 Bucket (Origin)

- S3 Bucket: 정적 웹 사이트 호스팅 설정 및 정책 정의
- Terraform State Management: 인프라 상태 파일을 통한 리소스 추적 및 형상 관리
- versel v0와 cursor을 통해 페이지를 React+ Tailwind CSS 화
- Cost & Performance Optimization
- 트래픽에 따른 유연한 확장성 확보
- CloudFront: 글로벌 캐싱 및 SSL/TLS 보안 적용 (HTTPS) S3 보안 설정: 퍼블릭 액세스를 차단하고 CloudFront를 통해서만 접근 가능하도록 하는 Origin Access Control(OAC) 정책 적용 시의 권한 설정 이슈 해결
- CI/CD 파이프라인: GitHub Actions를 연동하여 코드 수정 시 S3로 자동 배포 및 CloudFront 캐시 무효화(Invalidation) 자동화 구현 예정
- 바이브코딩을 이용한 서브페이지 생성

### 트러블슈팅

- 

### 향후 계획


- Route53 : 도메인 연결
- 모니터링 :
