// ポップアップ表示切り替え
function togglePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
}

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".img-btn img");

    buttons.forEach(img => {
        const normalSrc = img.getAttribute("data-normal");
        const hoverSrc = img.getAttribute("data-hover");

        // マウスが乗った時
        img.addEventListener("mouseover", () => {
            img.src = hoverSrc;
        });

        // マウスが離れた時
        img.addEventListener("mouseout", () => {
            img.src = normalSrc;
        });
    });
});

// const btn = document.getElementById("startBtn");
// const img = document.getElementById("startImg");

// btn.addEventListener("click", () => {
//     // まず hover画像に切り替え
//     img.src = "./img/button01_TrumpGame_hover.png";

//     // 1秒維持してから遷移
//     setTimeout(() => {
//         window.location.href = "next.html";
//     }, 3000);
// });