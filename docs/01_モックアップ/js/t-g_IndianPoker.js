const params = new URLSearchParams(location.search);
const settings = {
    game: params.get('game') || 'indianpoker',
    players: Number(params.get('players') || 2),
    coinval: Number(params.get('coinval') || 1),
    coin: Number(params.get('coin') || 10),
    PFcoin: Number(params.get('PFcoin') || 0)
};

const suits = ['c', 'd', 'h', 's', '0'];
const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', 'JOKER'];
const actions = ['check', 'bet', 'call', 'raise', 'fold', 'all-in'];

const state = {
    round: 1,
    myAction: '',
    tableOpened: false,
    chips: settings.coin,
    wins: { you: 0, npc1: 0, npc2: 0, npc3: 0 }
};

const npcCount = Math.max(1, Math.min(3, settings.players - 1));

function buildSelect(options, id) {
    return `<select id="${id}">${options.map(v => `<option value="${v}">${v}</option>`).join('')}</select>`;
}

function initConfigPanel() {
    const panel = document.getElementById('mockConfigPanel');
    let html = '<div><b>モックアップ挙動設定</b></div><div class="config-grid">';

    ['you', 'npc1', 'npc2', 'npc3'].forEach(k => {
        html += `<div><div class="field">${k === 'you' ? '自分' : k}：${buildSelect(suits, `${k}_suit`)} ${buildSelect(nums, `${k}_num`)}</div></div>`;
    });

    html += '<div style="grid-column:1/-1">';
    for (let r = 1; r <= 5; r++) {
        html += `<div class="round-row"><div><b>賭け${r}周目</b></div>`;
        ['npc1', 'npc2', 'npc3'].forEach(n => {
            html += `<div class="field">${n}${buildSelect(actions, `r${r}_${n}`)}</div>`;
        });
        html += `<div class="field">end <input type="checkbox" id="r${r}_end"></div></div>`;
    }
    html += '</div></div>';
    panel.innerHTML = html;
}

function cardPath(playerKey) {
    const suit = document.getElementById(`${playerKey}_suit`)?.value || '0';
    const num = document.getElementById(`${playerKey}_num`)?.value || 'JOKER';
    if (suit === '0') return './img/trump/0_card-back.png';
    return num === 'JOKER' ? './img/trump/0_JOKER.jpeg' : `./img/trump/${suit}_${num}.jpeg`;
}

function renderNpcs(showFront = false) {
    const row = document.getElementById('npcRow');
    row.innerHTML = '';

    for (let i = 1; i <= npcCount; i++) {
        const n = `npc${i}`;
        const cardSrc = showFront ? cardPath(n) : './img/trump/0_card-back.png';
        row.insertAdjacentHTML('beforeend', `
            <div class="participant" id="${n}_box">
                <div class="npc-action" id="${n}_action"></div>
                <div class="npc-wrap">
                    <img class="card" src="${cardSrc}" alt="${n}カード">
                    <img class="npc-img" src="./img/one-card_npc1.png" alt="${n}">
                </div>
            </div>
        `);
    }
}

function updatePotLabel() {
    document.getElementById('potLabel').textContent = `現在の賭け金: チップ${state.chips}枚`;
}

function startDeal() {
    state.round = 1;
    state.myAction = '';
    state.tableOpened = true;
    state.chips = settings.PFcoin * settings.coinval;
    updatePotLabel();

    document.getElementById('tableArea').hidden = false;
    document.getElementById('dealArea').hidden = true;
    document.getElementById('postHandRow').hidden = true;
    document.getElementById('nextActionRow').hidden = true;
    document.getElementById('nextRow').hidden = true;
    document.getElementById('myActionDisplay').innerHTML = '';
    document.getElementById('firstActionRow').hidden = false;

    renderNpcs(false);
    document.getElementById('youCard').src = './img/trump/0_card-back.png';
}

function displayMyAction(action) {
    const srcMap = {
        'check': './img/game-btn_check.png',
        'bet': './img/game-btn_bet.png',
        'fold': './img/game-btn_fold.png',
        'call': './img/game-btn_call.png',
        'raise': './img/game-btn_raise.png',
        'all-in': './img/game-btn_all-in.png'
    };
    document.getElementById('myActionDisplay').innerHTML = `<img src="${srcMap[action]}" style="width:210px;border-radius:8px;" alt="${action}">`;
    state.myAction = action;
}

function npcActionForRound(round, npcKey) {
    return document.getElementById(`r${round}_${npcKey}`)?.value || 'check';
}

function showNpcActions() {
    for (let i = 1; i <= npcCount; i++) {
        const npcKey = `npc${i}`;
        const action = npcActionForRound(state.round, npcKey);
        const area = document.getElementById(`${npcKey}_action`);
        area.textContent = action;
        if (action === 'bet' || action === 'raise') state.chips += 1;
    }
    updatePotLabel();
}

function shouldEndRound(round) {
    return Boolean(document.getElementById(`r${round}_end`)?.checked);
}

function revealHands() {
    renderNpcs(true);
    document.getElementById('youCard').src = cardPath('you');
    document.getElementById('firstActionRow').hidden = true;
    document.getElementById('nextActionRow').hidden = true;
    document.getElementById('nextRow').hidden = true;
    document.getElementById('postHandRow').hidden = false;

    const keys = ['you', 'npc1', 'npc2', 'npc3'].slice(0, npcCount + 1);
    const winner = keys[Math.floor(Math.random() * keys.length)];
    if (winner === 'you') state.wins.you += 1;
    if (winner === 'npc1') state.wins.npc1 += 1;
    if (winner === 'npc2') state.wins.npc2 += 1;
    if (winner === 'npc3') state.wins.npc3 += 1;
}

function runRoundAfterMyAction() {
    document.getElementById('firstActionRow').hidden = true;
    document.getElementById('nextActionRow').hidden = true;
    document.getElementById('nextRow').hidden = true;

    setTimeout(() => {
        showNpcActions();
        if (shouldEndRound(state.round) || state.round >= 5) {
            revealHands();
        } else {
            document.getElementById('nextRow').hidden = false;
        }
    }, 2000);
}

document.getElementById('toggleMockupBtn').addEventListener('click', () => {
    document.getElementById('mockConfigPanel').classList.toggle('open');
});

document.getElementById('startBtn').addEventListener('click', startDeal);

document.getElementById('firstActionRow').addEventListener('click', e => {
    const btn = e.target.closest('.img-btn');
    if (!btn) return;
    displayMyAction(btn.dataset.action);
    runRoundAfterMyAction();
});

document.getElementById('nextBetBtn').addEventListener('click', () => {
    document.getElementById('nextRow').hidden = true;
    document.getElementById('nextActionRow').hidden = false;
});

document.getElementById('nextActionRow').addEventListener('click', e => {
    const btn = e.target.closest('.img-btn');
    if (!btn) return;
    displayMyAction(btn.dataset.action);
    state.round += 1;
    runRoundAfterMyAction();
});

document.getElementById('continueBtn').addEventListener('click', () => {
    document.getElementById('tableArea').hidden = true;
    document.getElementById('dealArea').hidden = false;
    state.chips = settings.PFcoin * settings.coinval;
    updatePotLabel();
});

document.getElementById('endBtn').addEventListener('click', () => {
    const dlg = document.getElementById('resultDialog');
    document.getElementById('chipsStart').textContent = `はじめのチップ：${settings.coin}枚`;
    document.getElementById('chipsEnd').textContent = `ゲーム後のチップ：${Math.max(0, settings.coin - settings.PFcoin + state.wins.you)}枚`;
    document.getElementById('winYou').textContent = `自分：${state.wins.you}`;
    document.getElementById('winNpc1').textContent = `npc1：${state.wins.npc1}`;
    document.getElementById('winNpc2').textContent = npcCount >= 2 ? `npc2：${state.wins.npc2}` : 'npc2：-';
    document.getElementById('winNpc3').textContent = npcCount >= 3 ? `npc3：${state.wins.npc3}` : 'npc3：-';
    dlg.showModal();
});

document.getElementById('retryBtn').addEventListener('click', () => {
    location.href = `t-g_IndianPoker.html?game=indianpoker&players=${settings.players}&coinval=${settings.coinval}&coin=${settings.coin}&PFcoin=${settings.PFcoin}`;
});

initConfigPanel();
updatePotLabel();