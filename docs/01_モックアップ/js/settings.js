// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// 各ゲームのルール
const gameData = {
    // -----------------------------------------------------------
    // ホゲホゲ
    hogehoge: {
        title: "エラー",
        // - - - - - - - - - - - - - - - - - - - -
        rule: `<p>バグってる。どんまい。</p>`,
        // - - - - - - - - - - - - - - - - - - - -
        //賭けなし
        betting: 0,
        // - - - - - - - - - - - - - - - - - - - -
        minPlayers: 0,
        maxPlayers: 0,
        nextPage: "#"
    },
    // -----------------------------------------------------------
    // ババ抜き
    babanuki: {
        title: "ババ抜き",
        // - - - - - - - - - - - - - - - - - - - -
        rule: `
<p>ババ（ジョーカー）が１枚入りのカードが参加者にそれぞれに均等に配られます。<br/>
手札から同じ数字の組みを省いてからゲームがスタートします。<br/>
時計回りに、右隣の人の手札を引き、同じ数字のカードができればその組みは省き、なければそのままに、続いて左隣の人があなたの手札を引くのを繰り返します。<br/>
<br/>
</p>`,
        // - - - - - - - - - - - - - - - - - - - -
        //賭け有無 0なし、1あり
        betting: 0,
        // - - - - - - - - - - - - - - - - - - - -
        minPlayers: 2,
        maxPlayers: 6,
        nextPage: "t-g_Babanuki.html"
    },
    // -----------------------------------------------------------
    // インディアンポーカー
    indianpoker: {
        title: "インディアンポーカー",
        // - - - - - - - - - - - - - - - - - - - -
        rule: `
<p>カードが各プレイヤーに一枚ずつ配られます。<br/>
自分のカードは見れませんが、<br/>
他プレイヤーのカードは見えます。<br/>
他プレイヤーからのヒントを参考に勝負します。<br/><br/>
<b>【カードの強さ】</b><br/>
数字の中では　最弱：3　最強：2<br/>
<span style="color: rgb(206, 91, 91);">※「JOKER」は「2」よりも強いが、「3」には負けます。</span></p>
<img src="./img/DiscImg_IndiP.png" alt="カード強さ表" style="width:100%; max-width:600px;">`,
        // - - - - - - - - - - - - - - - - - - - -
        //賭け有無 0なし、1あり
        betting: 1,
        // - - - - - - - - - - - - - - - - - - - -
        minPlayers: 2,
        maxPlayers: 4,
        nextPage: "t-g_Indianpoker.html"
    },
    // -----------------------------------------------------------
    // 七並べ
    sevens: {
        title: "七並べ",
        // - - - - - - - - - - - - - - - - - - - -
        rule: `<p>7を中心にカードを並べていきます。<br/>
    手札を早くなくした人が勝ちです。</p>`,
        // - - - - - - - - - - - - - - - - - - - -
        //賭け有無 0なし、1あり
        betting: 0,
        // - - - - - - - - - - - - - - - - - - - -
        minPlayers: 2,
        maxPlayers: 6,
        nextPage: "t-g_Sevens.html"
    },
    // -----------------------------------------------------------
    // ソリティア
    solitaire: {
        title: "ソリティア",
        // - - - - - - - - - - - - - - - - - - - -
        rule: `<p>説明</p>`,
        // - - - - - - - - - - - - - - - - - - - -
        //賭け有無 0なし、1あり
        betting: 0,
        // - - - - - - - - - - - - - - - - - - - -
        minPlayers: 1,
        maxPlayers: 1,
        nextPage: "t-g_Solitaire.html"
    },
    // -----------------------------------------------------------
    // ポーカー
    poker: {
        title: "ポーカー",
        // - - - - - - - - - - - - - - - - - - - -
        rule: `<p>説明</p>`,
        // - - - - - - - - - - - - - - - - - - - -
        //賭け有無 0なし、1あり
        betting: 1,
        // - - - - - - - - - - - - - - - - - - - -
        minPlayers: 2,
        maxPlayers: 6,
        nextPage: "t-g_Poker.html"
    },
    // -----------------------------------------------------------
    // ポーカー
    millionaire: {
        title: "大富豪",
        // - - - - - - - - - - - - - - - - - - - -
        rule: `<p>説明</p>`,
        // - - - - - - - - - - - - - - - - - - - -
        //賭け有無 0なし、1あり
        betting: 0,
        // - - - - - - - - - - - - - - - - - - - -
        minPlayers: 2,
        maxPlayers: 6,
        nextPage: "t-g_Millionaire.html"
    },
    // -----------------------------------------------------------
};
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
// 画面に反映
// -----------------------------------------------------------
// URLパラメータからゲームIDを取得
const url = new URL(window.location.href);
const gameID = url.searchParams.get("game") || "hogehoge"; //  デフォルトはhogehoge
const gameInfo = gameData[gameID];

// ゲームルール
const ruleArea = document.getElementById("ruleArea");
const btn = document.getElementById("toggleDetailBtn");
const detail = document.getElementById("gameRuleDetail");
// 選択人数の指定
const icons = document.querySelectorAll('.player-icon');
const minP = gameInfo.minPlayers;
const maxP = gameInfo.maxPlayers;

let selectedCount = minP;

// タイトル表示
document.getElementById("gameTitle").textContent = gameInfo.title;

if (gameID === "hogehoge") {
    btn.textContent = "";
    // 人数選択アイコンを全て非表示
    icons.forEach(icon => {
        icon.style.display = "none";
    });
    // エラー文言の表示
    document.getElementById("minPlayersValue").innerHTML = `エラーが発生したため選択できません`;

} else {

    // -----------------------------------------------------------

    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    // -----ルールの表示-----
    document.addEventListener("DOMContentLoaded", () => {
        btn.addEventListener("click", () => {
            const isHidden = detail.classList.contains("hidden");
            if (isHidden) {
                // ルール文を表示する
                detail.classList.remove("hidden"); // ボックスの隙間を表示させる
                ruleArea.innerHTML = gameInfo.rule; // ルール文の表示
                btn.textContent = "ゲームルール ▼"; // ボタン表示文字
            } else {
                // ルール文を表示しない
                detail.classList.add("hidden");  // ボックスの隙間を無くす
                ruleArea.innerHTML = null; // ルール文の非表示
                btn.textContent = "ゲームルール ▶︎"; //ボタン表示文字
            }
        });
    });
    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    // -----参加人数の設定-----
    document.addEventListener("DOMContentLoaded", () => {

        document.getElementById("minPlayersValue").textContent = `${minP}`;
        // 【要修正】　ゲームに必要な人数分の背景色をつける
        updateMinArea();


        // 表示1つめのアイコンを「YOU」に設定
        icons[0].src = "./img/player_you.png";

        // 最大参加人数以上のアイコンを非表示にする
        icons.forEach(i => {
            const idx = Number(i.dataset.index);
            if (idx > maxP) {
                i.style.display = "none";
            }
        });

        updateSelectedIcons();

        icons.forEach(icon => {
            // マウスがアイコンに乗った時の動き
            icon.addEventListener('mouseover', () => {
                const idx = Number(icon.dataset.index);

                icons.forEach(i => {
                    const iIdx = Number(i.dataset.index);

                    if (iIdx <= minP) return; // 最低必要人数内は画像が切り替わらない
                    if (i.style.display === "none") return; // 非表示は対象外
                    i.src = (iIdx <= idx) ? "./img/player_hover.png" : "./img/player.png";
                });
            });

            /*
            マウスが外れたら「仮表示」を消して、実際に確定している選択状態に戻す。*/
            icon.addEventListener('mouseout', () => {
                updateSelectedIcons();
            });

            /*
            クリックで selectedCount を更新（ただし最低 2 人に制限）。その後画面反映関数を呼ぶ。*/
            icon.addEventListener('click', () => {
                const idx = Number(icon.dataset.index);

                // 最低参加人数以下のアイコンが選択された時　または　それ以外の時
                if (idx <= minP) {
                    // 最低参加人数が参加人数にセットされる
                    selectedCount = minP;
                } else {
                    // クリックされたアイコン分の人数が参加人数にセットされる
                    selectedCount = idx;
                }
                updateSelectedIcons();
            });
        });

        // 【要 確認・修正】
        //　最低参加人数の背景の設定
        function updateMinArea() {
            const icons = document.querySelectorAll('.player-icon');
            const bg = document.getElementById('minAreaBg');
            const parent = document.querySelector('.player-select').getBoundingClientRect();

            const first = icons[0].getBoundingClientRect();
            const last = icons[minP - 1].getBoundingClientRect();

            bg.style.left = (first.left - parent.left) + "px";
            bg.style.top = (first.top - parent.top) + "px";
            bg.style.width = (last.right - first.left) + "px";
            bg.style.height = first.height + "px";
        }

        // 人数選択の切り替え
        function updateSelectedIcons() {
            icons.forEach(i => {
                if (i.style.display === "none") return; // ← 非表示は対象外
                const idx = Number(i.dataset.index);
                if (idx === 1) {
                    // i.src = "./img/player_you.png";
                } else if (idx <= selectedCount) {
                    i.src = "./img/player_hover.png";
                } else {
                    i.src = "./img/player.png";
                }
            });
            document.getElementById("choicePlayersValue").textContent = `${selectedCount}`;
        }
    });
    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ コイン種類 ■■■■■■■■■■
    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 　設定値　 ■■■■■■■■■■
    // 選択中コイン種類の表示
    const selecteCoinValue = document.getElementById('selecteCoinValue');
    // 
    const coinInput = document.getElementById("coinInput");

    const coin = document.querySelectorAll(".coin");
    // ---------------------------------------------------------------------
    // コイン種類（初期値：1）
    let currentCoinValue = 1;

    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 　初期化　 ■■■■■■■■■■
    // 選択中コインの種類の表示
    selecteCoinValue.textContent = currentCoinValue;

    coinInput.addEventListener("input", () => {
        const value = Number(coinInput.value);
        if (!COIN_IMAGES[value]) return;

        currentCoinValue = value;
        updateActiveCoinUI();
        renderCoins();
    });

    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ アクション ■■■■■■■■■■
    document.addEventListener("DOMContentLoaded", () => {
        updateActiveCoinUI();
        renderCoins();

        coin.forEach(coinNum => {
            coinNum.addEventListener("click", () => {
                const value = Number(coinNum.dataset.value);
                if (!COIN_IMAGES[value]) return;

                currentCoinValue = value;

                updateActiveCoinUI();
                renderCoins();
                renderValue();

                renderPFCoins();
            });
        });
    });

    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ コイン枚数 ■■■■■■■■■■
    // コイン枚数選択画像の表示
    const coinStacks = document.getElementById("coinStacks");
    // 金額の表示
    const choiceCoinsValue = document.getElementById("choiceCoinsValue");
    // コイン選択枚数の表示
    const moneyHValueDisplay = document.getElementById("moneyHValueDisplay");
    // [-]ボタン
    const minusBtn = document.getElementById("minusBtn");
    // [+]ボタン
    const plusBtn = document.getElementById("plusBtn");

    // ---------------------------------------------------------------------
    // コインに順番の割り振り
    let globalIndex = 1;
    // 横：5列
    const columnCount = 5;
    // 縦：20枚
    const coinCount = 20;
    // 最低コイン枚数：10枚
    const minCoins = 10;
    // 最大コイン枚数：100枚
    const maxCoins = 100;

    // コインの選択している枚数
    let selectedCountCoins = minCoins;

    // コイン種類選択後、コイン枚数選択時の表示画像の識別
    const COIN_IMAGES = {
        1: "./img/StackCoins_001.png",
        5: "./img/StackCoins_005.png",
        10: "./img/StackCoins_010.png",
        50: "./img/StackCoins_050.png",
        100: "./img/StackCoins_100.png"
    };

    const SKELETON_COIN_IMAGES = {
        0: "./img/StackCoins_000-top01.png",
        1: "./img/StackCoins_000-ten.png",
        "other": "./img/StackCoins_000.png",
        "PFTop": "./img/StackCoins_000-top02.png"
    }

    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 　初期化　 ■■■■■■■■■■
    coinStacks.innerHTML = "";
    // ■ 横5列分繰り返し
    for (let col = 0; col < columnCount; col++) {
        const stack = document.createElement("div");
        // css制御
        stack.classList.add("coin-stack");

        // ■ 横20枚分繰り返し
        for (let i = 1; i <= coinCount; i++) {
            const img = document.createElement("img");
            img.classList.add("numberOfCoins");
            img.dataset.index = globalIndex;

            img.src = globalIndex <= minCoins
                ? getActiveCoinImage()
                : getSkeletonCoinImage(i);

            img.style.bottom = `${i * 5.5}px`;
            img.style.zIndex = i;

            stack.appendChild(img);
            globalIndex++;

        }
        coinStacks.appendChild(stack);
    }

    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ アクション ■■■■■■■■■■
    // コイン枚数画像
    const numberOfCoins = document.querySelectorAll(".numberOfCoins");

    renderCoins();
    renderValue();

    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ イベント ■■■■■■■■■■
    numberOfCoins.forEach(coinVal => {
        coinVal.addEventListener("mouseover", () => {
            const idx = Math.max(Number(coinVal.dataset.index), minCoins);
            renderCoins(idx);
            renderValue(idx);
        });

        coinVal.addEventListener("mouseout", () => {
            renderCoins();
            renderValue();
        });

        coinVal.addEventListener("click", () => {
            selectedCountCoins = Math.max(Number(coinVal.dataset.index), minCoins);
            renderCoins();
            renderValue();
            renderPFCoinStack();
        });
    });

    // ===== ボタン操作 =====
    minusBtn.addEventListener("click", () => {
        selectedCountCoins = btnMinus(selectedCountCoins, minCoins);

        renderCoins();
        renderValue();
        renderPFCoinStack();
    });

    plusBtn.addEventListener("click", () => {
        selectedCountCoins = btnPlus(selectedCountCoins, maxCoins);

        renderCoins();
        renderValue();
        renderPFCoinStack();
    });

    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ コイン関連 ■■■■■■■■■■
    function getActiveCoinImage() {
        return COIN_IMAGES[currentCoinValue];
    }

    function getSkeletonCoinImage(num = i) {
        let setImg = 0;
        // 10,20,30...100の数字の場合
        if (0 === num % 10) {
            // 10の位が、偶数の場合はトップ「0」、奇数の時は目印で「1」
            setImg = (num / 10) % 2;
        } else {
            // 
            setImg = "other";
        }
        return SKELETON_COIN_IMAGES[setImg]
    }

    // コインの種類を反映
    function updateActiveCoinUI() {
        coin.forEach(c => {
            const value = Number(c.dataset.value);
            c.classList.toggle("selected", value === currentCoinValue);
        });
        selecteCoinValue.textContent = currentCoinValue;
    }

    function renderCoins(tempValue = null) {
        const value = tempValue ?? selectedCountCoins;

        numberOfCoins.forEach(coin => {
            const idx = Number(coin.dataset.index);
            coin.src = idx <= value
                ? getActiveCoinImage()
                : getSkeletonCoinImage(idx);
        });
    }

    function renderValue(value = selectedCountCoins) {
        // 金額
        choiceCoinsValue.textContent = value * currentCoinValue;
        // コイン枚数
        moneyHValueDisplay.textContent = `${value}`;
    }

    function btnMinus(num, min) {
        if (num > min) {
            num--;
        }
        return num
    }
    function btnPlus(num, max) {
        if (num < max) {
            num++;
        }
        return num
    }
    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 参加費コイン枚数 ■■■■■■■■■■
    // 参加費画像の表示
    const pfcoinStack = document.getElementById("pfcoinStack");
    // ---------------------------------------------------------------------
    // コインに順番の割り振り
    let globalIndexPF = 1;
    // 参加費最大枚数
    let maxPFCoin = 1;

    // コインの選択している枚数
    let selectedPFCountCoins = 0;


    // 金額の表示
    const choiceCoinsPFValue = document.getElementById("choiceCoinsPFValue");
    // コイン選択枚数の表示
    const CoinPFValueDisplay = document.getElementById("CoinPFValueDisplay");
    // コイン選択枚数の表示
    const CoinPFAllValueDisplay = document.getElementById("CoinPFAllValueDisplay");

    // [-]ボタン
    const minusBtnPF = document.getElementById("minusBtnPF");
    // [+]ボタン
    const plusBtnPF = document.getElementById("plusBtnPF");

    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 　初期化　 ■■■■■■■■■■

    renderPFCoinStack();

    function renderPFCoinStack() {
        pfcoinStack.innerHTML = "";
        maxPFCoin = Math.floor(selectedCountCoins / 10);

        for (let i = 1; i <= maxPFCoin; i++) {
            const img = document.createElement("img");
            img.classList.add("pfCoins");
            img.dataset.index = i;

            img.src = getSkeletonPFCoinImage(i);

            img.style.bottom = `${i * 5.5}px`;
            img.style.zIndex = i;

            pfcoinStack.appendChild(img);
        }
        renderPFValue();
    }

    pfcoinStack.addEventListener("mouseover", (e) => {
        if (!e.target.classList.contains("pfCoins")) return;

        const idx = Number(e.target.dataset.index);
        renderPFCoins(idx);
        renderPFValue(idx);
    });

    pfcoinStack.addEventListener("mouseout", (e) => {
        if (!e.target.classList.contains("pfCoins")) return;

        renderPFCoins();
        renderPFValue();
    });

    pfcoinStack.addEventListener("click", (e) => {
        if (!e.target.classList.contains("pfCoins")) return;

        selectedPFCountCoins = Number(e.target.dataset.index);
        renderPFCoins();
        renderPFValue();
    });

    // ===== ボタン操作 =====
    minusBtnPF.addEventListener("click", () => {
        selectedPFCountCoins = btnMinus(selectedPFCountCoins, 0);

        renderPFCoins();
        renderPFValue();
    });

    plusBtnPF.addEventListener("click", () => {
        selectedPFCountCoins = btnPlus(selectedPFCountCoins, maxPFCoin);

        renderPFCoins();
        renderPFValue();
    });

    function renderPFCoins(tempValue = null) {
        const value = tempValue ?? selectedPFCountCoins;
        const pfCoins = pfcoinStack.querySelectorAll(".pfCoins");

        pfCoins.forEach(coin => {
            const idx = Number(coin.dataset.index);

            coin.src = idx <= value
                ? getActiveCoinImage()
                : getSkeletonPFCoinImage(idx);
        });
    }

    function getSkeletonPFCoinImage(i) {
        return (i === maxPFCoin)
            ? SKELETON_COIN_IMAGES.PFTop
            : SKELETON_COIN_IMAGES.other;
    }

    function renderPFValue(value = selectedPFCountCoins) {
        // 金額
        choiceCoinsPFValue.textContent = value * currentCoinValue;

        CoinPFValueDisplay.textContent = `${value}`;
        // コイン枚数
        CoinPFAllValueDisplay.textContent = `${maxPFCoin}`;
    }

    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
    // 開始ボタン
    // const gameStartPageMap = {
    //     indianpoker: "t-g_IndianPoker.html",
    //     babanuki: "t-g_babanuki.html"
    // };
    // 開始確認モーダル
    const startBtn = document.getElementById('startBtn');
    const confirmModal = document.getElementById('confirmModal');
    const confirmModalOverlay = document.getElementById('confirmModalOverlay');
    const changeBtn = document.getElementById('changeBtn');
    const confirmStartBtn = document.getElementById('confirmStartBtn');
    const confirmPlayersValue = document.getElementById('confirmPlayersValue');
    const confirmPossessionValue = document.getElementById('confirmPossessionValue');
    const confirmEntryValue = document.getElementById('confirmEntryValue');

    function updateConfirmModalValues() {
        confirmPlayersValue.textContent = `${selectedCount}`;
        confirmPossessionValue.textContent = `${selectedCountCoins}`;
        confirmEntryValue.textContent = `${selectedPFCountCoins}`;
    }

    function openConfirmModal() {
        updateConfirmModalValues();
        confirmModal.classList.remove('hidden-modal');
        confirmModal.setAttribute('aria-hidden', 'false');
    }

    // document.getElementById('startBtn').addEventListener('click', () => {
    //     const nextPage = gameInfo.nextPage;
    //     window.location.href = `${nextPage}?players=${selectedCount}&game=${gameID}&coin=${selectedCountCoins}&PFcoin=${selectedPFCountCoins}`;
    // });
    function closeConfirmModal() {
        confirmModal.classList.add('hidden-modal');
        confirmModal.setAttribute('aria-hidden', 'true');
    }

    startBtn.addEventListener('click', () => {
        openConfirmModal();
    });

    changeBtn.addEventListener('click', () => {
        closeConfirmModal();
    });

    confirmModalOverlay.addEventListener('click', () => {
        closeConfirmModal();
    });

    confirmStartBtn.addEventListener('click', () => {
        const nextPage = gameInfo.nextPage;
        window.location.href = `${nextPage}?players=${selectedCount}&game=${gameID}&coin=${selectedCountCoins}&PFcoin=${selectedPFCountCoins}`;
    });

    // ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
} 