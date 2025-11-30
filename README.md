# ClassCare 모바일 가이드

클래스케어 사용자를 위한 카드뉴스 스타일 가이드 페이지입니다.

## 미리보기

`index.html`을 브라우저에서 열면 바로 확인할 수 있습니다.

## 구성

- **선생님용**: 8개 카드 (시작하기 ~ 트레이 모드)
- **학생용**: 6개 카드 (선생님 연결 ~ 폴더 바로가기)

## 이미지 교체 방법

현재 이모지 플레이스홀더로 되어 있습니다. 실제 스크린샷으로 교체하려면:

### 필요한 이미지 목록

| 파일명 | 내용 | 권장 크기 |
|--------|------|-----------|
| `teacher_01_start.png` | 프로그램 시작 화면 | 400x300px |
| `teacher_02_class.png` | 반 생성/선택 화면 | 400x300px |
| `teacher_03_seat.png` | 좌석 배치 화면 | 400x300px |
| `teacher_04_file.png` | 파일 전송 화면 | 400x300px |
| `teacher_05_quiz.png` | 퀴즈/시험 관리 화면 | 400x300px |
| `teacher_06_message.png` | 메시지 전송 화면 | 400x300px |
| `teacher_07_monitor.png` | 화면 모니터링 | 400x300px |
| `teacher_08_tray.png` | 트레이 아이콘 | 400x300px |
| `student_01_connect.png` | 서버 연결 화면 | 400x300px |
| `student_02_class.png` | 반 입장 화면 | 400x300px |
| `student_03_file.png` | 자료 받기 화면 | 400x300px |
| `student_04_quiz.png` | 퀴즈/시험 화면 | 400x300px |
| `student_05_feedback.png` | 피드백 확인 | 400x300px |
| `student_06_folder.png` | 폴더 바로가기 | 400x300px |

### 이미지 적용

1. `images/` 폴더에 이미지 파일 추가
2. `index.html`에서 플레이스홀더를 이미지 태그로 교체:

```html
<!-- Before -->
<div class="placeholder-img"><span class="icon-emoji">🚀</span></div>

<!-- After -->
<img src="images/teacher_01_start.png" alt="시작하기">
```

## 브랜드 컬러

| 용도 | 색상 코드 |
|------|-----------|
| 메인 핑크 | `#D53A6B` |
| 서브 블루 | `#4550C8` |
| 배경 | `#F5F5F5` |
| 카드 배경 | `#FFFFFF` |
| 텍스트 | `#333333` |

## 반응형

- **PC**: max-width 480px로 카드뉴스 느낌 유지
- **모바일**: 세로 스택 레이아웃으로 자동 전환
