// ==UserScript==
// @name         Palworld Breeding Tree Name Translator
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Translates Palworld Pal names on the breeding tree page with dynamic updates
// @match        https://palbreed.com/breeding-tree
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Palworld 팰 이름 번역 사전
    const palTranslations = {
        // 기본 팰들
        "Lamball": "도로롱",
        "Cattiva": "까부냥",
        "Chikipi": "꼬꼬닭",
        "Lifmunk": "큐롤리스",
        "Foxparks": "파이호",
        "Fuack": "청부리",
        "Sparkit": "번개냥",
        "Tanzee": "몽지",
        "Rooby": "불꽃밤비",
        "Pengullet": "펭키",
        "Penking": "펭킹",
        "Jolthog": "찌릿도치",
        "Jolthog Cryst": "코치도치",
        "Gumoss": "초롱이",
        "Vixy": "미호",
        "Hoocrates": "아테노울",
        "Teafant": "차코리",
        "Depresso": "뚱코알라",
        "Cremis": "밀피",
        "Daedream": "몽마둥이",
        "Rushoar": "돌진돼지",
        "Nox": "루나티",
        "Fuddler": "두더비",
        "Killamari": "고스문",
        "Mau": "냐옹테트",
        "Mau Cryst": "칠테트",
        "Celaray": "루미카이트",
        "Direhowl": "다크울프",
        "Tocotoco": "알록새",
        "Flopie": "토푸리",
        "Mozzarina": "밀카우",
        "Bristla": "가시공주",
        "Gobfin": "샤키드",
        "Gobfin Ignis": "샤맨더",
        "Hangyu": "건다리",
        "Hangyu Cryst": "유령건다리",
        "Mossanda": "초판다",
        "Mossanda Lux": "썬더판다",
        "Woolipop": "캔디쉽",
        "Caprity": "베리고트",
        "Melpaca": "멜파카",
        "Eikthyrdeer": "신령사슴",
        "Eikthyrdeer Terra": "산령사슴",
        "Nitewing": "나이트윙",
        "Ribbuny": "핑토",
        "Incineram": "헬고트",
        "Incineram Noct": "아비스고트",
        "Cinnamoth": "귀요비",
        "Arsox": "불페르노",
        "Dumud": "도도롱",
        "Cawgnito": "마스크로우",
        "Leezpunk": "도마맨",
        "Leezpunk Ignis": "칠리자드",
        "Loupmoon": "달서니",
        "Galeclaw": "질풍수리",
        "Robinquill": "로빈몽",
        "Robinquill Terra": "산도로",
        "Gorirat": "고릴레이지",
        "Beegarde": "비나이트",
        "Elizabee": "퀸비나",
        "Grintale": "소름냥이",
        "Swee": "모프링",
        "Sweepa": "모프킹",
        "Chillet": "베비뇽",
        "Univolt": "썬더콘",
        "Foxcicle": "빙호",
        "Pyrin": "파이린",
        "Pyrin Noct": "사라블랙",
        "Reindrix": "마호",
        "Rayhound": "썬도그",
        "Kitsun": "불이리",
        "Dazzi": "썬더키드",
        "Lunaris": "루나리스",
        "Dinossom": "플로라디노",
        "Dinossom Lux": "찌르르디노",
        "Surfent": "씨무기",
        "Surfent Terra": "스너펜트",
        "Maraith": "고스호스",
        "Digtoise": "드릴북이",
        "Tombat": "냥뱃",
        "Lovander": "핑크뇽",
        "Flambelle": "라비",
        "Vanwyrm": "버드래곤",
        "Vanwyrm Cryst": "시로카바네",
        "Bushi": "불무사",
        "Beakon": "라이버드",
        "Ragnahawk": "적토조",
        "Katress": "캐티메이지",
        "Katress Ignis": "캐티위자드",
        "Wixen": "마호",
        "Verdash": "초토리",
        "Vaelet": "비오레타",
        "Sibelyx": "실키누",
        "Elphidran": "실피아",
        "Elphidran Aqua": "실티아",
        "Kelpsea": "켈시",
        "Kelpsea Ignis": "마그피스",
        "Azurobe": "아주리비",
        "Cryolinx": "백랑이",
        "Blazehowl": "만티파이어",
        "Blazehowl Noct": "시니에노",
        "Relaxaurus": "헤로롱",
        "Relaxaurus Lux": "핑피롱",
        "Broncherry": "라브라돈",
        "Broncherry Aqua": "스프라돈",
        "Petallia": "플로리나",
        "Reptyro": "볼카노",
        "Ice Reptyro": "프로스카노",
        "Kingpaca": "킹파카",
        "Ice Kingpaca": "블루파카",
        "Mammorest": "그린모스",
        "Mammorest Cryst": "블리자모스",
        "Wumpo": "움포",
        "Wumpo Botan": "트로피티",
        "Warsect": "장수벌레",
        "Fenglope": "윈드디어",
        "Felbat": "블러드캐티",
        "Quivern": "페스키",
        "Blazamut": "마그마 카이저",
        "Helzephyr": "헬가루다",
        "Astegon": "라바드래곤",
        "Menasting": "데스 스팅",
        "Menasting Terra": "골드 스팅",
        "Anubis": "아누비스",
        "Jormuntide": "레비드라",
        "Jormuntide Ignis": "아그니드라",
        "Suzaku": "주작",
        "Suzaku Aqua": "시바",
        "Grizzbolt": "일렉판다",
        "Lyleen": "릴린",
        "Lyleen Noct": "루나퀸",
        "Faleris": "호루스",
        "Orserk": "전룡맨",
        "Shadowbeak": "제노그리프",
        "Paladius": "팔라디우스",
        "Necromus": "켄타나이트",
        "Frostallion": "빙천마",
        "Frostallion Noct": "그레이섀도우",
        "Jetragon": "제트래곤",
        "Bellanoir": "벨라누아르",
        "Bellanoir Libero": "벨라루주",
        "Selyne": "셀레문",
        "Lullu": "뷰티플라워",
        "Shroomer": "머쉬드래곤",
        "Shroomer Noct": "머쉬포이즌",
        "Kikit": "꼬마딜로",
        "Sootseer": "유령초",
        "Prixter": "스콜피어스",
        "Knocklem": "테라나이트",
        "Yakumo": "둥실해치",
        "Dogen": "시푸도그",
        "Dazemu": "페더치프",
        "Mimog": "따라하개",
        "Xenovader": "제노베이더",
        "Xenogard": "제노루더",



        // 레어 및 특수 팰들
        "Pal": "팰",
        "Fire": "불",
        "Water": "물",
        "Grass": "풀",
        "Electric": "전기",
        "Ice": "얼음",
        "Ground": "땅",
        "Dark": "어둠",
        "Dragon": "드래곤",
        "Normal": "노말"
    };

    // 텍스트 노드 변환 함수 (원본 텍스트를 title에 저장)
    function translateText(node) {
        let text = node.textContent;
        let translated = false;

        Object.keys(palTranslations).forEach(englishName => {
            if (text.includes(englishName)) {
                const translatedText = text.replace(
                    new RegExp(englishName, 'g'),
                    palTranslations[englishName]
                );

                // 원본 텍스트를 title로 저장 (부모 요소에 추가)
                if (node.parentElement) {
                    node.parentElement.setAttribute('title', text);
                }

                node.textContent = translatedText;
                translated = true;
            }
        });

        return translated;
    }


    // 요소 및 자식 요소 번역 함수
    function translateElement(element) {
        // 텍스트 노드 직접 번역
        if (element.nodeType === Node.TEXT_NODE) {
            return translateText(element);
        }

        // 자식 노드 순회하며 번역
        let translated = false;
        if (element.childNodes) {
            element.childNodes.forEach(childNode => {
                if (translateElement(childNode)) {
                    translated = true;
                }
            });
        }

        return translated;
    }

    // 페이지 전체 번역 함수
    function translatePage() {
        translateElement(document.body);
    }

    // 디버그용 로깅 함수
    function logTranslation() {
        console.log('Palworld Translator: Page translation attempted');
    }

    // 페이지 로드 시 번역 실행
    window.addEventListener('load', () => {
        translatePage();
        logTranslation();
    });

    // MutationObserver로 동적 콘텐츠 감지 및 번역
    const observer = new MutationObserver((mutations) => {
        let shouldTranslate = mutations.some(mutation =>
            mutation.type === 'childList' ||
            mutation.type === 'characterData'
        );

        if (shouldTranslate) {
            translatePage();
            logTranslation();
        }
    });

    // body와 하위 요소 모두 관찰
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });

    // 주기적 번역 (추가 안전장치)
    setInterval(() => {
        translatePage();
        logTranslation();
    }, 5000);
})();
